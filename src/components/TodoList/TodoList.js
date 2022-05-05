import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';

import styles from './TodoList.module.css';
import Header from '../Header/Header';
import Todo from '../Todo/Todo';
import ModalCreate from '../ModalCreate/ModalCreate';
import Loading from '../Loading/Loading';
import {
    getTodoList,
    deleteTodo,
    updateTodo,
} from '../../redux/todos/actions';
import {
    logout
} from '../../redux/auth/actions';

const dayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
]

function TodoList() {
    const dispatch = useDispatch();
    const {
        todo,
        count,
        loading,
    } = useSelector(state => state.todos);
    const [idDelete, setIdDelete] = useState(null);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([])
    const [showModalCreate, setShowModalCreate] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const handleConfirmDelete = () => {
        dispatch(deleteTodo({
            idDelete,
            page,
        }))
    }

    const handleOpenModalDelete = (id) => {
        setIdDelete(id);
        setShowModalDelete(true);
    }

    const handleChangeCheckbox = (todo) => {
        dispatch(updateTodo({
            page,
            todo
        }))
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        dispatch(logout())
    }

    useEffect(() => {
        !loading && setShowModalDelete(false);
    }, [loading]);

    useEffect(() => {
        dispatch(getTodoList(page));
    }, [dispatch, page]);

    useEffect(() => {
        let number;
        let pages = [];
        if (count) {
            if ((count / 10) % 1 === 0) {
                number = Math.floor(count / 10);
            } else {
                number = Math.floor(count / 10) + 1;
            }
        }
        if (number) {
            for (let i = 0; i < number; i++) {
                pages.push(i + 1)
            }
            setPagination(pages)
        }
    }, [count]);


    return (
        <>
            <Header handleLogout={handleLogout} />
            {loading && <Loading />}
            <div className={clsx(
                styles.container
            )}>
                <div className={clsx(
                    styles.wrapper
                )}>
                    <div className={clsx(
                        styles.header
                    )}>
                        <div className={clsx(
                            styles.date_amount_task
                        )}>
                            <h4>
                                {dayOfWeek[dayjs().day()]},
                                {dayjs().format(' DD MMM')}
                            </h4>
                            <span>{count} tasks</span>
                        </div>
                        <div className={clsx(
                            styles.btn_create_task
                        )} onClick={() => setShowModalCreate(true)}>
                            <span>+</span>
                        </div>
                    </div>
                    {
                        todo.length > 0 && todo.map((todo, i) => {
                            return <Todo
                                key={i}
                                todo={todo}
                                handleChangeCheckbox={handleChangeCheckbox}
                                handleOpenModalDelete={handleOpenModalDelete}
                            />
                        })
                    }
                    <div className={clsx(
                        styles.pagination
                    )}>
                        <ul>
                            {
                                pagination.length > 0 && pagination.map((item, i) => {
                                    return <li
                                        key={i}
                                        className={clsx(
                                            item === page && styles.active
                                        )}
                                        onClick={() => setPage(item)}
                                    >{item}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
            {showModalCreate && <ModalCreate
                setShowModalCreate={setShowModalCreate}
            />}
            {
                showModalDelete && (
                    <div className={clsx(
                        styles.overlay_modal_delete
                    )}>
                        <div className={clsx(
                            styles.modal_confirm
                        )}>
                            <div className={clsx(
                                styles.modal_header
                            )}>
                                <h4>Delete todo</h4>
                            </div>
                            <div className={clsx(
                                styles.modal_body
                            )}>
                                <p>You definitely want to delete ?</p>
                            </div>
                            <div className={clsx(
                                styles.modal_footer
                            )}>
                                <button className={clsx(
                                    styles.btn_modal_cancle
                                )}
                                    onClick={() => {
                                        setShowModalDelete(false)
                                    }
                                    } >
                                    Cancel
                                </button>
                                <button className={clsx(
                                    styles.btn_modal_confirm
                                )}
                                    onClick={handleConfirmDelete}>
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default TodoList