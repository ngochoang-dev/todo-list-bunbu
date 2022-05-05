import React from 'react';
import clsx from 'clsx';
import styles from './Header.module.css';

function Header({ handleLogout }) {
    return (
        <div className={clsx(
            styles.container
        )}>
            <div className={clsx(
                styles.wrapper
            )}>
                <div className={clsx(
                    styles.wrapper_logo
                )}>
                    <h1>Todo List</h1>
                </div>
                <div className={clsx(
                    styles.wrapper_options
                )}>
                    <ul>
                        <li>
                            No Name
                        </li>
                        <li onClick={handleLogout}>
                            Log Out
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header