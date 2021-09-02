import React, { useContext } from "react";
import Text from "components/Text";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useFavorites } from "hooks/useFavorites";
import User from "../../components/User";
import Context from "../../context/favorites/context";

import * as S from "./style";

const Favorites = () => {
  // const { favoritesUsers } = useFavorites();
  const { favoritesState } = useContext(Context);
  const { favorites } = favoritesState;

  return (
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            <FavoriteIcon
              color="error"
              fontSize="large"
              style={{ marginRight: "1rem" }}
            />
            Favorites
            <FavoriteIcon color="error" fontSize="large" style={{ marginLeft: "1rem" }} />
          </Text>
        </S.Header>
        <S.List>
          {favorites.length > 0 &&
            favorites.map((user, index) => {
              return <User user={user} index={index} key={index} />;
            })}
        </S.List>
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
