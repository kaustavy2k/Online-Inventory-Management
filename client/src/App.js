import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import "./scss/style.scss";
import BeatLoader from "react-spinners/BeatLoader";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";
const TheLayout = React.lazy(() => import("./containers/TheLayout"));
const Login = React.lazy(() => import("./views/admin/login-signup/Login"));
const Signup = React.lazy(() => import("./views/admin/login-signup/Signup"));
function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = JSON.parse(localStorage.getItem("client"))._id;
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
class App extends Component {
  render() {
    return (
      <SimpleReactLightbox>
        <BrowserRouter>
          <React.Suspense
            fallback={
              <BeatLoader
                css="margin-left:50%;margin-top:100px;"
                color="#000000"
                size={30}
              />
            }
          >
            <Switch>
              <Route
                exact
                path="/login"
                name="Login Page"
                render={(props) => <Login {...props} />}
              />
              <Route
                exact
                path="/signup"
                name="Signup Page"
                render={(props) => <Signup {...props} />}
              />
              <ProtectedRoute
                path="/"
                name="Admin"
                component={(props) => <TheLayout {...props} />}
              />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      </SimpleReactLightbox>
    );
  }
}

export default App;
