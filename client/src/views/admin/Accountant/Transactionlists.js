import React, { Component } from "react";
import { Spinner  } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Dashboard/dashboard.css";

class Transactionlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    this.transactionitems();
  }

  render() {
    const { items, current_page, per_page,  } = this.state;
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
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) =>
                    item.status === "paid" ? (
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
                          <div>
                            {item.status} (by {item.statusby})
                          </div>
                        </td>
                        <td>
                          <div>{item.cost}</div>
                        </td>
                      </tr>
                    ) : (
                      null
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

export default Transactionlist;
