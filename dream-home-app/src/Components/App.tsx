import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import Sidebar from "./Sidebar/Sidebar";
import AccessoryList from "../Components/AccessoryList";
import AccessoryForm from "../Components/AccessoryForm";
import { Button } from "react-bootstrap";
import "../Styles/App.css";
import "../Styles/Form.css";
import "bootstrap/dist/css/bootstrap.min.css";
import bg from "../assets/houseBluePrint 2.jpg";  // Import the background image
import type { Accessory, Category } from "../types";

// Extending CSSProperties to allow custom properties like "--bg-image"
interface CSSPropertiesWithCustomVars extends React.CSSProperties {
  '--bg-image'?: string;
}

const App: React.FC = () => {
  const [houseList, setHouseList] = useState<Accessory[]>([]);
  const [landList, setLandList] = useState<Accessory[]>([]);
  const [selectedItem, setSelectedItem] = useState<Accessory | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formType, setFormType] = useState<Category | null>(null);
  const [activeList, setActiveList] = useState<Category>("house");

  useEffect(() => {
    document.title = "Dream Home App";

    fetch("http://localhost:3001/houseAccessories")
      .then((res) => res.json())
      .then((data) => setHouseList(data))
      .catch((err) => console.error("Failed to load house accessories:", err));

    fetch("http://localhost:3001/landAccessories")
      .then((res) => res.json())
      .then((data) => setLandList(data))
      .catch((err) => console.error("Failed to load land accessories:", err));
  }, []);

  const handleSelectCategory = (category: Category) => {
    setActiveList(category);
  };

  const addNewItem = () => {
    const newItem = { id: Date.now(), name: "", style: "", size: "" };
    setSelectedItem(newItem);
    setFormType(activeList);
    setIsFormVisible(true);
  };

  const editItem = (id: number) => {
    const list = activeList === "house" ? houseList : landList;
    const item = list.find((item) => item.id === id);
    if (item) {
      setSelectedItem(item);
      setFormType(activeList);
      setIsFormVisible(true);
    }
  };

  const deleteItem = (id: number) => {
    const setList = activeList === "house" ? setHouseList : setLandList;
    const endpoint =
      activeList === "house" ? "houseAccessories" : "landAccessories";

    setList((prevList) => prevList.filter((item) => item.id !== id));

    fetch(`http://localhost:3001/${endpoint}/${id}`, {
      method: "DELETE",
    }).catch((err) => console.error("Failed to delete item:", err));
  };

  const saveAccessory = (newItem: Accessory) => {
    const listType =
      formType === "house" ? "houseAccessories" : "landAccessories";
    const setList = formType === "house" ? setHouseList : setLandList;

    const existing = (formType === "house" ? houseList : landList).some(
      (item) => item.id === newItem.id
    );
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
            ? prevList.map((item) =>
                item.id === savedItem.id ? savedItem : item
              )
            : [...prevList, savedItem]
        );
      })
      .catch((err) => console.error("Failed to save accessory:", err));

    setIsFormVisible(false);
  };

  const cancelForm = () => {
    setIsFormVisible(false);
    setSelectedItem(null);
  };

  const accessories = activeList === "house" ? houseList : landList;

  return (
    <div
      className="app-container with-bg"
      style={{ '--bg-image': `url(${bg})` } as CSSPropertiesWithCustomVars} // Type assertion here
    >
      <Header />
      <div className="main-layout">
        <Sidebar onSelectCategory={handleSelectCategory} />
        <main className="content">
          <h2>
            {activeList === "house"
              ? "🏠 House Accessories"
              : "🌿 Land Accessories"}
          </h2>

          <div className="button-container">
            <Button variant="info" onClick={addNewItem}>
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
      {isFormVisible && selectedItem && (
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
