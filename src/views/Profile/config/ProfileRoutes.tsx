import { Route, Switch } from "react-router-dom";

import { Profile } from "../components";
import React from "react";
import { Menu } from "../../Menu/components"

export const ProfileRoutes = () => {
  return (
    <Switch>
      <Route exact path="/profile" render={
        routeProps =>
          <Menu title="Profile">
            <Profile />
          </Menu>
      } />
    </Switch>
  );
}