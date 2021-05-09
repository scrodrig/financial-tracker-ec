import { Route, Switch } from "react-router-dom";

import { Dashboard } from "../components";
import React from "react";
import { Menu } from "../../Menu/components"

export const DashboardRoutes = () => {
  return (
    <Switch>
      <Route exact path="/dashboard" render={
        routeProps =>
          <Menu title="Dashboard">
            <Dashboard />
          </Menu>
      } />
    </Switch>
  );
}