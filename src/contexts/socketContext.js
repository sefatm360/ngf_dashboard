import React, { useContext, useState } from 'react';

const SocketContext = React.createContext();

const SocketContextProvider = ({ children }) => {
  const [socketIo, setSocketIo] = useState(null);

  return (
    <SocketContext.Provider value={{ socketIo }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export default SocketContextProvider;
