import React, { createContext, useEffect, useReducer } from 'react';
import reducer from '../reducer/reducer';
import axios from 'axios';
import {
  OPEN_SIDE_BAR,
  CLOSE_SIDE_BAR,
  UPDATE_PRODUCTS,
  UPDATE_ISLOADING,
  UPDATE_ERR,
} from '../assets/contsntants/constants';

export const AppContext = createContext();
const initialState = {
  isSidebarOpen: true,
  products: [],
  featuredProduct: [],
  isLoading: true,
  filteredProducts: [],
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const OpenSidebar = () => {
    dispatch({ type: OPEN_SIDE_BAR });
  };
  const CloseSideBar = () => {
    dispatch({ type: CLOSE_SIDE_BAR });
  };
  const getProducts = async () => {
    try {
      dispatch({ type: UPDATE_ISLOADING, payload: true });
      const res = await axios.get(
        'https://api.airtable.com/v0/appAS2roJGcDlQhwh/Products?api_key=keyZ4drcrVYtlksE4'
      );
      dispatch({ type: UPDATE_PRODUCTS, payload: res.data.records });
      dispatch({ type: UPDATE_ISLOADING, payload: false });
    } catch (err) {
      dispatch({ type: UPDATE_ERR, payload: true });
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <AppContext.Provider value={{ ...state, OpenSidebar, CloseSideBar }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
