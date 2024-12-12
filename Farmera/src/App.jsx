import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./styles/GlobalStyle";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";

import Home from "./pages/Home";

import Faq from "./pages/faq";

import Contact from "./pages/Contact";

import About from "./pages/About";

// import Store from "./pages/StorePage";

import SignIn from "./pages/SignIn";

import ForgotPassword from "./pages/ForgotPassword"

import CreateAccount from "./pages/CreateAccount";
// import Dashboard from "./pages/admin/Dashboard";
// import CartPage from "./components/cart/CartPage";
import StorePage from "./pages/StorePage";
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

          {/* <Route path="/store" element={<Store />} /> Store Page */}

          <Route path="/help/faq" element={<Faq/>}/>
          <Route path="/help/contact" element={<Contact/>}/>
      
          <Route path="/signin" element={<SignIn />} /> Sign-In Page
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="/signup" element={<CreateAccount />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/" element={<StorePage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
  
      </main>
      <Footer /> 
      

    </Router>
      </CartProvider>
    </AuthProvider>

  );
}
