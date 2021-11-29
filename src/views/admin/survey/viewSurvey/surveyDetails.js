import React, { Component } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import Select from "react-select";
import LoadingOverlay from "react-loading-overlay";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DateTimePicker from "react-datetime-picker";
import makeAnimated from "react-select/animated";
import { InputGroup, FormControl } from "react-bootstrap";
import dateFormat from "dateformat";
import { token } from "../../token";
import "../survey.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import reacthtmlparser from "react-html-parser";
//import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
var AuthData = JSON.parse(localStorage.getItem("AuthData"));
const animatedComponents = makeAnimated();
class SurveyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feature_image: this.props.state.feature_image,
    };
  }
//   getAllAuthor = () => {
//     axios
//       .get(`${process.env.REACT_APP_API_URL}/get-all-author`, {
//         withCredentials: true,
//         headers: {
//           Bearer: token(),
//         },
//       })
//       .then((res) => {
//         let author = [...res.data.data.author];
//         let authors = [];
//         author.forEach((i) => {
//           authors.push({ value: i.name, label: i.name, id: i.id });
//         });
//         // this.setState({ category: [...cat] });
//         this.props.setAuthor(authors);
//       });
//   };
  looptopic = () => {
    let topic = [];
    for (let i in this.props.state.selectedCat) {
      topic.push(<p key={i}>{this.props.state.selectedCat[i].value},</p>);
    }
    if(!topic.length){
        topic.push(<p key={0}>---</p>);
    }
    return topic;
  };
  loopkeyword=()=>{
    let keyword = [];
    for (let i in this.props.state.selectedTag) {
      keyword.push(<p key={i}>{this.props.state.selectedTag[i].value},</p>);
    }
    if(!keyword.length){
        keyword.push(<p key={0}>---</p>);
    }
    return keyword;
  }
  render() {
    return (
      <>
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader>Survey Details</CCardHeader>
              <CCardBody>
                <CForm action="" method="post">
                  <CFormGroup>
                    <CLabel htmlFor="survey">
                      <strong>Topic </strong>
                    </CLabel>
                    {this.looptopic()}
                  </CFormGroup>
                  <CFormGroup>
                      <CLabel htmlFor="survey"><strong>Keyword</strong></CLabel>
                      {this.loopkeyword()}
                    </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="survey">
                      <strong>Analyzer Title</strong>
                    </CLabel>
                    <p>{this.props.state.title}</p>
                  </CFormGroup>

                  <div className="row">
                    <div className="col-md-4">
                      <CLabel htmlFor="survey">
                        <strong>Feature image</strong>
                      </CLabel>
                      <br />
                      {this.state.feature_image != null &&
                      this.state.feature_image != "" ? (
                        <img
                          src={this.state.feature_image}
                          width="70px"
                          height="70px"
                        />
                      ) : (
                        "No image found"
                      )}
                    </div>
                  </div>
                  <br></br>
                  <CFormGroup>
                    <CLabel htmlFor="survey">
                      <strong>Summary</strong>
                    </CLabel>
                    {reacthtmlparser(this.props.state.summary)}
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="survey">
                      <strong>Content</strong>
                    </CLabel>
                    {reacthtmlparser(this.props.state.content)}
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="survey">
                      <strong>Status</strong>
                    </CLabel>
                    <p>{this.props.state.selectedOpt} </p>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="survey">
                      <strong>Published At</strong>
                    </CLabel>
                    <br></br>
                    {this.props.state.Publishedvalue
                      ? this.props.state.Publishedvalue?.toString()
                      : "---"}
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="survey">
                      <strong>Ends At</strong>
                    </CLabel>
                    <br></br>
                    {this.props.state.Endsvalue
                      ? this.props.state.Endsvalue.toString()
                      : "---"}
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>
                      <strong>Max difficulty</strong>
                    </CLabel>
                    <p>{this.props.state.difficultyornumber}</p>
                  </CFormGroup>
                  {/* {AuthData.data.admin_role.role_name == "Author" ? (
                    <CFormGroup>
                      <CLabel htmlFor="survey">Add Moderator</CLabel>
                      {this.props.surveyOwnerId == AuthData.data.id ? (
                        <div style={{ width: "400px" }}>
                          <Select
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            defaultValue={[...this.props.state.selectedAuth]}
                          />
                        </div>
                      ) : (
                        "  (You are not in this survey owner.)"
                      )}
                    </CFormGroup>
                  ) : (
                    ""
                  )} */}
                  <CFormGroup>
                      <CLabel htmlFor="survey"><strong>Meta Informations</strong></CLabel>
                      {this.props.state.meta.map((cal, ind) => {
                        return (
                          <InputGroup key={ind} className="mb-3 col-md-12">
                            <InputGroup.Prepend>
                              <InputGroup.Text id="inputGroup-sizing-default">
                                Key
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                              value={cal.key}
                              readOnly
                              data-id={ind}
                              className="key"
                              aria-label="Default"
                              aria-describedby="inputGroup-sizing-default"
                            />
                            
                            <InputGroup.Prepend>
                              <InputGroup.Text id="inputGroup-sizing-default">
                                Content
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                              value={cal.content}
                              readOnly
                              data-id={ind}
                              className="content"
                              aria-label="Default"
                              aria-describedby="inputGroup-sizing-default"
                            />
                          </InputGroup>
                        );
                      })}
                      {/* <span style={{ color: "red" }}>
                        {this.props.state.metaerr}
                      </span> */}
                    </CFormGroup>
                </CForm>
              </CCardBody>
              <CCardFooter>
                &nbsp;
                <CButton
                  type="back"
                  size="sm"
                  color="danger"
                  onClick={this.props.back}
                >
                  <CIcon name="cil-ban" /> Back
                </CButton>
              </CCardFooter>
            </CCard>
            <ToastContainer />
          </CCol>
        </CRow>
      </>
    );
  }
}

export default SurveyDetails;
