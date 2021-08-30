import React from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useFavorites } from "hooks/useFavorites";
import * as S from "./style";

const List = ({ users, isLoading, favMode }) => {
  const {
    favoritesUsers,
    switchFavorites,
    isUserInFavorites,
    handleMouseEnter,
    handleMouseLeave,
    hoveredUserId,
  } = useFavorites();

  const usersList = favMode ? favoritesUsers : users;

  return (
    <S.List>
      {usersList.map((user, index) => {
        return (
          <S.User
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => switchFavorites(user, index)}
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
      })}
      {isLoading && (
        <S.SpinnerWrapper>
          <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
        </S.SpinnerWrapper>
      )}
    </S.List>
  );
};

export default List;
