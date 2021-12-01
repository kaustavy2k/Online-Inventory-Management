import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DefaultProfile from "./avatar.png";
import makeAnimated from "react-select/animated";
import "../survey.css";
import ExistingImagemodal from "./Existingimgmodal";
import reacthtmlparser from "react-html-parser";
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
class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showExist: false,
      recommendationid: null,
      surveyid: null,
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
  //   looptopic = () => {
  //     let topic = [];
  //     for (let i in this.props.state.selectedCat) {
  //       topic.push(<p key={i}>{this.props.state.selectedCat[i].value},</p>);
  //     }
  //     if(!topic.length){
  //         topic.push(<p key={0}>---</p>);
  //     }
  //     return topic;
  //   };
  //   loopkeyword=()=>{
  //     let keyword = [];
  //     for (let i in this.props.state.selectedTag) {
  //       keyword.push(<p key={i}>{this.props.state.selectedTag[i].value},</p>);
  //     }
  //     if(!keyword.length){
  //         keyword.push(<p key={0}>---</p>);
  //     }
  //     return keyword;
  //}
  handleShowExisting = (recommendationid, surveyid, userid) => {
    this.setState({
      showExist: !this.state.showExist,
      recommendationid,
      surveyid,
      userid,
    });
  };
  render() {
    console.log(this.props.state.usersSurvey);
    return (
      <>
        <ExistingImagemodal
          surveyid={this.state.surveyid}
          show={this.state.showExist}
          handleShow={this.handleShowExisting}
          recommendationid={this.state.recommendationid}
          userid={this.state.userid}
        />
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader>User Details</CCardHeader>
              <CCardBody>
                <div className="card-body scroller">
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Image</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Last question</th>
                        <th scope="col">Recommendations</th>
                        {/* <th>Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.state.usersSurvey.map((user, i) => (
                        <tr key={i}>
                          <td>{user.users_id}</td>
                          <td>
                            <a
                              href={`https://api.x10dadmin.com/storage/${user.image}`}
                              target="_blank"
                            >
                              <img
                                src={`https://api.x10dadmin.com/storage/${user.image}`}
                                onError={(i) =>
                                  (i.target.src = `${DefaultProfile}`)
                                }
                                style={{ width: "30px", height: "30px" }}
                                className="img-thumbnail"
                              />
                            </a>
                          </td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.status}</td>
                          <td>
                            <div className="limitquestion_recom">
                              {user.last_question
                                ? reacthtmlparser(user.last_question)
                                : "---"}
                            </div>
                          </td>
                          <td>
                          <div className="limitquestion_recom">
                            {user.recommendations.map((item, ind) => {
                              return (
                                <div
                                  onClick={() =>
                                    this.handleShowExisting(
                                      item.id,
                                      this.props.surveyid,
                                      user.users_id
                                    )
                                  }
                                  className="recom"
                                  key={ind}
                                >
                                  {item.name},
                                </div>
                              );
                            })}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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

export default UserDetails;
