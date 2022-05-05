import React, { useState } from 'react';
import clsx from 'clsx';
import { IoMdTrash } from 'react-icons/io';

import styles from './Todo.module.css';

function Todo({ handleOpenModalDelete, todo, handleChangeCheckbox }) {
    const { title, is_finished, _id } = todo;
    const [value, setValue] = useState(title);
    const [show, setShow] = useState(false);

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleBlur = () => {
        setShow(false);
        handleChangeCheckbox({
            ...todo,
            title: value
        })
    }

    return (
        <div className={clsx(
            styles.container
        )}>
            <div className={clsx(
                styles.content,
                show && styles.line,
                is_finished && styles.active
            )} >
                <div className={clsx(
                    styles.wrapper_title
                )}>
                    <label className={clsx(
                        styles.wrapper_checkbox
                    )}>
                        <input type="checkbox"
                            checked={is_finished}
                            onChange={() => handleChangeCheckbox({
                                ...todo,
                                is_finished: !is_finished,
                            })}
                        />
                        <span className={clsx(
                            styles.checkbox
                        )}></span>
                        <span className={clsx(
                            styles.btn_check
                        )}></span>
                    </label>
                    {
                        !show
                            ?
                            <p onDoubleClick={() => setShow(true)} >{title} </p>
                            :
                            <input type="text" value={value}
                                ref={currRef => currRef ? currRef.focus() : ''}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                    }
                </div>
                <button onClick={() => handleOpenModalDelete(_id)}>
                    <IoMdTrash className={clsx(styles.icon_trash)} />
                </button>
            </div>
        </div>
    )
}

export default Todo;
