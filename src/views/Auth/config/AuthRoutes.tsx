import { Login, SignUp } from "../../Auth/components";
import { Redirect, Route, Switch } from "react-router-dom";

import React from "react";

export const AuthRoutes = () => {
    return (
        <Switch>
            <Route path="/auth/login" component={Login} />
            <Route path="/auth/signup" component={SignUp} />
            <Redirect to="/auth/login" from="/auth" />
        </Switch>
    );
};