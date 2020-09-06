import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React from 'react';
import { AuthRoutes } from '../views/Auth';
import { DashboardRoutes } from '../views/Dashboard';

import PrivateRoute from '../PrivateRoute';

const ApplicationRoutes = () => {
       return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/dashboard" component={DashboardRoutes} />
                <Route path="/auth" component={AuthRoutes} />
                <Redirect to="/auth" from="/" />
            </Switch>
        </Router>
    );
};
export default ApplicationRoutes;
