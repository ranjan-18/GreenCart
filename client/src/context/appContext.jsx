// ✅ Imports
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Create Context
export const AppContext = createContext();

// ✅ Provider Component
export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// ✅ Custom Hook to use Context
export const useAppContext = () => {
  return useContext(AppContext);
};
