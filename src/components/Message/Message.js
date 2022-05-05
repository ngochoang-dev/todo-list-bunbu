import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './Message.module.css';

function Message({ message, success }) {
    const [show, setShow] = useState(false);


    useEffect(() => {
        setShow(true);
        const timer = setTimeout(() => setShow(false), 3000);
        return () => {
            clearTimeout(timer);
        }
    }, [message]);
    return (
        <div className={clsx(
            styles.container,
            show && styles.show,
            success && styles.success
        )
        }>
            {message}
        </div>
    )
}

export default Message