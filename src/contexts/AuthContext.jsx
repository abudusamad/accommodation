import { createContext, useEffect, useState, useReducer } from "react";
import { auth } from "../lib/firebase";
export const AuthContext = createContext({});

export const AuthContextProvider = ({ children}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
    return () => unsubscribe();
  }, []);
   useEffect(() => {
			localStorage.setItem("user", JSON.stringify(state.user));
		}, [state.user]);


  return (
    <AuthContext.Provider value={ {currentUser, currentUseruser: state.user,
        loading: state.loading,
        error: state.error,
        dispatch, } }>
        
  
      {children}
    </AuthContext.Provider>
  );
};

  // if there is user                         // if no user present

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};



const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null, 
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS": 
      return {       
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};


 
  //saving user in local storage to user will not get logout automatically with page refresh.


// https://stackoverflow.com/questions/69917833/cannot-access-object-values-from-usecontext-using-usereducer-and-usecontext-for