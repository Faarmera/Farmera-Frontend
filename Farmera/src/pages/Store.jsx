// import styled from 'styled-components';
// import { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
// import { FaAngleRight } from "react-icons/fa";


// const Store = () => {
//     const [products,setProducts] = useState([]);

//     const categories = ['All', 'Vegetables', 'Fruits', 'jewelery', "men's clothing", "women's clothing"];
//     const [selectedCategory, setSelectedCategory] = useState('All');
//     const [sortBy, setSortBy] = useState('featured');

//     const filteredProducts = products.filter((item) => 
//       selectedCategory === 'All' || item.category === selectedCategory
//     );
 
//     const sortedProducts = [...filteredProducts].sort((a, b) => {
//         if (sortBy === 'price-asc') return a.price - b.price;
//         if (sortBy === 'price-desc') return b.price - a.price;
//         if (sortBy === 'rating') return b.rating - a.rating;
//         return 0;
//     });
    
      

//     useEffect (()=>{

//         const storeUrl = "https://fakestoreapi.com/products"

//         const fetchStore =()=>{
//             fetch(storeUrl)
//             .then ((response)=>response.json())
//             .then ((result)=>{
//                 console.log(result);
//                 setProducts(result)
//             })

//         }
//         fetchStore();
//     },[])

//     return (
//         <Div>
//             <Route>
//                 <Link to="/">
//                     <p className='home'>Home</p>
//                 </Link>
//                 <FaAngleRight style={{color: "rgb(182,182,182)"}}/>
//                 <p style={{color: "rgb(182,182,182)"}}>All Categories</p>
//             </Route>
        

//             <FiltersContainer>
//                 <CategoryButtons>
//                     {categories.map((category)=>(
//                         <CategoryButton key={category} isActive={selectedCategory === category} onClick={() => setSelectedCategory(category)}>
//                     {category}
//                   </CategoryButton>
//                 ))}
//               </CategoryButtons>

//               <Filter_search>
//                 <div>
//                 <FarmerState>
//                                         {/* <label htmlFor="">State</label> */}
//                                         <select name="" id="">
//                                             <option value="Select State" >Select State</option>
//                                             <option value="Abia">Abia</option>
//                                             <option value="Adamawa">Adamawa</option>
//                                             <option value="Akwa Ibom">Akwa Ibom</option>
//                                             <option value="Anambra">Anambra</option>
//                                             <option value="Bauchi">Bauchi</option>
//                                             <option value="Bayelsa">Bayelsa</option>
//                                             <option value="Benue">Benue</option>
//                                             <option value="Borno">Borno</option>
//                                             <option value="Cross River">Cross River</option>
//                                             <option value="Delta">Delta</option>
//                                             <option value="Ebonyi">Ebonyi</option>
//                                             <option value="Edo">Edo</option>
//                                             <option value="Ekiti">Ekiti</option>
//                                             <option value="Enugu">Enugu</option>
//                                             <option value="FCT">FCT</option>
//                                             <option value="Gombe">Gombe</option>
//                                             <option value="Imo">Imo</option>
//                                             <option value="Jigawa">Jigawa</option>
//                                             <option value="Kaduna">Kaduna</option>
//                                             <option value="Kano">Kano</option>
//                                             <option value="Katsina">Katsina</option>
//                                             <option value="Kebbi">Kebbi</option>
//                                             <option value="Kogi">Kogi</option>
//                                             <option value="Kwara">Kwara</option>
//                                             <option value="Lagos">Lagos</option>
//                                             <option value="Nasarawa">Nasarawa</option>
//                                             <option value="Niger">Niger</option>
//                                             <option value="Ogun">Ogun</option>
//                                             <option value="Ondo">Ondo</option>
//                                             <option value="Osun">Osun</option>
//                                             <option value="Oyo">Oyo</option>
//                                             <option value="Plateau">Plateau</option>
//                                             <option value="Rivers">Rivers</option>
//                                             <option value="Sokoto">Sokoto</option>
//                                             <option value="Taraba">Taraba</option>
//                                             <option value="Yobe">Yobe</option>
//                                             <option value="Zamfara">Zamfara</option>
//                                         </select>
//                                     </FarmerState>
//                 </div>
//                   <div>
//                       <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                      
//                         <option value="featured">Featured</option>
//                         <option value="price-asc">Price: Low to High</option>
//                         <option value="price-desc">Price: High to Low</option>
//                         <option value="rating">Highest Rated</option>
//                       </SortSelect>
//                   </div>
//               </Filter_search>
//             </FiltersContainer>

