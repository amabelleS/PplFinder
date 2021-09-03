import React, { useContext, useState, useEffect } from "react";
import Text from "components/Text";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GetAppIcon from "@material-ui/icons/GetApp";
import User from "../../components/User";
import Context from "../../context/favorites/context";
import { CSVLink } from "react-csv";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import * as S from "./style";

const Favorites = () => {
  const { favoritesState } = useContext(Context);
  const { favorites } = favoritesState;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Export favorites list to csv:
  const headers = [
    { label: "First Name", key: "name.first" },
    { label: "Last Name", key: "name.last" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "name.phone" },
    { label: "Birth Date", key: "dob.date" },
    { label: "Age", key: "dob.age" },
    { label: "Country", key: "location.city" },
    { label: "City", key: "location.country" },
    { label: "City", key: "location.country" },
    { label: "Time Zone Offset", key: "location.timezone.offset" },
    { label: "Free Text", key: "freeTextInput" },
  ];

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (favorites && favorites.length > 0) {
      const results = [...favorites].filter((favorite) => {
        if (
          (favorite &&
            favorite.name.first.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (favorite &&
            favorite.name.last.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (favorite &&
            favorite.location.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (favorite &&
            favorite.freeTextInput.toLowerCase().includes(searchTerm.toLowerCase()))
        ) {
          return favorite;
        }
        return null;
      });
      setSearchResults(results);
    }
  }, [searchTerm, favorites]);

  // const preventDefault = (event) => event.preventDefault();

  return (
    <S.Favorites>
      <S.Content>
        {favorites && favorites.length > 0 && (
          <S.Header>
            <S.ActionGroup>
              <FormControl>
                <InputLabel htmlFor="my-input">Search Your Favorite</InputLabel>
                <Input
                  id="my-input"
                  aria-describedby="my-helper-text"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
                <FormHelperText id="my-helper-text">
                  By name, city, or #free text.
                </FormHelperText>
              </FormControl>

              <Text size="64px" bold>
                <FavoriteIcon
                  color="error"
                  fontSize="large"
                  style={{ marginRight: "1rem" }}
                />
                Favorites
                <FavoriteIcon
                  color="error"
                  fontSize="large"
                  style={{ marginLeft: "1rem" }}
                />
              </Text>
              <S.CSVLinkrWrapper>
                <CSVLink data={favorites} headers={headers}>
                  Download to CSV
                  <GetAppIcon color="primary" />
                </CSVLink>
              </S.CSVLinkrWrapper>
            </S.ActionGroup>
          </S.Header>
        )}

        <S.List>
          {favorites.length <= 0 && (
            <Card>
              <CardContent>
                <Text color="#84ffff" size="2rem" bold>
                  Please select your favorites from the home page
                  <FavoriteIcon
                    color="error"
                    fontSize="large"
                    style={{ marginLeft: "1rem" }}
                  />
                </Text>
              </CardContent>
              {/* <CardActions> */}
              {/* <Link href="#" onClick={preventDefault}>
                  Link
                </Link> */}
              {/* </CardActions> */}
            </Card>
          )}
          {/* {favorites.length <= 0 && (
            <Text>Please select your favorites from the home page</Text>
          )} */}
          {favorites.length > 0
            ? (searchResults.length > 0 ? searchResults : favorites).map(
                (user, index) => {
                  return <User user={user} index={index} key={index} isOnFavoritesPage />;
                }
              )
            : null}
        </S.List>
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
