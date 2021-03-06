import React, { 
  createContext, 
  useState, 
  useCallback,
  useMemo,
  useEffect,
} from "react";
import postData from "../services/postData";
import getData from "../services/getData";


// Returns either user: null OR user: 'image', etc.


const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  console.log('User:')
  console.log(user)

  useEffect(() => {
    getData('/api/user')
    .then(response => response.json())
    .then(response => setUser(response.user))
  }, [])

  // Updates user state with the given paramater
  const update = useCallback((data) => {
    setUser(data)
  }, [])

  // returns boolean value
  const logout = useCallback(() => {
    postData('/api/user/logout', {})
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
  

  const contextValue = useMemo(() => ({
    user,
    logout,
    update
  }), [user, logout, update])

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};


export { UserContext, UserContextProvider };