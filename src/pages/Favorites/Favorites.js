import React from "react";
import Text from "components/Text";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useFavorites } from "hooks/useFavorites";
import User from "../../components/User";

import * as S from "./style";

const Favorites = () => {
  const { favoritesUsers, switchFavorites } = useFavorites();

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
          {favoritesUsers.length > 0 &&
            favoritesUsers.map((user, index) => {
              return (
                <User
                  user={user}
                  index={index}
                  key={index}
                  // onClick={() => switchFavorites(user, index)}
                />
              );
            })}
        </S.List>
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
