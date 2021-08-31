import React from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { useFavorites } from "hooks/useFavorites";
import { usePeopleFetch } from "hooks/usePeopleFetch";
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

  const { error, lastUserlementRef } = usePeopleFetch();

  const usersList = favMode ? favoritesUsers : users;

  //   const handleScroll = (event) => {
  //     // console.log("scrolling...:" + event);
  //     const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
  //   console.log("scrolling...scrollTop:", scrollTop);
  //   console.log("clientHeight:" + clientHeight);
  //   console.log("scrollHeight:" + scrollHeight);
  //     if (scrollHeight - scrollTop === clientHeight) {
  //       setPage((prev) => prev + 1);
  //     }
  //   };

  return (
    <S.List>
      {!isLoading &&
        usersList &&
        usersList.length > 0 &&
        usersList.map((user, index) => {
          if (usersList.length === index + 1) {
            return (
              <S.User
                ref={lastUserlementRef}
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
                  isVisible={
                    index === hoveredUserId || isUserInFavorites(user.login.uuid)
                  }
                >
                  <IconButton>
                    <FavoriteIcon color="error" />
                  </IconButton>
                </S.IconButtonWrapper>
              </S.User>
            );
          } else {
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
                  isVisible={
                    index === hoveredUserId || isUserInFavorites(user.login.uuid)
                  }
                >
                  <IconButton>
                    <FavoriteIcon color="error" />
                  </IconButton>
                </S.IconButtonWrapper>
              </S.User>
            );
          }
        })}
      {isLoading && (
        <S.SpinnerWrapper>
          <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
        </S.SpinnerWrapper>
      )}
      <div>{error && "Error"}</div>
    </S.List>
  );
};

export default List;
