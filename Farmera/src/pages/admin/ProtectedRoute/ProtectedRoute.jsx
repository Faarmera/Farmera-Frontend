// PLEASE, DO NOT CHANGE ANYTHING HERE UNLESS YOU INFORM OPEOLUWA

import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    
    if (userData?.type === "admin" && !location.pathname.startsWith('/farmer')) {
        return children;
    }

    if (userData?.type === "farmer" && location.pathname.startsWith('/farmer')) {
        return children;
    }

    if (userData?.type === "buyer" && location.pathname.startsWith('/buyer')) {
        return children;
    }

    if (userData?.type) {

        const routes = {
            admin: "/",
            farmer: "/farmer-dashboard",
            buyer: "/buyer-store"
        };

        return <Navigate to={routes[userData.type]} replace />;
    }

    return <Navigate to="/signin" replace />;

};