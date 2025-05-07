import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../Styles/Form.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { styles, sizes } from '../types'; 
import type { Accessory } from '../types';

interface AccessoryFormProps {
  accessory: Accessory;
  onSave: (accessory: Accessory) => void;
  onCancel: () => void;
}

const AccessoryForm: React.FC<AccessoryFormProps> = ({ accessory, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [style, setStyle] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    if (accessory) {
      setName(accessory.name);
      setStyle(accessory.style);
      setSize(accessory.size);
    }
  }, [accessory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (name.trim() && style.trim() && size.trim()) {
      onSave({
        id: accessory.id,
        name,
        style,
        size
      });
    } else {
      alert("Please fill out all fields.");
    }
  };
  
  const handleCancel = () => {
    setName('');
    setStyle('');
    setSize('');
    onCancel();
  };

  return (
    <div className="form-container">
      <h2>{accessory ? 'Edit Accessory' : 'Add New Accessory'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="form-group">
          <Form.Label>Accessory Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="style" className="form-group">
          <Form.Label>Style</Form.Label>
          <Form.Control
            as="select"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
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
            as="select"
            value={size}
            onChange={(e) => setSize(e.target.value)}
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

        <Button variant="primary" type="submit">
          {accessory ? 'Update' : 'Add'} Accessory
        </Button>

        <Button variant="secondary" onClick={handleCancel} style={{ marginLeft: '10px' }}>
          Cancel
        </Button>
      </Form>
    </div>
  );
};

export default AccessoryForm;
