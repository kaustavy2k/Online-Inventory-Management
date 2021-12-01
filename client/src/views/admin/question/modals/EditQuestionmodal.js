import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import { toast, ToastContainer } from "react-toastify";
import { Spinner, Modal } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay";
import { Link } from "react-router-dom";
import {
  getsurvey,
  addQuestion,
  singlefetchQuestion,
  editQuestion,
} from "../api";
import { axios } from "axios";
import { token } from "../../token";

class EditQuestionmodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      content: "",
      active: "",
      content: null,
      contenterr: "",
      statuserr: "",
      loading: false,
    };
    this.handleChangeCKeditor = this.handleChangeCKeditor.bind(this);
  }
  handleChangeCKeditor(e, editor) {
    this.setState({ contenterr: "" });
    const data = editor.getData();
    this.setState({ content: data });
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log("prevprop",prevProps)
    // console.log("this props",this.props)
    if (
      this.props.content != prevProps.content ||
      this.props.active != prevProps.active
    ) {
      // console.log("gfg",this.props.active)
      this.setState({
        content: this.props.content,
        active: this.props.active,
      });
    }
  }
  //validation
  validate() {
    let { content, active } = this.state;
    let isValid = true;
    if (!content) {
      isValid = false;
      //errors["content_err"] = "Please enter content.";
      this.setState({
        contenterr: "Please enter content.",
      });
    }

    if (active === "") {
      isValid = false;
      //errors["active_err"] = "Please select status";
      this.setState({
        statuserr: "Please select status.",
      });
    }
    return isValid;
  }

  handleSubmit = (e) => {
    const self = this;
    e.preventDefault();
    const { content, active } = this.state;
    const formdata = new FormData();
    formdata.append("id", this.props.question_id);
    formdata.append("content", content);
    formdata.append("active", active);
    //formdata.append("survey_id",this.props.question_id)

    if (this.validate()) {
      this.setState({ loading: true });
      editQuestion(formdata)
        .then((res) => {
          console.log("response data", res.data.message);
          toast.success(`Question successfully updated`);
          this.props.fetchQuestion();
          this.setState({ loading: false });
          this.props.handleShowEdit()
          // setTimeout(()=>{
          //  self.props.history.push({
          //      pathname:`/admin/question/list-question/${self.props.location.survey.survey_id}`,
          //  })
          // },2000)
        })
        .catch((err) => {
          this.setState({ loading: false });
          console.log(err);
        });
    }
  };
  render() {
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
              <Modal.Title>Edit Question </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="card">
                <div className="card-header">Edit Question</div>
                <div className="card-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Content</label>
                          <CKEditor
                            editor={ClassicEditor}
                            data={this.props.content}
                            onChange={this.handleChangeCKeditor}
                          />
                          <div className="text-danger">
                            {this.state.contenterr}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Status</label>

                          <select
                            className="form-control"
                            name="active"
                            value={this.state.active}
                            onChange={(e) =>
                              this.setState({
                                active: e.target.value,
                                statuserr: "",
                              })
                            }
                          >
                            <option value="">SELECT</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                          </select>
                          <div className="text-danger">
                            {this.state.statuserr}
                          </div>
                        </div>
                      </div>
                    </div>
                    <input
                      type="submit"
                      value="Update"
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

export default EditQuestionmodal;
