import React, { useContext, useEffect, useReducer } from 'react';
import reducer from '../reducers/adminReducer';

const AdminContext = React.createContext();

const getSessionStorage = () => {
  const admin = sessionStorage.getItem('admin');

  if (admin) {
    return JSON.parse(window.atob(admin));
  } else {
    return null;
  }
};

const initialState = {
  admin: getSessionStorage(),
  adminFetching: false,
  error: null,
  showModal: false,
  modalEditData: {},
  fetched: false,
  hamburger: false,
};

const AdminContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(state.modalEditData, 'modal edit data from context');

  useEffect(() => {
    sessionStorage.setItem('admin', window.btoa(JSON.stringify(state.admin)));
  }, [state.admin]);

  return (
    <AdminContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => {
  return useContext(AdminContext);
};

export default AdminContextProvider;
