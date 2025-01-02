// import styled from "styled-components";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaAngleRight } from "react-icons/fa";
// import { useCart } from "../context/CartContext"; // Import CartContext hook

// const Store = () => {
//   const [products, setProducts] = useState([]);
//   const { addToCart } = useCart(); // Access addToCart from CartContext

//   const categories = ["All", "Vegetables", "Fruits", "jewelery", "men's clothing", "women's clothing"];
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [sortBy, setSortBy] = useState("featured");

//   const filteredProducts = products.filter(
//     (item) => selectedCategory === "All" || item.category === selectedCategory
//   );

//   const sortedProducts = [...filteredProducts].sort((a, b) => {
//     if (sortBy === "price-asc") return a.price - b.price;
//     if (sortBy === "price-desc") return b.price - a.price;
//     if (sortBy === "rating") return b.rating - a.rating;
//     return 0;
//   });

//   useEffect(() => {
//     const storeUrl = "https://fakestoreapi.com/products";

//     const fetchStore = () => {
//       fetch(storeUrl)
//         .then((response) => response.json())
//         .then((result) => {
//           console.log(result);
//           setProducts(result);
//         });
//     };
//     fetchStore();
//   }, []);

//   return (
//     <Div>
//       <Route>
//         <Link to="/">
//           <p className="home">Home</p>
//         </Link>
//         <FaAngleRight style={{ color: "rgb(182,182,182)" }} />
//         <p style={{ color: "rgb(182,182,182)" }}>All Categories</p>
//       </Route>

//       <FiltersContainer>
//         <CategoryButtons>
//           {categories.map((category) => (
//             <CategoryButton
//               key={category}
//               isActive={selectedCategory === category}
//               onClick={() => setSelectedCategory(category)}
//             >
//               {category}
//             </CategoryButton>
//           ))}
//         </CategoryButtons>

//         <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//           <option value="featured">Featured</option>
//           <option value="price-asc">Price: Low to High</option>
//           <option value="price-desc">Price: High to Low</option>
//           <option value="rating">Highest Rated</option>
//         </SortSelect>
//       </FiltersContainer>

//       <FeaturedProductsSection>
//         <ProductWrapper>
//           {sortedProducts.map((item) => (
//             <ProductCard key={item.id}>
//               <img src={item.image} alt={item.description} />
//               <div>
//                 <h3>{item.category}</h3>
//                 <p>₦{item.price}</p>
//                 <button onClick={() => addToCart(item)}>Add to Cart</button>
//               </div>
//             </ProductCard>
//           ))}
//         </ProductWrapper>
//       </FeaturedProductsSection>
//     </Div>
//   );
// };

// export default Store;

// // Styled Components
// const Div = styled.div``;

// const Route = styled.div`
//   display: flex;
//   text-align: center;
//   max-width: 1200px;
//   margin: 0px auto;
//   align-items: center;
//   gap: 5px;
//   margin-bottom: 1rem;
//   margin-top: 1rem;
//   .home {
//     padding: 0.5rem 1rem;
//     border-radius: 0.375rem;
//     &:hover {
//       background-color: #e5e7eb;
//     }
//   }
// `;

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
// `;

// const CategoryButton = styled.div`
//   padding: 0.5rem 1rem;
//   border-radius: 0.375rem;
//   background-color: ${({ isActive }) => (isActive ? "#16a34a" : "#f3f4f6")};
//   color: ${({ isActive }) => (isActive ? "#ffffff" : "#374151")};
//   border: none;
//   cursor: pointer;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: ${({ isActive }) => (isActive ? "#15803d" : "#e5e7eb")};
//   }
// `;

// const CategoryButtons = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 0.5rem;
// `;

// const SortSelect = styled.select`
//   padding: 0.5rem 1rem;
//   border-radius: 0.375rem;
//   background-color: #ffffff;
//   font-size: 1rem;
//   outline: none;
//   cursor: pointer;

//   &:focus {
//     border-color: #16a34a;
//     box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.4);
//   }
// `;

// const FeaturedProductsSection = styled.div`
//   background-color: #f9fafb;
//   padding: 4rem 0;
//   max-width: 1200px;
//   margin: 0px auto;
// `;

// const ProductWrapper = styled.div`
//   max-width: 1200px;
//   margin: 0 auto;
//   padding: 0 1rem;
//   display: grid;
//   grid-template-columns: 1fr;
//   gap: 2rem;
// `;

