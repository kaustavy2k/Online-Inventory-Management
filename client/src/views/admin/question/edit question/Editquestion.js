import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import { toast, ToastContainer } from "react-toastify";
import { Spinner, Button, Tabs, Tab } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
//import Editanswer from "./Editanswer";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  singlefetchQuestion,
  editQuestion,
  getsurveyquestionsOptions,
  fetchRecommendation,
  fetchAnswer,
  editaddAnswer,
  deleteAnswer,
  deleteAnswerUser,
  answerlistOrderUpdate,
} from "../api";
import Tooltip from "react-bootstrap/Tooltip";
import "../style.css";

class Editquestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      type: "",
      content: "",
      active: "",
      survey_id: this.props.location.state.survey_id,
      survey_name: this.props.location.state.survey_name,
      contenterr: "",
      statuserr: "",
      question: "",
      //update: 0,
      question_id: "",
      quesArr: [],
      inputFields: [],
      recomArr: [],
    };
    this.handleChangeCKeditor = this.handleChangeCKeditor.bind(this);
  }
  handleChangeCKeditor(e, editor) {
    this.setState({ contenterr: "" });
    const data = editor.getData();
    this.setState({ content: data });
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
  componentDidMount() {
    this.setState({ loading: true });
    this.setState({ question_id: this.props.match.params.id });
    this.Fetchsurveyquestion();
    this.Fetchanswerbyquestionid();
    this.Fetchrecommendation();
    const ques_id = this.props.match.params.id;
    //alert(ques_id)
    let self = this;
    singlefetchQuestion(ques_id)
      .then((res) => {
        //console.log('res file',res.data.data[0])
        self.setState({
          question: res.data.data[0],
          active: res.data.data[0].active,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log("err", err);
      });
  }

  //get recommendation
  Fetchrecommendation = () => {
    this.setState({ loading: true });
    fetchRecommendation()
      .then((res) => {
        this.setState({ recomArr: res.data.data, loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  //FETCH ANSWER
  Fetchanswerbyquestionid = () => {
    this.setState({ loading: true });
    const self = this;
    var q_id = this.props.match.params.id;
    fetchAnswer(q_id)
      .then((c) => {
        //console.log('answer fetch',c.data.data)
        let result = c.data.data;
        if (result.length < 1) {
          let qq = [
            {
              answer_id: "",
              bfanalyzer_question_id: this.props.match.params.id,
              content: "",
              active: 1,
              bfanalyzer_next_question_id: "",
            },
          ];
          self.setState({ inputFields: qq, loading: false });
        } else {
          self.setState({ inputFields: c.data.data, loading: false });
        }
      })
      .catch((err) => {
        toast.warning("Failed to fetch question");
      });
  };
  //FETCH SURVEY QUESTION
  removeCurrentQuestion = (num) => {
    if (num.id == this.state.question_id) {
      return false;
    }
    return num;
  };
  Fetchsurveyquestion = () => {
    this.setState({ loading: true });
    const survey_id = this.state.survey_id;
    getsurveyquestionsOptions(survey_id)
      .then((c) => {
        console.log("response modal", c.data.data);

        let finalQuestionList = c.data.data.filter(this.removeCurrentQuestion);
        this.setState({ quesArr: finalQuestionList, loading: false });
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log("response error", err);
      });
  };

  //ADD DYNAMIC ROW
  handleAddFields = (e) => {
    e.preventDefault();
    this.setState({
      inputFields: [
        ...this.state.inputFields,
        {
          answer_id: "",
          bfanalyzer_question_id: this.props.match.params.id,
          content: "",
          active: 1,
          bfanalyzer_next_question_id: "",
          bfanalyzer_recommendation_id: "",
        },
      ],
    });
  };
  //REMOVE ROW
  handleRemoveFields = (index, answer_id, e) => {
    e.preventDefault();
    const values = [...this.state.inputFields];
    //if(index != 0){

    if (answer_id !== "") {
      const cnfirm = window.confirm(
        `Are you sure you want to delete this answer?`
      );
      if (cnfirm) {
        //alert(answer_id+'need to api call')
        this.setState({ loading: true });
        deleteAnswer(answer_id)
          .then((c) => {
            console.log("deleted success", c);
            //this.Fetchanswerbyquestionid()
            values.splice(index, 1);
            this.setState({ inputFields: values, loading: false });
            toast.success(`Answer Successfully deleted`);
          })
          .catch((err) => {
            const confirm = window.confirm(err.response.data.message);
            if (confirm) {
              deleteAnswerUser(answer_id)
                .then((c) => {
                  console.log("deleted success", c);
                  //this.Fetchanswerbyquestionid()
                  values.splice(index, 1);
                  this.setState({ inputFields: values, loading: false });
                  toast.success(`Answer Successfully deleted`);
                })
                .catch((err) => {
                  this.setState({ loading: false });
                  toast.warning("Server Errors");
                });
            } else {
              this.setState({ loading: false });
            }
          });
      }
    } else {
      values.splice(index, 1);
      this.setState({ inputFields: values, loading: false });
    }

    //}
  };
  handleChangeInput = (index, event) => {
    //console.log(index,event.target.name)
    const values = [...this.state.inputFields];
    values[index][event.target.name] = event.target.value;
    this.setState({ inputFields: values });
  };
  validateanswer = (data) => {
    let i;
    let isValid = true;
    for (i = 0; i < data.length; i++) {
      if (!data[i].content) {
        isValid = false;
        break;
      }
    }
    return isValid;
  };
  saveallAnswer = () => {
    const self = this;
    var data = this.state.inputFields;
    console.log("save pass data", data);
    //this.validateanswer(data);
    if (this.validateanswer(data)) {
      // console.log("dkfajfbasjbakjba");
      //this.setState({ loading: true });
      //  alert('success')
      const data2 = {
        data: data,
        survey_id: this.state.survey_id,
      };
      editaddAnswer(data2)
        .then((c) => {
          console.log("add edit success", c);
          this.Fetchanswerbyquestionid();
          toast.success(`Answers and Questions updated successfully`);
          //this.setState({ loading: false });
          setTimeout(() => {
            this.props.history.push({
              pathname: `/admin/question/list-question/`,
              state: {
                survey_id: this.state.survey_id,
                survey_name: this.state.survey_name,
              },
            });
          }, 1000);
        })
        .catch((err) => {
          this.setState({ loading: false });
          toast.warning("Server Errors");
          console.log("add edit failed", err);
        });
    } else {
      this.setState({ loading: false });
      toast.warning(`Answer content is required!`);
    }
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
    let destination = result.destination.index;
    let source = result.source.index;

    let quesfinal = [...this.state.inputFields];

    let firstvalue = { ...quesfinal[source] };
    quesfinal[source] = { ...quesfinal[destination] };
    quesfinal[destination] = firstvalue;
    this.setState({ inputFields: quesfinal }, () => {
      const data = this.state.inputFields;
      console.log("final data", data);
      let i;
      let newvar = [];
      for (i = 0; i < data.length; i++) {
        if (data[i].answer_id) {
          newvar.push({
            id: data[i].answer_id,
          });
        }
      }
      const data2 = {
        data: newvar,
      };
      console.log("new id object", newvar);
      if (newvar.length > 0) {
        answerlistOrderUpdate(data2)
          .then((res) => {
            //toast.success(`Successfully list order updated`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    console.log("result", result);
  };
  renderTooltip = (props) => (
    <Tooltip {...props}>Next question on selecting this answer.</Tooltip>
  );
  renderTooltiprecom = (props) => (
    <Tooltip {...props}>Recommendation related to this answer.</Tooltip>
  );

  handleSubmit = (e) => {
    //this.setState({update:1})
    const self = this;
    e.preventDefault();
    const { content, type, active, quesfile } = this.state;
    const formdata = new FormData();
    formdata.append("id", this.props.match.params.id);
    formdata.append("content", content);
    formdata.append("active", active);
    //formdata.append("survey_id",this.props.match.params.id)

    if (this.validate() && this.state.inputFields.length) {
      this.setState({ loading: true });
      this.saveallAnswer();
      editQuestion(formdata)
        .then((res) => {
          console.log("response data", res.data.message);
          //toast.success(`Question successfully updated`);
          // setTimeout(()=>{
          //  self.props.history.push({
          //      pathname:`/admin/question/list-question/${self.props.location.survey.survey_id}`,
          //  })
          // },2000)
          //this.setState({ loading: false });
        })
        .catch((err) => {
          this.setState({ loading: false });
          toast.warning("Server Errors");
          console.log(err);
        });
    } else {
      toast.warning("Please add an answer!");
    }
  };

  render() {
    const { inputFields, quesArr, question, active } = this.state;
    return (
      <LoadingOverlay
        active={this.state.loading}
        spinner={<Spinner animation="grow" variant="primary" size="lg" />}
      >
        <div className="card">
          <div className="card-header">Manage Question</div>
          <div className="card-body">
            <div className="card">
              <div className="card-header">Edit Question</div>
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-12">
                      <br></br>
                      <div className="form-group">
                        <label>Content*</label>
                        <CKEditor
                          editor={ClassicEditor}
                          data={question.content}
                          onChange={this.handleChangeCKeditor}
                        />
                        <div className="text-danger">
                          {this.state.contenterr}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Status*</label>

                        <select
                          className="form-control"
                          name="active"
                          value={active}
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
                </form>
              </div>
            </div>
            {this.state.survey_id && (
              <div className="card">
                <div className="card-header">Add answer</div>
                <div className="card-body">
                  <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="dp1">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {inputFields.map((inputField, index) => {
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
                                    <div
                                      className="row"
                                      key={index}
                                      style={{ marginBottom: "5px" }}
                                    >
                                      <div className="col-md-3 d-flex">
                                        <i
                                          className="fa fa-bars mt-3 mr-2"
                                          aria-hidden="true"
                                        ></i>

                                        <div className="form-group w-100 pr-1">
                                          <textarea
                                            // style={{height:"45px"}}
                                            name="content"
                                            value={inputField.content}
                                            onChange={(event) =>
                                              this.handleChangeInput(
                                                index,
                                                event
                                              )
                                            }
                                            autoComplete="off"
                                            className="form-control"
                                            placeholder="Enter content"
                                            type="text"
                                          />
                                          <span className="text-danger"></span>
                                        </div>
                                      </div>

                                      <div className="col-md-2">
                                        <select
                                          name="active"
                                          style={{ fontSize: "12px" }}
                                          value={inputField.active}
                                          onChange={(event) =>
                                            this.handleChangeInput(index, event)
                                          }
                                          className="form-control"
                                        >
                                          <option value="1">Active</option>
                                          <option value="0">Inactive</option>
                                        </select>
                                        <span></span>
                                      </div>

                                      <div className="col-md-3 d-flex ">
                                        <div className="form-group w-100 pr-1">
                                          <select
                                            name="bfanalyzer_next_question_id"
                                            value={
                                              inputField.bfanalyzer_next_question_id ==
                                              null
                                                ? ""
                                                : inputField.bfanalyzer_next_question_id
                                            }
                                            onChange={(event) =>
                                              this.handleChangeInput(
                                                index,
                                                event
                                              )
                                            }
                                            className="form-control"
                                          >
                                            <option value="">
                                              Select Next Question
                                            </option>
                                            {quesArr.map((ques, i) => (
                                              <option
                                                key={i}
                                                value={ques.id}
                                                dangerouslySetInnerHTML={{
                                                  __html: ques.content,
                                                }}
                                              />
                                            ))}
                                          </select>
                                          <span className="text-danger"></span>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={this.renderTooltip}
                                        >
                                          <i className="fa fa-info-circle font-custom-size mt-2"></i>
                                        </OverlayTrigger>
                                      </div>

                                      <div className="col-md-3 d-flex ">
                                        <div className="form-group w-100 pr-1">
                                          <select
                                            name="bfanalyzer_recommendations_id"
                                            value={
                                              inputField.bfanalyzer_recommendations_id ==
                                              null
                                                ? ""
                                                : inputField.bfanalyzer_recommendations_id
                                            }
                                            onChange={(event) =>
                                              this.handleChangeInput(
                                                index,
                                                event
                                              )
                                            }
                                            className="form-control"
                                          >
                                            <option value="">
                                              Select Recommendation
                                            </option>
                                            {this.state.recomArr.map(
                                              (recom, i) => (
                                                <option
                                                  key={i}
                                                  value={recom.id}
                                                  dangerouslySetInnerHTML={{
                                                    __html: recom.name,
                                                  }}
                                                />
                                              )
                                            )}
                                          </select>
                                          <span className="text-danger"></span>
                                        </div>
                                        <OverlayTrigger
                                          placement="top"
                                          overlay={this.renderTooltiprecom}
                                        >
                                          <i className="fa fa-info-circle font-custom-size mt-2"></i>
                                        </OverlayTrigger>
                                      </div>
                                      <div className="col-md-1">
                                        <button
                                          className="btn btn-danger"
                                          onClick={(e) =>
                                            this.handleRemoveFields(
                                              index,
                                              inputField.answer_id,
                                              e
                                            )
                                          }
                                        >
                                          <span aria-hidden="true">×</span>
                                        </button>
                                      </div>
                                    </div>
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
                  <br />
                  <button
                    className="btn btn-primary"
                    onClick={(e) => this.handleAddFields(e)}
                  >
                    ADD ROW
                  </button>
                  &nbsp;
                  {/* <Button variant="primary" onClick={this.saveallAnswer}>
                   UPDATE ANSWER
                 </Button> */}
                  &nbsp;
                  {/* <Link
                   to={{
                     pathname: `/admin/question/list-question/`,
                     state: {
                       survey_id: this.props.survey_id,
                       survey_name: this.props.survey_name,
                     },
                   }}
                   className="btn btn-danger"
                 >
                   BACK
                 </Link> */}
                </div>
              </div>
            )}
            <button onClick={this.handleSubmit} className="btn btn-primary">
              UPDATE QUESTION/ANSWER
            </button>
            &nbsp;
            <Link
              to={{
                pathname: `/admin/question/list-question/`,
                state: {
                  survey_id: this.state.survey_id,
                  survey_name: this.state.survey_name,
                },
              }}
              className="btn btn-danger"
            >
              BACK
            </Link>
            <ToastContainer />
          </div>
        </div>
      </LoadingOverlay>
    );
  }
}

export default Editquestion;
