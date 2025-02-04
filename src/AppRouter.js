import React from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
// Changed from HashRouter, both work
// import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Home, Favorites } from "pages";
import { ThemeProvider } from "theme";
import { FavoritesProvider } from "context/favorites";
import NavBar from "components/NavBar";

const AppRouter = () => {
  return (
    <FavoritesProvider>
      <ThemeProvider>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/favorites" component={Favorites} />
            <Redirect to="/" />
          </Switch>
        </Router>
      </ThemeProvider>
    </FavoritesProvider>
  );
};

export default AppRouter;