// const ProductCard = styled.div`
//   background-color: white;
//   border-radius: 0.375rem;
//   overflow: hidden;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//   transition: box-shadow 0.3s;

//   &:hover {
//     box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
//   }

//   img {
//     width: 100%;
//     height: 12rem;
//     object-fit: cover;
//   }

//   div {
//     padding: 1rem;

//     h3 {
//       font-size: 1rem;
//       font-weight: 600;
//       margin-bottom: 0.5rem;
//     }

//     p {
//       color: #16a34a;
//       font-weight: 500;
//     }

//     button {
//       margin-top: 1rem;
//       width: 100%;
//       background-color: #16a34a;
//       color: white;
//       padding: 0.5rem;
//       border-radius: 0.375rem;
//       border: none;
//       cursor: pointer;
//       transition: background-color 0.3s;

//       &:hover {
//         background-color: #15803d;
//       }
//     }
//   }
// `;


// import React, { useState, useEffect } from "react";
// import styled from "styled-components";
// import { Link } from "react-router-dom";
// import ProductCard from "../components/store/ProductCard";
// import { FaAngleRight } from "react-icons/fa";
// import { useCart } from "../context/CartContext";

// const StorePage = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
//   const [selectedLocation, setSelectedLocation] = useState("All");

//   const { addToCart } = useCart(); // Access addToCart from CartContext

//   const categories = ["All", "Vegetables", "Fruits", "jewelery", "men's clothing", "women's clothing"];
//   const locations = [
//     "All",
//     "Abia",
//     "Adamawa",
//     "Akwa Ibom",
//     "Anambra",
//     "Bauchi",
//     "Bayelsa",
//     "Benue",
//     "Borno",
//     "Cross River",
//     "Delta",
//     "Ebonyi",
//     "Edo",
//     "Ekiti",
//     "Enugu",
//     "FCT",
//     "Gombe",
//     "Imo",
//     "Jigawa",
//     "Kaduna",
//     "Kano",
//     "Katsina",
//     "Kebbi",
//     "Kogi",
//     "Kwara",
//     "Lagos",
//     "Nasarawa",
//     "Niger",
//     "Ogun",
//     "Ondo",
//     "Osun",
//     "Oyo",
//     "Plateau",
//     "Rivers",
//     "Sokoto",
//     "Taraba",
//     "Yobe",
//     "Zamfara",
//   ];

//   useEffect(() => {
//     // Fetch products from API
//     const fetchProducts = async () => {
//       const response = await fetch("https://fakestoreapi.com/products");
//       const data = await response.json();
//       setProducts(data);
//       setFilteredProducts(data); // Initially show all products
//     };

//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     // Filter products based on category, price range, and location
//     const filtered = products.filter((product) => {
//       const withinCategory = selectedCategory === "All" || product.category === selectedCategory;
//       const withinPrice = product.price >= priceRange.min && product.price <= priceRange.max;
//       const withinLocation = selectedLocation === "All"; // For future location logic

//       return withinCategory && withinPrice && withinLocation;
//     });

//     setFilteredProducts(filtered);
//   }, [products, selectedCategory, priceRange, selectedLocation]);

//   return (
//     <Container>
//       {/* Breadcrumbs */}
//       <Breadcrumb>
//         <Link to="/">Home</Link>
//         <FaAngleRight style={{ color: "rgb(182,182,182)" }} />
//         <span>Store</span>
//       </Breadcrumb>

//       {/* Filters */}
//       <Filters>
//         <CategoryFilter>
//           {categories.map((category) => (
//             <CategoryButton
//               key={category}
//               isActive={selectedCategory === category}
//               onClick={() => setSelectedCategory(category)}
//             >
//               {category}
//             </CategoryButton>
//           ))}
//         </CategoryFilter>

//         <PriceFilter>
//           <label>
//             Min Price:
//             <input
//               type="number"
//               value={priceRange.min}
//               onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
//             />
//           </label>
//           <label>
//             Max Price:
//             <input
//               type="number"
//               value={priceRange.max}
//               onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
//             />
//           </label>
//         </PriceFilter>

//         <LocationFilter>
//           <label>
//             Location:
//             <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
//               {locations.map((location) => (
//                 <option key={location} value={location}>
//                   {location}
//                 </option>
//               ))}
//             </select>
//           </label>
//         </LocationFilter>
//       </Filters>

//       {/* Products */}
//       <Products>
//         {filteredProducts.map((product) => (
//           <ProductCard key={product.id} product={product} onAddToCart={() => addToCart(product)} />
//         ))}
//       </Products>
//     </Container>
//   );
// };

