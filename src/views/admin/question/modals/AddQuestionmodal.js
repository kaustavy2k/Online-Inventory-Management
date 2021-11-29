import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import { Spinner, Tabs, Tab } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getsurvey, addQuestion } from "../api";
import { axios } from "axios";
class AddQuestionmodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      content: "",
      active: "",
      errors: {},
      question_id: "",
      key: "question",
    };
    this.handleChangeCKeditor = this.handleChangeCKeditor.bind(this);
  }
  handleChangeCKeditor(e, editor) {
    const data = editor.getData();
    this.setState({ content: data });
    //console.log(this.state.content)
  }
  //validation
  validate() {
    let { content, active } = this.state;
    let errors = {};
    let isValid = true;

    if (!content) {
      isValid = false;
      errors["content_err"] = "Please enter content.";
    }

    if (!active) {
      isValid = false;
      errors["active_err"] = "Please select status";
    }
    this.setState({
      errors: errors,
    });

    return isValid;
  }

  handleSubmit = (e) => {
    const self = this;
    e.preventDefault();
    const { content, type, active } = this.state;
    const formdata = new FormData();
    formdata.append("content", content);
    formdata.append("active", active);
    formdata.append("survey_id", this.props.survey_id);

    if (this.validate()) {
      this.setState({ loading: true });
      addQuestion(formdata)
        .then((res) => {
          console.log("response data", res.data);
          self.setState({
            question_id: res.data.message[0].id,
            key: "answer",
            active: "",
            content: "",
            loading: false,
          });
          self.props.fetchQuestion();
          toast.success(`Question successfully added`);
          self.props.handleShow()
          // setTimeout(()=>{
          //     self.props.history.push({
          //         pathname: `/admin/question/list-question/${self.props.match.params.id}`,

          //       });
          // },2000)
        })
        .catch((err) => {
          this.setState({ loading: false });
          console.log(err);
        });
    }
  };
  render() {
    const { content } = this.state;
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.handleShow}
          animation={false}
          size="lg"
        >
          <LoadingOverlay
            active={this.state.loading}
            spinner={<Spinner animation="grow" variant="primary" size="lg" />}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add Question </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="card">
                <div className="card-header">Add Question </div>
                <div className="card-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="row">
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Content</label>
                          <CKEditor
                            editor={ClassicEditor}
                            // data={content}
                            onChange={this.handleChangeCKeditor}
                          />
                          <div className="text-danger">
                            {this.state.errors.content_err}
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-md-6">
                                    <div className="form-group">
                                    <label>Type:</label>
                                    <input 
                                    type="text" 
                                    name="type"
                                    className="form-control" 
                                    placeholder="Enter type"
                                    value={type}  
                                    onChange={(e) => this.setState({type:e.target.value})}
                                    id="type" />                        
                                    <div className="text-danger"></div>
                                    </div>
                                </div> */}
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Status</label>
                          {/* <input 
                                    type="text" 
                                    name="active"
                                    className="form-control" 
                                    placeholder="Enter active" 
                                    value={active} 
                                    onChange={(e) => this.setState({active:e.target.value})}
                                    id="active" />  */}
                          <select
                            className="form-control"
                            name="active"
                            onChange={(e) =>
                              this.setState({ active: e.target.value })
                            }
                          >
                            <option value="">SELECT</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                          </select>
                          <div className="text-danger">
                            {this.state.errors.active_err}
                          </div>
                        </div>
                      </div>
                    </div>
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-primary"
                    />
                    &nbsp;
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

export default AddQuestionmodal;
