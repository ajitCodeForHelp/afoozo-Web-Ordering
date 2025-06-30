import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
        navigate("/login");
    } else {
        navigate("/home"); // Change to your actual home route
    }
  }, [navigate]);

  return null; // no UI
};

export default AuthGate;