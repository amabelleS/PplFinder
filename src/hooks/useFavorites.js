import { useState, useEffect } from "react";

export const useFavorites = () => {
  console.log("useFavotie called");
  const [hoveredUserId, setHoveredUserId] = useState();
  const [favoritesUsers, setFavoritesUsers] = useState(
    // []
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [favoritesUUIDs, setFavoritesUUIDs] = useState(
    // []
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
    setFavoritesUsers(JSON.parse(localStorage.getItem("favorites")));
    setFavoritesUUIDs(JSON.parse(localStorage.getItem("favoritesUUIs")));

    const uuid = user.login.uuid;
    // check if user is in not favorites list
    if (!isUserInFavorites(uuid)) {
      console.log(favoritesUsers);
      console.log(favoritesUUIDs);
      setFavoritesUUIDs((prev) => [...prev, uuid]);
      setFavoritesUsers((prev) => [...prev, user]);
    } else {
      //remove from favorites
      // removeFavoriteFromList(uuid);
      const updatedFavorites = [...favoritesUsers].filter(
        (fav) => fav.login.uuid !== uuid
      );
      const updatedFavoritesUUIDs = [...favoritesUUIDs].filter((id) => id !== uuid);
      setFavoritesUsers(updatedFavorites);
      setFavoritesUUIDs(updatedFavoritesUUIDs);
    }
  };

  // const removeFavoriteFromList = (uuid) => {
  //   const updatedFavorites = [...favoritesUsers].filter((fav) => fav.login.uuid !== uuid);
  //   const updatedFavoritesUUIDs = [...favoritesUUIDs].filter((id) => id !== uuid);
  //   setFavoritesUsers(updatedFavorites);
  //   setFavoritesUUIDs(updatedFavoritesUUIDs);
  // };

  useEffect(() => {
    // console.log(favoritesUsers);
    // console.log(favoritesUUIDs);
    localStorage.setItem("favorites", JSON.stringify(favoritesUsers));
    localStorage.setItem("favoritesUUIs", JSON.stringify(favoritesUUIDs));
  }, [favoritesUsers, favoritesUUIDs]);

  return {
    favoritesUsers,
    favoritesUUIDs,
    switchFavorites,
    isUserInFavorites,
    handleMouseEnter,
    handleMouseLeave,
    hoveredUserId,
    // removeFavoriteFromList,
  };
};
