import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


function ProtectedRoute({ children }) {
    let navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
        if (!isAuthenticated) {
            return navigate("/", { replace: true });
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) return null;

    return children
}


export default ProtectedRoute