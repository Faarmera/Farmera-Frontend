import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { ProtectedRoute } from "./pages/admin/ProtectedRoute/ProtectedRoute";
import SetUpAxiosInterceptors from "./utils/AxiosConfig";
import { GlobalStyles } from "./styles/GlobalStyle";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";



import BasicNavbar from "./components/Navbar/Basic-Navbar";
import AdminNavbar from "./components/Navbar/Admin-Navbar"
import BuyerNavbar from "./components/Navbar/Buyer-Navbar";
import FarmerNavbar from "./components/Navbar/Farmer-Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Faq from "./pages/faq";
import Contact from "./pages/Contact";
import Store from "./pages/Store"
import About from "./pages/About";
import Cart from "./pages/Cart"
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword"
import CreateAccount from "./pages/CreateAccount";
import Dashboard from "./pages/admin/Dashboard";
import SearchResults from "./components/SearchResults";
import CategoryResults from "./pages/CategoryResults";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import VerifyEmail from "./pages/VerifyEmail";
import CheckEmail from "./pages/CheckEmail"
import EmailVerification from "./pages/EmailVerification";
import OrderSuccess from "./pages/OrderSuccess";
<<<<<<< Updated upstream

// import ProductDetail from './pages/ProductDetail'

=======
>>>>>>> Stashed changes

export default function App() {

  useEffect(() => {

    SetUpAxiosInterceptors();

  }, []);


  return (
    <CartProvider>
    <AuthProvider>
        <Router>
      <GlobalStyles /> 
      <NavbarRender />
      <main>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/searchResults" element={<SearchResults/>}/> 
          <Route path="/buyer-store/CategoryResults" element={<CategoryResults/>}/>
          <Route path="/about" element={<About />} /> 
          <Route path="/help/faq" element={<Faq/>}/>
          <Route path="/help/contact" element={<Contact/>}/>
          <Route path="/verify-email" element={<VerifyEmail/>}/>
<<<<<<< Updated upstream
          <Route path="/check-email" element={<CheckEmail/>}/>
          <Route path="/verify/${userId}/${uniqueString}" element={<EmailVerification/>}/>
=======
>>>>>>> Stashed changes
          <Route path="/verify/:userId/:uniqueString" element={<EmailVerification/>}/>
          <Route path="/signin" element={<SignIn />} /> Sign-In Page
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/buyer-store" element={<Store />} />
          <Route path="/buyer-cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/payment" element={<Payment/>}/>
<<<<<<< Updated upstream

          {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
=======
>>>>>>> Stashed changes
          <Route path="/order-success" element={<OrderSuccess/>}/>
          <Route path="/farmer-dashboard" element={
            
            <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute>
            
            } />

        </Routes>
  
      </main>
      <Footer /> 

    </Router>
      
    </AuthProvider>
    </CartProvider>

  );
}


const NavbarRender = () => {
  const { state } = useAuth();
  const user = state.user

  if (!state.isAuthenticated) return <BasicNavbar />;
  switch (user.type) {
    case 'admin': return <AdminNavbar />;
    case 'buyer': return <BuyerNavbar />;
    case 'farmer': return <FarmerNavbar />;
    default: return <BasicNavbar />;
  }
};