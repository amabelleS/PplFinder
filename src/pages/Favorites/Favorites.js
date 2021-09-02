import React, { useContext } from "react";
import Text from "components/Text";
import FavoriteIcon from "@material-ui/icons/Favorite";
import GetAppIcon from "@material-ui/icons/GetApp";
// import { useFavorites } from "hooks/useFavorites";
import User from "../../components/User";
import Context from "../../context/favorites/context";
import { CSVLink } from "react-csv";

import * as S from "./style";

const Favorites = () => {
  // const { favoritesUsers } = useFavorites();
  const { favoritesState } = useContext(Context);
  const { favorites } = favoritesState;

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
  ];

  return (
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            <FavoriteIcon
              color="error"
              fontSize="large"
              style={{ marginRight: "1rem" }}
            />
            Favorites
            <FavoriteIcon color="error" fontSize="large" style={{ marginLeft: "1rem" }} />
          </Text>
        </S.Header>
        <S.CSVLinkrWrapper>
          <CSVLink data={favorites} headers={headers}>
            Download to CSV
            <GetAppIcon color="primary" />
          </CSVLink>
        </S.CSVLinkrWrapper>
        <S.List>
          {favorites.length > 0 &&
            favorites.map((user, index) => {
              return <User user={user} index={index} key={index} />;
            })}
        </S.List>
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
