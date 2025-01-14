import React from "react";
import { useLocation } from "react-router-dom";
import { useCart } from '../context/CartContext';
import styled from "styled-components";

const SearchResults = () => {
  const location = useLocation();
  const results = location.state?.results || [];

  const { addToCart } = useCart();
  
  const handleAddToCart = async (productId) => {
    const success = await addToCart(productId);
    if (success) {
      alert('Product added to cart successfully!');
    }
  };

  return (
    
    <SearchResultsWrapper>
        <h1>Search Results</h1>
      {results.length > 0 ? (
        <div>
          {results.map((product) => (
            
            <ProductCard>
                <p key={product._id}></p>
                <img src={product.image} alt={product.imageId} />
                <div>
                    <h2>{product.name}</h2>  <br />
                    <p>{product.description}</p>
                    <p id="location">By {product.store} @ {product.location}</p>
                    <h3>₦ {product.price}</h3>
                    <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
                </div>

            </ProductCard>           
          ))}
        </div>
      ) : (
        <p id="noProducts">No products found.</p>
      )}
    </SearchResultsWrapper>
  );
};

export default SearchResults;

const SearchResultsWrapper = styled.div`
  padding-left: 300px;
  padding-right: 300px;
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;

  h1{
    text-align: center;
  }

  #noProducts{
    margin-top: 50px;
    font-size: 30px;
    font-weight: 500;
  }
`
const ProductCard = styled.div`
  width: 250px;
  margin-top: 50px;
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
`


