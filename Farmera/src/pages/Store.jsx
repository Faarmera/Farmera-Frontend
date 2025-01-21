import { useState, useEffect } from "react";
import { useCart } from '../context/CartContext';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    location: "",
    search: "",
  });

  const nigerianStates = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", 
    "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
    "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
    "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
  ];

  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const fetchProducts = async (queryParams) => {
    try {
      const response = await axios.get(`https://farmera-eyu3.onrender.com/api/v1/product/get/allProducts`, { params: queryParams });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
      throw error;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("https://farmera-eyu3.onrender.com/api/v1/category/get/allCategories" , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
      
    })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          
          setError("Unauthorized access. Please log in.");
        } else {
          setError("Error fetching categories. Please try again.");
        }
      });
  }, []);

  const fetchProductDetails = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://farmera-eyu3.onrender.com/api/v1/product/get/${id}`
      );
      setSelectedProduct(response.data); // Set the product details
      setShowProductModal(true); // Show the modal
    } catch (error) {
      console.error("Error fetching product details:", error.response?.data || error.message);
      setError("Failed to fetch product details.");
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (id) => {
    fetchProductDetails(id);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setFilters((prevFilters) => ({ ...prevFilters, category: categoryName }));
    fetchAndSetProducts();
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

  const { addToCart } = useCart();

  const handleAddToCart = async (productId) => {
    const success = await addToCart(productId, 1);
    if (success) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  useEffect(() => {
    fetchAndSetProducts();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "minPrice" && isNaN(value)) return;
    if (name === "maxPrice" && isNaN(value)) return;

    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };
  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      fetchAndSetProducts();
    }, 500);
  
    return () => clearTimeout(debounceFetch);
  }, [filters]);

  const handlePageChange = (page) => {
    fetchAndSetProducts(page);
  };

  return (
    <Div>
      <Toast visible={showToast}>Product added to cart successfully!</Toast>
      <Route>
        <Link to="/">
          <p className="home">Home</p>
        </Link>
        <FaAngleRight style={{ color: "rgb(182,182,182)" }} />
        <p style={{ color: "rgb(182,182,182)" }}>All Categories</p>
      </Route>

      <FiltersContainer>
        <div className="filter-item"> <FilterLabel htmlFor="minPrice">Min Price</FilterLabel> <input type="number" name="minPrice" placeholder="Min Price" value={filters.minPrice} onChange={handleFilterChange} /></div>
        <div className="filter-item"> <FilterLabel htmlFor="maxPrice">Max Price</FilterLabel><input type="number" name="maxPrice" placeholder="Max Price" value={filters.maxPrice} onChange={handleFilterChange} /></div>
        <div className="filter-item">
          <FilterLabel htmlFor="location">Location</FilterLabel>
          <LocationSelect name="location" value= {filters.location} onChange={handleFilterChange}>
            <option value="">Select Location (State)</option>
              {nigerianStates.map((state, index)=>(
                <option key= {index} value={state}>
                  {state}
                </option>
              ))}
          </LocationSelect>
        </div>
      </FiltersContainer> 

      {loading ? (
        <Spinner>
          <p style={{textAlign: "center"}}>Loading...</p>
        </Spinner>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <FeaturedProductsSection>
          <div>
              <CategoriesDiv>
                <Categories key="all-products" onClick={() => handleCategoryClick('')}>
                  <h5>All Products</h5>
                </Categories>
                {categories.map((category) => (
                  <Categories
                    key={category._id}  className={`category ${selectedCategory === category.name ? 'focused' : ''}`} onClick={() => handleCategoryClick(category.name)}>
                    <h5>{category.name}</h5>
                  </Categories>
                ))}
              </CategoriesDiv>
      
              {selectedCategory && (
              <CategoryDisplay>
                {/* <button onClick={() => setSelectedCategory(null)}>Back</button> */}
                {/* <h2>{selectedCategory}</h2> */}
              </CategoryDisplay>
            
            )}
          </div>
          <ProductWrapper>
            {products.length === 0 ? (
              <p>No products found matching your filters.</p>
            ) : (
            products.map((product) => (
              <ProductCard key={product._id}>
                <img src={product.images[0]} alt={product.imageIds[0]}/>
                <div onClick={() => handleProductClick(product._id)}>
                  <h2>{product.name}</h2>
                  <p>{product.description}</p>
                  <p id="location">By {product.store} @ {product.location}</p>
                  <h3>₦ {product.price}</h3>
                  <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
                </div>
              </ProductCard>
            ))
          )}
          </ProductWrapper>

          {/* For Farouq */}

          {showProductModal && selectedProduct && (
          <ProductModal>
            <ModalContent>
              <CloseButton onClick={closeProductModal}>×</CloseButton>
              <h2>{selectedProduct.name}</h2>
              <img src={selectedProduct.images[0]} alt={selectedProduct.name} />
              <p>{selectedProduct.description}</p>
              <h3>₦ {selectedProduct.price}</h3>
            </ModalContent>
          </ProductModal>
          )}

          {/* FOR FAROUQ */}
          {/* <button 
              onClick={fetchAndSetProducts} 
              style={{ backgroundColor: "#16A34A", color: "#fff", padding: "10px 20px", border: "none",
                borderRadius: "5px", cursor: "pointer", fontSize: "16px", marginBottom: "1rem"}}
            >
              All Products
            </button> */}
        </FeaturedProductsSection>
      )}

      <Pagination>
        {Array.from({ length: pagination.totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageChange(index + 1)} disabled={pagination.currentPage === index + 1}  
          style={{backgroundColor: pagination.currentPage === index + 1 ? "#16A34A" : "transparent" 
            ,
          }}>
            <p>{index + 1}</p>
          </button>
        ))}
      </Pagination>
    </Div>
  );
};

