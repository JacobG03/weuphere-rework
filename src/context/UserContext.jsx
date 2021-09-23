import React, { 
  createContext, 
  useState, 
  useCallback,
  useMemo,
} from "react";
import postData from "../services/postData";


// Returns either user: null OR user: 'image', etc.
const fetchUser = () => {
  var user = null;
  postData(`${window.location.origin}/api/user`, {})
  .then(result => {
    user = result.user
  })
  return user
};


const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(fetchUser());

  // Updates user state with the given paramater
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
  
  // Retrieves user data from server
  // and updates user state with that data
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