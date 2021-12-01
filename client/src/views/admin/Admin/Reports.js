import React, { Component } from "react";
import { Spinner, Dropdown, Modal } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../dashboard/dashboard.css";
import { CButton } from "@coreui/react";
let timer;
class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocked: false,
      useremail: "",
      items: [],
      current_page: 1,
      per_page: 5,
      loading: false,
    };
  }
  reports = () => {
    this.setState({ loading: true });
    axios
      .get(`${process.env.REACT_APP_API_URL}/showreports`, {
        withCredentials: true,
      })
      .then((response) => {
        this.setState({
          loading: false,
          items: [...response.data.items],
          role: response.data.role,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log("error response", error);
        toast.warning("Some error occured!");
      });
  };
  componentDidMount() {
    this.reports();
  }

  render() {
    const { items, current_page, per_page } = this.state;
    return (
      <>
        <ToastContainer />
        <LoadingOverlay
          active={this.state.loading}
          spinner={<Spinner animation="grow" variant="primary" size="lg" />}
        >
          <br></br>
          <div className="card">
            <div className="card-header">Item Status</div>

            <div className="card-body scroller">
              <br></br>
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">SL</th>
                    <th scope="col">Given by</th>
                    <th scope="col">Reports</th>
                    <th scope="col">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i}>
                      <td>{(current_page - 1) * per_page + (i + 1)}</td>
                      <td>
                        <div>{item.initiatedby}</div>
                      </td>
                      <td>
                        <div className="limitreport">{item.report}</div>
                      </td>

                      <td>
                        <div>{item.role}</div>
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

export default Report;
