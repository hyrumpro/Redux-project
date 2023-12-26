import { createStore, combineReducers, applyMiddleware } from 'redux';
import { userReducer,  restoreSession } from './userDuck.js';
import  charsReducer  from './charsDuck.js';
import  { getCharactersAction }  from './charsDuck.js';
import thunk from 'redux-thunk';




let rootReducer = combineReducers({
  user: userReducer,
  characters: charsReducer
});

export default function generateStore(){
  let store = createStore(rootReducer, applyMiddleware(thunk));
  getCharactersAction()(store.dispatch, store.getState)
  restoreSession()(store.dispatch)
  return store;
}



