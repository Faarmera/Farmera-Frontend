import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const SearchResults = () => {
  const location = useLocation();
  const results = location.state?.results || [];

  const addToCart = async (productId) => {
    try {
      const response = await axios.post(
        "https://farmera-eyu3.onrender.com/api/v1/cart/add",
        { products: [{ productId, quantity: 1 }] },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
          },
        }
      );
      alert("Product added to cart successfully!");
      console.log("Add to Cart Response:", response.data);
    } catch (error) {
      console.error("Error adding product to cart:", error.response?.data || error.message);
      alert(error.response?.data?.error || "An error occurred while adding to cart.");
    }
  };

  return (
    <SearchResultsWrapper>
      <h1>Search Results</h1>
      {results.length > 0 ? (
        <ul>
          {results.map((product) => (
            
            <ProductCard>
                <li key={product._id}></li>
                <img src={product.images} alt={product.imageIds} />
                <div>
                <h2>{product.name}</h2>  <br />
                <p>{product.description}</p>
                  <p id="location">By {product.store} @ {product.location}</p>
                  <h3>₦{product.price}</h3>
                  <button onClick={() => addToCart(product._id)}>Add to Cart</button>
                </div>

            </ProductCard>           
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </SearchResultsWrapper>
  );
};

export default SearchResults;

const SearchResultsWrapper = styled.div`
  max-width: 1200px;
  margin-top: 50px;
  margin-bottom: 50px;
  /* margin: 0 auto; */
  padding-left: 25px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  h1{
    text-align: center;
  }
`
const ProductCard = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 250px;
  background-color: white;
  padding: 10px;
  border-radius: 0.375rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    transform: scale(1.1);
  }

  img {
    width: 230px;
    height: 13rem;
    border-radius: 0.375rem;
    object-fit: cover;
  }

  div {
    padding: 1rem;

    h3 {
      /* font-size: 1rem; */
      /* font-weight: 600; */
      /* margin-bottom: 30px; */
    }

    p {
      /* color: #16a34a; */
      color: black;
      font-size: 12px;
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

