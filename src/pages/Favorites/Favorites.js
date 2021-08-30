import React from "react";
import Text from "components/Text";
import List from "../../components/List";
import { useFavorites } from "hooks";

import * as S from "./style";

const Favorites = () => {
  const { favoritesUsers } = useFavorites();

  return (
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorites
          </Text>
        </S.Header>
        <List users={favoritesUsers} favMode={true} />
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
