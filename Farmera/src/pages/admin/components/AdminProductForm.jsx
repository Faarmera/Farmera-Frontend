import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import styled from "styled-components";
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import axios from "axios";

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

// const Upload = styled.div`
// &:hover {
//   color: #16a34a;
// }`;

// Component
export default function AdminProductForm({ onClose, editingProduct, onSavedProduct }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category: "",
    store: "",
    location: "",
    // image: editingProduct?.image || "",
  });
  const [imageUpload, setImageUpload] = useState([]);
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        price: editingProduct.price || "",
        stock: editingProduct.qtyAvailable || "",
        description: editingProduct.description || "",
        category: editingProduct.category ? editingProduct.category.name || "" : "",
        store: editingProduct.store || "",
        location: editingProduct.location || "",
      });

      const previewImages = editingProduct?.images?.map((imageUrl, index) => ({
        name: imageUrl.split("/").pop(),
        // name: `image-${index}`,
        size: 1234,
        status: "done",
        url: imageUrl,
      }))
      setImageUpload(previewImages);
      // setImageUpload(editingProduct.images || []);
    };
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const productFormData = new FormData();
      productFormData.append("name", formData.name);
      productFormData.append("price", formData.price)
      productFormData.append("qtyAvailable", formData.stock)
      productFormData.append("description", formData.description)
      productFormData.append("category", formData.category)
      productFormData.append("store", formData.store)
      productFormData.append("location", formData.location)

      imageUpload.forEach((file) => productFormData.append("images", file))

      if (editingProduct) {
        await axios.put(`https://farmera-eyu3.onrender.com/api/v1/product/update/${editingProduct._id}`,
          productFormData,
        );
      } else {
        await axios.post("https://farmera-eyu3.onrender.com/api/v1/product/create",
          productFormData,
          {
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
          },
          // {
          //   headers: {
          //     "Content-Type": "multipart/form-data"
          //   },
          // },
        ); 
      };
      // const productResponse = 
      onSavedProduct();
      onClose();

    } catch(err) {
      if (err.response?.data?.error) {
        setError(err.response?.data?.error)
      } else {
        setError(err.response)
      }

    } finally {
      setSaving(false)
    }
    // Handle form submission logic
  };

  const props = {
    name: 'images',
    action: 'https://farmera-eyu3.onrender.com/api/v1/product/create',
    headers: {
      authorization: 'authorization-text',
    },
    multiple: true,
    fileList: imageUpload,
    // listType: "picture",
    showUploadList: {
      showPreviewIcon: true,
      showRemoveIcon: true,
    },
    beforeUpload: (file) => {
      setImageUpload((prev) => [...prev, file]);
      return false;
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove: (file) => {
      setImageUpload((prev) => prev.filter((i) => i.name !== file.name || file.size !== file.size))
    },
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
            <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            {/* <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <option value="">Select a category</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="dairy">Dairy</option>
              <option value="meat">Meat</option>
            </select> */}
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

          <TwoColumnGroup>
            <InputGroup>
              <label>Store</label>
              <input
                type="text"
                value={formData.store}
                onChange={(e) => setFormData({ ...formData, store: e.target.value })}
                required
              />
            </InputGroup>
            <InputGroup>
              <label>Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </InputGroup>
          </TwoColumnGroup>

          <InputGroup>
            <label>Image</label>
            <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            {/* <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
            /> */}
          </InputGroup>

          <ButtonGroup>
            {
              error ? (<p>{error}</p>) : null
            }
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit" disabled={saving}>
              {saving ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
            </button>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </Overlay>
  );
}
