import React, { useEffect, useState } from "react";
import Spinner from "components/Spinner";
// import Checkbox from "@material-ui/core/Checkbox";
import CheckBox from "../CheckBox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import User from "../../components/User";
import { usePeopleFetch } from "hooks/usePeopleFetch";
import * as S from "./style";

const UserList = () => {
  const { users, isLoading, lastUserlementRef } = usePeopleFetch();
  const [filteredUsers, setFilteredUsers] = useState([]);

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

  return (
    <S.UserList>
      <S.Filters>
        <FormControlLabel
          control={
            <CheckBox
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
            <CheckBox
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
            <CheckBox
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
            <CheckBox
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
            <CheckBox
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
    </S.UserList>
  );
};

export default UserList;
