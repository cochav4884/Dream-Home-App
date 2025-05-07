import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../Styles/Form.css'; // Importing CSS from the Styles folder
import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Add this

// Importing types and constants
import { styles, sizes } from '../types'; // Adjust the path based on your project structure
import type { Accessory } from '../types'; // Type-only import for Accessory

interface AccessoryFormProps {
  accessory: Accessory | null;
  onSave: (accessory: Accessory) => void;
  onCancel: () => void;
}

const AccessoryForm: React.FC<AccessoryFormProps> = ({ accessory, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [style, setStyle] = useState('');
  const [size, setSize] = useState('');

  // Pre-populate the form fields when editing an existing accessory
  useEffect(() => {
    if (accessory) {
      setName(accessory.name);
      setStyle(accessory.style);
      setSize(accessory.size);
    }
  }, [accessory]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && style.trim() && size.trim()) {
      const newItem = { id: Date.now(), name, style, size };  // Use Date.now() to generate a number ID
      onSave(newItem);  // Call the onSave callback to save the item
      setName('');  // Clear form fields
      setStyle('');
      setSize('');
    } else {
      alert('Please fill out all fields.');
    }
  };

  // Handle cancel button action
  const handleCancel = () => {
    setName('');  // Reset form fields
    setStyle('');
    setSize('');
    onCancel();  // Call the onCancel callback to cancel the form
  };

  return (
    <div className="form-container">
      <h2>{accessory ? 'Edit Accessory' : 'Add New Accessory'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="form-group">
          <Form.Label>Accessory Name</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}  // Update name state
            required
          />
        </Form.Group>

        <Form.Group controlId="style" className="form-group">
          <Form.Label>Style</Form.Label>
          <Form.Control
            as="select"  // Change to dropdown
            className="form-control"
            value={style}
            onChange={(e) => setStyle(e.target.value)}  // Update style state
            required
          >
            <option value="">-- Select a Style --</option>
            {styles.map((styleOption) => (
              <option key={styleOption} value={styleOption}>
                {styleOption}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="size" className="form-group">
          <Form.Label>Size</Form.Label>
          <Form.Control
            as="select"  // Change to dropdown
            className="form-control"
            value={size}
            onChange={(e) => setSize(e.target.value)}  // Update size state
            required
          >
            <option value="">-- Select a Size --</option>
            {sizes.map((sizeOption) => (
              <option key={sizeOption} value={sizeOption}>
                {sizeOption}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* Submit button with dynamic text */}
        <Button variant="primary" type="submit" className="btn-primary">
          {accessory ? 'Update' : 'Add'} Accessory
        </Button>

        {/* Cancel button */}
        <Button
          variant="secondary"
          onClick={handleCancel}
          className="btn-secondary"
          style={{ marginLeft: '10px' }}
        >
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default AccessoryForm;
