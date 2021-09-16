import React, { 
  createContext, 
  useState, 
  useEffect, 
  useCallback,
  useMemo
} from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    state: null
  });

  const signout = useCallback(() => {
    setUser({
      state: 0
    });
  }, []);
  
  const fetchUser = async () => {
    await fetch(`${window.location.origin}/api/auth`)
      .then((response) => response.json())
      .then((result) => {
        setUser(result)
      })
      .catch((error) => console.log("An error occured"));
  };

  useEffect(() => {
    
    fetchUser();
  }, []);

  const contextValue = useMemo(() => ({
    user,
    signout
  }), [user, signout])


  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};


export { UserContext, UserContextProvider };