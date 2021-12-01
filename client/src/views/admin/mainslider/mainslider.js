import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DefaultProfile from "../user/avatar.png";
import { Spinner } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { token } from "../token";
import Editmainslider from "./editmainslider";
import Addmainslider from "./addmainslider";
class Mainslider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      loading: false,
      showEdit: false,
      show: false,
      slider_id: "",
      obj: {},
    };
  }
  fetchslider = () => {
    this.setState({ loading: true });
    axios
      .get(`${process.env.REACT_APP_API_URL}/slider`, {
        withCredentials: true,
        headers: {
          Bearer: token(),
        },
      })
      .then((res) => {
        if (res.data.status === "success") {
          this.setState({ lists: res.data.details, loading: false });
        }
        //console.log('res data',res.data.details)
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  };
  componentDidMount() {
    this.fetchslider();
  }
  sliderdel = (id) => {
    var cnf = window.confirm("Are you sure that you want to delete this item?");
    if (cnf) {
      this.setState({ loading: true });
      axios
        .delete(`${process.env.REACT_APP_API_URL}/slider/${id}`, {
          withCredentials: true,
          headers: {
            Bearer: token(),
          },
        })
        .then((res) => {
          this.setState({
            loading: false,
          });
          toast.success("slider deleted successfully");
          this.fetchslider();
        })
        .catch((error) => {
          this.setState({ loading: false });
          toast.warning("Cannot delete");
        });
    }
  };
  handleShow = () => {
    this.setState({ show: !this.state.show });
  };
  handleShowEdit = (id, obj) => {
    this.setState({
      showEdit: !this.state.showEdit,
      slider_id: id,
      obj: obj,
    });
  };
  render() {
    return (
      <>
        <ToastContainer />
        <LoadingOverlay
          active={this.state.loading}
          spinner={<Spinner animation="grow" variant="primary" size="lg" />}
        >
          <Editmainslider
            show={this.state.showEdit}
            handleShowEdit={this.handleShowEdit}
            obj={{ ...this.state.obj }}
            slider_id={this.state.slider_id}
            fetchslider={this.fetchslider}
          />
          <Addmainslider
            show={this.state.show}
            handleShow={this.handleShow}
            fetchslider={this.fetchslider}
          />
          <div className="card">
            <div className="card-header">
              Slider List
              <div style={{ float: "right" }}>
                <button onClick={this.handleShow} className="btn btn-success">
                  Add Slider
                </button>
              </div>
            </div>
            <div className="card-body scroller">
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">SL</th>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created By</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.lists.map((list, index) => (
                    <tr key={index}>
                      <td scope="col">{index + 1}</td>
                      <td scope="col">
                        <img
                          src={`${list.image}`}
                          onError={(i) => (i.target.src = `${DefaultProfile}`)}
                          style={{ width: "40px", height: "40px" }}
                          className="img-thumbnail"
                        />
                      </td>
                      <td scope="col">{list.title}</td>
                      <td scope="col">{list.status}</td>
                      <td scope="col">{list.createdby}</td>
                      <td scope="col">{list.created_at}</td>
                      <td scope="col">{list.updated_at}</td>
                      <td scope="col">
                        <button
                          className="btn btn-outline-primary mr-2"
                          onClick={this.handleShowEdit.bind(this, list.id, {
                            title: list.title,
                            status: list.status,
                            image: list.image,
                          })}
                        >
                          <i
                            className="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                        </button>
                        &nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => this.sliderdel(list.id)}
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
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

export default Mainslider;
