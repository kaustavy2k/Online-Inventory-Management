import React, { Component } from "react";
import { Spinner, Dropdown, Modal } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Dashboard/dashboard.css";
import { CButton } from "@coreui/react";

let timer;
class Status extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      useremail: "",
      quantityerr: "",
      nameerr: "",
      name: "",
      quantity: "",
      currid: {},
      show: false,
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
    this.setState({ loading: true });
    axios
      .get(`${process.env.REACT_APP_API_URL}/showtransactionitems`, {
        withCredentials: true,
      })
      .then((response) => {
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
    var user = JSON.parse(localStorage.getItem("client"));
    this.setState({ username: user.name, useremail: user.email });
    this.transactionitems();
  }
  componentDidUpdate(prevprops, prevState) {
    if (
      prevState.sortConfig.key !== this.state.sortConfig.key ||
      prevState.sortConfig.direction !== this.state.sortConfig.direction
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
  edititem = (id) => {
    this.setState((prevstate) => {
      return {
        show: !prevstate.show,
        currid: id,
        name: id.item,
        quantity: id.quantity,
      };
    });
  };
  handleChangeInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.name + "err"]: "",
    });
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
        flag: 1,
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
  delete = (id) => {
    let cnfirm = false;

    cnfirm = window.confirm(`Are you sure you want to delete this item?`);

    if (cnfirm) {
      this.setState({ loading: true });
      axios
        .get(`${process.env.REACT_APP_API_URL}/deletetransactionitems/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          this.transactionitems();

          toast.success("Item deleted successfully");
        })
        .catch((error) => {
          this.setState({ loading: false });
          toast.warning("Some error occured");
        });
    }
  };
  render() {
    const { items, current_page, per_page } = this.state;
    return (
      <>
        <Modal
          show={this.state.show}
          onHide={this.edititem.bind(this, "")}
          animation={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Item </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card">
              <div className="card-body">
                <div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Name*</label>
                        <input
                          defaultValue={this.state.currid.item}
                          name="name"
                          onChange={this.handleChangeInput}
                          autoComplete="off"
                          className="form-control"
                          placeholder="Enter name"
                          type="text"
                        />
                        <div className="text-danger">{this.state.nameerr}</div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Quantity*</label>
                            <input
                              defaultValue={this.state.currid.quantity}
                              name="quantity"
                              onChange={this.handleChangeInput}
                              autoComplete="off"
                              className="form-control"
                              placeholder="Enter Quantity"
                              type="number"
                            />
                            <div className="text-danger">
                              {this.state.quantityerr}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-primary" onClick={this.handleEdit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
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
                    <th scope="col">Cost (INR)</th>
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
                        <div>
                          {item.initiatedby ? item.initiatedby + " on" : "--"}
                          <br></br>
                          {item.initiateddate}
                        </div>
                      </td>
                      <td>
                        <div>
                          <strong>{item.quantity}</strong>
                        </div>
                      </td>
                      <td>
                        <div>
                          {item.status} (by {item.statusby}) on <br></br>
                          {item.statusdate || item.initiateddate}
                        </div>
                      </td>
                      <td>
                        <div>{item.cost}</div>
                      </td>
                      <td>
                        <CButton
                          color="primary"
                          onClick={this.edititem.bind(this, item)}
                          disabled={item.status !== "requested"}
                        >
                          Edit
                        </CButton>
                        &nbsp;
                        <CButton
                          color="danger"
                          onClick={this.delete.bind(this, item._id)}
                          disabled={item.status !== "requested"}
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

export default Status;
