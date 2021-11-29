import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { message } from "antd";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import "antd/dist/antd.css";
import ReactHtmlParser from "react-html-parser";
import Select from "react-select";
import AddQuestionmodal from "./modals/AddQuestionmodal";
import EditQuestionmodal from "./modals/EditQuestionmodal";
import Viewquestionmodal from "./modals/Viewquestionmodal";
import dateFormat from "dateformat";
import "./style.css"
import {
  getsurveyquestions,
  questionDelete,
  firstquestionDelete,
  secondquestionDelete,
  getsurvey,
  getAllSurvey,
  editQuestion
} from "./api";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { listOrderUpdate } from "./api";

class Questionlist extends Component {
  constructor(props) {
    super(props);
    if(this.props.location.state){
      this.sname = this.props.location.state.survey_name;
      this.sid = this.props.location.state.survey_id;
    }else{
      this.sname = '';
      this.sid = '';
    }
    this.state = {
      loading: false,
      questions: [],
      show: false,
      showEdit: false,
      showView:false,
      survey: [],
      question_id: null,
      content: "",
      active: "",
      survey_name: this.sname,
      survey_id:  this.sid ,
    };
  }

  componentDidMount() {
    this.fetchQuestion();
    this.fetchSurvey();
  }
  //modal
  handleShow = () => {
    this.setState({ show: !this.state.show });
  };
  handleShowEdit = (id, content, active) => {
    this.setState({
      showEdit: !this.state.showEdit,
      question_id: id,
      active,
      content,
    });
  };

