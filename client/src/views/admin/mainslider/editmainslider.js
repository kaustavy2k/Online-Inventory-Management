import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import { toast, ToastContainer } from "react-toastify";
import DefaultProfile from "../user/avatar.png";
import { Spinner, Modal } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay";
import { Link } from "react-router-dom";
import axios from "axios";
import { token } from "../token";
class Editmainslider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      title: "",
      image: "",
      imageurl: "",
      status: "",
      titleerr: "",
      statuserr: "",
      slider_id: "",
    };
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log("this props",this.props)
    if (
      this.props.obj.name != prevProps.obj.name ||
      this.props.slider_id != prevProps.slider_id
    ) {
      this.setState({
        title: this.props.obj.title,
        status: this.props.obj.status,
        imageurl: this.props.obj.image,
        slider_id: this.props.slider_id,
      });
    }
  }
  handleChangeInput = (event) => {
    this.setState({ titleerr: "", imageerr: "", statuserr: "" });
    if (event.target.name == "image") {
      this.setState({ [event.target.name]: event.target.files[0] });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };
  // Validation
  isValid = () => {
    const { title, status } = this.state;
    let back = true;
    if (title.length === 0) {
      this.setState({ titleerr: "This field is required", loading: false });
      back = false;
    }

    if (status.length === 0) {
      this.setState({ statuserr: "This field is required", loading: false });
      back = false;
    }

    return back;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { title, image, status, slider_id } = this.state;
    if (this.isValid()) {
      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("image", image);
      formdata.append("status", status);
      let self = this;
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/slider/${slider_id}`,
          formdata,
          {
            withCredentials: true,
            headers: {
              Bearer: token(),
            },
          }
        )
        .then(function (response) {
          if (response.data.status === "success") {
            console.log("response data", response);
            toast.success(`slider successfully updated`);
            self.setState({
              loading: false,
              name: "",
              title: "",
              designation: "",
              status: "",
              image: "",
            });
            self.props.handleShowEdit();
            self.props.fetchslider();
          } else {
            toast.warning(`Error`);
            self.setState({ loading: false });
            console.log("response", response);
          }
        })
        .catch(function (error) {
          //this.setState({loading: false})
          toast.warning(`Server Errors`);
          self.setState({ loading: false });
          console.log("error response", error);
        });
    }
  };
  render() {
    const { title, status, imageurl } = this.state;
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.handleShowEdit}
          animation={false}
          size="lg"
        >
          <LoadingOverlay
            active={this.state.loading}
            spinner={<Spinner animation="grow" variant="primary" size="lg" />}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit slider </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="card">
                <div className="card-header">Edit slider</div>
                <div className="card-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="row">
                      {/* <div className="col-md-12">
                        <div className="form-group">
                          <label>Name *</label>
                          <input
                            name="name"
                            value={name}
                            onChange={this.handleChangeInput}
                            autoComplete="off"
                            className="form-control"
                            placeholder="Enter name"
                          />
                          <div className="text-danger">
                            {this.state.nameerr}
                          </div>
                        </div>
                      </div> */}
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Title *</label>
                          <input
                            // style={{height:"45px"}}
                            name="title"
                            value={title}
                            onChange={this.handleChangeInput}
                            autoComplete="off"
                            className="form-control"
                            placeholder="Enter title"
                            type="text"
                          />
                          <div className="text-danger">
                            {this.state.titleerr}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Status *</label>

                              <select
                                className="form-control"
                                name="status"
                                value={status}
                                onChange={this.handleChangeInput}
                              >
                                <option value="">SELECT</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                              </select>
                              <div className="text-danger">
                                {this.state.statuserr}
                              </div>
                            </div>
                          </div>
                          {/* <div className="col-md-6">
                            <div className="form-group">
                              <label>Designation (Optional)</label>
                              <input
                                // style={{height:"45px"}}
                                name="designation"
                                value={designation}
                                onChange={this.handleChangeInput}
                                autoComplete="off"
                                className="form-control"
                                placeholder="Enter designation"
                                type="text"
                              />
                              <div className="text-danger">
                                {this.state.designationerr}
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Image</label>
                          <br />
                          <img
                            src={`${imageurl}`}
                            onError={(i) =>
                              (i.target.src = `${DefaultProfile}`)
                            }
                            style={{ width: "40px", height: "40px" }}
                            className="img-thumbnail"
                          />
                          &nbsp;&nbsp;
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            name="image"
                            onChange={this.handleChangeInput}
                            name="image"
                          />
                          <div className="text-danger">
                            {this.state.imageerr}
                          </div>
                        </div>
                      </div>
                    </div>
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-primary"
                    />
                  </form>
                </div>
              </div>
            </Modal.Body>
            {/* <Modal.Footer>
            <Button variant="primary" onClick={this.saveallAnswer}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={this.props.handleShow}>
              Close
            </Button>
          </Modal.Footer> */}
          </LoadingOverlay>
        </Modal>
      </>
    );
  }
}

export default Editmainslider;
