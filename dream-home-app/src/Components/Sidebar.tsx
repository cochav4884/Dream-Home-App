import React from 'react';
import '../styles/Sidebar.css'; // Import styles for the sidebar

// Define the props expected by the Sidebar component
interface SidebarProps {
  onSelectCategory: (category: 'house' | 'land') => void; // Callback to switch categories
}

// Sidebar component to select between house and land accessories
const Sidebar: React.FC<SidebarProps> = ({ onSelectCategory }) => {
  return (
    <div className="sidebar open">
      <nav>
        <ul>
          {/* Button to select House Accessories */}
          <li>
            <button onClick={() => onSelectCategory('house')} className="sidebar-link">
              🏠 House Accessories
            </button>
          </li>
          
          {/* Button to select Land Accessories */}
          <li>
            <button onClick={() => onSelectCategory('land')} className="sidebar-link">
              🌿 Land Accessories
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
// This component provides a sidebar for selecting between house and land accessories in the Dream Home Builder app.
// It uses a callback function to notify the parent component when a category is selected, allowing for dynamic updates in the main content area based on user selection.
// The Sidebar component is a functional component that renders a navigation menu with buttons to switch between house and land accessories. It uses TypeScript for type safety and CSS for styling.