// export default StorePage;

// const Container = styled.div`
//   padding: 2rem;
//   max-width: 1200px;
//   margin: 0 auto;
  
//   @media (min-width: 640px) {
//     grid-template-columns: repeat(2, 1fr);
//   }

//   @media (min-width: 1024px) {
//     grid-template-columns: repeat(4, 1fr);
// `;

// const Breadcrumb = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   margin-bottom: 1rem;

//   a {
//     text-decoration: none;
//     color: #16a34a;
//     font-weight: bold;
//   }

//   span {
//     color: rgb(182, 182, 182);
//   }
// `;

// const Filters = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   gap: 1.5rem;
//   margin-bottom: 2rem;
// `;

// const CategoryFilter = styled.div`
//   display: flex;
//   gap: 0.5rem;
// `;

// const CategoryButton = styled.button`
//   padding: 0.5rem 1rem;
//   border: none;
  
//   border-radius: 0.375rem;
//   background-color: ${({ isActive }) => (isActive ? "#16a34a" : "#f3f4f6")};
//   color: ${({ isActive }) => (isActive ? "#ffffff" : "#374151")};
//   cursor: pointer;
//   transition: background-color 0.3s;
//   height: 2.5rem;

//   &:hover {
//     background-color: ${({ isActive }) => (isActive ? "#15803d" : "#e5e7eb")};
//   }
// `;

// const PriceFilter = styled.div`
//   label {
//     display: flex;
//     flex-direction: column;
//     font-weight: bold;

//     input {
//       margin-top: 0.25rem;
//       padding: 0.5rem;
//       border: 1px solid #d1d5db;
//       border-radius: 0.375rem;
//       outline: none;

//       &:focus {
//         border-color: #16a34a;
//         box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.4);
//       }
//     }
//   }
// `;

// const LocationFilter = styled.div`
//   label {
//     display: flex;
//     flex-direction: column;
//     font-weight: bold;

//     select {
//       margin-top: 0.25rem;
//       padding: 0.5rem;
//       border: 1px solid #d1d5db;
//       border-radius: 0.375rem;
//       outline: none;

//       &:focus {
//         border-color: #16a34a;
//         box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.4);
//       }
//     }
//   }
// `;

// const Products = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//   gap: 1.5rem;
// `;












import { useState, useEffect } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa";
import axios from "axios"



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
    // const categories = ['All', 'Vegetables', 'Fruits', 'Cassava', "Cocoa", "women's clothing"];

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
                    <p className='home'>Home</p>
                </Link>
                <FaAngleRight style={{color: "rgb(182,182,182)"}}/>
                <p style={{color: "rgb(182,182,182)"}}>All Categories</p>
            </Route>

            {/* <CategoryButtons>
                {categories.map((category)=>(
                    <CategoryButton key={category}  value={filters.category} onClick={handleFilterChange}>
                        {category}
                    </CategoryButton>
                ))}
                </CategoryButtons> */}
        
            <FiltersContainer>
                <input type="text" name="search" placeholder="Search..." value={filters.search} onChange={handleFilterChange}/> 
                <input type="text" name="category" placeholder="Category..." value={filters.category} onChange={handleFilterChange}/>
                <input type="number" name="minPrice" placeholder="Min Price" value={filters.minPrice} onChange={handleFilterChange} />
                <input type="number" name="maxPrice" placeholder="Max Price" value={filters.maxPrice} onChange={handleFilterChange}/>
                <input type="text" name="location" placeholder="Location..." value={filters.location} onChange={handleFilterChange}/>
            </FiltersContainer>
    
        
            {loading ? (
            <p>Loading...</p>
            ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
            ) : (
                    <FeaturedProductsSection>
                        <ProductWrapper>
                            {products.map((product)=>(
                            <ProductCard key={product._id}>
                                <img src={product.images} alt={product.imageIds} />
                                <div>
                                    <h3>{product.name}</h3>
                                    <h3>Category: {product.category?.name || "N/A"}</h3>
                                    <h2>{product.description}</h2>
                                    <h4>By {product.store} @ {product.location}</h4>
                                    <p>₦{product.price}</p>
                                    <button>
                                        Add to Cart
                                    </button>
                                </div>
                            </ProductCard>
                            ))}
                        </ProductWrapper>
                    </FeaturedProductsSection>
                )
            }
    
    
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
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
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
  background-color: white;
  border-radius: 0.375rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

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
`
