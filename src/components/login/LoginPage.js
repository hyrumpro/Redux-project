import React from 'react'
import styles from './login.module.css'
import { LoggedInComponent } from './LogedIn';
import { LoggedOutComponent } from './Logout';
import { connect } from 'react-redux';
import { GoogleLoginAction, LogoutAction } from '../../redux/userDuck'



function LoginPage({  GoogleLoginAction, LogoutAction, fetching, loggedIn, displayName, email, photoURL, error }) {

    function doLogin() {
        GoogleLoginAction()
    }

    function doLogout() {
        LogoutAction()
    }



    if (fetching) {
        return <h2>Cargando ...</h2>;
    } else if (loggedIn) {
        return (
            <LoggedInComponent
                displayName={displayName}
                email={email}
                photoURL={photoURL}
                doLogout={LogoutAction}
            />
        );
    } else if (!loggedIn) {
        return <LoggedOutComponent doLogin={GoogleLoginAction} />;
    } else if (error) {
        return (
            <div className={styles.container}>
                <h1>Error, Try again</h1>
                <button onClick={doLogin} >Iniciar</button>
            </div>
        );
    }
}


const mapState = ({ user: { fetching, uid, displayName, email, photoURL, error, loggedIn } }) => {
    return {
      fetching, uid, displayName, email, photoURL, error, loggedIn
    };
};


export default connect(mapState, { GoogleLoginAction, LogoutAction })(LoginPage);