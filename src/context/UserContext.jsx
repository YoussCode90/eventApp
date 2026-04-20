import { createContext, useContext, useState } from "react";

const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Log de gebruiker in
  const login = (user) => setCurrentUser(user);

  // Log de gebruiker uit
  const logout = () => setCurrentUser(null);

  return (
    <UserContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
