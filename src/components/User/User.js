import React from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useFavorites } from "hooks/useFavorites";

import * as S from "./style";

const User = ({ user, index }) => {
  const { isUserInFavorites, hoveredUserId } = useFavorites();

  return (
    <S.User
    // ref={lastUserlementRef}
    //   key={index}
    //   onMouseEnter={() => handleMouseEnter(index)}
    //   onMouseLeave={handleMouseLeave}
    //   onClick={() => switchFavorites(user, index)}
    >
      <S.UserPicture src={user?.picture.large} alt="" />
      <S.UserInfo>
        <Text size="22px" bold>
          {user?.name.title} {user?.name.first} {user?.name.last}
        </Text>
        <Text size="14px">{user?.email}</Text>
        <Text size="14px">
          {user?.location.street.number} {user?.location.street.name}
        </Text>
        <Text size="14px">
          {user?.location.city} {user?.location.country}
        </Text>
      </S.UserInfo>
      <S.IconButtonWrapper
        isVisible={index === hoveredUserId || isUserInFavorites(user.login.uuid)}
      >
        <IconButton>
          <FavoriteIcon color="error" />
        </IconButton>
      </S.IconButtonWrapper>
    </S.User>
  );
};

export default User;
