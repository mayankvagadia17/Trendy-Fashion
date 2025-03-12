import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RequireAuth = ({ children }) => {
    const { token } = useAuth();

    console.log("Fetch token:", token);

    return token ? children : <Navigate to="/" replace />;
};

export default RequireAuth;