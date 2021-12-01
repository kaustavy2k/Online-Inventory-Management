import React, { Component } from "react";
import { Spinner, Dropdown, Modal } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../dashboard/dashboard.css";
import { CButton } from "@coreui/react";
let timer;
class ManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocked: false,
      useremail: "",
      items: [],
      current_page: 1,
      per_page: 5,
      totalData: 0,
      loading: false,
      deleted: 0,
      filterSearch: 0,
      sortConfig: {
        key: null,
        direction: null,
      },
    };
    this.searchref = React.createRef();
  }
  users = () => {
    this.setState({ loading: true });
    axios
      .get(`${process.env.REACT_APP_API_URL}/showusers`, {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({
          loading: false,
          items: [...response.data.items],
          role: response.data.role,
          filterSearch: 0,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log("error response", error);
        toast.warning("Some error occured!");
      });
  };

  filterList = (event) => {
    if (event.target.value.length) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        this.setState({ loading: true });
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/showusers?search=${event.target.value}`,
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            let items = [...response.data.items];
            this.setState({ filterSearch: 1, items, loading: false });
          })
          .catch((error) => {
            this.setState({ loading: false });
            toast.warning(`Some error occured!`);
          });
      }, 500);
    } else {
      this.users();
    }
  };
  componentDidMount() {
    var user = JSON.parse(localStorage.getItem("client"));
    this.setState({ username: user.name, useremail: user.email });

    this.users();
  }

  handleEdit = (e) => {
    if (this.validate()) {
      this.setState({ loading: true });
      e.preventDefault();
      let data = {
        _id: this.state.currid._id,
        item: this.state.name,
        quantity: this.state.quantity,
        flag: 1,
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}/updateusers`, data, {
          withCredentials: true,
        })
        .then((res) => {
          this.users();
          toast.success("Item updated successfully");
        })
        .catch((error) => {
          this.setState({ loading: false, deleted: 0 });
          toast.warning("Some error occured");
        });
    }
  };
  edit = (id, blocked) => {
    let cnfirm = false;

    cnfirm = window.confirm(`Do you confirm your action?`);
    if (cnfirm) {
      this.setState({ loading: true });
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/updateuser`,
          { id, blocked: !blocked },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          toast.success("User blocked");
          this.users();
        })
        .catch((error) => {
          this.setState({ loading: false });
          console.log("error response", error);
          toast.warning("Some error occured!");
        });
    }
  };
  delete = (id) => {
    let cnfirm = false;

    cnfirm = window.confirm(`Do you confirm your action?`);
    if (cnfirm) {
      this.setState({ loading: true });
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/deleteuser`,
          { id },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          toast.success("User deleted");

          this.users();
        })
        .catch((error) => {
          this.setState({ loading: false });
          console.log("error response", error);
          toast.warning("Some error occured!");
        });
    }
  };
  render() {
    const { items, current_page, per_page, totalData } = this.state;
    return (
      <>
        <ToastContainer />
        <LoadingOverlay
          active={this.state.loading}
          spinner={<Spinner animation="grow" variant="primary" size="lg" />}
        >
          <form>
            <fieldset className="form-group">
              <input
                type="text"
                id="search"
                className="form-control form-control-lg"
                placeholder="Search"
                ref={this.searchref}
                onChange={this.filterList}
              />
            </fieldset>
          </form>
          <br></br>
          <div className="card">
            <div className="card-header">Item Status</div>

            <div className="card-body scroller">
              <br></br>
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">SL</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Blocked</th>

                    <th scope="col">Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i}>
                      <td>{(current_page - 1) * per_page + (i + 1)}</td>
                      <td>
                        <div>{item.name}</div>
                      </td>
                      <td>
                        <div>{item.email}</div>
                      </td>
                      <td>
                        <div>{item.blocked ? "True" : "False"}</div>
                      </td>
                      <td>
                        <div>{item.role}</div>
                      </td>
                      <td>
                        <CButton
                          type="edit"
                          onClick={this.edit.bind(this, item._id, item.blocked)}
                          size="sm"
                          color="primary"
                          disabled={
                            item.email === this.state.useremail ||
                            this.state.role !== "admin"
                          }
                        >
                          {item.blocked ? "Unblock" : "Block"}
                        </CButton>
                        &nbsp;
                        <CButton
                          type="delete"
                          onClick={this.delete.bind(this, item._id)}
                          size="sm"
                          color="danger"
                          disabled={
                            item.email === this.state.useremail ||
                            this.state.role !== "admin"
                          }
                        >
                          Delete
                        </CButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </LoadingOverlay>
      </>
    );
  }
}

export default ManageUser;
