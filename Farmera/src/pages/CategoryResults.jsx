import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useCart } from "../context/CartContext";

const CategoryResults = () => {
  const location = useLocation();
  const category = location.state?.category || {};
  const { addToCart } = useCart();

  const handleAddToCart = async (productId) => {
    const success = await addToCart(productId);
    if (success) {
      alert("Product added to cart successfully!");
    }
  };

  return (
    <CategoryResultsWrapper>
      <h1>{category.name}</h1>
      <ProductGrid>
        {category.products?.length > 0 ? (
          category.products.map((product) => (
            <ProductCard key={product._id}>
              <img src={product.images} alt={product.imageIds} />
              <div>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p id="location">By {product.store} @ {product.location}</p>
                <h3>₦ {product.price}</h3>
                <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
              </div>
            </ProductCard>
          ))
        ) : (
          <p>No products available in this category.</p>
        )}
      </ProductGrid>
    </CategoryResultsWrapper>
  );
};

export default CategoryResults;

const CategoryResultsWrapper = styled.div`
  padding: 50px 20px;
  text-align: center;

  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const ProductCard = styled.div`
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 4px;
  }

  div {
    margin-top: 10px;

    h2 {
      font-size: 1rem;
      margin-bottom: 5px;
    }

    p {
      font-size: 0.875rem;
      color: #555;
    }

    h3 {
      color: #16a34a;
      margin-top: 5px;
    }

    button {
      margin-top: 10px;
      width: 100%;
      padding: 10px;
      background-color: #16a34a;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #15803d;
      }
    }
  }
`;
