import React, { Component } from "react";
import { Spinner, Dropdown, Modal } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../dashboard/dashboard.css";
import "react-date-range/dist/theme/default.css";
let timer;
class Permissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  transactionitems = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/showtransactionitems`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.items);
        this.setState({
          loading: false,
          items: [...response.data.items],
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
            `${process.env.REACT_APP_API_URL}/showtransactionitems?search=${event.target.value}`,
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
      this.transactionitems();
    }
  };
  componentDidMount() {
    this.setState({ loading: true });
    this.transactionitems();
  }
  componentDidUpdate(prevprops, prevState) {
    if (
      prevState.sortConfig.key != this.state.sortConfig.key ||
      prevState.sortConfig.direction != this.state.sortConfig.direction
    ) {
      let sortableItems = [...this.state.items];
      if (this.state.sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[this.state.sortConfig.key] < b[this.state.sortConfig.key]) {
            return this.state.sortConfig.direction === "ascending" ? -1 : 1;
          }
          if (a[this.state.sortConfig.key] > b[this.state.sortConfig.key]) {
            return this.state.sortConfig.direction === "ascending" ? 1 : -1;
          }
          return 0;
        });
      }
      this.setState({ items: [...sortableItems] });
    }
  }
  requestSort = (key) => {
    let direction = "ascending";
    if (
      this.state.sortConfig &&
      this.state.sortConfig.key === key &&
      this.state.sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    this.setState({ sortConfig: { key, direction } });
  };

  validate = () => {
    let formIsValid = true;
    let nameerr = "";
    let quantityerr = "";
    if (!this.state.name) {
      formIsValid = false;
      nameerr = "Cannot be empty";
    }

    if (!this.state.quantity || this.state.quantity < 0) {
      formIsValid = false;
      quantityerr = "Cannot be empty or negative";
    }
    this.setState({ nameerr, quantityerr });
    return formIsValid;
  };
  handleEdit = (e) => {
    if (this.validate()) {
      this.setState({ loading: true });
      this.edititem("");
      e.preventDefault();
      let data = {
        _id: this.state.currid._id,
        item: this.state.name,
        quantity: this.state.quantity,
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}/updatetransactionitems`, data, {
          withCredentials: true,
        })
        .then((res) => {
          this.transactionitems();
          toast.success("Item updated successfully");
        })
        .catch((error) => {
          this.setState({ loading: false, deleted: 0 });
          toast.warning("Some error occured");
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
                    <th scope="col">
                      <Dropdown.Toggle
                        className="headingSort"
                        onClick={this.requestSort.bind(this, "item")}
                        style={{
                          backgroundColor: "#636f83",
                          borderStyle: "none",
                        }}
                      >
                        <strong>Item</strong>
                      </Dropdown.Toggle>
                    </th>
                    <th scope="col">Requested By</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i}>
                      <td>{(current_page - 1) * per_page + (i + 1)}</td>
                      <td>
                        <div>{item.item}</div>
                      </td>
                      <td>
                        <div>{item.initiatedby}</div>
                      </td>
                      <td>
                        <div>
                          <strong>{item.quantity}</strong>
                        </div>
                      </td>
                      <td>
                        <div>{item.status}</div>
                      </td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="secondary"
                            id="dropdown-basic"
                          >
                            Select Action
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              disabled={
                                item.status === "approved" ||
                                item.status === "paid" ||
                                item.status === "available now"
                              }
                            >
                              Approve
                            </Dropdown.Item>
                            <Dropdown.Item
                              disabled={
                                item.status === "denied" ||
                                item.status === "paid" ||
                                item.status === "available now"
                              }
                            >
                              Deny
                            </Dropdown.Item>
                            <Dropdown.Item
                              disabled={
                                item.status === "paid" ||
                                item.status === "payment in progress" ||
                                item.status === "available now" ||
                                item.status === "inspection"
                              }
                            >
                              Request Payment
                            </Dropdown.Item>
                            <Dropdown.Item
                              disabled={
                                item.status === "paid" ||
                                item.status === "available now" ||
                                item.status === "payment in progress" ||
                                item.status === "inspection"
                              }
                            >
                              Pay Now
                            </Dropdown.Item>
                            <Dropdown.Item
                              disabled={
                                item.status === "paid" ||
                                item.status === "payment in progress" ||
                                item.status === "available now"
                              }
                            >
                              Edit Item
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
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

export default Permissions;
