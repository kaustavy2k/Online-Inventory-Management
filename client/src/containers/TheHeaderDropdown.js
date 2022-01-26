import React from "react";
import { useHistory } from "react-router";
import { CDropdown, CImg } from "@coreui/react";
import DefaultProfile from "./avatar.png";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TheHeaderDropdown = () => {
  const localstoredata = JSON.parse(localStorage.getItem("client"));
  const username = localstoredata.name;
  const useremail = localstoredata.email;
  const history = useHistory();
  const logout = () => {
    let cnf = window.confirm("Are you sure?");
    if (cnf) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/logout`, {
          withCredentials: true,
        })
        .then((res) => {
          localStorage.removeItem("client");
          history.push({
            pathname: "/",
          });
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          toast.warning("Error. Try again later");
        });
    }
  };

  return (
    <>
      <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
        <CDropdown className="c-header-nav-link">
          <span style={{ marginRight: "15px" }}>
            <b>
              {username} ({useremail})
            </b>
            &nbsp; &nbsp;
            <button onClick={logout} className="btn btn-success">
              LOGOUT
            </button>
          </span>

          <div className="c-avatar">
            <CImg
              className="c-avatar-img"
              onError={(i) => (i.target.src = `${DefaultProfile}`)}
            />
          </div>
        </CDropdown>
      </CDropdown>
      <ToastContainer />
    </>
  );
};

export default TheHeaderDropdown;
