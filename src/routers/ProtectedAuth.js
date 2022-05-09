import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { autoSignin } from '../redux/auth/actions';


function ProtectedAuth() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.auth);
    const token = localStorage.getItem('token');
    useEffect(() => {
        token && dispatch(autoSignin())
    }, [token, dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            return navigate("/dashboard", { replace: true });
        }
    }, [isAuthenticated]);

    if (isAuthenticated) return null;

    return <Outlet />
}

export default ProtectedAuth;
