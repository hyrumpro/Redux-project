import axios from 'axios'
import {getFavs, updateDB} from '../firebase'

let URL = "https://rickandmortyapi.com/api/character"


let initialData = {
	fetching: false,
	array: [],
	current: {},
    favorites: []
}


const GET_CHARACTERS = 'GET_CHARACTERS';
const GET_CHARACTERS_SUCCESS = 'GET_CHARACTERS_SUCCESS';
const GET_CHARACTERS_ERROR = 'GET_CHARACTERS_ERROR';
const REMOVE_CHARACTER = 'REMOVE_CHARACTER';
const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE';
const GET_FAVS = 'GET_FAVS';
const GET_FAVS_SUCCESS = 'GET_FAVS_SUCCESS';
const GET_FAVS_ERROR = 'GET_FAVS_ERROR';

export default function reducer(state= initialData, action){
   switch (action.type) {
    case 'GET_CHARACTERS':
      return {
        ...state,
        fetching: true,
      };
    case 'GET_CHARACTERS_SUCCESS':
      return {
        ...state,
        fetching: false,
        array: action.payload,
      };
    case 'GET_CHARACTERS_ERROR':
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    case 'ADD_TO_FAVORITE':
      return {
         ...state, ...action.payload,
      };
    case 'REMOVE_CHARACTER':
      return {
         ...state,
         array: action.payload,
      };
    case 'GET_FAVS':
      return {
         ...state,
          fetching: true,
        };
    case 'GET_FAVS_SUCCESS':
      return {
         ...state,
         favorites: action.payload,
      };
   case 'GET_FAVS_ERROR':
       return {
         ...state,
          fetching: false,
         error: action.payload,
            };
   default:
      return state;
  }
}


//Action (thunk)

export let getCharactersAction = () => {
	return (dispatch, getState) => {
		dispatch({
				type: GET_CHARACTERS
			})

		return axios.get(URL).then(res => {
			dispatch({
				type: GET_CHARACTERS_SUCCESS,
				payload: res.data.results
			})
			console.log('API Result:', res.data.results);
		}).catch(err => {
			console.log(err)
			dispatch({
				type: GET_CHARACTERS_ERROR,
				payload: err.response.message
			})
		})
	}
}



function persistData(store) {
    const userState = store.getState().user;
    const characterState = store.getState().characters;

    if (userState.loggedIn) {
        const data = {
            user: {
                uid: userState.uid,
                displayName: userState.displayName,
                email: userState.email,
                photoURL: userState.photoURL,
            },
            characters: {
                favorites: characterState.favorites,
            },
        };
        localStorage.setItem('userState', JSON.stringify(data));
    } else {
        localStorage.removeItem('userState');
    }
}


//Actions


export let addToFavorites = () => (dispatch, getState) => {
    let { array, favorites } = getState().characters
    let { uid } = getState().user
    let char = array.shift()
    favorites.push(char)

    updateDB(favorites, uid)
        .then(() => {
            dispatch({
                type: ADD_TO_FAVORITE,
                payload: { array: [...array], favorites: [...favorites] },
            });
            console.log(array);
            const store = getState().store;
            persistData(store);
        })
        .catch((error) => {
            console.error(error);
        });
};




export let removeCharacterAction = () => {
    return (dispatch, getState) => {
        let { array } = getState().characters
        array.shift()
        dispatch({
           type: REMOVE_CHARACTER,
            payload: [...array]
        })
    }
}

export let retrieveFavs = () => (dispatch, getState) => {
     dispatch({
         type: GET_FAVS
     })
    let { uid } = getState().user
    return getFavs(uid)
        .then(array => {
            dispatch({
                type: GET_FAVS_SUCCESS,
                payload: [...array]
            })
        })
        .catch(e => {
            console.log(e)
            dispatch({
                type: GET_FAVS_ERROR,
                payload: e.message
            })
        })
}






