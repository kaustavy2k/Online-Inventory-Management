import React from "react";
import {
  CDropdown,
  CImg,
} from "@coreui/react";
import DefaultProfile from "./avatar.png";

const TheHeaderDropdown = () => {
  const localstoredata = JSON.parse(localStorage.getItem("client"));
  const username = localstoredata.name;
  const useremail = localstoredata.email;
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdown className="c-header-nav-link" >
        <span style={{ marginRight: "15px" }}>
          <b>
            {username} ({useremail})
          </b>
        </span>

        <div className="c-avatar">
          <CImg
            className="c-avatar-img"
            onError={(i) => (i.target.src = `${DefaultProfile}`)}
          />
        </div>
      </CDropdown>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
