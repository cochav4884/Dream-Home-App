import React from 'react';
import { Button, ListGroup } from 'react-bootstrap'; // React-Bootstrap components

// Define the structure for an Accessory item
interface Accessory {
  id: number;
  name: string;
  style: string;
  size: string;
}

// Define the props for the AccessoryList component
interface AccessoryListProps {
  accessories: Accessory[]; // List of accessory items to display
  deleteItem: (id: number) => void; // Function to delete an item by id
  editItem: (id: number) => void; // Function to edit an item by id
}

// Component to display a list of accessories with edit/delete options
const AccessoryList: React.FC<AccessoryListProps> = ({ accessories, deleteItem, editItem }) => {
  return (
    <ListGroup>
      {accessories.map((accessory) => (
        <ListGroup.Item key={accessory.id}>
          {/* Display accessory details */}
          <strong>{accessory.name}</strong> - {accessory.style} ({accessory.size})
          
          {/* Edit Button (blue) */}
          <Button 
            variant="primary" 
            onClick={() => editItem(accessory.id)} 
            style={{ marginLeft: '10px' }}
          >
            Edit
          </Button>
          
          {/* Delete Button (red) */}
          <Button 
            variant="danger" 
            onClick={() => deleteItem(accessory.id)} 
            style={{ marginLeft: '10px' }}
          >
            Delete
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default AccessoryList;
// This component renders a list of accessories with options to edit or delete each item.
// It uses React-Bootstrap for styling and layout, providing a clean and responsive design for the accessory list.