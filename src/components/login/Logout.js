import React from 'react'
import styles from './login.module.css';

export function LoggedOutComponent({ doLogin }) {
    return (
        <div className={styles.container}>
            <h1>
                Inicia Sesión con Google
            </h1>
            <button onClick={doLogin} className={styles.container + ' ' + styles.button}>
                Iniciar
            </button>
        </div>
    );
}