import React from "react";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
class Update extends React.Component {
  constructor() {
    let role = JSON.parse(localStorage.getItem("client"));

    super();
    this.state = {
      input: { name: role.name, email: role.email },
      errors: {},
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
  }

  handleChange(event) {
    let input = this.state.input;
    let errors = this.state.errors;

    input[event.target.name] = event.target.value;
    errors[event.target.name] = "";
    this.setState({
      input: input,
      errors,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.validate1()) {
      let cnf = window.confirm("Are you sure want to submit?");
      if (cnf) {
        this.setState({ loading: true });
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/update`,
            { name: this.state.input.name, email: this.state.input.email },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            localStorage.setItem(
              "client",
              JSON.stringify(response.data.data.user)
            );
            toast.success(`Updated successfully!`);
            this.props.history.push({
              pathname: "/dashboard",
            });
          })
          .catch((error) => {
            this.setState({ loading: false });
            toast.warning(`Some error occured!`);
          });
      }
    }
  }

  handleSubmit2(event) {
    event.preventDefault();
    console.log(this.state);
    if (this.validate2()) {
      let cnf = window.confirm("Are you sure want to submit?");
      if (cnf) {
        this.setState({ loading: true });
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/update-password`,
            {
              password: this.state.input.password,
              oldpassword: this.state.input.oldpassword,
              passwordConfirm: this.state.input.confirm_password,
            },
            {
              withCredentials: true,
            }
          )
          .then(() => {
            this.setState({ loading: false });
            toast.success(`Updated successfully!`);
          })
          .catch((error) => {
            this.setState({ loading: false });
            toast.warning(`Some error occured!`);
          });
      }
    }
  }

  validate1 = () => {
    let input = this.state.input;
    let errors = {};
    let isValid = true;
    if (!input["name"]) {
      isValid = false;
      errors["name"] = "Please enter your name.";
    }
    if (!input["email"]) {
      isValid = false;
      errors["email"] = "Please enter your email.";
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  };
  validate2 = () => {
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if (!input["oldpassword"]) {
      isValid = false;
      errors["oldpassword"] = "Please enter your password.";
    }

    if (!input["password"]) {
      isValid = false;
      errors["password"] = "Please enter your new password.";
    }

    if (!input["confirm_password"]) {
      isValid = false;
      errors["confirm_password"] = "Please enter your confirm password.";
    }

    if (
      typeof input["password"] !== "undefined" &&
      typeof input["confirm_password"] !== "undefined"
    ) {
      if (input["password"] !== input["confirm_password"]) {
        isValid = false;
        errors["password"] = "Passwords don't match.";
      }
    }

    this.setState({
      errors: errors,
    });

    return isValid;
  };

  render() {
    return (
      <LoadingOverlay
        active={this.state.loading}
        spinner={<Spinner animation="grow" variant="primary" size="lg" />}
      >
        <ToastContainer />
        <div className="card">
          <div className="card-header">Change Name/Email</div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="name"
                  name="name"
                  value={this.state.input.name}
                  onChange={this.handleChange}
                  className="form-control"
                  id="name"
                />

                <div className="text-danger">{this.state.errors.name}</div>
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={this.state.input.email}
                  onChange={this.handleChange}
                  className="form-control"
                  id="email"
                />

                <div className="text-danger">{this.state.errors.email}</div>
              </div>

              <input type="submit" value="Submit" className="btn btn-primary" />
            </form>
          </div>
        </div>
        <div className="card">
          <div className="card-header">Change Password</div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit2}>
              <div className="form-group">
                <label>Old Password:</label>
                <input
                  type="password"
                  name="oldpassword"
                  value={this.state.input.oldpassword}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter old password"
                  id="oldpassword"
                />

                <div className="text-danger">
                  {this.state.errors.oldpassword}
                </div>
              </div>
              <div className="form-group">
                <label>New Password:</label>
                <input
                  type="password"
                  name="password"
                  value={this.state.input.password}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter new password"
                  id="password"
                />

                <div className="text-danger">{this.state.errors.password}</div>
              </div>

              <div className="form-group">
                <label>Confirm Password:</label>
                <input
                  type="password"
                  name="confirm_password"
                  value={this.state.input.confirm_password}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter confirm password"
                  id="confirm_password"
                />

                <div className="text-danger">
                  {this.state.errors.confirm_password}
                </div>
              </div>

              <input type="submit" value="Submit" className="btn btn-primary" />
            </form>
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

export default Update;
