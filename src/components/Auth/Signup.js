import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
    AiOutlineEye,
    AiOutlineEyeInvisible,
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowBack } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import styles from './Auth.module.css';
import Message from '../Message/Message';
import { signup } from '../../redux/auth/actions';

function Signup() {
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [showPass, setShowPass] = useState(true);
    const [showCfPass, setShowCfPass] = useState(true);
    const [info, setInfo] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState([]);
    const { isSignup } = useSelector(state => state.auth);

    function validate() {
        const { username, password, confirmPassword } = info;
        const errors = [];
        if (username.length < 5) {
            errors.push("Username should be at least 5 charcters long");
        }
        if (password.length < 3) {
            errors.push("Password should be at least 3 characters long");
        }

        if (password !== confirmPassword) {
            errors.push("Password and confirmation password do not match");
        }

        return errors;
    }

    const handleChange = (e) => {
        setErrors([])
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        // check valid
        const errors = validate();
        if (errors.length > 0) {
            setErrors(errors);
            return;
        }

        dispatch(signup({
            username: info.username,
            password: info.password,
        }))
    }

    useEffect(() => {
        isSignup && navigate("/", { replace: true });
    }, [isSignup])
    return (
        <div className={clsx(
            styles.container
        )}>
            {
                errors.length > 0 && <Message
                    key={Math.random()}
                    message={errors[0]}
                />
            }
            <div className={clsx(
                styles.control
            )}>
                <Link to='/'>
                    Sign in
                </Link>
            </div>
            <div className={clsx(
                styles.wrapper_form
            )}>
                <div className={clsx(
                    styles.header
                )}>
                    <div className={clsx(
                        styles.avatar
                    )}>
                        <img src="https://joeschmoe.io/api/v1/random" alt="avatar" />
                    </div>
                    <h3>Hello there!</h3>
                    <p>Easy account creation</p>
                </div>
                <div className={clsx(
                    styles.form
                )}>
                    <div className={clsx(
                        styles.form_group
                    )}>
                        <input type="text"
                            id='username' name='username'
                            placeholder=" " autoComplete='off'
                            value={info.username}
                            onChange={handleChange}
                        />
                        <label className={clsx(styles.label)} htmlFor="username">Name</label>
                    </div>
                    <div className={clsx(
                        styles.form_group
                    )}>
                        <input type={showPass ? 'password' : 'text'}
                            id='password' name='password'
                            placeholder=" " autoComplete='off'
                            value={info.password}
                            onChange={handleChange}
                        />
                        <label className={clsx(styles.label)} htmlFor="password">Password</label>
                        {
                            showPass ? (
                                <span onClick={() => setShowPass(!showPass)}>
                                    <AiOutlineEyeInvisible />
                                </span>
                            ) : (
                                <span onClick={() => setShowPass(!showPass)}>
                                    <AiOutlineEye />
                                </span>
                            )
                        }
                    </div>
                    <div className={clsx(
                        styles.form_group
                    )}>
                        <input type={showCfPass ? 'password' : 'text'}
                            id='confirmPassword' name='confirmPassword'
                            placeholder=" " autoComplete='off'
                            value={info.confirmPassword}
                            onChange={handleChange}
                        />
                        <label className={clsx(styles.label)} htmlFor="confirmPassword">Confirm password</label>
                        {
                            showCfPass ? (
                                <span onClick={() => setShowCfPass(!showCfPass)}>
                                    <AiOutlineEyeInvisible />
                                </span>
                            ) : (
                                <span onClick={() => setShowCfPass(!showCfPass)}>
                                    <AiOutlineEye />
                                </span>
                            )
                        }
                    </div>
                </div>
                <div className={clsx(
                    styles.wrapper_actions,
                    styles.wrapper_actions_signup)}>
                    <button onClick={handleSubmit}>
                        SIGN UP
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Signup