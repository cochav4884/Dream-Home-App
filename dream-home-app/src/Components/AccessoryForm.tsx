import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap'; // Import necessary components

// Define the structure for an Accessory item
interface Accessory {
  id: number;
  name: string;
  style: string;
  size: string;
}

// Define props expected by the AccessoryForm component
interface AccessoryFormProps {
  accessory: Accessory | null; // If null, it's for creating a new item
  onSave: (accessory: Accessory) => void; // Callback for saving the accessory
  onCancel: () => void; // Callback for canceling the form
}

// Functional component to handle creation/editing of an accessory
const AccessoryForm: React.FC<AccessoryFormProps> = ({ accessory, onSave, onCancel }) => {
  const [name, setName] = useState(''); // State for name input
  const [style, setStyle] = useState(''); // State for style input
  const [size, setSize] = useState(''); // State for size input

  // If an accessory is passed (editing), populate the form fields
  useEffect(() => {
    if (accessory) {
      setName(accessory.name);
      setStyle(accessory.style);
      setSize(accessory.size);
    }
  }, [accessory]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form behavior
    if (name && style && size) {
      const newItem = { id: Date.now(), name, style, size }; // Creating a new item with a unique id
      onSave(newItem); // Save the item using the provided callback
    }
  };

  return (
    <div className="form-container">
      <h2>{accessory ? 'Edit Accessory' : 'Add New Accessory'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Accessory Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Update name state
            required
          />
        </Form.Group>

        <Form.Group controlId="style">
          <Form.Label>Style</Form.Label>
          <Form.Control
            type="text"
            value={style}
            onChange={(e) => setStyle(e.target.value)} // Update style state
            required
          />
        </Form.Group>

        <Form.Group controlId="size">
          <Form.Label>Size</Form.Label>
          <Form.Control
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)} // Update size state
            required
          />
        </Form.Group>

        {/* Submit button with dynamic text based on mode */}
        <Button variant="primary" type="submit">
          {accessory ? 'Update' : 'Add'} Accessory
        </Button>

        {/* Cancel button triggers onCancel callback */}
        <Button variant="secondary" onClick={onCancel} style={{ marginLeft: '10px' }}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default AccessoryForm;
// This component can be used in the main App component to handle both creating and editing accessories.
// It provides a form with fields for name, style, and size, and uses Bootstrap for styling.