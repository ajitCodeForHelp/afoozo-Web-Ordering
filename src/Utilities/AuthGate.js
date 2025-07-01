import React from "react";
import { Navigate } from "react-router-dom";

const AuthGate = ({ children }) => {
    const authKey = localStorage.getItem("secretKey");

    if (!authKey) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AuthGate;