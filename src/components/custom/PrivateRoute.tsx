import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { Location } from 'history';

const isLoggedIn = true;

type Props = RouteProps & {
  loginPath?: string;
};

/* prettier-ignore */
export const PrivateRoute: React.FunctionComponent<Props> = ({
  component,
  loginPath,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      isLoggedIn ? (
        React.createElement(component, props)
      ) : (
        <Redirect
          to={{
            pathname: loginPath,
            state: { from: props.location.pathname },
          }}
        />
      )
    )}
  />
);

PrivateRoute.defaultProps = {
  loginPath: '/login',
};

export type PrivateRouteLocationState = Location<{
  from: string;
}>;
