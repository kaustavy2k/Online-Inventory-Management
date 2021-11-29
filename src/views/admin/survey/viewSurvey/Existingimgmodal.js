import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { Spinner, Tabs, Tab } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
class Existingmodal extends Component {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem("authToken");
    this.state = {
      photos: [],
      loading: false,
    };
  }
  getImages = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/get-medias-for-survey?recom=${this.props.recommendationid}&survey=${this.props.surveyid}&uid=${this.props.userid}`,
        {
          withCredentials: true,
          headers: {
            "x-auth": this.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        //toast.success("Photo successfully uploaded");
        this.setState({ loading: false, photos: res.data.data });
      })
      .catch((err) => {
        toast.warning("Server Error");
        this.setState({ loading: false });
      });
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.show &&
      this.props.recommendationid != prevProps.recommendationid
    ) {
      this.setState({ loading: true });
      this.getImages();
    }
  }
  hide = () => {
    this.setState({ photos: [] });
    this.props.handleShow();
  };
  deleteMedia = (id) => {
    console.log(id);
    let confirm = window.confirm("Do you want to delete this image?");
    if (confirm) {
      this.setState({ loading: true });
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/delete-user-recommendation-image/${id}`,
          {
            withCredentials: true,
            headers: {
              "x-auth": this.token,
            },
          }
        )
        .then((res) => {
          toast.success("Photo successfully deleted");
          this.getImages();
        })
        .catch((err) => {
          toast.warning("Cannot delete,Server Error");
          this.setState({ loading: false });
        });
    }
  };
  render() {
    console.log("photos existing", this.state.photos);
    //console.log("err",this.state.err)
    const { content } = this.state;
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.hide}
          animation={false}
          size="lg"
        >
          <LoadingOverlay
            active={this.state.loading}
            spinner={<Spinner animation="grow" variant="primary" size="lg" />}
          >
            <Modal.Header closeButton>
              <Modal.Title>View photos </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row mx-0 deletediv">
                {this.state.photos.map((item, id) => {
                  return (
                    <div className="col-md-4 deletechild" key={id}>
                      <img
                        className="imgsize"
                        src={item.image_url}
                        onClick={() =>
                          window.open(`${item.image_url}`, "_blank")
                        }
                      />
                      <span
                        onClick={this.deleteMedia.bind(this, item.id)}
                        title="Delete File"
                        className="closediv"
                      >
                        X
                      </span>
                    </div>
                  );
                })}
              </div>
              <span style={{ color: "red" }}>{this.state.err}</span>
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

export default Existingmodal;
