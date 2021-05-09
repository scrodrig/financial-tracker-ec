import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import React, { Profiler } from 'react';
import { AuthRoutes } from '../views/Auth';
import { DashboardRoutes } from '../views/Dashboard';
import { ProfileRoutes } from '../views/Profile';
import { InvoiceRoutes } from '../views/Invoice';


import PrivateRoute from '../PrivateRoute';

const ApplicationRoutes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/dashboard" component={DashboardRoutes} />
                <PrivateRoute exact path="/profile" component={ProfileRoutes} />
                <PrivateRoute exact path="/invoice" component={InvoiceRoutes} />
                <Route path="/auth" component={AuthRoutes} />
                <Redirect to="/auth" from="/" />
            </Switch>
        </Router>
    );
};
export default ApplicationRoutes;
