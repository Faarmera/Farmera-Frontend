import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { ProtectedRoute } from "./pages/admin/ProtectedRoute/ProtectedRoute";
import SetUpAxiosInterceptors from "./utils/AxiosConfig";
import { GlobalStyles } from "./styles/GlobalStyle";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";


import Home from "./pages/Home";
import Faq from "./pages/faq";
import Contact from "./pages/Contact";
import StorePage from "./pages/StorePage"
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword"
import CreateAccount from "./pages/CreateAccount";
import CartPage from "./components/cart/CartPage";
import Dashboard from "./pages/admin/Dashboard";

export default function App() {

  useEffect(() => {

    SetUpAxiosInterceptors();

  }, []);

  return (
    <AuthProvider>
    <CartProvider>
      <Router>
      <GlobalStyles /> 
      <Navbar /> 
      <main>
        <Routes>
          <Route path="/" element={<Home />} /> Home Page
          <Route path="/store" element={<StorePage/>}/> Store Page
          <Route path="/about" element={<About />} /> About Page
          <Route path="/help/faq" element={<Faq/>}/>
          <Route path="/help/contact" element={<Contact/>}/>
          <Route path="/signin" element={<SignIn />} /> Sign-In Page
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/signup" element={<CreateAccount />} />
          <Route path="/buyer-store" element={<StorePage />} />
          <Route path="/buyer-cart" element={<CartPage />} />

          <Route path="/farmer-dashboard" element={
            
            <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute>
            
            } />

        </Routes>
  
      </main>
      <Footer /> 
      

    </Router>
      </CartProvider>
    </AuthProvider>

  );
}
