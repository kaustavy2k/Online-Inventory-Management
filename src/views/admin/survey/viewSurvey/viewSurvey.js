import Surveydetails from "./surveyDetails";
import Userdetails from "./userDetails";
import React, { Component } from "react";
import axios from "axios";
import { Tabs, Tab, Spinner } from "react-bootstrap";
import Select from "react-select";
import LoadingOverlay from "react-loading-overlay";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DateTimePicker from "react-datetime-picker";
import makeAnimated from "react-select/animated";
import dateFormat from "dateformat";
import { token } from "../../token";
import "../survey.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
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

class ViewSurvey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: "Survey Details",
      loading: false,
      exceedError: "",
      Publishedvalue: this.props.location.state.publishedAt,
      PublishedvalueminDate: this.props.location.state.publishedAt,
      Endsvalue: this.props.location.state.endsAt,
      EndsvalueminDate: this.props.location.state.endsAt,
      selectedCat: this.props.location.state.category,
      selectedTag: this.props.location.state.tag,
      title: this.props.location.state.title,
      content: this.props.location.state.content,
      user_recomm_limit_type: 2,
      user_recomm_limit_span_or_number:
        this.props.location.state.user_recomm_limit_span_or_number,
      difficultyornumber: this.props.location.state.max_difficulty,
      difficulty: this.props.location.state.max_difficulty,
      //user_recomm_limit_span_type: this.props.location.state.user_recomm_limit_span_type,
      summary: this.props.location.state.summary,
      selectedOpt: this.props.location.state.published,
      feature_image: this.props.location.state.feature_image,
      meta: [{ key: "", content: "" }],
      selectedAuth: this.props.location.state.author,
      surveyOwnerId: this.props.location.state.users_id,
      usersSurvey: [],
    };
  }
  componentDidMount() {
    //console.log('AuthData',AuthData.data.id);
    let id = this.props.match.params.id;
    axios
      .get(`${process.env.REACT_APP_API_URL}/getSurveyMeta/${id}`, {
        withCredentials: true,
        headers: {
          Bearer: token(),
        },
      })
      .then((res) => {
        if (res.data.data) {
          this.setState({ meta: [...res.data.data.data] });
        }
        return axios.get(
          `${process.env.REACT_APP_API_URL}/get-users-for-survey/${id}`,
          {
            withCredentials: true,
            headers: {
              Bearer: token(),
            },
          }
        );
      })
      .then((res) => {
        console.log(res);
        this.setState({ usersSurvey: res.data.data });
      })
      .catch((err) => {
        console.log(err);
        toast.warning("Server Error");
      });
  }
  back = () => {
    this.props.history.push({
      pathname: "/admin/survey/survey-list",
    });
  };
  setKey = (k) => {
    this.setState({ key: k });
  };
  render() {
    //console.log(this.state.usersSurvey)
    return (
      <>
        <LoadingOverlay
          active={this.state.loading}
          spinner={<Spinner animation="grow" variant="primary" size="lg" />}
        >
          <Tabs
            id="controlled-tab-example"
            activeKey={this.state.key}
            onSelect={(k) => this.setKey(k)}
          >
            <Tab title="Survey Details" eventKey="Survey Details">
              {this.state.key == "Survey Details" && (
                <Surveydetails
                  history={this.props.history}
                  back={this.back}
                  state={{ ...this.state }}
                />
              )}
            </Tab>

            <Tab title="User Details" eventKey="User Details">
              {this.state.key == "User Details" && (
                <Userdetails
                  history={this.props.history}
                  surveyid={this.props.match.params.id}
                  state={{ ...this.state }}
                  back={this.back}
                />
              )}
            </Tab>
          </Tabs>
        </LoadingOverlay>
      </>
    );
  }
}

export default ViewSurvey;