//             <FeaturedProductsSection>
//                 <ProductWrapper>
//                     {products.map((item)=>(
//                     <ProductCard key={item.capital}>
//                         <img src={item.image} alt={item.description} />
//                         <div>
//                             <h3>{item.category}</h3>
//                             <p>{item.price}</p>
//                             <button>
//                                 Add to Cart
//                             </button>
//                         </div>
//                     </ProductCard>
//                     ))}
//                 </ProductWrapper>
//             </FeaturedProductsSection>
//         </Div>
//     )
// };

// export default Store;

// const Div = styled.div`

// `

// const Route = styled.div`
//     display: flex;
//     text-align: center;
//     max-width: 1200px;
//     margin: 0px auto;
//     align-items: center;
//     gap: 5px;
//     margin-bottom: 1rem;
//     margin-top: 1rem;
//     .home{
//         padding: 0.5rem 1rem;
//         border-radius: 0.375rem;
//         &:hover{
//         background-color: #e5e7eb;
//         } 
//     }
// `
// const FiltersContainer = styled.div`
//     display: flex;
//     flex-direction: column;
//     gap: 1rem;
//     margin-bottom: 2rem;
//     max-width: 1200px;
//     margin: 0px auto;

//     @media (min-width: 640px) {
//         flex-direction: row;
//         justify-content: space-between;
//         align-items: center;
//     } 
// `
// const CategoryButton = styled.div`
//     padding: 0.5rem 1rem;
//     border-radius: 0.375rem;
//     background-color: ${({ isActive }) => (isActive ? "#16a34a" : "#f3f4f6")};
//     color: ${({ isActive }) => (isActive ? "#ffffff" : "#374151")};
//     border: none;
//     cursor: pointer;
//     transition: background-color 0.3s;

//     &:hover {
//         background-color: ${({ isActive }) => (isActive ? "#15803d" : "#e5e7eb")};
//     }    
// `
// const CategoryButtons = styled.div`
//     display: flex;
//     flex-wrap: wrap;
//     gap: 0.5rem;    
// `
// const Filter_search = styled.div`
//     display: flex;
//     gap: 1rem;
//     border: 1px dashed red;
// `
// const SortSelect = styled.select`
//     padding: 0.5rem 1rem;
//     border-radius: 0.375rem;
//     background-color: #ffffff;
//     font-size: 1rem;
//     outline: none;
//     cursor: pointer;

//     &:focus{
//         border-color: #16a34a;
//         box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.4);
//     }
// `
// const FarmerState = styled.div`
//     /* padding: 0.5rem 1rem; */
//     padding: 10px 0px;
//     border-radius: 0.375rem;
//     background-color: #ffffff;
//     font-size: 1rem;
//     outline: none;
//     cursor: pointer;

//     &:focus{
//         border-color: #16a34a;
//         box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.4);
//     }
// `
// const FeaturedProductsSection = styled.div`
//     background-color: #f9fafb;
//     padding: 4rem 0;
//     max-width: 1200px;
//     margin: 0px auto;
// `
// const ProductWrapper = styled.div`
//     max-width: 1200px;
//     margin: 0 auto;
//     padding: 0 1rem;
//     display: grid;
//     grid-template-columns: 1fr;
//     gap: 2rem;
//     h2{
//         font-size: 2rem;
//         font-weight: bold;
//         text-align: center;
//         margin-bottom: 3rem;
//     }

//     @media (min-width: 640px) {
//         grid-template-columns: repeat(2, 1fr);
//     }

