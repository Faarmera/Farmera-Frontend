import React from 'react';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const ProductDetails = () => {
  const { id } = useParams();  // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://farmera-eyu3.onrender.com/api/v1/product/get/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Error fetching product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

    return (
        <ProductDetailsContainer>
            <h1>{product.name}</h1>
            <img src={product.images[0]} alt={product.name} />
            <p>{product.description}</p>
            <h3>Price: ₦ {product.price}</h3>
            <p>Store: {product.store}</p>
            <p>Location: {product.location}</p>
            <p>Category: {product.category}</p>
            <p>More details...</p>
        </ProductDetailsContainer>
    );
};

export default productDetails;



const ProductDetailsContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  img {
    width: 100%;
    max-width: 600px;
    height: auto;
    margin-bottom: 20px;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  h3 {
    color: green;
  }

  p {
    font-size: 1rem;
    margin-bottom: 10px;
  }
`;