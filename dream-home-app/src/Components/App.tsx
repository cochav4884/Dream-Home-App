import React, { useState } from "react";
import { houseAccessories } from "../Data/houseAccessories"; // assumed predefined
import { landAccessories } from "../Data/landAccessories"; // assumed predefined
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import AccessoryList from "../Components/AccessoryList";
import { Button } from "react-bootstrap";
import "../styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect as reactUseEffect } from "react"; // aliased useEffect

// Accessory interface definition
interface Accessory {
  id: number;
  name: string;
  style: string;
  size: string;
}

const App: React.FC = () => {
  // Set page title on component mount
  useEffect(() => {
    document.title = "Dream Home Project";
  }, []);

  // Initialize accessory lists for house and land
  const [houseList, setHouseList] = useState(houseAccessories);
  const [landList, setLandList] = useState(landAccessories);

  // Selected item for editing
  const [selectedItem, setSelectedItem] = useState<Accessory | null>(null);
  // Controlled form data state
  const [formData, setFormData] = useState({ name: "", style: "", size: "" });

  // Flags for showing form and tracking its context
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formType, setFormType] = useState<"house" | "land" | null>(null);
  const [activeList, setActiveList] = useState<"house" | "land">("house");

  // Switch between house and land views
  const handleSelectCategory = (category: "house" | "land") => {
    setActiveList(category);
  };

  // Trigger add new item flow
  const addNewItem = () => {
    const newItem = { id: Date.now(), name: "", style: "", size: "" };
    setSelectedItem(newItem);
    setFormData({ name: "", style: "", size: "" });
    setFormType(activeList);
    setIsFormVisible(true);
  };

  // Trigger edit flow by loading item data into the form
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

  // Delete item by ID
  const deleteItem = (id: number) => {
    if (activeList === "house") {
      setHouseList((prevList) => prevList.filter((item) => item.id !== id));
    } else {
      setLandList((prevList) => prevList.filter((item) => item.id !== id));
    }
  };

  // Dropdown options for styles
  const styles = [
    "Rustic",
    "Luxury",
    "Contemporary",
    "Industrial",
    "Traditional",
    "Abstract",
    "Bohemian",
    "Vintage",
    "Modern",
    "Decorative",
    "Functional",
    "Recreational",
    "Colorful",
    "Natural",
    "Serene",
    "Playful",
    "Minimalist",
    "Victorian",
    "Eclectic",
    "Art Deco",
    "Scandinavian",
    "Mediterranean",
    "Farmhouse",
    "Cottage",
    "Mid-Century Modern",
    "Coastal",
    "Japanese Zen",
    "Tropical",
    "Southwestern",
    "Gothic",
    "StyleNotSpecified",
  ];

  // Dropdown options for sizes
  const sizes: string[] = [
    "Small",
    "Medium",
    "Large",
    "Extra Large",
    "Compact",
    "Oversized",
    "Standard",
    "Mini",
    "Maxi",
    "Petite",
    "Tall",
    "Short",
    "Wide",
    "Narrow",
    "Slim",
    "Spacious",
    "Cozy",
    "Roomy",
    "Generous",
    "Ample",
    "Vast",
    "Expansive",
    "Breezy",
    "Open",
    "SizeNotSpecified",
  ];

  // Save new or edited accessory
  const saveAccessory = (newItem: Accessory) => {
    if (formType === "house") {
      setHouseList((prevList) =>
        prevList.some((item) => item.id === newItem.id)
          ? prevList.map((item) => (item.id === newItem.id ? newItem : item))
          : [...prevList, newItem]
      );
    } else if (formType === "land") {
      setLandList((prevList) =>
        prevList.some((item) => item.id === newItem.id)
          ? prevList.map((item) => (item.id === newItem.id ? newItem : item))
          : [...prevList, newItem]
      );
    }
    setIsFormVisible(false);
  };

  // Cancel form and hide it
  const cancelForm = () => {
    setIsFormVisible(false);
  };

  // Determine which accessory list is currently active
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
            {activeList === "house"
              ? "🏠 House Accessories"
              : "🌿 Land Accessories"}
          </h2>

          {/* Add New Item Button */}
          <div className="button-container">
            <Button variant="primary" onClick={addNewItem}>
              Add New {activeList === "house" ? "House" : "Land"} Item
            </Button>
          </div>

          {/* Accessory List Component */}
          <AccessoryList
            accessories={accessories}
            deleteItem={deleteItem}
            editItem={editItem}
          />
        </main>
      </div>

      {/* Conditional Form Overlay */}
      {isFormVisible && (
        <div className="form-overlay">
          <form onSubmit={handleFormSubmit}>
            <h3>{selectedItem ? "Edit Item" : "Create New Item"}</h3>

            {/* Name Field */}
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

            {/* Style Dropdown */}
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

            {/* Size Dropdown */}
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

            {/* Form Buttons */}
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

// Custom hook re-mapping useEffect with aliased import
function useEffect(callback: () => void, dependencies: React.DependencyList) {
  reactUseEffect(callback, dependencies);
}
// This custom hook allows us to use the aliased useEffect without conflicts
// while maintaining the original functionality of React's useEffect.
// The custom useEffect function is defined to avoid conflicts with the aliased import.