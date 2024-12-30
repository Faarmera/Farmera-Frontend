import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./styles/GlobalStyle";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";
import { ProtectedRoute } from "./pages/admin/ProtectedRoute/ProtectedRoute";

import Home from "./pages/Home";

import Faq from "./pages/faq";

import Contact from "./pages/Contact";

import About from "./pages/About";

import Store from "./pages/Store";

import SignIn from "./pages/SignIn";

import ForgotPassword from "./pages/ForgotPassword"

import CreateAccount from "./pages/CreateAccount";
import CartPage from "./components/cart/CartPage";
import Dashboard from "./pages/admin/Dashboard";

export default function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <Router>
      <GlobalStyles /> 
      <Navbar /> 
      <main>
        <Routes>
          <Route path="/" element={<Home />} /> Home Page     
         
          <Route path="/about" element={<About />} /> About Page

          <Route path="/help/faq" element={<Faq/>}/>
          <Route path="/help/contact" element={<Contact/>}/>
      
          <Route path="/signin" element={<SignIn />} /> Sign-In Page
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/signup" element={<CreateAccount />} />

          
          {/* PLEASE, BE MINDFUL OF THE CHANGES YOU MAKE HERE. IF NEED BE, INFORM OPEOLUWA OR SOMEONE WHO MADE AN EDIT YOU WISH TO CHANGE */}


          <Route path="/buyer-store" element={
            <ProtectedRoute>
            <Store />
            </ProtectedRoute>
            } />
          <Route path="/buyer-cart" element={
            
            <ProtectedRoute>
            <CartPage />
            </ProtectedRoute>
            
            } />

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
