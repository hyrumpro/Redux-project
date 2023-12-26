import React from 'react'
import styles from './login.module.css';

export function LoggedInComponent({ displayName, email, photoURL, doLogout }) {
    return (
        <div className={styles.container}>
            <h1>
                Bienvenido, {displayName}!
            </h1>
            <img src={photoURL} alt={displayName} />
            <p>Tu correo electrónico es: {email}</p>
            <button onClick={doLogout}>Cerrar Sesión</button>
        </div>
    );
}