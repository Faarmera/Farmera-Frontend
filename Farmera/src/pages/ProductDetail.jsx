// import React from 'react';
// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import styled from "styled-components";
// // import { Link, useNavigate } from "react-router-dom";




// const productDetail = () => {
//   const { id } = useParams();  // Get the product ID from the URL
//   const [product, setProduct] = useState(null);
// //   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [relatedProducts, setRelatedProducts] = useState([]);
//   const navigate = useNavigate();

//   const fetchProductDetails = async () => {
//     try {
//       const response = await axios.get(`https://farmera-eyu3.onrender.com/api/v1/product/get/${id}`);
//       setProduct(response.data.products);
//     } catch (err) {
//       setError("Error fetching product details.");
//     }
//   };
//   const fetchRelatedProducts = async (category) => {
//     try {
//       const response = await axios.get(`https://farmera-eyu3.onrender.com/api/v1/product/get/relatedProducts`, {
//         params: { category },
//       });
//       setRelatedProducts(response.data.products);
//     } catch (err) {
//       setError("Error fetching related products.");
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       fetchProductDetails();
//     }
//   }, [id]);

//   useEffect(() => {
//     if (product) {
//       fetchRelatedProducts(product.category);
//     }
//   }, [product]);

//     return (
//         <Div>
//               {error && <p style={{ color: "red" }}>{error}</p>}
//       {product ? (
//         <ProductDetailWrapper>
//           <h1>{product.name}</h1>
//           <img src={product.images[0]} alt={product.name} />
//           <p>{product.description}</p>
//           <h3>₦ {product.price}</h3>
//           <button>Add to Cart</button>

//           <RelatedProductsSection>
//             <h2>Related Products</h2>
//             <ProductWrapper>
//               {relatedProducts.map((relatedProduct) => (
//                 <ProductCard key={relatedProduct._id} onClick={() => navigate(`/product/${relatedProduct._id}`)}>
//                   <img src={relatedProduct.images[0]} alt={relatedProduct.name} />
//                   <h3>{relatedProduct.name}</h3>
//                   <p>{relatedProduct.description}</p>
//                   <h4>₦ {relatedProduct.price}</h4>
//                 </ProductCard>
//               ))}
//             </ProductWrapper>
//           </RelatedProductsSection>
//         </ProductDetailWrapper>
//       ) : (
//         <p>Loading...</p>
//       )}
//         </Div>
//     );
// };

// export default productDetail;



// const Div = styled.div`
//   margin: 2rem;
// `;

// const ProductDetailWrapper = styled.div`
//   text-align: center;
//   h1 {
//     font-size: 2rem;
//     margin-bottom: 1rem;
//   }
//   img {
//     width: 100%;
//     max-width: 400px;
//     height: auto;
//     border-radius: 8px;
//     margin-bottom: 1rem;
//   }
//   button {
//     background-color: #16a34a;
//     color: white;
//     padding: 1rem;
//     border-radius: 8px;
//     cursor: pointer;
//     border: none;
//     &:hover {
//       background-color: #15803d;
//     }
//   }
// `;

// const RelatedProductsSection = styled.div`
//   margin-top: 3rem;
//   h2 {
//     font-size: 1.5rem;
//     margin-bottom: 1rem;
//   }
// `;

// const ProductWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   flex-wrap: wrap;
//   gap: 20px;
// `;

// const ProductCard = styled.div`
//   width: 250px;
//   background-color: white;
//   padding: 10px;
//   border-radius: 0.375rem;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   cursor: pointer;
//   img {
//     width: 230px;
//     height: 150px;
//     border-radius: 0.375rem;
//     object-fit: cover;
//   }
//   h3 {
//     font-size: 1rem;
//     margin-top: 0.5rem;
//   }
//   h4 {
//     color: #16a34a;
//   }
//   p {
//     color: #333;
//     font-size: 0.875rem;
//   }
//   &:hover {
//     box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
//   }
// `;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch the product details
  const fetchProductDetails = async () => {
    try {
      console.log("Fetching product details for id:", id); // Debugging line
      const response = await axios.get(`https://farmera-eyu3.onrender.com/api/v1/product/get/${id}`);
      // axios.get(`https://farmera-eyu3.onrender.com/api/v1/product/get/${id}`, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      // });
      
      setProduct(response.data.product);
      setLoading(false); // Product details fetched, stop loading
    } catch (err) {
      setError("Error fetching product details.");
      console.error("Error fetching product:", err); // Debugging line
      setLoading(false); // Stop loading even if there's an error
    }
  };

  // Fetch related products based on category
  const fetchRelatedProducts = async (category) => {
    try {
      console.log("Fetching related products for category:", category); // Debugging line
      const response = await axios.get(`https://farmera-eyu3.onrender.com/api/v1/product/get/relatedProducts`, {
        params: { category },
      });
      setRelatedProducts(response.data.products);
    } catch (err) {
      setError("Error fetching related products.");
      console.error("Error fetching related products:", err); // Debugging line
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      fetchRelatedProducts(product.category);
    }
  }, [product]);

  return (
    <Div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : product ? (
        <ProductDetailWrapper>
          <h1>{product.name}</h1>
          <img src={product.images[0]} alt={product.name} />
          <p>{product.description}</p>
          <h3>₦ {product.price}</h3>
          <button>Add to Cart</button>

          <RelatedProductsSection>
            <h2>Related Products</h2>
            <ProductWrapper>
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct._id} onClick={() => navigate(`/product/${relatedProduct._id}`)}>
                  <img src={relatedProduct.images[0]} alt={relatedProduct.name} />
                  <h3>{relatedProduct.name}</h3>
                  <p>{relatedProduct.description}</p>
                  <h4>₦ {relatedProduct.price}</h4>
                </ProductCard>
              ))}
            </ProductWrapper>
          </RelatedProductsSection>
        </ProductDetailWrapper>
      ) : (
        <p>No product found with the given ID.</p> // In case the product doesn't exist
      )}
    </Div>
  );
};

export default ProductDetail;

const Div = styled.div`
  margin: 2rem;
`;

const ProductDetailWrapper = styled.div`
  text-align: center;
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  img {
    width: 100%;
    max-width: 400px;
    height: auto;
    border-radius: 8px;
    margin-bottom: 1rem;
  }
  button {
    background-color: #16a34a;
    color: white;
    padding: 1rem;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    &:hover {
      background-color: #15803d;
    }
  }
`;

const RelatedProductsSection = styled.div`
  margin-top: 3rem;
  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const ProductWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const ProductCard = styled.div`
  width: 250px;
  background-color: white;
  padding: 10px;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  img {
    width: 230px;
    height: 150px;
    border-radius: 0.375rem;
    object-fit: cover;
  }
  h3 {
    font-size: 1rem;
    margin-top: 0.5rem;
  }
  h4 {
    color: #16a34a;
  }
  p {
    color: #333;
    font-size: 0.875rem;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;
