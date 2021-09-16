import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    state: null
  });

  useEffect(() => {
    const fetchUser = async () => {
      await fetch(`${window.location.origin}/api/auth`)
        .then((response) => response.json())
        .then((result) => {
          setUser(result)
          if (result.state === null) {
            setTimeout(() => {
              fetchUser()
              console.log('here')
            }, 3000)
          }
        })
        .catch((error) => console.log("An error occured"));
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};


export { UserContext, UserContextProvider };