import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
// import CheckBox from "components/CheckBox";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";

const UserList = ({ users, isLoading }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [state, setState] = useState({
    brazil: false,
    australia: false,
    canada: false,
    germany: false,
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.checked });
    console.log(e.target);
  };

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  // const countriesValues = ["brazil", "australia", "canada", "germany"];
  const countriesValues = () => {
    const results = [];
    for (const [key, value] of Object.entries({ ...state })) {
      // console.log(`${key}: ${value}`);
      if (value) {
        results.push(`${key}`);
      }
    }
    console.log(results);
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
    console.log(state);
    console.log(users);
    if (users) {
      filterUsersByCountry();
    }
  }, [state]);

  return (
    <S.UserList>
      <S.Filters>
        <FormGroup>
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
        </FormGroup>
        {/* <Checkbox
          value="brazil"
          label="Brazil"
          isChecked={state.brazil}
          // onChange={handleChange}
          // name="brazil"
        />
        <Checkbox
          value="australia"
          label="Australia"
          checked={state.australia}
          // onChange={handleChange}
          // name="australia"
        />
        <Checkbox
          value="canada"
          label="Canada"
          checked={state.canada}
          // onChange={handleChange}
          // name="canada"
        />
        <Checkbox
          value="germany"
          label="Germany"
          checked={state.germany}
          // onChange={handleChange}
        /> */}
        {/* <CheckBox
          value="DE"
          label="Germany"
          checked={state.germany}
          onChange={handleChange}
        /> */}
      </S.Filters>
      <S.List>
        {(filteredUsers && filteredUsers.length > 0 ? filteredUsers : users).map(
          (user, index) => {
            return (
              <S.User
                key={index}
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
                <S.IconButtonWrapper isVisible={index === hoveredUserId}>
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
      </S.List>
    </S.UserList>
  );
};

export default UserList;
