import React, { Component } from "react";
import { Spinner, Dropdown, Modal } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import Pagination from "react-js-pagination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./dashboard.css";
import { CButton } from "@coreui/react";
let timer;
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantityerr: "",
      nameerr: "",
      name: "",
      quantity: "",
      currid: {},
      show: false,
      items: [],
      role: "",
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
  collegeitems = () => {
    this.setState({ loading: true });
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/showcollegeitems?page=${this.state.current_page}&numPerPage=${this.state.per_page}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        this.setState({
          loading: false,
          items: [...response.data.items],
          role: response.data.role,
          totalData: response.data.totalitems,
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
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (event.target.value.length) {
        this.setState({ loading: true });
        axios
          .get(
            `${process.env.REACT_APP_API_URL}/showcollegeitems?search=${event.target.value}`,
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
      } else {
        this.collegeitems();
      }
    }, 500);
  };
  componentDidMount() {
    this.collegeitems();
  }
  componentDidUpdate(prevprops, prevState) {
    if (
      prevState.deleted !== this.state.deleted ||
      prevState.current_page !== this.state.current_page
    ) {
      this.searchref.current.value = "";
      this.collegeitems();
    }
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
  deleteitem = (id) => {
    let cnfirm = false;

    cnfirm = window.confirm(`Are you sure you want to delete this item?`);

    if (cnfirm) {
      this.setState({ loading: true, deleted: 0 });
      axios
        .get(`${process.env.REACT_APP_API_URL}/deletecollegeitems/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          this.setState({
            loading: false,
            deleted: 1,
            totalData: res.data.totalitems,
          });
          toast.success("Item deleted successfully");
        })
        .catch((error) => {
          this.setState({ loading: false, deleted: 0 });
          toast.warning("Some error occured");
        });
    }
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
  handlePageChange(pageNumber) {
    this.setState({ current_page: pageNumber, loading: true });
  }
  handleChangeInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.name + "err"]: "",
    });
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
        .post(`${process.env.REACT_APP_API_URL}/updatecollegeitems`, data, {
          withCredentials: true,
        })
        .then((res) => {
          this.collegeitems();
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
            <div className="card-header">College Inventory</div>

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
                    <th scope="col">Quantity</th>
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
                          <strong>{item.quantity}</strong>
                        </div>
                      </td>
                      <td>
                        <CButton
                          type="edit"
                          onClick={this.edititem.bind(this, item)}
                          size="sm"
                          color="primary"
                          disabled={this.state.role !== "admin"}
                        >
                          Edit
                        </CButton>
                        &nbsp;
                        <CButton
                          type="delete"
                          onClick={this.deleteitem.bind(this, item._id)}
                          size="sm"
                          color="danger"
                          disabled={this.state.role !== "admin"}
                        >
                          Delete
                        </CButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!this.state.filterSearch ? (
                <Pagination
                  activePage={current_page}
                  itemsCountPerPage={parseInt(per_page)}
                  totalItemsCount={totalData}
                  onChange={this.handlePageChange.bind(this)}
                  itemClass="page-item"
                  linkClass="page-link"
                  firstPageText="First"
                  lastPageText="Last"
                />
              ) : (
                ""
              )}
            </div>
          </div>
        </LoadingOverlay>
      </>
    );
  }
}

export default Dashboard;
