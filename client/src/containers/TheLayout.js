import React from "react";
import { TheContent, TheSidebar, TheFooter, TheHeader } from "./index";
const TheLayout = (props) => {
  return (
    <div className="c-app c-default-layout">
      <TheSidebar {...props} />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent {...props} />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};
export default TheLayout;