//     @media (min-width: 1024px) {
//         grid-template-columns: repeat(4, 1fr);
//     }
// `
// const ProductCard = styled.div`
//     background-color: white;
//     border-radius: 0.375rem;
//     overflow: hidden;
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//     transition: box-shadow 0.3s;
//     cursor:pointer;
//     box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

//     &:hover {
//         box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
//      }
//     img {
//         width: 100%;
//         height: 12rem;
//         object-fit: cover;
//     }
//     div {
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
// }
    
    
// `

import { useState, useEffect } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa";
import axios from "axios"


// const Store = () => {
//     const [products,setProducts] = useState([]);

//     const categories = ['All', 'Vegetables', 'Fruits', 'jewelery', "men's clothing", "women's clothing"];
//     const [selectedCategory, setSelectedCategory] = useState('All');
//     const [sortBy, setSortBy] = useState('featured');

//     // const filteredProducts = products.filter((item) => 
//     //   selectedCategory === 'All' || item.category === selectedCategory
//     // );
 
//     // const sortedProducts = [...filteredProducts].sort((a, b) => {
//     //     if (sortBy === 'price-asc') return a.price - b.price;
//     //     if (sortBy === 'price-desc') return b.price - a.price;
//     //     if (sortBy === 'rating') return b.rating - a.rating;
//     //     return 0;
//     // });
    
      
//     useEffect(() => {
       
//         const fetchStore =()=>{
//             axios.get('https://farmera-eyu3.onrender.com/api/v1/product/get/allProducts')
//             .then((response) => {
//                 console.log(response.data.products);
//                 setProducts(response.data.products)
//             })
//             .catch(error => {console.log(error)})
//         };
//         fetchStore();
//     }, []);

//     return (
//         <Div>
//             <Route>
//                 <Link to="/">
//                     <p className='home'>Home</p>
//                 </Link>
//                 <FaAngleRight style={{color: "rgb(182,182,182)"}}/>
//                 <p style={{color: "rgb(182,182,182)"}}>All Categories</p>
//             </Route>
        

//             <FiltersContainer>
//                 <CategoryButtons>
//                     {categories.map((category)=>(
//                         <CategoryButton key={category} isActive={selectedCategory === category} onClick={() => setSelectedCategory(category)}>
//                             {category}
//                         </CategoryButton>
//                     ))}
//                 </CategoryButtons>

//                 <Filter_search>
//                     <div>
//                         <FarmerState>
//                             <select name="" id="">
//                                 <option value="Select State" >Select State</option>
//                                 <option value="Abia">Abia</option>
//                                 <option value="Adamawa">Adamawa</option>
//                                 <option value="Akwa Ibom">Akwa Ibom</option>
//                                 <option value="Anambra">Anambra</option>
//                                 <option value="Bauchi">Bauchi</option>
//                                 <option value="Bayelsa">Bayelsa</option>
//                                 <option value="Benue">Benue</option>
//                                 <option value="Borno">Borno</option>
//                                 <option value="Cross River">Cross River</option>
//                                 <option value="Delta">Delta</option>
//                                 <option value="Ebonyi">Ebonyi</option>
//                                 <option value="Edo">Edo</option>
//                                 <option value="Ekiti">Ekiti</option>
//                                 <option value="Enugu">Enugu</option>
//                                 <option value="FCT">FCT</option>
//                                 <option value="Gombe">Gombe</option>
//                                 <option value="Imo">Imo</option>
//                                 <option value="Jigawa">Jigawa</option>
//                                 <option value="Kaduna">Kaduna</option>
//                                 <option value="Kano">Kano</option>
//                                 <option value="Katsina">Katsina</option>
//                                 <option value="Kebbi">Kebbi</option>
//                                 <option value="Kogi">Kogi</option>
//                                 <option value="Kwara">Kwara</option>
//                                 <option value="Lagos">Lagos</option>
//                                 <option value="Nasarawa">Nasarawa</option>
//                                 <option value="Niger">Niger</option>
//                                 <option value="Ogun">Ogun</option>
//                                 <option value="Ondo">Ondo</option>
//                                 <option value="Osun">Osun</option>
//                                 <option value="Oyo">Oyo</option>
//                                 <option value="Plateau">Plateau</option>
//                                 <option value="Rivers">Rivers</option>
//                                 <option value="Sokoto">Sokoto</option>
//                                 <option value="Taraba">Taraba</option>
//                                 <option value="Yobe">Yobe</option>
//                                 <option value="Zamfara">Zamfara</option>
//                             </select>
//                         </FarmerState>
//                     </div>
//                     <div>
//                         <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>  
//                             <option value="featured">Featured</option>
//                             <option value="price-asc">Price: Low to High</option>
//                             <option value="price-desc">Price: High to Low</option>
//                             <option value="rating">Highest Rated</option>
//                         </SortSelect>
//                     </div>
//                 </Filter_search>
//             </FiltersContainer>

