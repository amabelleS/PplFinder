import React from "react";
import useFavoritesState from "./useFavoritesState";
import Context from "./context";

const FavoritesStateProvider = ({ children }) => {
  return <Context.Provider value={useFavoritesState()}>{children}</Context.Provider>;
};

export default FavoritesStateProvider;
