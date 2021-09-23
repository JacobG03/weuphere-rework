import React, { 
  createContext, 
  useState, 
  useEffect, 
  useCallback,
  useMemo,
} from "react";
import postData from "../services/postData";


const UserContext = createContext();

// Returns either user: null OR user: 'image', etc.
const fetchUser = () => {
  var user = null;
  postData(`${window.location.origin}/api/user`, {})
    .then(result => {
      user = result.user
    })
  return user
  };

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(fetchUser());


  const update = useCallback((data) => {
    setUser(data)
  }, [])

  // returns boolean value
  const signout = useCallback(() => {
    postData(`${window.location.origin}/api/user/logout`, {})
    .then(result => {
      if(result.success) {
        setUser(null)
        console.log('User logged out')
      } else {
        // Notify error
        console.log('Logout Error')
      }
    })
  }, []);
  
  // Updates user value from server response
  const refresh = useCallback(() => {
    let user = fetchUser()
    setUser(user)
  }, [])

  const contextValue = useMemo(() => ({
    user,
    signout,
    refresh,
    update
  }), [user, signout, refresh, update])

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};


export { UserContext, UserContextProvider };