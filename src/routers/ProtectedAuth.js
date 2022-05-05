import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { autoSignin } from '../redux/auth/actions';


function ProtectedAuth({ children }) {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.auth);
    const token = localStorage.getItem('token');
    useEffect(() => {
        token && dispatch(autoSignin())
    }, [token]);

    useEffect(() => {
        if (isAuthenticated) {
            return navigate("/dashboard", { replace: true });
        }
    }, [isAuthenticated]);


    return children
}

export default ProtectedAuth;
