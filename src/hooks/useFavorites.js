import { useState, useEffect } from "react";

export const useFavorites = () => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [favoritesUsers, setFavoritesUsers] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [favoritesUUIDs, setFavoritesUUIDs] = useState(
    JSON.parse(localStorage.getItem("favoritesUUIs")) || []
  );

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

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favoritesUsers));
    localStorage.setItem("favoritesUUIs", JSON.stringify(favoritesUUIDs));
    console.log(favoritesUsers);
    console.log(localStorage);
  }, [favoritesUsers]);

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
