import React from "react";
import styled from "styled-components";

const ProductCard = ({ product, onAddToCart }) => (
  <Card>
    <img src={product.image} alt={product.name} />
    <div>
      <h3>{product.name}</h3>
      <p>₦{product.price}</p>
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  </Card>
);

export default ProductCard;

const Card = styled.div`
  
  img {
    width: 100%;
    height: 12rem;
    object-fit: cover;
  }

  div {
    padding: 1rem;

    h3 {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    p {
      color: #16a34a;
      font-weight: 500;
    }

    button {
      margin-top: 1rem;
      width: 100%;
      background-color: #16a34a;
      color: white;
      padding: 0.5rem;
      border-radius: 0.375rem;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: #15803d;
      }
    }
  }
`;
