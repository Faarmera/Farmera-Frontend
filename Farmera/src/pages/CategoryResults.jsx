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
      <h1 style={{textAlign: "center"}}>{category.name}</h1>
      <ProductGrid>
        {category.products?.length > 0 ? (
          category.products.map((product) => (
            <ProductCard key={product._id}>
              <img src={product.image} alt={product.imageId} />
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

  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

const ProductGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
    margin: auto;
`;

const ProductCard = styled.div`
  width: 250px;
  background-color: white;
  padding: 10px;
  border-radius: 0.375rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    cursor: pointer;
  }

  img {
    width: 230px;
    height: 13rem;
    border-radius: 0.375rem;
    object-fit: cover;
  }

  div {
    padding: 1rem;

    h2{
      font-size: 15px;
      margin-bottom: 5px;
    }

    p {
      color: black;
      font-size: 12px;
    }

    h3{
        color: #16a34a;
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
