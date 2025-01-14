import { useState, useEffect } from "react";
import { useCart } from '../context/CartContext';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StorePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
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

          console.error("Unauthorized access:", error);
        } else {
          console.error("Error fetching categories:", error);
        }
      });
  }, []);

  const handleCategoryClick = (categoryName) => {
    axios
      .get(`https://farmera-eyu3.onrender.com/api/v1/category/get/${categoryName}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setSelectedCategory(response.data);
        navigate("./CategoryResults", { state: { category: response.data } });
      })
      .catch((error) => {
        console.error(`Error fetching category ${categoryName}:`, error);
      });
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
      alert('Product added to cart successfully!');
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

      {/* <FiltersContainer>
        <input type="text" name="category" placeholder="Category..." value={filters.category} onChange={handleFilterChange} />
        <input type="number" name="minPrice" placeholder="Min Price" value={filters.minPrice} onChange={handleFilterChange} />
        <input type="number" name="maxPrice" placeholder="Max Price" value={filters.maxPrice} onChange={handleFilterChange} />
        <input type="text" name="location" placeholder="Location..." value={filters.location} onChange={handleFilterChange} />
      </FiltersContainer> */}

      {loading ? (
        <p style={{textAlign: "center"}}>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <FeaturedProductsSection>
          <div>
            {!selectedCategory ? (
              <CategoriesDiv>
                {categories.map((category) => (
                  <Categories
                    key={category._id} onClick={() => handleCategoryClick(category.name)}>
                    <h5>{category.name}</h5>
                  </Categories>
                ))}
              </CategoriesDiv>
            ) : (
              <CategoryDisplay>
                {/* <button onClick={() => setSelectedCategory(null)}>Back</button> */}
                <h2>{selectedCategory.name}</h2>
              </CategoryDisplay>
            )}
          </div>
          <ProductWrapper>
            {products.map((product) => (
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
  margin-top: 30px;
`

const Route = styled.div`
  display: flex;
  text-align: center;
  max-width: 1200px;
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

// const FiltersContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;
//   margin-bottom: 2rem;
//   max-width: 1200px;
//   margin: 0px auto;

//   @media (min-width: 640px) {
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//   }
// `

const CategoryDisplay = styled.div`
  
`

const CategoriesDiv = styled.div`
  margin-left: 60px;
  margin-bottom: 30px;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`

const Categories = styled.div`
  border: none;
  /* background-color: #94f0b6; */
  background-color: transparent;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #9bddb3;
    border: 1px solid black;
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
  gap: 30px;
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