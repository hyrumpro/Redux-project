import { LoginWithGoogle, LogoutWithGoogle } from '../firebase';
import { retrieveFavs } from "./charsDuck";


const initialData = {
  loggedIn: false,
  fetching: false,
};

const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';

const LOGOUT = 'LOGOUT';

export function userReducer(state = initialData, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        fetching: true,
        loggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        fetching: false,
        ...action.payload,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  }
}

//Auxiliar function

function saveStorage(storage) {
    localStorage.storage = JSON.stringify(storage);
    console.log(storage)
}




//Actions




export let restoreSession = () => dispatch => {
    let storage = localStorage.getItem('storage')
    storage = JSON.parse(storage)
    if(storage && storage.user) {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: storage.user
        })
    } else {
        localStorage.removeItem('storage');
    }
}





export function GoogleLoginAction() {
  return (dispatch, getState) => {
    dispatch({ type: LOGIN });
    return LoginWithGoogle()
        .then((user) => {
          dispatch({ type: LOGIN_SUCCESS,
            payload: {
             uid: user.uid,
             displayName: user.displayName,
             email: user.email,
             photoURL: user.photoURL,

            }
          });
          saveStorage(getState())
          retrieveFavs()(dispatch, getState)
        })
        .catch((error) => {
          dispatch({ type: LOGIN_ERROR, payload: error });
        });
  };
}


export function LogoutAction() {
    return (dispatch) => {
        dispatch({ type: LOGOUT });
        return LogoutWithGoogle()
            .then(() => {
                console.log('User logged out successfully');
                // Update any relevant state after successful logout

            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    };
}








