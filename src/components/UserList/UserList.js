import React, { useEffect, useState } from "react";
// import Text from "components/Text";
import Spinner from "components/Spinner";
// import CheckBox from "components/CheckBox";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import IconButton from "@material-ui/core/IconButton";
// import FavoriteIcon from "@material-ui/icons/Favorite";
import List from "../../components/List";
import User from "../../components/User";
import { usePeopleFetch } from "hooks/usePeopleFetch";
// import { useFavorites } from "hooks/useFavorites";
import * as S from "./style";

const UserList = () => {
  const { users, isLoading, error, lastUserlementRef } = usePeopleFetch();
  // const { switchFavorites, handleMouseEnter, handleMouseLeave } = useFavorites();
  const [filteredUsers, setFilteredUsers] = useState([]);

  // Update in ppl hook or here?? ----------------------------------------------?????????????
  // const [loadedUsers, setLoadedUsers] = useState([]);
  // const { handleScroll } = usePeopleFetch();

  // Checkboxes state:
  const [state, setState] = useState({
    brazil: false,
    australia: false,
    canada: false,
    germany: false,
    finland: false,
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked });
  };

  const countriesValues = () => {
    const results = [];
    for (const [key, value] of Object.entries({ ...state })) {
      // console.log(`${key}: ${value}`);
      if (value) {
        results.push(`${key}`);
      }
    }
    return results;
  };

  const filterUsersByCountry = () => {
    const results = users.filter((user) => {
      if (countriesValues().includes(user.location.country.toLowerCase())) {
        return user;
      }
      return null;
    });

    setFilteredUsers(results);
    return results;
  };

  useEffect(() => {
    if (users) {
      filterUsersByCountry();
    }
  }, [state]);

  // logs:
  // useEffect(() => {
  //   if (favoritesUsers) {
  //     console.log(favoritesUsers);
  //     console.log(favoritesUUIDs);
  //   }
  // }, [favoritesUsers]);

  return (
    <S.UserList>
      <S.Filters>
        <FormControlLabel
          control={
            <Checkbox
              checked={state.brazil}
              onChange={handleChange}
              color="primary"
              value="brazil"
              name="brazil"
            />
          }
          label="Brazil"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.australia}
              onChange={handleChange}
              color="primary"
              value="australia"
              name="australia"
            />
          }
          label="Australia"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.canada}
              onChange={handleChange}
              color="primary"
              value="canada"
              name="canada"
            />
          }
          label="Canada"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.germany}
              onChange={handleChange}
              color="primary"
              value="germany"
              name="germany"
            />
          }
          label="Germany"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.finland}
              onChange={handleChange}
              color="primary"
              value="finland"
              name="finland"
            />
          }
          label="Finland"
        />
      </S.Filters>

      {/* <List
        users={filteredUsers && filteredUsers.length > 0 ? filteredUsers : users}
        isLoading={isLoading}
      /> */}

      <S.List>
        {!isLoading &&
          users.length > 0 &&
          (filteredUsers && filteredUsers.length > 0 ? filteredUsers : users).map(
            (user, index) => {
              if (users.length === index + 1) {
                return (
                  <User
                    user={user}
                    index={index}
                    key={index}
                    isLast={true}
                    lastUserlementRef={lastUserlementRef}
                  />
                );
              } else {
                return <User user={user} index={index} key={index} isLast={false} />;
              }
            }
          )}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>

      {/* <S.List>
        {(filteredUsers && filteredUsers.length > 0 ? filteredUsers : users).map(
          (user, index) => {
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
        )}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List> */}
    </S.UserList>
  );
};

export default UserList;
