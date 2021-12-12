import React, { Suspense } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { Redirect, Route, Switch } from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";
import routes from "../routes";

const TheContent = (props) => {
  const user = JSON.parse(localStorage.getItem("client"));
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense
          fallback={
            <BeatLoader
              css="margin-left:50%;margin-top:100px;"
              color="#000000"
              size={30}
            />
          }
        >
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component &&
                (user.role === "superadmin" || user.role === route.role) && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <CFade>
                        <route.component {...props} />
                      </CFade>
                    )}
                  />
                )
              );
            })}

            <Redirect to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};

export default React.memo(TheContent);
