import React, { Component } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { token } from "../token";
import Select from "react-select";
//import validation from "../../appUser/validate/validator";
class AddUser extends Component {
  constructor(props) {
    super(props);
    this.AuthData = JSON.parse(localStorage.getItem("AuthData"));
    this.state = {
      inputdata: {},
      errors: {},

      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      universityOptions: [],
      university: "",
      phone: "",
      usertype: "",
      loader: false,

      FromDataError: {
        fullname: "false",
        email: "false",
        password: "false",
        university: "false",
        phone: "false",
        usertype: "false",
      },
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleOnChange = (e) => {
    e.persist();
    console.log("user---typr----", e.target.value);
    let inputValue = e.target.value;
    let { FromDataError } = this.state;
    var valid_obj = {
      value: inputValue,
      rules: e.target.getAttribute("validaterule"),
      message: e.target.getAttribute("validatemsg"),
    };
    // validation(valid_obj).then((error) => {
    //   console.log("aaaaaaaaaaa", error);
    //   FromDataError[e.target.name] = error;
    //   this.setState({ FromDataError });

    //   // setTimeout(() => {
    //   //   this.setState({
    //   //     [e.target.name]: inputValue,
    //   //   });

    //   // }, 50);
    //   this.setState({
    //     [e.target.name]: inputValue,
    //   });
    // });
  };

  handleChange(event) {
    let inputdata = this.state.inputdata;
    inputdata[event.target.name] = event.target.value;

    this.setState({
      inputdata: inputdata,
    });
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
    if (!input["zip"]) {
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
    let self = this;
    const userid = this.props.match.params.id;

    //    await axios({
    //         method: 'get',
    //         url: `${process.env.REACT_APP_API_URL}/User-details/${userid}`,
    //         withCredentials: true,
    //         headers:{
    //           Bearer:token(),
    //         }
    //         })
    //         .then(function (response) {
    //             if(response.data.status === 'success'){
    //               console.log('response data',response);
    //               self.setState({loading:false,inputdata:(response.data.data)[0]})
    //               //console.log('res data',(response.data.data)[0].name)
    //             } else{
    //                 toast.warning(`failed to fetch`);
    //                 self.setState({loading:false})
    //                 console.log("response",response);
    //             }
    //         }).catch(function (error) {
    //           //this.setState({loading: false})
    //           //toast.warning(`Server Errors`);
    //           self.setState({loading:false})
    //           console.log("error response",error);
    //         });
  }
  handleOnSubmit = (e) => {
    console.log("university", this.state.university);
    e.preventDefault();
    if (this.validateForm(this.state.FromDataError)) {
      this.setState({ loader: true });
      let self = this;
      const formData = {
        fullname: this.state.fullname,
        phone: this.state.phone,
        email: this.state.email,
        university: this.state.university,
        usertype: this.state.usertype,
        password: this.state.password,
        created_by: this.AuthData.data.id,
      };
      console.log("formData", formData);
      //return false
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/add-user`,
        data: formData,
        headers: {
          Bearer: token(),
        },
      })
        .then((response) => {
          if (response.data.success) {
            console.log("response data", response);
            toast.success(response.data.message);

            setTimeout(() => {
              this.props.history.push({
                pathname: "/admin/user-list",
              });
            }, 1500);
          } else {
            toast.warning(response.data.message);
            self.setState({ loading: false });
          }
        })
        .catch((error) => {
          self.setState({ loading: false });
          console.log("error response", error);
        });
    }
  };

  fetchUniversities = (inputValue) => {
    //console.log("I am here", inputValue)
    axios
      .post(`${process.env.REACT_APP_API_URL}/fetch-universities`, {
        inputValue,
      })
      .then(async (res) => {
        if (res.data.success) {
          await this.setState({ universityOptions: res.data.value });
        }
        //console.log("after fetch", this.state.universityOptions)
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  validateForm(errors) {
    let valid = true;
    let sta = this;
    let FromDataError = this.state.FromDataError;

    for (const [key, value] of Object.entries(errors)) {
      if (value.length > 0) {
        if (value === "false") {
          FromDataError[key] = "This field is required";
          sta.setState({ FromDataError });
        }

        valid = false;
      }
    }

    return valid;
  }

  handleSetUniversity = async (value) => {
    console.log("on change", value);
    let sta = this;
    let FromDataError = this.state.FromDataError;
    if (value != null) {
      await this.setState({ university: value });
      for (const [key, value] of Object.entries(this.state.FromDataError)) {
        console.log("I ahm ", key);
        if (
          key == "university" &&
          value.length > 0 &&
          this.state.university != ""
        ) {
          console.log("there", value);
          FromDataError["university"] = "";
          sta.setState({ FromDataError });
        }
      }
    } else {
      this.setState({ university: "" });
    }
  };

  render() {
    const { inputdata } = this.state;
    //console.log('AuthData',this.AuthData.data)
    return (
      <LoadingOverlay
        active={this.state.loading}
        spinner={<Spinner animation="grow" variant="primary" size="lg" />}
      >
        <div className="card">
          <div className="card-header">Add User </div>
          <div className="card-body">
            <form onSubmit={this.handleOnSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="fullname"
                      value={this.state.fullname}
                      className="form-control"
                      placeholder="Enter name"
                      onChange={this.handleOnChange}
                      id="name"
                    />
                    <div className="text-danger">
                      {this.state.FromDataError.fullname == "false"
                        ? ""
                        : this.state.FromDataError.fullname}
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
                      value={this.state.email}
                      onChange={this.handleOnChange}
                      id="email"
                    />
                    <div className="text-danger">
                      {" "}
                      {this.state.FromDataError.email == "false"
                        ? ""
                        : this.state.FromDataError.email}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Mobile:</label>
                    <input
                      type="number"
                      name="phone"
                      className="form-control"
                      value={this.state.phone}
                      placeholder="Enter mobile"
                      onChange={this.handleOnChange}
                      id="mobile"
                      validaterule={["required", "phone", "numeric"]}
                      validatemsg={[
                        "Phone number is required",
                        "Please enter a valid phone number",
                        "Only digits are allowed",
                      ]}
                    />
                    <div className="text-danger">
                      {this.state.FromDataError.phone == "false"
                        ? ""
                        : this.state.FromDataError.phone}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Password:</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={this.state.password}
                      placeholder="Enter password"
                      onChange={this.handleOnChange}
                      validaterule={["required", "password"]}
                      validatemsg={[
                        "Password field is required",
                        "Password length must be atleast 6 characters",
                      ]}
                    />
                    <div className="text-danger">
                      {this.state.FromDataError.password == "false"
                        ? ""
                        : this.state.FromDataError.password}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>User type:</label>
                    {this.AuthData.data.admin_role.role_name ==
                    "Super admin" ? (
                      <select
                        class="form-control"
                        name="usertype"
                        onChange={this.handleOnChange}
                      >
                        <option>--User Type--</option>
                        <option value="Super admin">Super admin</option>
                        <option value="Admin">Admin</option>
                        <option value="Author">Author</option>
                        <option value="Registered user">Registered user</option>
                      </select>
                    ) : this.AuthData.data.admin_role.role_name == "Admin" ? (
                      <select
                        class="form-control"
                        name="usertype"
                        onChange={this.handleOnChange}
                      >
                        <option>--User Type--</option>
                        <option value="Admin">Admin</option>
                        <option value="Author">Author</option>
                        <option value="Registered user">Registered user</option>
                      </select>
                    ) : (
                      <select
                        class="form-control"
                        name="usertype"
                        onChange={this.handleOnChange}
                      >
                        <option>--User Type--</option>
                        <option value="Author">Author</option>
                        <option value="Registered user">Registered user</option>
                      </select>
                    )}
                    <div className="text-danger">
                      {this.state.FromDataError.usertype == "false"
                        ? ""
                        : this.state.FromDataError.usertype}
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>University:</label>
                    <Select
                      className="react-select-container"
                      classNamePrefix="react-select"
                      isClearable
                      value={this.state.university}
                      onInputChange={this.fetchUniversities}
                      onChange={this.handleSetUniversity}
                      options={this.state.universityOptions}
                      onMenuOpen={this.fetchUniversities}
                      placeholder="Select University..."
                      //styles={customStyles}
                    />
                    <div className="text-danger">
                      {this.state.FromDataError.university == "false"
                        ? ""
                        : this.state.FromDataError.university}
                    </div>
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

export default AddUser;