//             <FeaturedProductsSection>
//                 <ProductWrapper>
//                     {products.map((item)=>(
//                     <ProductCard key={item.capital}>
//                         <img src={item.products.image} alt={item.description} />
//                         <div>
//                             <h3>{item.category}</h3>
//                             <p>{item.price}</p>
//                             <button>
//                                 Add to Cart
//                             </button>
//                         </div>
//                     </ProductCard>
//                     ))}
//                 </ProductWrapper>
//             </FeaturedProductsSection>
//         </Div>
//     )
// };

// export default Store;

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
    .home{
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        &:hover{
        background-color: #e5e7eb;
        } 
    }
`
const FiltersContainer = styled.div`
    /* display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
    max-width: 1200px;
    margin: 0px auto;

    @media (min-width: 640px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }  */
`
const CategoryButton = styled.div`
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    background-color: ${({ isActive }) => (isActive ? "#16a34a" : "#f3f4f6")};
    color: ${({ isActive }) => (isActive ? "#ffffff" : "#374151")};
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({ isActive }) => (isActive ? "#15803d" : "#e5e7eb")};
    }    
`
const CategoryButtons = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;    
`
// const Filter_search = styled.div`
//     display: flex;
//     gap: 1rem;
//     border: 1px dashed red;
// `
// const SortSelect = styled.select`
//     padding: 0.5rem 1rem;
//     border-radius: 0.375rem;
//     background-color: #ffffff;
//     font-size: 1rem;
//     outline: none;
//     cursor: pointer;

//     &:focus{
//         border-color: #16a34a;
//         box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.4);
//     }
// `
// const FarmerState = styled.div`
//     /* padding: 0.5rem 1rem; */
//     padding: 10px 0px;
//     border-radius: 0.375rem;
//     background-color: #ffffff;
//     font-size: 1rem;
//     outline: none;
//     cursor: pointer;

//     &:focus{
//         border-color: #16a34a;
//         box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.4);
//     }
// `
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
    h2{
        font-size: 2rem;
        font-weight: bold;
        text-align: center;
        margin-bottom: 3rem;
    }

    @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
    }
`
const ProductCard = styled.div`
    background-color: white;
    border-radius: 0.375rem;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s;
    cursor:pointer;

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
    h2 {
        font-size: 1rem;
        font-weight: 400;
        text-align: left;
        margin: 0px;
        padding: 0px;
        margin-bottom: 0.5rem;
    }
    h4 {
        font-size: 1rem;
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
const Pagination = styled.div`
    text-align: center;
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;
    
    p {
        /* padding: 8px 16px; */
        padding: 0.6rem;
        border-radius: 0.375rem;
        border: 1px solid;
        font-size: 1rem;
        font-weight: 500;
        margin: 0 4px;
        /* &:active {
            background-color: #4CAF50;
            color: white;
            border-radius: 5px;
        } */
        &:hover{
            background-color: #4CAF50;
        }
    }


`



const Store = () => {
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
            const response = await axios.get("https://farmera-eyu3.onrender.com/api/v1/product/get/allProducts", { params: queryParams })
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
                                    {/* <h3>Category: {product.category?.name || "N/A"}</h3> */}
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

  
export default Store;