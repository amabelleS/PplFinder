import React from "react";
import Text from "components/Text";
import List from "../../components/List";

import * as S from "./style";

const Favorites = () => {
  return (
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorites
          </Text>
        </S.Header>
        <List favMode={true} />
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
