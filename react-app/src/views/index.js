import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppLayout from "layouts/app-layout";
import AuthLayout from "layouts/auth-layout";
import AppLocale from "lang";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from "antd";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "configs/AppConfig";

import { auth } from "auth/FirebaseAuth";
import { setAuthenticatedUser } from "redux/actions/Auth";
import Loading from "components/shared-components/Loading";

function RouteInterceptor({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: AUTH_PREFIX_PATH,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export const Views = (props) => {
  const { locale, token, location, setAuthenticatedUser } = props;
  const currentAppLocale = AppLocale[locale];

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  auth.onAuthStateChanged((user) => {
    setAuthenticatedUser(user);
    setIsAuthenticated(!!user);
  });

  if (token && !isAuthenticated) {
    return <Loading cover="page" />;
  }

  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ConfigProvider locale={currentAppLocale.antd}>
        <Switch>
          <Route exact path="/">
            <Redirect to={APP_PREFIX_PATH} />
          </Route>
          <Route path={AUTH_PREFIX_PATH}>
            <AuthLayout />
          </Route>
          <RouteInterceptor path={APP_PREFIX_PATH} isAuthenticated={token}>
            <AppLayout location={location} />
          </RouteInterceptor>
        </Switch>
      </ConfigProvider>
    </IntlProvider>
  );
};

const mapStateToProps = ({ theme, auth }) => {
  const { locale } = theme;
  const { token } = auth;
  return { locale, token };
};

const mapDispatchToProps = {
  setAuthenticatedUser,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Views));