export default Store;


const Div = styled.div`
  margin-top: 30px;
`

const Route = styled.div`
  display: flex;
  text-align: center;
  max-width: 1090px;
  margin: 0px auto;
  align-items: center;
  gap: 5px;

  .home {
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
      &:hover {
      background-color: #e5e7eb;
    }
}
`

const CategoryDisplay = styled.div`
  
`

const ProductModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  max-width: 500px;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;
const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
  max-width: 1050px;
  margin: 0px auto;
  justify-content: center;
  align-items: center;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  input,
  select {
    padding: 0.75rem;
    font-size: 14px;
    border-radius: 0.375rem;
    border: 1px solid #d1d5db;
    width: 100%;
    max-width: 200px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #16a34a; 
      box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.3);
    }
    &::placeholder {
      color: #6b7280; 
      opacity: 1;
    }
  }

  select {
    background-color: #fff;
    cursor: pointer;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }

  .filter-label {
    font-weight: bold;
    font-size: 14px;
    color: #333;
  }

  .select-wrapper {
    width: 100%;
    max-width: 200px;
  }
`;

const CategoriesDiv = styled.div`
  /* margin-left: 60px; */
  margin: 0px auto;
  margin-top: 10px;
  max-width: 1100px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  display: flex;
  justify-content: space-around;
`


const LocationSelect = styled.select`
  padding: 0.5rem;
  font-size: 14px;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  width: 100%;
  max-width: 200px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #16a34a;
  }
`;

const FilterLabel = styled.label`
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

const Categories = styled.div`
  border: none;
  background-color: transparent;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  .focused {
  background-color: #cce7ff;
  border-color: #0066cc;
  transform: scale(1.1);
  box-shadow: 0 0 5px 2px rgba(0, 102, 204, 0.4);
  }

  &:hover {
    background-color: #16A34A;
    border: 1px solid black;
  }
`

const FeaturedProductsSection = styled.div`
  background-color: #f9fafb;
  /* padding: 4rem 0; */
  max-width: 1200px;
  margin: 0px auto;
  
`
const Spinner = styled.div`
  margin-top: 20px;
  margin: auto;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #16a34a;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
const Toast = styled.div`


position: fixed;  
  top: 20px;  
  right: 40%;
  width: fit-content;
  margin: 0px auto;
  text-align: center;
  background-color: #16a34a;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;



const ProductWrapper = styled.div`
  max-width: 1200px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 20px;
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 5px;
  padding: 1rem;
  margin-top: 0.5rem;

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

    h3{
      color: #16a34a;
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