import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import "./scss/style.scss";
import BeatLoader from "react-spinners/BeatLoader";

import {
  HashRouter,
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import SimpleReactLightbox from "simple-react-lightbox";
const TheLayout = React.lazy(() => import("./containers/TheLayout"));
const Adminlogin = React.lazy(() => import("./views/admin/login/Login"));
const ADMIN = "/admin";
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
                render={(props) => <Adminlogin {...props} />}
              />
              <Route
                path="/"
                name="Admin"
                render={(props) => <TheLayout {...props} />}
              />
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      </SimpleReactLightbox>
    );
  }
}

export default App;
