import React, { Component } from "react";
import { Spinner, Dropdown } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import Select from "react-select";
import DefaultProfile from "./avatar.png";
import axios from "axios";
import { token } from "../token";
import "./user.css";
import { toast, ToastContainer } from "react-toastify";
import Pagination from "react-js-pagination";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { Flag } from "semantic-ui-react";
class User extends Component {
  constructor(props) {
    super(props);
    this.AuthData = JSON.parse(localStorage.getItem("AuthData")); 
    this.state = {
      users: [],
      updated: [],
      current_page: 1,
      per_page: 10,
      totalPage: null,
      totalData: 0,
      search: 0,
      loading: false,
      role: 0,
      myrole: "All",
    };
  }
  userList = (flag) => {
    let self = this;
    let cp, role;
    console.log("gflaf", flag);
    if (flag) {
      cp = 1;
      role = "All";
    } else {
      cp = this.state.current_page;
      role = this.state.myrole;
    }
    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/user-list?page=${cp}&numPerPage=${this.state.per_page}&role=${role}`,
      withCredentials: true,
      headers: {
        Bearer: token(),
      },
    })
      .then(function (response) {
        console.log(response);

        let users = [...response.data.User];
        let current_page = parseInt(response.data.pagination.current);
        let per_page = parseInt(response.data.pagination.perPage);
        let totalData = response.data.pagination.totalData;
        let totalPage = response.data.pagination.totalPages;
        self.setState({
          users,
          current_page,
          per_page,
          totalPage,
          totalData,
          loading: false,
          role: 0,
        });
      })
      .catch(function (error) {
        //toast.warning(`Server Error~`);
        console.log("error response", error);
      });
  };

  filterList = (event) => {
    this.setState({ loading: true });

    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/user-list?search=${event.target.value}&role=${this.state.myrole}`,
      withCredentials: true,
      headers: {
        Bearer: token(),
      },
    })
      .then((response) => {
        let users = [...response.data.User];
        this.setState({
          users,
          search: 1,
          //role: 1,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
        //toast.warning(`Server Error~`);
        console.log("error response", error);
      });
  };
  componentDidMount() {
    this.setState({ loading: true });
    this.userList();

    //console.log(c.token)
  }
  componentDidUpdate(prevprops, prevState) {
    if (prevState.current_page != this.state.current_page) {
      console.log("didmount");
      if (this.state.role) {
        console.log("ppaginate");
        this.paginateRole();
      } else {
        console.log("userlist");
        this.userList();
      }
    }
  }
  paginateRole = (id) => {
    //console.log("currpage",this.state.current_page)
    let r, cp;
    if (id) {
      r = id;
      cp = 1;
    } else {
      r = this.state.myrole;
      cp = this.state.current_page;
    }
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/User-paginate?rolename=${r}&page=${cp}&numPerPage=${this.state.per_page}`,
        {
          withCredentials: true,
          headers: {
            Bearer: token(),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        let users = [...response.data.User];
        let current_page = parseInt(response.data.pagination.current);
        let per_page = parseInt(response.data.pagination.perPage);
        let totalData = response.data.pagination.totalData;
        let totalPage = response.data.pagination.totalPages;
        this.setState({
          users,
          current_page,
          per_page,
          totalPage,
          totalData,
          loading: false,
          role: 1,
          myrole: r,
        });
      });
  };
  checkRole = (e) => {
    //console.log("userrrrrr", e.value);
    let id = e.value;
    if (e.value == "All") {
      this.setState({ myrole: "All" });
      this.userList(1);
    } else {
      //let r = parseInt(e.target.textContent);
      this.setState({ loading: true });
      this.paginateRole(id);
    }
  };
  handlePageChange(pageNumber) {
    if (this.state.current_page != pageNumber) {
      this.setState({
        current_page: pageNumber,
        search: 0,
        //role: null,
        loading: true,
      });
    }
  }
  handleStatusChange = (id) => {
    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}/user-status-update/${id}`,
      withCredentials: true,
      headers: {
        Bearer: token(),
      },
    })
      .then((response) => {
        toast.success(`Status changed successfully`);
      })
      .catch((error) => {
        toast.warning(`Server Error~`);
      });
  };
  render() {
    const { users, current_page, per_page, totalData } = this.state;
    let actualUsers;
    if (this.state.search) {
      actualUsers = [...this.state.updated];
    } else {
      actualUsers = [...this.state.users];
    }
    // if (this.state.role) {
    //   actualUsers = actualUsers.filter((item) => {
    //     console.log("hfhfhfh", this.state.role);
    //     if (this.state.role !== "X10D User") {
    //       if (item.role_name === this.state.role) {
    //         return item;
    //       }
    //     } else {
    //       if (item.role_name == null) {
    //         return item;
    //       }
    //     }
    //   });
    // }
    return (
      <>
        <form>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search"
              onChange={this.filterList}
            />
          </fieldset>
        </form>
        <LoadingOverlay
          active={this.state.loading}
          spinner={<Spinner animation="grow" variant="primary" size="lg" />}
        >
          <div className="card">
            <div className="card-header role-seperator">
              <h4>User List</h4>
              {/* <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Select Role
                </Dropdown.Toggle>

                <Dropdown.Menu onClick={this.checkRole.bind(this)}>
                  <Dropdown.Item id="Super admin">Super admin</Dropdown.Item>
                  <Dropdown.Item id="Admin">Admin</Dropdown.Item>
                  <Dropdown.Item id="Author">Author</Dropdown.Item>
                  <Dropdown.Item id="Registered user">
                    Registered user
                  </Dropdown.Item>
                  <Dropdown.Item id="NULL">X10D User</Dropdown.Item>
                  <Dropdown.Item id="All">All</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
              {this.AuthData.data.admin_role.role_name=='Super admin'?
                <Select className="select"
                defaultValue={[{
                  value: "All",
                  label: "All",
                }]}
                options={[
                  { value: "Super admin", label: "Super admin" },
                  { value: "Admin", label: "Admin" },
                  { value: "Author", label: "Author" },
                  { value: "Registered user", label: "Registered user" },
                  { value: "NULL", label: "X10D User" },
                  { value: "All", label: "All" },
                ]}
                onChange={this.checkRole}
              /> : this.AuthData.data.admin_role.role_name=='Admin'?
              <Select className="select"
                defaultValue={[{
                  value: "All",
                  label: "All",
                }]}
                options={[
                  { value: "Admin", label: "Admin" },
                  { value: "Author", label: "Author" },
                  { value: "Registered user", label: "Registered user" },
                  { value: "NULL", label: "X10D User" },
                  { value: "All", label: "All" },
                ]}
                onChange={this.checkRole}
              />:<Select className="select"
              defaultValue={[{
                value: "All",
                label: "All",
              }]}
              options={[
                { value: "Author", label: "Author" },
                { value: "Registered user", label: "Registered user" },
                { value: "All", label: "All" },
              ]}
              onChange={this.checkRole}
            />
              }
              
            </div>

            <div className="card-body scroller">
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">SL</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.users.map((user, i) => (
                    
                    <tr key={i}>
                      <th scope="row">{(current_page - 1) * 10 + (i + 1)}</th>
                      <td>
                        <a
                          href={`https://api.x10dadmin.com/storage/${user.image}`}
                          target="_blank"
                        >
                          <img
                            src={`https://api.x10dadmin.com/storage/${user.image}`}
                            onError={(i) =>
                              (i.target.src = `${DefaultProfile}`)
                            }
                            style={{ width: "30px", height: "30px" }}
                            className="img-thumbnail"
                          />
                        </a>
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {user.role_name != null ? user.role_name : "X10D User"}
                      </td>
                      <td>
                        <Toggle
                          id="cheese-status"
                          defaultChecked={
                            user.status == "active" ? true : false
                          }
                          onChange={() => this.handleStatusChange(user.id)}
                        />
                      </td>
                      <td>
                        {/* <button className="btn btn-primary">View</button> &nbsp; */}
                        <Link
                          className="btn btn-primary"
                          to={`/admin/user/edit-user/${user.id}`}
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ToastContainer />
            <Pagination
              activePage={current_page}
              itemsCountPerPage={per_page}
              totalItemsCount={totalData}
              onChange={this.handlePageChange.bind(this)}
              itemClass="page-item"
              linkClass="page-link"
              firstPageText="First"
              lastPageText="Last"
            />
          </div>
        </LoadingOverlay>
      </>
    );
  }
}

export default User;
