import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Dashboard/dashboard.css";
import { CButton } from "@coreui/react";

class InventoryPermissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      useremail: "",
      show: false,
      items: [],
      current_page: 1,
      per_page: 5,
      totalData: 0,
      loading: false,
    };
  }
  transactionitems = () => {
    this.setState({ loading: true });
    Promise.all([
      axios.get(`${process.env.REACT_APP_API_URL}/showtransactionitems`, {
        withCredentials: true,
      }),
      axios.get(`${process.env.REACT_APP_API_URL}/showinventoryitems`, {
        withCredentials: true,
      }),
    ])
      .then((response) => {
        let items = [];
        for (let i of response[0].data.items) {
          let flag = 0;
          for (let j of response[1].data.items) {
            if (i.item === j.item) {
              flag = 1;
              i.costperitem = j.cost;
              i.availability = j.quantity;
              items.push(i);
              break;
            }
          }
          if (flag === 0) {
            i.costperitem = "--";
            i.availability = 0;
            items.push(i);
          }
        }
        this.setState({
          loading: false,
          items: [...items],
          filterSearch: 0,
        });
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log("error response", error);
        toast.warning("Some error occured!");
      });
  };

  componentDidMount() {
    var user = JSON.parse(localStorage.getItem("client"));
    this.setState({ username: user.name, useremail: user.email });
    this.transactionitems();
  }

  alter = (val, id, item, quantity, costperitem) => {
    let cnfirm = false;

    cnfirm = window.confirm(`Do you confirm your action?`);
    if (cnfirm) {
      this.setState({ loading: true });
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/updatetransactionitems`,
          { status: val, _id: id, cost: quantity * costperitem, flag: 2 },
          {
            withCredentials: true,
          }
        )
        .then(() => {
          return axios.post(
            `${process.env.REACT_APP_API_URL}/updateinventoryitems`,
            { item: item, _id: id, quantity: quantity, flag: 1 },
            {
              withCredentials: true,
            }
          );
        })
        .then(() => {
          this.transactionitems();
        })
        .catch((error) => {
          this.setState({ loading: false });
          console.log("error response", error);
          toast.warning("Some error occured!");
        });
    }
  };
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
            <div className="card-header">Requested Items</div>

            <div className="card-body scroller">
              <br></br>
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">SL</th>
                    <th scope="col">Item</th>
                    <th scope="col">Availability</th>
                    <th scope="col">Requested</th>
                    <th scope="col">Cost/Item (INR)</th>
                    <th scope="col">Total Cost (INR)</th>
                    <th scope="col">Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) =>
                    item.status === "approved" ||
                    item.status === "paid" ||
                    item.status === "payment in progress" ||
                    item.status === "available now" ||
                    item.status === "out of stock" ? (
                      <tr key={i}>
                        <td>{(current_page - 1) * per_page + (i + 1)}</td>
                        <td>
                          <div>{item.item}</div>
                        </td>
                        <td>
                          <div>{item.availability}</div>
                        </td>
                        <td>
                          <div>
                            <strong>{item.quantity}</strong>
                          </div>
                        </td>
                        <td>
                          <div>{item.costperitem}</div>
                        </td>
                        <td>
                          <div>{item.cost}</div>
                        </td>
                        <td>
                          <div>
                            {item.status} (by {item.statusby}) on <br></br>
                            {item.statusdate || item.initiateddate}
                          </div>
                        </td>
                        <td>
                          <CButton
                            color="danger"
                            onClick={this.alter.bind(
                              this,
                              "out of stock",
                              item._id,
                              item.item,
                              0
                            )}
                            disabled={item.status === "paid"}
                          >
                            Deny
                          </CButton>
                          &nbsp;
                          <CButton
                            color="success"
                            onClick={this.alter.bind(
                              this,
                              "available now",
                              item._id,
                              item.item,
                              item.quantity,
                              item.costperitem
                            )}
                            disabled={
                              item.availability < item.quantity ||
                              item.status === "available now"
                            }
                          >
                            Approve
                          </CButton>
                        </td>
                      </tr>
                    ) : null
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

export default InventoryPermissions;
