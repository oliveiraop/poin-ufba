import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { AUTH_PREFIX_PATH } from "configs/AppConfig";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="page" />}>
      <Switch>
        <Route
          path={`${AUTH_PREFIX_PATH}/login`}
          component={lazy(() => import(`./authentication/login-2`))}
        />
        <Route
          path={`${AUTH_PREFIX_PATH}/register`}
          component={lazy(() => import(`./authentication/register-2`))}
        />
        <Route
          path={`${AUTH_PREFIX_PATH}/forgot-password`}
          component={lazy(() => import(`./authentication/forgot-password`))}
        />
        <Route
          path={`${AUTH_PREFIX_PATH}/not-found`}
          component={lazy(() => import(`./errors/error-page-1`))}
        />
        <Route
          path={`${AUTH_PREFIX_PATH}/internal-error`}
          component={lazy(() => import(`./errors/error-page-2`))}
        />
        <Redirect
          from={`${AUTH_PREFIX_PATH}`}
          to={`${AUTH_PREFIX_PATH}/login`}
        />
      </Switch>
    </Suspense>
  );
};

export default AppViews;
