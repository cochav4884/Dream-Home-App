import React, { useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import AccessoryList from "../Components/AccessoryList";
import { Button } from "react-bootstrap";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Import types and constants from the types.ts file
import type { Accessory, Category } from "../types";
import { styles, sizes } from "../types";
import { useEffect } from "react";

// Accessory interface definition (imported now from types.ts)
const App: React.FC = () => {
  // Set page title and fetch data on mount
  useEffect(() => {
    document.title = "Dream Home Project";

    // Fetch house accessories from API
    fetch("http://localhost:3001/houseAccessories")
      .then((res) => res.json())
      .then((data) => setHouseList(data))
      .catch((err) => console.error("Failed to load house accessories:", err));

    // Fetch land accessories from API
    fetch("http://localhost:3001/landAccessories")
      .then((res) => res.json())
      .then((data) => setLandList(data))
      .catch((err) => console.error("Failed to load land accessories:", err));
  }, []);

  // State hooks
  const [houseList, setHouseList] = useState<Accessory[]>([]);
  const [landList, setLandList] = useState<Accessory[]>([]);
  const [selectedItem, setSelectedItem] = useState<Accessory | null>(null);
  const [formData, setFormData] = useState({ name: "", style: "", size: "" });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formType, setFormType] = useState<Category | null>(null);
  const [activeList, setActiveList] = useState<Category>("house");

  // Handle category selection (house or land)
  const handleSelectCategory = (category: Category) => {
    setActiveList(category);
  };

  // Add new item
  const addNewItem = () => {
    const newItem = { id: Date.now(), name: "", style: "", size: "" };
    setSelectedItem(newItem);
    setFormData({ name: "", style: "", size: "" });
    setFormType(activeList);
    setIsFormVisible(true);
  };

  // Edit existing item
  const editItem = (id: number) => {
    const list = activeList === "house" ? houseList : landList;
    const item = list.find((item) => item.id === id);
    if (item) {
      setSelectedItem(item);
      setFormData({ name: item.name, style: item.style, size: item.size });
      setFormType(activeList);
      setIsFormVisible(true);
    }
  };

  // Delete item
  const deleteItem = (id: number) => {
    if (activeList === "house") {
      setHouseList((prevList) => prevList.filter((item) => item.id !== id));
    } else {
      setLandList((prevList) => prevList.filter((item) => item.id !== id));
    }

    // Optional: DELETE from json-server
    const endpoint = activeList === "house" ? "houseAccessories" : "landAccessories";
    fetch(`http://localhost:3001/${endpoint}/${id}`, {
      method: "DELETE",
    }).catch((err) => console.error("Failed to delete item:", err));
  };

  // Save new or edited accessory
  const saveAccessory = (newItem: Accessory) => {
    const listType = formType === "house" ? "houseAccessories" : "landAccessories";
    const setList = formType === "house" ? setHouseList : setLandList;

    const existing = (formType === "house" ? houseList : landList).some((item) => item.id === newItem.id);
    const method = existing ? "PUT" : "POST";
    const url = existing
      ? `http://localhost:3001/${listType}/${newItem.id}`
      : `http://localhost:3001/${listType}`;

    fetch(url, {
      method: method,
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
      })
      .catch((err) => console.error("Failed to save accessory:", err));

    setIsFormVisible(false);
  };

  // Cancel form
  const cancelForm = () => {
    setIsFormVisible(false);
  };

  // Determine which accessory list to display based on active category
  const accessories = activeList === "house" ? houseList : landList;

  // Handle form submission
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedItem) return;

    const newItem: Accessory = {
      id: selectedItem.id,
      name: formData.name,
      style: formData.style,
      size: formData.size,
    };
    saveAccessory(newItem);
  };

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

      {isFormVisible && (
        <div className="form-overlay">
          <form onSubmit={handleFormSubmit}>
            <h3>{selectedItem ? "Edit Item" : "Create New Item"}</h3>

            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter new item name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>

            <div>
              <label htmlFor="style">Style</label>
              <select
                id="style"
                name="style"
                value={formData.style}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, style: e.target.value }))
                }
                required
              >
                <option value="">-- Select a style --</option>
                {styles.map((styleOption) => (
                  <option key={styleOption} value={styleOption}>
                    {styleOption}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="size">Size</label>
              <select
                id="size"
                name="size"
                value={formData.size}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, size: e.target.value }))
                }
                required
              >
                <option value="">-- Select a size --</option>
                {sizes.map((sizeOption) => (
                  <option key={sizeOption} value={sizeOption}>
                    {sizeOption}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-buttons">
              <button type="button" onClick={cancelForm}>
                Cancel
              </button>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
// Removed custom useEffect definition as it conflicts with React's built-in useEffect.

