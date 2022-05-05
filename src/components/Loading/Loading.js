import React from 'react';
import clsx from 'clsx';

import styles from './Loading.module.css';

function Loading() {
    return (
        <div className={clsx(
            styles.container
        )}>
            <svg viewBox="25 25 50 50">
                <circle cx="50" cy="50" r="20"></circle>
            </svg>
        </div>
    )
}

export default Loading