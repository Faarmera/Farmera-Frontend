
// import React from "react";
import { useState, useEffect } from "react";
import axios from "axios"
import { ArrowRight, Leaf, Truck, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useCart } from '../context/CartContext';
import { useNavigate } from "react-router-dom";


// Styled Components
const HeroSection = styled.div`
  position: relative;
  text-align: left;
  color: white;

  margin-bottom: 20px;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;

    @media (min-width: 768px) {
      font-size: 3rem;
    }
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 2rem;

    @media (min-width: 768px) {
      font-size: 1.5rem;
      max-width: 40rem;
      margin: 0 auto;
    }
  }

  button {
    background-color: #007bff;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 1rem;

    &:hover {
      background-color: #0069d9;
    }

    a {
      display: flex;
      align-items: center;
    }

    svg {
      margin-left: 0.5rem;
    }
  }
`;

const HeroImage = styled.img`
position: absolute;  
width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: black;
  opacity: 0.4;
`;

const HeroContent = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding:  1rem;
  height: 100%;
  display: flex;
  align-items: left;
  color: white;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;

    @media (min-width: 768px) {
      font-size: 3rem;
    }
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 2rem;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }

  a {
    display: inline-flex;
    align-items: center;
    padding: 0.75rem 1.5rem;
    background-color: #16a34a;
    color: white;
    border-radius: 0.375rem;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:hover {
      background-color: #15803d;
    }

    .icon {
      margin-left: 0.5rem;
     
    }
  }
`;

const FeaturesSection = styled.div`
  background-color: white;
  padding: 4rem 0;
`;

const FeaturesWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled.div`
  background-color: #f0fdf4;
  border-radius: 0.375rem;
  padding: 1.5rem;
  text-align: center;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  .icon {
    color: #16a34a;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    color: #6b7280;
  }
`;

const FeaturedProductsSection = styled.div`
  background-color: #f9fafb;
  padding: 2rem 0;
  display: grid;
`;

const ProductsWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  h2 {
    display: block;
    font-size: 2rem;
    font-weight: bold;
    text-align: left;
    margin-bottom: 3rem;
  }

  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ProductCard = styled.div`
  /* background-color: white;
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
  } */
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
`;

const WelcomeSection = styled.div`
  margin-left: 6.4%;
  padding: 1rem;
  h1 {
    font-size: 18px;
    font-weight: 500;
    color: #16a34a;
  }

