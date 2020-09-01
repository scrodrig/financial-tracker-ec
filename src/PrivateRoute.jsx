import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { AuthContext } from "./AuthProvider";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const PrivateRoute = ({ component: RouteComponent, ...rest}) => {
  const {authenticated, loadingAuthState} = useContext(AuthContext);
  if (loadingAuthState) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
   );
}
 return (
    <Route
      {...rest}
      render={routeProps =>
      authenticated ? (
       <RouteComponent {...routeProps} />
      ) : (
       <Redirect to={{pathname: "/auth/login", state: {prevPath:  rest.path}}} />
     )
    }
   />
  );
}
export default PrivateRoute