import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Dashboard/dashboard.css";
import StripeCheckout from "react-stripe-checkout";
import { CButton } from "@coreui/react";

class Payments extends Component {
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

  componentDidMount() {
    var user = JSON.parse(localStorage.getItem("client"));
    this.setState({ username: user.name, useremail: user.email });
    this.transactionitems();
  }

  alter = (val, id) => {
    let cnfirm = false;

    cnfirm = window.confirm(`Do you confirm your action?`);
    if (cnfirm) {
      this.setState({ loading: true });
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/updatetransactionitems`,
          { status: val, _id: id },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          // console.log(response.data.items);
          this.transactionitems();
        })
        .catch((error) => {
          this.setState({ loading: false });
          console.log("error response", error);
          toast.warning("Some error occured!");
        });
    }
  };
  payment = (total, id, item, quantity, token) => {
    this.setState({ loading: true });
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/paytransactionitems`,
        {
          token,
          total,
          id,
          item,
          quantity,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Payment Successful!");
        this.transactionitems();
      })
      .catch((err) => {
        this.setState({ loading: false });
        toast.warn("Some error occured!");
      });
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
            <div className="card-header">Payments</div>

            <div className="card-body scroller">
              <br></br>
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">SL</th>
                    <th scope="col">Item</th>
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
                          {item.statusdate||item.initiateddate}
                        </div>
                      </td>
                      <td>
                        <div>{item.cost}</div>
                      </td>
                      <td>
                        <CButton
                          color="danger"
                          onClick={this.alter.bind(this, "denied", item._id)}
                          disabled={item.status !== "payment in progress"}
                        >
                          Deny
                        </CButton>
                        &nbsp;
                        <CButton
                          color="success"
                          onClick={this.alter.bind(this, "paid", item._id)}
                          disabled={item.status !== "payment in progress"}
                        >
                          <StripeCheckout
                            stripeKey="pk_test_51JISvASGTGDeZiN2L6dVpSBtCCkfDMDwuR4WwUyLmDRksGsR2eRIraXliSHHKbtDyAlU89yVuxYmEKGGJOd1mZKk00YlteVhG5"
                            token={this.payment.bind(
                              this,
                              item.cost,
                              item._id,
                              item.item,
                              item.quantity
                            )}
                            name={this.state.username}
                            email={this.state.useremail}
                          >
                            Pay Now
                          </StripeCheckout>
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

export default Payments;