`;


// Component
export default function Home() {
  const features = [
    { icon: <Leaf className="icon" />, title: "Fresh Produce", description: "Direct from local farmers" },
    { icon: <Truck className="icon" />, title: "Fast Delivery", description: "Same-day delivery available" },
    { icon: <Shield className="icon" />, title: "Quality Guaranteed", description: "Satisfaction guaranteed" },
  ];


  const { state: authState } = useAuth();
  const [products, setProducts] = useState([]);


  const fetchProducts = async (queryParams) => {
    try {
      const response = await axios.get(`https://farmera-eyu3.onrender.com/api/v1/product/get/allProducts`, { params: queryParams },
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
        },
      );
      console.log(response.data);
      return setProducts(response.data.products);

    } catch (error) {
      console.error("Error fetching products:", error.response?.data || error.message);
      throw error;
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

    const { addToCart } = useCart();
  
    const handleAddToCart = async (productId) => {
      const success = await addToCart(productId, 1);
      if (success) {
        alert('Product added to cart successfully!');
      }
    };

  if (!authState.isAuthenticated) {
    return (
        <div>
        {/* Hero Section */}
        <HeroSection>
          <HeroImage
            src="https://www.ewg.org/sites/default/files/styles/wide_standard_xl/public/2023-10/RiceCropBlog.jpg?h=2e181f1f&itok=dgIuzrRT"
            alt="Fresh produce"
          />
          <Overlay />
          <HeroContent>
            <div>
              <h1>Fresh From Farm to Table</h1>
              <p>
                Discover the finest selection of fresh, locally sourced produce delivered right to your doorstep.
              </p>
              <Link to="/buyer-store">
                Shop Now
                <ArrowRight className="icon" />
              </Link>
            </div>
          </HeroContent>
        </HeroSection>

        {/* Features Section */}
        <FeaturesSection>
          <FeaturesWrapper>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                {feature.icon}
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </FeatureCard>
            ))}
          </FeaturesWrapper>
        </FeaturesSection>

        {/* Featured Products Section */}
        <FeaturedProductsSection>
          <h2 style={{textAlign: "center", padding: "1rem"}}>Featured Products</h2>
          <ProductsWrapper>
            {/* <div>
              <h2>Featured Products</h2>
            </div> */}
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
          </ProductsWrapper>
        </FeaturedProductsSection>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <HeroSection>
        <HeroImage
          src="https://www.ewg.org/sites/default/files/styles/wide_standard_xl/public/2023-10/RiceCropBlog.jpg?h=2e181f1f&itok=dgIuzrRT"
          alt="Fresh produce"
        />
        <Overlay />
        <HeroContent>
          <div>
            <h1>Fresh From Farm to Table</h1>
            <p>
              Discover the finest selection of fresh, locally sourced produce delivered right to your doorstep.
            </p>
            <Link to="/store">
              Shop Now
              <ArrowRight className="icon" />
            </Link>
          </div>
        </HeroContent>
      </HeroSection>

      <WelcomeSection>
          <h1>Welcome to Farmera, {authState.user?.firstname}!</h1>
      </WelcomeSection>

      {/* Features Section */}
      <FeaturesSection>
        <FeaturesWrapper>
          {features.map((feature, index) => (
            <FeatureCard key={index}>
              {feature.icon}
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </FeatureCard>
          ))}
        </FeaturesWrapper>
      </FeaturesSection>

      {/* Featured Products Section */}
      <FeaturedProductsSection>
      <h2 style={{textAlign: "center", padding: "1rem"}}>Featured Products</h2>
        <ProductsWrapper>
          {/* <h2>Featured Products</h2> */}
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
        </ProductsWrapper>
      </FeaturedProductsSection>
    </div>
  );
}
// import React from 'react';
// import { useState, useEffect } from "react";
// import styled from "styled-components";
// import axios from "axios";


// const App = () => {
//   const [products, setProducts] = useState([]);
//   const fetchProducts = async (queryParams) => {
//     try {
//       const response = await axios.get(`https://farmera-eyu3.onrender.com/api/v1/product/get/allProducts`, { params: queryParams },
//         {
//           headers: {
//             "Authorization": `Bearer ${localStorage.getItem("token")}`
//           },
//         },
//       );
      
      
//       console.log(response.data);
//       return setProducts(response.data.products);
//     } catch (error) {
//       console.error("Error fetching products:", error.response?.data || error.message);
//       throw error;
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <Div>
//       <h1>Home page</h1>
   
//                     <FeaturedProductsSection>
//                         <ProductWrapper>
//                             {products.map((product)=>(
//                             <ProductCard key={product._id}>
//                                 <img src={product.images} alt={product.imageIds} />
//                                 <div>
//                                     <h3>{product.name}</h3>
//                                     <h2>{product.description}</h2>
//                                     <h4>By {product.store} @ {product.location}</h4>
//                                     <p>₦{product.price}</p>
//                                     <button>
//                                         Add to Cart
//                                     </button>
//                                 </div>
//                             </ProductCard>
//                             ))}
//                         </ProductWrapper>
//                     </FeaturedProductsSection>
//     </Div>
//   );
// };

// export default App;

// const Div = styled.div`

// `
// const FeaturedProductsSection = styled.div`
  
// `
// const ProductWrapper = styled.div`
  
// `
// const ProductCard = styled.div`
  
// `

