import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "set-hoveredUserId":
      return { ...state, hoveredUserId: action.payload };
    case "set-favorites":
      localStorage.setItem("favorites", JSON.stringify(action.payload));
      return { ...state, favorites: action.payload };
    case "set-favoritesUUIDs":
      localStorage.setItem("favoritesUUIDs", JSON.stringify(action.payload));
      return { ...state, favoritesUUIDs: action.payload };

    default:
      return state;
  }
};

const useFavoritesState = () => {
  const initialSate = {
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    favoritesUUIDs: JSON.parse(localStorage.getItem("favoritesUUIDs")) || [],
    hoveredUserId: null,
  };
  const [favoritesState, favoritesDispatch] = useReducer(reducer, initialSate);

  const handleMouseEnter = (index) => {
    favoritesDispatch({
      type: "set-hoveredUserId",
      payload: index,
    });
  };

  const handleMouseLeave = () => {
    favoritesDispatch({
      type: "set-hoveredUserId",
      payload: null,
    });
  };

  const isUserInFavorites = (uuid) => {
    return favoritesState.favoritesUUIDs.includes(uuid);
  };

  const editFavorite = (user, text) => {
    const uuid = user.login.uuid;

    const updatedFavorite = { ...user, freeTextInput: text };
    const updatedFavorites = [
      ...favoritesState.favorites.map((favorite) =>
        favorite.login.uuid === uuid ? updatedFavorite : favorite
      ),
    ];

    favoritesDispatch({
      type: "set-favorites",
      payload: updatedFavorites,
    });
  };

  const switchFavorites = (user) => {
    const uuid = user.login.uuid;
    // check if user is not in favorites list
    if (!isUserInFavorites(uuid)) {
      // then add him to the list, adding freeTextInput
      const updatedFavorites = [
        ...favoritesState.favorites,
        { ...user, freeTextInput: "" },
      ];
      const updatedUUIDs = [...favoritesState.favoritesUUIDs, uuid];

      favoritesDispatch({
        type: "set-favorites",
        payload: updatedFavorites,
      });

      favoritesDispatch({
        type: "set-favoritesUUIDs",
        payload: updatedUUIDs,
      });
    } else {
      //remove from favorites
      const updatedFavorites = [...favoritesState.favorites].filter(
        (fav) => fav.login.uuid !== uuid
      );
      const updatedUUIDs = [...favoritesState.favoritesUUIDs].filter((id) => id !== uuid);
      favoritesDispatch({
        type: "set-favorites",
        payload: updatedFavorites,
      });

      favoritesDispatch({
        type: "set-favoritesUUIDs",
        payload: updatedUUIDs,
      });
    }
  };

  return {
    favoritesState,
    favoritesDispatch,
    handleMouseEnter,
    handleMouseLeave,
    isUserInFavorites,
    switchFavorites,
    editFavorite,
  };
};

export default useFavoritesState;