  handleShowView = (id, content, active) => {
    this.setState({
      showView: !this.state.showView,
      question_id: id,
    });
  };
  //fetch survey
  fetchSurvey = () => {
    getAllSurvey()
      .then((res) => {
        // console.log(res.data.data.data);
        let finalsurvey = [];
        res.data.data.data.forEach((item) => {
          finalsurvey.push({ value: item.id, label: item.title });
        });
        this.setState({ survey: finalsurvey });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // fetch question
  fetchQuestion = () => {
    this.setState({ loading: true });
    const survey_id = this.state.survey_id;
    getsurveyquestions(survey_id)
      .then((c) => {
        console.log("response", c.data.data);
        this.setState({ questions: c.data.data, loading: false });
        //console.log('state',questions)
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  };

  onDragEnd = (result) => {
    if (!result.destination || result.reason === "CANCEL") {
      return;
    }

    if (
      result.destination.droppableId === result.source.droppableId &&
      result.destination.index === result.source.index
    ) {
      return;
    }

    // console.log('result',result)
    // console.log('destination',result.destination.index)
    // console.log('source',result.source.index)

    let destination = result.destination.index;
    let source = result.source.index;

    let quesfinal = [...this.state.questions];

    let firstvalue = { ...quesfinal[source] };
    quesfinal[source] = { ...quesfinal[destination] };
    quesfinal[destination] = firstvalue;

    this.setState({ questions: quesfinal }, () => {
      const data = this.state.questions;
      //console.log('final data',data)
      let i;
      let newvar = [];
      for (i = 0; i < data.length; i++) {
        newvar.push({
          id: data[i].id,
        });
      }
      const data2 = {
        data: newvar,
      };
      //console.log('new id object',newvar)
      this.setState({ loading: true });
      listOrderUpdate(data2)
        .then((res) => {
          this.setState({ loading: false });
          this.fetchQuestion()
          //console.log('response',res)
        })
        .catch((err) => {
          this.setState({ loading: false });
          console.log(err);
        });
    });
  };
  currentSurvey = (e) => {
    this.setState({ loading: true });
    console.log(e);
    getsurveyquestions(e.value)
      .then((c) => {
        console.log("response", c.data.data);
        this.setState({
          questions: c.data.data,
          survey_id: e.value,
          survey_name: e.label,
          loading: false,
        });
        //console.log('state',questions)
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  };
  //change status
  handleStatusChange = (id, content, active) => {
    const formdata = new FormData();
    formdata.append("id", id);
    formdata.append("content", content);
    formdata.append("active", !active);
    this.setState({ loading: true });
      editQuestion(formdata)
        .then((res) => {
          console.log("response data", res.data.message);
          toast.success(`Question successfully updated`);
          this.fetchQuestion();
          this.setState({ loading: false });
        })
        .catch((err) => {
          this.setState({ loading: false });
          console.log(err);
        });

  };

  // Delete question
  delete = async (id) => {
    let self = this;
    const cnfirm = window.confirm(
      `Are you sure you want to delete this question and its related answers?`
    );
    if (cnfirm) {
      this.setState({ loading: true });
      firstquestionDelete(id)
        .then(function (response) {
          console.log("response data", response.data);
          self.fetchQuestion();
          toast.success(`Question successfully deleted`);
          self.setState({ loading: false });
        })
        .catch(function (error) {
          self.setState({ loading: false });
          const cnfirm = window.confirm(
            `This question is answered by some users. Are you sure you want to remove it?`
          )
          if (cnfirm) {
            self.setState({ loading: true });
            secondquestionDelete(id)
              .then(function (response) {
                console.log("response data", response.data);
                self.fetchQuestion();
                toast.success(`Question successfully deleted`);
                self.setState({ loading: false });
              })
              .catch(function (error) {
                self.setState({ loading: false });
              });
          }
        });
    }
  };
  // theModalFunction = (question_id,status) => {
  //     return (<Deletemodal show={status} question_id={question_id}/>)
  //     }
  createMarkup = (data) => {
    return { __html: data };
  };
  render() {
    return (
      <LoadingOverlay
        active={this.state.loading}
        spinner={<Spinner animation="grow" variant="primary" size="lg" />}
      >
        <div className="card">
          <div className="card-header">
            <CFormGroup className="addandselect">
              <div className="col-md-4">
                <CLabel htmlFor="survey">Select Survey</CLabel>
                <Select
                  defaultValue={{
                    value: this.state.survey_id,
                    label: this.state.survey_name,
                  }}
                  options={this.state.survey}
                  onChange={this.currentSurvey}
                />
              </div>
              <div>
              {this.state.survey_id != '' ?
                <button onClick={this.handleShow} className="btn btn-success">
                  Add Question
                </button>
                :''
               }
              </div>
            </CFormGroup>
          </div>
          
          <AddQuestionmodal
            survey_id={this.state.survey_id}
            show={this.state.show}
            handleShow={this.handleShow}
            fetchQuestion={this.fetchQuestion}
          /> 
          <EditQuestionmodal
            question_id={this.state.question_id}
            content={this.state.content}
            active={this.state.active}
            survey_id={this.state.survey_id}
            show={this.state.showEdit}
            handleShowEdit={this.handleShowEdit}
            fetchQuestion={this.fetchQuestion}
          />
          <Viewquestionmodal
            question_id={this.state.question_id}
            survey_id={this.state.survey_id}
            show={this.state.showView}
            handleShowView={this.handleShowView}
          />
          <div className="card-body scroller">
            <DragDropContext onDragEnd={this.onDragEnd}>
              <h3>
                {this.state.questions.length > 0
                  ? "Question List"
                  : "No question found for this survey"}
              </h3>
              <div className="heading">
                <h4 className="childheading order">Order</h4>
                <h4 className="childheading content">Content</h4>
                <h4 className="childheading status">Status</h4>
                <h4 className="childheading createdat">Created At</h4>
                <h4 className="childheading updatedat">Updated At</h4>
                <h4 className="childheading answers">Answers</h4>
                <h4 className="childheading action">Action</h4>
              </div>
              <br></br>
              <Droppable droppableId="dp1">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {this.state.questions &&
                      this.state.questions.map((item, index) => {
                        return (
                          <Draggable
                            key={index}
                            draggableId={index + " "}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <div className="contents">
                                  <div className="childcontents ordercontent">
                                    <i
                                      className="fa fa-bars mt-3 mr-2"
                                      aria-hidden="true"
                                    ></i>
                                    {item.list_order}
                                  </div>

                                  <div
                                    className="childcontents contentcontent"
                                    dangerouslySetInnerHTML={this.createMarkup(
                                      item.content
                                    )}
                                  />

                                  {/* <div className="childcontents statuscontent">
                                    {item.active}
                                  </div> */}
                                  <Toggle
                                    id="cheese-status"
                                    className="childcontents statuscontent"
                                    checked={
                                      item.active == 1 ? true : false
                                    }
                                    onChange={() =>
                                      this.handleStatusChange(
                                        item.id,
                                        item.content,
                                        item.active
                                      )
                                    }
                                  />
                                  <div className="childcontents createdatcontent">
                                    {item.createdAt
                                      ? dateFormat(
                                          item.createdAt,
                                          "yyyy-mm-dd,H:MM:ss"
                                        )
                                      : null}
                                  </div>

                                  <div className="childcontents updatedatcontent">
                                    {item.updatedAt
                                      ? dateFormat(
                                          item.updatedAt,
                                          "yyyy-mm-dd,H:MM:ss"
                                        )
                                      : null}
                                  </div>
                                  <div className="childcontents answerscontent">
                                  <button
                                      onClick={() =>
                                        this.handleShowView(
                                          item.id,
                                          item.content,
                                          item.active
                                        )
                                      }
                                      className="btn btn btn-success"
                                    >
                                      <span style={{fontSize:"10px"}}>View Answer</span>
                                    </button>
                                  </div>
                                  <div className="childcontents actioncontent childbuttons">
                                    {/* <button className="btn btn-success">Edit</button> */}
                                    {/* <Editquestion survey_question_id={item.id}/> */}
                                    <Link
                                      to={{
                                        pathname: `/admin/question/edit-question/${item.id}`,
                                        state: {
                                          survey_id: this.state.survey_id,
                                          survey_name: this.state.survey_name,
                                        },
                                      }}
                                      className="btn btn-secondary"
                                    >
                                     <span style={{fontSize:"10px"}}>Manage Question</span>  &nbsp;
                                    </Link>
                                    &nbsp;
                                    <button
                                      onClick={() => this.delete(item.id)}
                                      className="btn btn-danger"
                                    >
                                      <i
                                        className="fa fa-trash"
                                        aria-hidden="true"
                                      ></i>
                                    </button>
                                    &nbsp;
                                    <button
                                      onClick={() =>
                                        this.handleShowEdit(
                                          item.id,
                                          item.content,
                                          item.active
                                        )
                                      }
                                      className="btn btn btn-success"
                                    >
                                      <i
                                        className="fa fa-pencil-square-o"
                                        aria-hidden="true"
                                      ></i>
                                    </button>
                                    &nbsp;
                                    {/* <button
                                      onClick={() =>
                                        this.handleShowView(
                                          item.id,
                                          item.content,
                                          item.active
                                        )
                                      }
                                      className="btn btn btn-success"
                                    >
                                      <span style={{fontSize:"10px"}}>View Answer</span>
                                    </button> */}
                                  </div>
                                </div>
                                <br />
                              </div>
                            )}
                          </Draggable>
                        );
                      })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <ToastContainer />
        </div>
      </LoadingOverlay>
    );
  }
}

export default Questionlist;
