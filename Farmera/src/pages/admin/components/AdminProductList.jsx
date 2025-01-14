import React, { useState, useEffect } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import AdminProductForm from "./AdminProductForm";
import styled from "styled-components";
import axios from "axios";

// Styled Components
const Container = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.25rem;
    font-weight: bold;
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #16a34a;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #15803d;
    }
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  thead {
    tr {
      border-bottom: 1px solid #e5e7eb;
    }

    th {
      text-align: left;
      padding: 0.75rem 1rem;
      font-weight: bold;
      font-size: 0.875rem;
      color: #374151;
    }
  }

  tbody {
    tr {
      border-bottom: 1px solid #e5e7eb;

      &:last-child {
        border-bottom: none;
      }
    }

    td {
      padding: 0.75rem 1rem;
      font-size: 0.875rem;
      color: #4b5563;

      img {
        height: 2.5rem;
        width: 2.5rem;
        border-radius: 0.375rem;
        object-fit: cover;
      }

      span.status {
        display: inline-block;
        padding: 0.25rem 0.5rem;
        background-color: #d1fae5;
        color: #065f46;
        border-radius: 9999px;
        font-size: 0.75rem;
        font-weight: bold;
      }

      .actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;

        button {
          background: none;
          border: none;
          padding: 0.5rem;
          color: #6b7280;
          cursor: pointer;
          transition: color 0.3s;

          &:hover {
            color: #16a34a;
          }

          &.delete:hover {
            color: #dc2626;
          }
        }
      }
    }
  }
`;

export default function AdminProductList() {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null)

  const fetchProducts = async () => {
    setError(null)
    try {
      const response = await axios.get("https://farmera-eyu3.onrender.com/api/v1/product/myProducts",
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
        },
      );
      setProducts(response.data.products)
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response?.data?.error || "Unable to fetch products. Please try again later.")
      } else {
        setError(err.response?.data?.message) 
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
    console.log(product);
  };

  const handleDelete = async (productId) => {
    setError(null)
    try {
      const response = await axios.delete(`https://farmera-eyu3.onrender.com/api/v1/product/delete/${productId}`);
      console.log(`Deleted product with ID: ${productId}`);
      fetchProducts();

      if (response.status === 200) {
        alert("Product deleted successfully.")
      }
    } catch (err) {
      if (err.response?.data?.message) {
        alert(err.response?.data?.message)
      } else {
        setError("Unable to delete product. Please try again later.");
      }
    }
    
  };

  return (
    <Container>
      <Header>
        <h2>Your Products</h2>
        <button onClick={() => setShowForm(true)}>
          <Plus size={16} />
          <span>Add Product</span>
        </button>
      </Header>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          {
            error ? (<p>{error}</p>) : null
          }

          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <img src={product.image} alt={product.name} />
                    <span>{product.name}</span>
                  </div>
                </td>
                <td>₦{product.price}</td>
                <td>{product.qtyAvailable}</td>
                <td>
                  <span className="status">{product.qtyAvailable > 0 ? "In Stock" : "Out of Stock"}</span>
                </td>
                <td>
                  <div className="actions">
                    <button onClick={() => handleEdit(product)}>
                      <Pencil size={16} />
                    </button>
                    <button className="delete" onClick={() => handleDelete(product._id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>

      {showForm && <AdminProductForm onClose={() => {
        setShowForm(false)
        setEditingProduct(null)
        }} editingProduct={editingProduct} onSavedProduct={fetchProducts} showForm={showForm} />}
    </Container>
  );
}
