import { Route, Switch } from "react-router-dom";

import { Invoice } from "../components";
import React from "react";
import { Menu } from "../../Menu/components"

export const InvoiceRoutes = () => {
  return (
    <Switch>
      <Route exact path="/invoice" render={routeProps =>
        <Menu title="Invoice">
          <Invoice/>
        </Menu>
      } />
    </Switch>
  );
}