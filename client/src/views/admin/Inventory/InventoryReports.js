import React, { Component } from "react";
import { Spinner, Modal } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CButton } from "@coreui/react";
import "../Lab/lab.css"
class InventoryReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantityerr: "",
      reporterr: "",
      report: "",
      quantity: "",
      currid: {},
      show: false,
      items: [],
      current_page: 1,
      per_page: 5,
      loading: false,
    };
    this.searchref = React.createRef();
  }
  reportitems = () => {
    this.setState({ loading: true });
    axios
      .get(`${process.env.REACT_APP_API_URL}/showreports`, {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({
          loading: false,
          items: [...response.data.items],
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log("error response", error);
        toast.warning("Some error occured!");
      });
  };
  componentDidMount() {
    this.reportitems();
  }

  validate = () => {
    let formIsValid = true;
    let reporterr = "";
    if (!this.state.report) {
      formIsValid = false;
      reporterr = "Cannot be empty";
    }
    this.setState({ reporterr });
    return formIsValid;
  };
  showitem = () => {
    this.setState((prevstate) => {
      return {
        show: !prevstate.show,
        reporterr: "",
      };
    });
  };
  handleChangeInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.name + "err"]: "",
    });
  };
  delete = (id) => {
    let cnfirm = false;

    cnfirm = window.confirm(`Are you sure you want to delete this item?`);

    if (cnfirm) {
      this.setState({ loading: true });
      axios
        .get(`${process.env.REACT_APP_API_URL}/deletereports/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          this.reportitems();

          toast.success("Item deleted successfully");
        })
        .catch((error) => {
          this.setState({ loading: false });
          toast.warning("Some error occured");
        });
    }
  };
  handleAdd = () => {
    if (this.validate()) {
      let cnfirm = false;

      cnfirm = window.confirm(
        `Are you sure you want to add this report? Warning: Once added you cannot edit!`
      );

      if (cnfirm) {
        this.setState({ loading: true });
        this.showitem();
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/addreports`,
            {
              report: this.state.report,
            },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            this.reportitems();

            toast.success("Item Added successfully");
          })
          .catch((error) => {
            this.setState({ loading: false });
            toast.warning("Some error occured");
          });
      }
    }
  };
  render() {
    const { items, current_page, per_page } = this.state;
    return (
      <>
        <Modal
          show={this.state.show}
          onHide={this.showitem}
          animation={false}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Item </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Name*</label>
                      <textarea
                        name="report"
                        onChange={this.handleChangeInput}
                        autoComplete="off"
                        className="form-control"
                        placeholder="Enter report"
                        type="text"
                      />
                      <div className="text-danger">{this.state.reporterr}</div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary" onClick={this.handleAdd}>
                  Submit
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <ToastContainer />
        <LoadingOverlay
          active={this.state.loading}
          spinner={<Spinner animation="grow" variant="primary" size="lg" />}
        >
          <div className="card">
            <div className="card-header flexcheck">
              <div>Item Status</div>
              <CButton color="success" onClick={this.showitem}>
                Add Report
              </CButton>
            </div>

            <div className="card-body scroller">
              <br></br>
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">SL</th>
                    <th scope="col">
                      <strong>Report</strong>
                    </th>
                    <th scope="col">Requested By</th>
                    <th scope="col">Role</th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(
                    (item, i) =>
                      item.role === "inventory-in-charge" && (
                        <tr key={i}>
                          <td>{(current_page - 1) * per_page + (i + 1)}</td>
                          <td>
                            <div className="limitreport">{item.report}</div>
                          </td>
                          <td>
                            <div>{item.initiatedby}</div>
                          </td>
                          <td>
                            <div>
                              <strong>{item.role}</strong>
                            </div>
                          </td>

                          <td>
                            <CButton
                              color="danger"
                              onClick={this.delete.bind(this, item._id)}
                            >
                              Delete
                            </CButton>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </LoadingOverlay>
      </>
    );
  }
}

export default InventoryReports;
