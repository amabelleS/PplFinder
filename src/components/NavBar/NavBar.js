import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const NavBar = () => {
  const routes = ["/", "/favorites"];
  let history = useHistory();

  const [value, setValue] = useState(history.location.pathname);

  const handleChange = (event, newValue) => {
    // Do I need to push here?
    // history.push(`${newValue}`);
    setValue(newValue);
  };

  return (
    <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Navigation"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Home" index={0} value={routes[0]} component={Link} to={routes[0]} />
        <Tab
          label="Favorites"
          index={1}
          value={routes[1]}
          component={Link}
          to={routes[1]}
        />
      </Tabs>
    </AppBar>
  );
};

export default NavBar;
