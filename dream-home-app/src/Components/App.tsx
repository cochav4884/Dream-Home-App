import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import AccessoryList from "../Components/AccessoryList";
import AccessoryForm from "../Components/AccessoryForm"; // ✅ Importing styled form
import { Button } from "react-bootstrap";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import type { Accessory, Category } from "../types";

const App: React.FC = () => {
  useEffect(() => {
    document.title = "Dream Home Project";

    fetch("http://localhost:3001/houseAccessories")
      .then((res) => res.json())
      .then((data) => setHouseList(data))
      .catch((err) => console.error("Failed to load house accessories:", err));

    fetch("http://localhost:3001/landAccessories")
      .then((res) => res.json())
      .then((data) => setLandList(data))
      .catch((err) => console.error("Failed to load land accessories:", err));
  }, []);

  const [houseList, setHouseList] = useState<Accessory[]>([]);
  const [landList, setLandList] = useState<Accessory[]>([]);
  const [selectedItem, setSelectedItem] = useState<Accessory | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formType, setFormType] = useState<Category | null>(null);
  const [activeList, setActiveList] = useState<Category>("house");

  const handleSelectCategory = (category: Category) => {
    setActiveList(category);
  };

  const addNewItem = () => {
    const newItem: Accessory = { id: Date.now(), name: "", style: "", size: "" };
    setSelectedItem(newItem);
    setFormType(activeList);
    setIsFormVisible(true);
  };

  const editItem = (id: string | number) => {
    const list = activeList === "house" ? houseList : landList;
    const item = list.find((item) => item.id === (id));
    if (item) {
      setSelectedItem(item);
      setFormType(activeList);
      setIsFormVisible(true);
    }
  };

  const deleteItem = (id: string | number) => {
    if (activeList === "house") {
      setHouseList((prevList) => prevList.filter((item) => item.id !== id));
    } else {
      setLandList((prevList) => prevList.filter((item) => item.id !== id));
    }

    const endpoint = activeList === "house" ? "houseAccessories" : "landAccessories";
    fetch(`http://localhost:3001/${endpoint}/${id}`, {
      method: "DELETE",
    }).catch((err) => console.error("Failed to delete item:", err));
  };

  const saveAccessory = (newItem: Accessory) => {
    const listType = formType === "house" ? "houseAccessories" : "landAccessories";
    const setList = formType === "house" ? setHouseList : setLandList;
    const currentList = formType === "house" ? houseList : landList;

    const existing = currentList.some((item) => item.id === newItem.id);
    const method = existing ? "PUT" : "POST";
    const url = existing
      ? `http://localhost:3001/${listType}/${newItem.id}`
      : `http://localhost:3001/${listType}`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then((savedItem) => {
        setList((prevList) =>
          existing
            ? prevList.map((item) => (item.id === savedItem.id ? savedItem : item))
            : [...prevList, savedItem]
        );
        setIsFormVisible(false);
      })
      .catch((err) => console.error("Failed to save accessory:", err));
  };

  const cancelForm = () => {
    setIsFormVisible(false);
  };

  const accessories = activeList === "house" ? houseList : landList;

  return (
    <div className="app-container">
      <Header />
      <div className="main-layout">
        <Sidebar onSelectCategory={handleSelectCategory} />
        <main className="content">
          <h2>
            {activeList === "house" ? "🏠 House Accessories" : "🌿 Land Accessories"}
          </h2>

          <div className="button-container">
            <Button variant="primary" onClick={addNewItem}>
              Add New {activeList === "house" ? "House" : "Land"} Item
            </Button>
          </div>

          <AccessoryList
            accessories={accessories}
            deleteItem={deleteItem}
            editItem={editItem}
          />
        </main>
      </div>

      {/* ✅ Styled AccessoryForm */}
      {isFormVisible && (
        <div className="form-overlay">
          <AccessoryForm
            accessory={selectedItem}
            onSave={saveAccessory}
            onCancel={cancelForm}
          />
        </div>
      )}
    </div>
  );
};

export default App;
