import { useState } from "react";

export const useFavorites = () => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [favoritesUsers, setFavoritesUsers] = useState([]);
  const [favoritesUUIDs, setFavoritesUUIDs] = useState([]);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const isUserInFavorites = (uuid) => {
    return favoritesUUIDs.includes(uuid);
  };

  const switchFavorites = (user, index) => {
    const uuid = user.login.uuid;
    if (!isUserInFavorites(uuid)) {
      setFavoritesUUIDs([...favoritesUUIDs, uuid]);
      setFavoritesUsers([...favoritesUsers, user]);
    } else {
      //remove from favorites
      const updatedFavorites = [...favoritesUsers].filter(
        (fav) => fav.login.uuid !== uuid
      );
      const updatedFavoritesUUIDs = [...favoritesUUIDs].filter((id) => id !== uuid);
      setFavoritesUsers(updatedFavorites);
      setFavoritesUUIDs(updatedFavoritesUUIDs);
    }
  };

  return {
    favoritesUsers,
    favoritesUUIDs,
    switchFavorites,
    isUserInFavorites,
    handleMouseEnter,
    handleMouseLeave,
    hoveredUserId,
  };
};
