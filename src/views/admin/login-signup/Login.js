import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      loading: false,
    };
  }
  handleChange = (event) => {
    this.setState({ error: "", [event.target.name]: event.target.value });
  };
  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    axios
      .post(`${process.env.REACT_APP_API_URL}/login`, user, {
        withCredentials: true,
      })
      .then((data) => {
        localStorage.setItem("client", JSON.stringify(data.data.data.user));
        this.props.history.push({
          pathname: "/dashboard",
        });
      })
      .catch((err) => {
        let msg = err.response.data.message;
        console.log(msg);
        this.setState({
          serverErr: msg,
          loading: false,
        });
        toast.warning("Some error occured!");
      });
  };
  _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.clickSubmit(e);
    }
  };

  render() {
    const { email, password, error } = this.state;
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
                        <h1>Login</h1>
                        <p className="text-muted">Sign In to your account</p>
                        <CInputGroup className="mb-3">
                          <CInputGroupPrepend>
                            <CInputGroupText>
                              <CIcon name="cil-user" />
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
                          {this.state.serverErr}
                        </div>
                        <CRow>
                          <CCol xs="6">
                            <CButton
                              color="primary"
                              className="px-4"
                              onClick={this.clickSubmit}
                            >
                              Login
                            </CButton>
                          </CCol>
                          <CCol xs="6">
                            <Link to="/signup">
                              <CButton color="danger" className="px-4">
                                Signup
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
                        <h2>BSA</h2>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
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

export default Login;
