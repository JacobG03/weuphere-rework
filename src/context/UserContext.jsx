import React, { 
  createContext, 
  useState, 
  useEffect, 
  useCallback,
  useMemo
} from "react";
import postData from '../services/PostData'


const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    state: null,
    user: null,
  });
  console.log(user)

  // Sign out user
  const signout = useCallback(() => {
    postData(`${window.location.origin}/api/logout`, {})
    setUser({
      state: 0,
      user: null
    });
  }, []);

  const auth = useCallback(() => {
    fetchUser()
    console.log('yo')
  }, [])
  
  // Load user data
  const fetchUser = async () => {
    await fetch(`${window.location.origin}/api/auth`)
      .then((response) => response.json())
      .then((result) => {
        setUser(result)
      })
      .catch((error) => console.log("An error occured"));
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      let user = localStorage.getItem('user');
      user = JSON.parse(user)
      setUser(user)
    } else {
      console.log('fetching')
      fetchUser()
    }
  }, []);

  const contextValue = useMemo(() => ({
    user,
    signout,
    auth
  }), [user, signout, auth])

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};


export { UserContext, UserContextProvider };