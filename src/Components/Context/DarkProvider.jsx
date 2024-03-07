import { createContext, useState } from "react";
export const DarkContext = createContext();

// eslint-disable-next-line react/prop-types
const DarkProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  return (
    <div>
      <DarkContext.Provider value={[dark, setDark]}>
        {children}
      </DarkContext.Provider>
    </div>
  );
};

export default DarkProvider;
