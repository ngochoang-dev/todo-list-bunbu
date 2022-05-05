import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { CgCloseR } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';

import styles from './ModalCreate.module.css';
import Message from '../Message/Message';
import { createTodo } from '../../redux/todos/actions';

function ModalCreate({ setShowModalCreate }) {
    const dispatch = useDispatch();
    const { loading, isCreated } = useSelector(state => state.todos);
    const [success, setSuccess] = useState(false);
    const [value, setValue] = useState('');
    const [errors, setErrors] = useState([]);
    const [toast, setToast] = useState(false);

    function validate() {
        const errors = [];
        if (!value) {
            errors.push("Please, enter a todo");
        }
        return errors;
    }

    const handleSubmit = () => {
        const errors = validate();
        if (errors.length > 0) {
            setErrors(errors);
            return;
        }
        setSuccess(false);
        dispatch(createTodo({
            title: value,
            is_finished: false,
        }));
    }

    const handleResponse = () => {
        setErrors(['Create todo success'])
        setSuccess(true)
    }

    useEffect(() => {
        !loading && setValue('')
        toast && handleResponse()
    }, [loading, isCreated]);

    useEffect(() => {
        setToast(isCreated)
    }, [isCreated])

    return (
        <div className={clsx(
            styles.overlay
        )}>
            {
                errors.length > 0 && <Message
                    key={Math.random()}
                    message={errors[0]}
                    success={success}
                />
            }
            <div className={clsx(
                styles.modal,
            )}>
                <span className={clsx(styles.btn_close)}
                    onClick={() => {
                        setToast(false)
                        setShowModalCreate(false)
                    }}>
                    <CgCloseR className={clsx(styles.icon_close)} />
                </span>
                <div className={clsx(
                    styles.form_gr
                )}>
                    <label>Create new todo :</label>
                    <input type="text"
                        ref={e => e ? e.focus() : null}
                        value={value}
                        onChange={e => {
                            setErrors([])
                            setValue(e.target.value)
                        }}
                    />
                </div>
                <button
                    className={clsx(
                        styles.btn_create
                    )}
                    onClick={handleSubmit}
                >
                    Create
                </button>
            </div>

        </div>
    )
}

export default ModalCreate