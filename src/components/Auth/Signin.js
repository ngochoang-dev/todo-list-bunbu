import React, { useState } from 'react';
import clsx from 'clsx';
import {
    AiOutlineEye,
    AiOutlineEyeInvisible,
    AiFillGithub,
    AiFillMail
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch } from 'react-redux';

import styles from './Auth.module.css';
import Message from '../Message/Message';
import { signin } from '../../redux/auth/actions';

function Signin() {
    const dispatch = useDispatch();
    const [showPass, setShowPass] = useState(true);
    const [info, setInfo] = useState({
        username: '',
        password: '',
    });
    const [errors, setErrors] = useState([]);

    function validate() {
        const { username, password } = info;
        const errors = [];
        if (username.length < 5) {
            errors.push("Username should be at least 5 charcters long");
        }
        if (password.length < 3) {
            errors.push("Password should be at least 3 characters long");
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
        dispatch(signin(info))
    }


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
                <Link to='signup'>
                    Sign up
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
                    <h3>Welcome back!</h3>
                    <p>Signin to your account</p>
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
                </div>
                <div className={clsx(
                    styles.wrapper_actions
                )}>
                    <label className={clsx(
                        styles.wrapper_checkbox
                    )}>
                        <input type="checkbox"
                            defaultChecked
                        />
                        <span className={clsx(
                            styles.checkbox
                        )}></span>
                        <span className={clsx(
                            styles.btn_check
                        )}></span>
                        <p>Remember me</p>
                    </label>
                    <button onClick={handleSubmit}>
                        SIGN IN
                    </button>
                </div>
                <div className={clsx(
                    styles.wrapper_other_login
                )}>
                    <p>Connect with</p>
                    <span>
                        <AiFillGithub className={clsx(styles.icon_media)} />
                    </span>
                    <span>
                        <AiFillMail className={clsx(styles.icon_media)} />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Signin