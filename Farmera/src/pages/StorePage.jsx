import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import axios from "axios";

const StorePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    location: "",
    search: "",
  });

  const fetchProducts = async (queryParams) => {
    try {
      const response = await axios.get(`https://farmera-eyu3.onrender.com/api/v1/product/get/allProducts`, { params: queryParams });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
      throw error;
    }
  };

  const fetchAndSetProducts = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = { ...filters, page };
      const data = await fetchProducts(queryParams);
      setProducts(data.products);
      setPagination({ currentPage: data.currentPage, totalPages: data.totalPages });
    } catch (err) {
      setError(err.message || "An error occurred while fetching products.");
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchAndSetProducts();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handlePageChange = (page) => {
    fetchAndSetProducts(page);
  };

  return (
    <Div>
      <Route>
        <Link to="/">
          <p className="home">Home</p>
        </Link>
        <FaAngleRight style={{ color: "rgb(182,182,182)" }} />
        <p style={{ color: "rgb(182,182,182)" }}>All Categories</p>
      </Route>

      <FiltersContainer>
        <input type="text" name="category" placeholder="Category..." value={filters.category} onChange={handleFilterChange} />
        <input type="number" name="minPrice" placeholder="Min Price" value={filters.minPrice} onChange={handleFilterChange} />
        <input type="number" name="maxPrice" placeholder="Max Price" value={filters.maxPrice} onChange={handleFilterChange} />
        <input type="text" name="location" placeholder="Location..." value={filters.location} onChange={handleFilterChange} />
      </FiltersContainer>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <FeaturedProductsSection>
          <ProductWrapper>
            {products.map((product) => (
              <ProductCard key={product._id}>
                <img src={product.images} alt={product.imageIds} />
                <div>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <p id="location">By {product.store} @ {product.location}</p>
                  <h3>₦{product.price}</h3>
                  <button onClick={() => addToCart(product._id)}>Add to Cart</button>
                </div>
              </ProductCard>
            ))}
          </ProductWrapper>
        </FeaturedProductsSection>
      )}

      <Pagination>
        {Array.from({ length: pagination.totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)} disabled={pagination.currentPage === index + 1}>
            <p>{index + 1}</p>
          </button>
        ))}
      </Pagination>
    </Div>
  );
};

export default StorePage;


const Div = styled.div`
  
`

const Route = styled.div`
  display: flex;
  text-align: center;
  max-width: 1200px;
  margin: 0px auto;
  align-items: center;
  gap: 5px;
  margin-bottom: 1rem;
  margin-top: 1rem;
 .home {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  &:hover {
  background-color: #e5e7eb;
 }
}
`

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  max-width: 1200px;
  margin: 0px auto;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`

const FeaturedProductsSection = styled.div`
  background-color: #f9fafb;
  padding: 4rem 0;
  max-width: 1200px;
  margin: 0px auto;
`

const ProductWrapper = styled.div`
  max-width: 1200px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 50px;
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 5px;

  button{
    background-color: transparent;
    border: 1px solid black;
    width: 30px;
    height: 30px;
    border-radius: 3px;
    cursor: pointer;

    p{
      font-weight: 400;
    }
  &:hover {
    background-color: #16A34A;
  }
  }
`
const ProductCard = styled.div`
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

    h2{
      font-size: 15px;
      margin-bottom: 5px;
    }

    p {
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const StorePage = () => {
//   const [categories, setCategories] = useState([]); // For all categories
//   const [selectedCategory, setSelectedCategory] = useState(null); // For the selected category and its products
//   const [loading, setLoading] = useState(false); // To show loading state
//   const [error, setError] = useState(null); // For error handling

//   const allCategoriesUrl =
//     "https://farmera-eyu3.onrender.com/api/v1/category/get/allCategories";
//   const categoryByNameUrl =
//     "https://farmera-eyu3.onrender.com/api/v1/category/get/";

//   // Fetch all categories on mount
//   useEffect(() => {
//     const fetchCategories = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(allCategoriesUrl);
//         setCategories(response.data);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//         setError("Unable to load categories.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   // Fetch a single category by name
//   const handleCategoryClick = async (categoryName) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`${categoryByNameUrl}${categoryName}`);
//       setSelectedCategory(response.data);
//       setError(null);
//     } catch (err) {
//       console.error(`Error fetching category ${categoryName}:`, err);
//       setError("Unable to load category details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Reset view to show all categories
//   const handleBackClick = () => {
//     setSelectedCategory(null);
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1>Store</h1>

//       {/* Show loading spinner */}
//       {loading && <p>Loading...</p>}

//       {/* Show error message */}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* Display categories or products */}
//       {!loading && !error && (
//         <>
//           {!selectedCategory ? (
//             <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
//               {categories.map((category) => (
//                 <div
//                   key={category._id}
//                   style={{
//                     border: "1px solid #ddd",
//                     borderRadius: "8px",
//                     padding: "1rem",
//                     width: "200px",
//                     textAlign: "center",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => handleCategoryClick(category.name)}
//                 >
//                   <h3>{category.name}</h3>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div>
//               <button
//                 onClick={handleBackClick}
//                 style={{
//                   marginBottom: "1rem",
//                   padding: "0.5rem 1rem",
//                   backgroundColor: "#f0f0f0",
//                   border: "1px solid #ccc",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Back to Categories
//               </button>

//               <h2>{selectedCategory.name}</h2>
//               <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
//                 {selectedCategory.products.map((product) => (
//                   <div
//                     key={product._id}
//                     style={{
//                       border: "1px solid #ddd",
//                       borderRadius: "8px",
//                       padding: "1rem",
//                       width: "200px",
//                       textAlign: "center",
//                     }}
//                   >
//                     <h4>{product.name}</h4>
//                     <p>Category: {product.category.name}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default StorePage;

