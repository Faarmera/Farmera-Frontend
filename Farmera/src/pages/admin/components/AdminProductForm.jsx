import React, { useState } from "react";
import { X } from "lucide-react";
import styled from "styled-components";

// Styled Components
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
`;

const FormContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 500px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h3 {
    font-size: 1.25rem;
    font-weight: bold;
  }

  button {
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;

    &:hover {
      color: #374151;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.5rem;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 0.875rem;

    &:focus {
      outline: none;
      border-color: #16a34a;
      box-shadow: 0 0 0 3px rgba(16, 163, 74, 0.3);
    }
  }

  textarea {
    resize: none;
  }
`;

const TwoColumnGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  button {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s;

    &.cancel {
      border: 1px solid #d1d5db;
      background: none;
      color: #374151;

      &:hover {
        background-color: #f9fafb;
      }
    }

    &.submit {
      background-color: #16a34a;
      color: white;
      border: none;

      &:hover {
        background-color: #15803d;
      }
    }
  }
`;

// Component
export default function AdminProductForm({ onClose, editingProduct }) {
  const [formData, setFormData] = useState({
    name: editingProduct?.name || "",
    price: editingProduct?.price || "",
    stock: editingProduct?.stock || "",
    description: editingProduct?.description || "",
    category: editingProduct?.category || "",
    image: editingProduct?.image || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    onClose();
  };

  return (
    <Overlay>
      <FormContainer>
        <Header>
          <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </Header>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <label>Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </InputGroup>

          <TwoColumnGroup>
            <InputGroup>
              <label>Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </InputGroup>
            <InputGroup>
              <label>Stock</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
              />
            </InputGroup>
          </TwoColumnGroup>

          <InputGroup>
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <option value="">Select a category</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="dairy">Dairy</option>
              <option value="meat">Meat</option>
            </select>
          </InputGroup>

          <InputGroup>
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              required
            />
          </InputGroup>

          <InputGroup>
            <label>Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
            />
          </InputGroup>

          <ButtonGroup>
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit">
              {editingProduct ? "Update Product" : "Add Product"}
            </button>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </Overlay>
  );
}
