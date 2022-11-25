import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { token, user, verifyAuth } = useAuth();

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (!user) {
        verifyAuth()
            .then(() => { return children })
            .catch((error) => console.log(error));
    }

    return children;
};

export default ProtectedRoute;