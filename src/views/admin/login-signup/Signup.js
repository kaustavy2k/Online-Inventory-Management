import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import axios from "axios";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      cpassword: "",
      email: "",
      password: "",
      errors: {},
      loading: false,
      serverErr: "",
    };
  }
  handleValidation = () => {
    let errors = {};
    let formIsValid = true;
    if (!this.state.name) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }

    if (typeof this.state.name !== "undefined") {
      if (!this.state.name.match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["name"] = "Only letters";
      }
    }
    if (!this.state.password) {
      formIsValid = false;
      errors["password"] = "Password cannot be empty";
    }
    if (typeof this.state.password !== "undefined") {
      if (this.state.password.length < 6) {
        formIsValid = false;
        errors["password"] = "Password length must be > 6";
      }
    }
    if (!this.state.cpassword) {
      formIsValid = false;
      errors["cpassword"] = "Confirm Password cannot be empty";
    }
    if (typeof this.state.cpassword !== "undefined") {
      if (this.state.cpassword.length < 6) {
        formIsValid = false;
        errors["cpassword"] = "Password length must be > 6";
      }
    }
    if (!this.state.email) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if (typeof this.state.email !== "undefined") {
      let lastAtPos = this.state.email.lastIndexOf("@");
      let lastDotPos = this.state.email.lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          this.state.email.indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          this.state.email.length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  };

  handleChange = (event) => {
    this.setState({
      errors: { ...this.state.errors, [event.target.name]: "" },
      [event.target.name]: event.target.value,
    });
  };
  clickSubmit = (event) => {
    if (this.handleValidation()) {
      event.preventDefault();
      this.setState({ loading: true });
      const { email, password, name, cpassword } = this.state;
      const user = {
        email,
        password,
        passwordConfirm: cpassword,
        name,
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}/signup`, user, {
          withCredentials: true,
        })
        .then((data) => {
          localStorage.setItem("client",JSON.stringify(data.data.data.user))
          this.props.history.push({
            pathname: "/dashboard",
          });
        })
        .catch((err) => {
          let msg =
            err.response.data.message.errors.email?.message ||
            err.response.data.message.errors.passwordConfirm?.message;
          this.setState({
            serverErr: msg,
            loading: false,
          });
          toast.warning("Some error occured!");
        });
    }
  };
  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.clickSubmit(e);
    }
  };

  render() {
    const { email, password, error, name, cpassword } = this.state;
    return (
      <LoadingOverlay
        active={this.state.loading}
        spinner={<Spinner animation="grow" variant="primary" size="lg" />}
      >
        <div className="c-app c-default-layout flex-row align-items-center">
          <CContainer>
            <CRow className="justify-content-center">
              <CCol md="8">
                <CCardGroup>
                  <CCard className="p-4">
                    <CCardBody>
                      <CForm onKeyDown={this._handleKeyDown}>
                        <div
                          className="alert alert-danger"
                          style={{ display: error ? "" : "none" }}
                        >
                          {this.state.error}
                        </div>
                        <h1>Signup</h1>
                        <p className="text-muted">Create a new account</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-list" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="text"
                            placeholder="Email*"
                            onChange={this.handleChange}
                            value={email}
                            name="email"
                          />
                        </CInputGroup>
                        <div style={{ color: "red" }}>
                          {this.state.errors["email"]}
                        </div>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="text"
                            placeholder="Name*"
                            onChange={this.handleChange}
                            value={name}
                            name="name"
                          />
                        </CInputGroup>
                        <div style={{ color: "red" }}>
                          {this.state.errors["name"]}
                        </div>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            placeholder="Password*"
                            onChange={this.handleChange}
                            value={password}
                            name="password"
                          />
                        </CInputGroup>
                        <div style={{ color: "red" }}>
                          {this.state.errors["password"]}
                        </div>
                        <CInputGroup className="mb-4">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-lock-locked" />
                            </CInputGroupText>
                          </CInputGroupPrepend>
                          <CInput
                            type="password"
                            placeholder="Confirm Password*"
                            onChange={this.handleChange}
                            value={cpassword}
                            name="cpassword"
                          />
                        </CInputGroup>
                        <div style={{ color: "red" }}>
                          {this.state.errors["cpassword"]}
                        </div>
                        <div style={{ color: "red" }}>
                          {this.state.serverErr}
                        </div>
                        <CRow>
                          <CCol xs="6">
                            <CButton
                              color="primary"
                              className="px-4"
                              onClick={this.clickSubmit}
                            >
                              Signup
                            </CButton>
                          </CCol>
                          <CCol xs="6">
                            <Link to="/login">
                              <CButton color="danger" className="px-4">
                                Login
                              </CButton>
                            </Link>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CCardBody>
                  </CCard>
                  <CCard
                    className="text-white bg-primary py-5 d-md-down-none"
                    style={{ width: "44%" }}
                  >
                    <CCardBody className="text-center">
                      <div>
                        <h2>Online Inventory Management (BPPIMT)</h2>
                        <p>
                          This project is designed for our college, B.P. Poddar
                          Institute of Management & Technology, Kolkata. The
                          product will help to maintain data & record of
                          software and hardware equipment present in various
                          labs.
                        </p>
                      </div>
                    </CCardBody>
                  </CCard>
                </CCardGroup>
              </CCol>
            </CRow>
          </CContainer>
        </div>
        <ToastContainer />
      </LoadingOverlay>
    );
  }
}

export default Signup;
