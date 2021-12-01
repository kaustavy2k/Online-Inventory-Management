import React, { Component } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { token } from "../token";

class Edituser extends Component {
  constructor() {
    super();
    this.AuthData = JSON.parse(localStorage.getItem("AuthData"));
    this.state = {
      inputdata: {
        name: "",
        mobile: "",
        email: "",
        city: "",
        zip: "",
        state: "",
        country: "",
        usertype:"",
      },
      rolename:'',
      errors: {},
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    let inputdata = this.state.inputdata;
    //inputdata[event.target.name] = event.target.value;
    // console.log("handle", inputdata);
    this.setState({
      inputdata: { ...inputdata, [event.target.name]: event.target.value },
    });
  }
  componentDidUpdate(prevProps, prevState) {
    //console.log("didupdate");
    let input = this.state.inputdata;
    let errors = {};
    //console.log("prevstate", prevState);
    //console.log("currstate", this.state);
    if (
      prevState.inputdata["city"] !== this.state.inputdata["city"] ||
      prevState.inputdata["zip"] !== this.state.inputdata["zip"] ||
      prevState.inputdata["state"] !== this.state.inputdata["state"] ||
      prevState.inputdata["country"] !== this.state.inputdata["country"] ||
      prevState.inputdata["name"] !== this.state.inputdata["name"] ||
      prevState.inputdata["mobile"] !== this.state.inputdata["mobile"] ||
      prevState.inputdata["email"] !== this.state.inputdata["email"]
    ) {
      console.log("true");
      if (!this.state.inputdata["city"]) {
        errors["city"] = "Please enter your city";
      } else {
        errors["city"] = "";
      }
      if (!this.state.inputdata["zip"] || isNaN(this.state.inputdata["zip"])) {
        errors["zip"] = "Please enter your zip";
      } else {
        errors["zip"] = "";
      }
      if (!this.state.inputdata["state"]) {
        errors["state"] = "Please enter your state";
      } else {
        errors["state"] = "";
      }
      if (!this.state.inputdata["country"]) {
        errors["county"] = "Please enter your country";
      } else {
        errors["county"] = "";
      }
      if (!this.state.inputdata["email"]) {
        errors["email"] = "Please enter your email";
      } else {
        errors["email"] = "";
      }
      if (!this.state.inputdata["name"]) {
        errors["name"] = "Please enter your name";
      } else {
        errors["name"] = "";
      }
      if (!this.state.inputdata["mobile"]) {
        errors["mobile"] = "Please enter your mobile";
      } else {
        errors["mobile"] = "";
      }
      this.setState({ errors });
    }
  }
  validate() {
    let input = this.state.inputdata;
    let errors = {};
    let isValid = true;

    if (!input["name"]) {
      isValid = false;
      errors["name"] = "Please enter your name";
    }

    if (!input["mobile"]) {
      isValid = false;
      errors["mobile"] = "Please enter your mobile";
    }

    if (!input["email"]) {
      isValid = false;
      errors["email"] = "Please enter your email";
    }
    if (!input["city"]) {
      isValid = false;
      errors["city"] = "Please enter your city";
    }
    if (!input["zip"] || isNaN(input["zip"])) {
      isValid = false;
      errors["zip"] = "Please enter your zip";
    }
    if (!input["state"]) {
      isValid = false;
      errors["state"] = "Please enter your state";
    }
    if (!input["country"]) {
      isValid = false;
      errors["county"] = "Please enter your county";
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  }
  async componentDidMount() {
    console.log("didmount");

    let self = this;
    const userid = this.props.match.params.id;

    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/User-details/${userid}`,
      withCredentials: true,
      headers: {
        Bearer: token(),
      },
    })
      .then(function (response) {
        if (response.data.status === "success") {
          console.log("response data", response);
          self.setState({ loading: false, inputdata: response.data.data[0] });
          if(response.data.rolename.length > 0){
            self.setState({rolename:response.data.rolename[0].role_name})

          }
          console.log("res data", response.data.data[0].name);
        } else {
          toast.warning(`failed to fetch`);
          self.setState({ loading: false });
          console.log("response", response);
        }
      })
      .catch(function (error) {
        //this.setState({loading: false})
        //toast.warning(`Server Errors`);
        self.setState({ loading: false });
        console.log("error response", error);
      });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.inputdata);
    if (this.validate()) {
      let self = this;
      self.setState({ loading: true });

      const userid = this.props.match.params.id;
      console.log("userid", userid);
      axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}/User-Update/${userid}`,
        data: self.state.inputdata,
        withCredentials: true,
        headers: {
          Bearer: token(),
        },
      })
        .then(function (response) {
          if (response.data.status === "success") {
            console.log("response data", response);
            self.setState({ loading: false });
            toast.success(`Profile successfully updated`);
          } else {
            toast.warning(`failed to fetch`);
            self.setState({ loading: false });
            console.log("response", response);
          }
        })
        .catch(function (error) {
          //this.setState({loading: false})
          toast.warning(`Server Errors`);
          self.setState({ loading: false });
          console.log("error response", error);
        });
    }
  };

  render() {
    const { inputdata , rolename} = this.state;
    console.log('inputdata',inputdata)
    return (
      <LoadingOverlay
        active={this.state.loading}
        spinner={<Spinner animation="grow" variant="primary" size="lg" />}
      >
        <div className="card">
          <div className="card-header">Edit User </div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={inputdata.name}
                      className="form-control"
                      placeholder="Enter name"
                      onChange={this.handleChange}
                      id="name"
                    />
                    <div className="text-danger">{this.state.errors.name}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Mobile:</label>
                    <input
                      type="text"
                      name="mobile"
                      className="form-control"
                      value={inputdata.mobile}
                      placeholder="Enter mobile"
                      onChange={this.handleChange}
                      id="mobile"
                    />
                    <div className="text-danger">
                      {this.state.errors.mobile}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="text"
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={inputdata.email}
                      onChange={this.handleChange}
                      id="email"
                    />
                    <div className="text-danger">{this.state.errors.email}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>City:</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      placeholder="Enter city"
                      value={inputdata.city}
                      onChange={this.handleChange}
                      id="city"
                    />
                    <div className="text-danger">{this.state.errors.city}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Zip:</label>
                    <input
                      type="text"
                      name="zip"
                      value={inputdata.zip}
                      className="form-control"
                      placeholder="Enter zip"
                      onChange={this.handleChange}
                      id="zip"
                    />
                    <div className="text-danger">{this.state.errors.zip}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>State:</label>
                    <input
                      type="text"
                      name="state"
                      className="form-control"
                      placeholder="Enter state"
                      value={inputdata.state}
                      onChange={this.handleChange}
                      id="state"
                    />
                    <div className="text-danger">{this.state.errors.state}</div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Country:</label>
                    <input
                      type="text"
                      name="country"
                      className="form-control"
                      placeholder="Enter country"
                      value={inputdata.country}
                      onChange={this.handleChange}
                      id="country"
                    />
                    <div className="text-danger">
                      {this.state.errors.county}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                            <div className="form-group">
                            <label>User type:</label>
                            {this.AuthData.data.admin_role.role_name=='Super admin'?
                            <select class="form-control" value={
                              inputdata.usertype ==
                              ''
                                ? ""
                                : inputdata.usertype
                            } name="usertype"  onChange={this.handleChange}>
                                <option>--User Type--</option> 
                                <option value="Super admin">Super admin</option> 
                                <option value="Admin">Admin</option> 
                                <option value="Author">Author</option> 
                                <option value="Registered user">Registered user</option> 
			                      </select>   
                            :this.AuthData.data.admin_role.role_name=='Admin'?
                            
                            <select class="form-control" value={
                              inputdata.usertype ==
                              ''
                                ? ""
                                : inputdata.usertype
                            } name="usertype"  onChange={this.handleChange}>
                            <option>--User Type--</option> 
                            <option value="Admin">Admin</option> 
                            <option value="Author">Author</option> 
                            <option value="Registered user">Registered user</option> 
                            </select> 
                            :
                            <select class="form-control" value={
                              inputdata.usertype ==
                              ''
                                ? ""
                                : inputdata.usertype
                            } name="usertype"  onChange={this.handleChange}>
                            <option>--User Type--</option> 
                            <option value="Author">Author</option> 
                            <option value="Registered user">Registered user</option> 
                              </select>   
                            }
                            {/* <div className="text-danger">{this.state.FromDataError.usertype == "false"
                          ? ""
                          : this.state.FromDataError.usertype}</div> */}
                          </div>
                        </div>
              </div>
              <input type="submit" value="Submit" className="btn btn-primary" />{" "}
              &nbsp;
              <Link
                className="btn btn-danger"
                to="/admin/user-list"
                size="sm"
                color="danger"
              >
                {" "}
                Back
              </Link>
              <ToastContainer />
            </form>
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

export default Edituser;
