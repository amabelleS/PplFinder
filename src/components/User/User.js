import React, { useContext } from "react";
import Text from "components/Text";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Context from "../../context/favorites/context";

import * as S from "./style";

const User = ({ user, index, isLast, lastUserlementRef }) => {
  const {
    favoritesState,
    handleMouseEnter,
    handleMouseLeave,
    isUserInFavorites,
    switchFavorites,
  } = useContext(Context);
  const { hoveredUserId } = favoritesState;

  return (
    <S.User
      ref={isLast ? lastUserlementRef : null}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
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
        onClick={() => switchFavorites(user, index)}
      >
        <IconButton>
          <FavoriteIcon color="error" />
        </IconButton>
      </S.IconButtonWrapper>
    </S.User>
  );
};

export default User;
