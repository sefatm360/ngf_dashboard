import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/SocialReducer';

const SocialContext = React.createContext();
const initialState = {
  socialUsers: {},
  approvedSocialUsers: {},
  pendingSocialUsers: {},
  rejectedSocialUsers: {},
};

const SocialContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SocialContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SocialContext.Provider>
  );
};

export const useSocialContext = () => {
  return useContext(SocialContext);
};

export default SocialContextProvider;
