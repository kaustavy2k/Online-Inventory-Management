import Primary from "../editSurvey/primaryEdit";
import Meta from "../editSurvey/metaEdit";
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

class AddSurvey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: "Primary Form",
      loading: false,
      exceedError: "",
      Publishedvalue: this.props.location.state.publishedAt,
      PublishedvalueminDate: this.props.location.state.publishedAt,
      Endsvalue: this.props.location.state.endsAt,
      EndsvalueminDate: this.props.location.state.endsAt,
      category: [],
      catId: [],
      tagId: [],
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
      status: "",
      tag: [],
      feature_image: this.props.location.state.feature_image,
      meta: [{ key: "", content: "" }],
      authors: [],
      selectedAuth: this.props.location.state.author,
      authorId: [],
      surveyOwnerId: this.props.location.state.users_id,
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
      });
  }
  isValid = () => {
    let back = true;
    if (this.state.summary.split(" ").length > 300) {
      //this.setState({ caterr: "Catagory is required", loading: false });
      back = false;
    }
    return back;
  };
  componentDidUpdate(prevProps, prevState) {
    // console.log(this.state.summary.split(" ").length)
    //console.log(this.state.summary)
    if (prevState.summary !== this.state.summary) {
      let words = this.state.summary.split(" ");
      if (words.length > 300) {
        this.setState({ exceedError: "Max limit 300 exceeded" });
      } else {
        this.setState({ exceedError: "" });
      }
    }
  }
  clickSubmit = (event) => {
    if (this.isValid()) {
      this.setState({ loading: true });
      let Endsvalue = this.state.Endsvalue
        ? (Endsvalue = dateFormat(this.state.Endsvalue, "yyyy-mm-dd,H:MM:ss"))
        : null;
      let id = this.props.match.params.id;
      event.preventDefault();

      const formdata = new FormData();
      formdata.append("feature_image", this.state.feature_image);
      formdata.append("title", this.state.title);
      formdata.append("content", this.state.content);
      formdata.append("summary", this.state.summary);
      formdata.append("published", this.state.status);
      formdata.append(
        "user_recomm_limit_type",
        this.state.user_recomm_limit_type
      );
      // formdata.append("user_recomm_limit_span_or_number", this.state.user_recomm_limit_span_or_number);
      //formdata.append("user_recomm_limit_span_type", this.state.user_recomm_limit_span_type);
      formdata.append("difficultyornumber", this.state.difficultyornumber);
      formdata.append(
        "publishedAt",
        dateFormat(this.state.Publishedvalue, "yyyy-mm-dd,H:MM:ss")
      );
      if (Endsvalue != null) {
        formdata.append("endsAt", Endsvalue);
      }
      const data = {
        title: this.state.title,
        content: this.state.content,
        summary: this.state.summary,
        published: this.state.status,
        difficultyornumber: this.state.difficultyornumber,
        user_recomm_limit_type: this.state.user_recomm_limit_type,
        //user_recomm_limit_span_or_number: this.state.user_recomm_limit_span_or_number,
        //user_recomm_limit_span_type: this.state.user_recomm_limit_span_type,

        publishedAt: dateFormat(
          this.state.Publishedvalue,
          "yyyy-mm-dd,H:MM:ss"
        ),
        endsAt: Endsvalue,
      };
      // console.log("data",data)
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/update-Survey/${id}`,
          formdata,
          {
            withCredentials: true,
            headers: {
              Bearer: token(),
            },
          }
        )
        .then(async (response) => {
          if (
            this.state.surveyOwnerId == AuthData.data.id &&
            AuthData.data.admin_role.role_name == "Author"
          ) {
            // console.log('gggggggggggg',this.state.authorId)
            await this.updateModaratorAuthor(response.data.data[0]);
          }
          return axios.patch(
            `${process.env.REACT_APP_API_URL}/edit-Category_survey/${id}`,
            {
              categories: this.state.catId,
            },
            {
              withCredentials: true,
              headers: {
                Bearer: token(),
              },
            }
          );
        })
        .then((response) => {
          return axios.patch(
            `${process.env.REACT_APP_API_URL}/edit-Tag_survey/${id}`,
            {
              categories: this.state.tagId,
            },
            {
              withCredentials: true,
              headers: {
                Bearer: token(),
              },
            }
          );
        })
        .then((response) => {
          return axios.patch(
            `${process.env.REACT_APP_API_URL}/editSurveyMeta/${id}`,
            {
              categories: this.state.meta,
            },
            {
              withCredentials: true,
              headers: {
                Bearer: token(),
              },
            }
          );
        })
        .then((response) => {
          this.setState({ loading: false });
          toast.success(`Analyzer updated successfully`);
          // this.props.history.push({
          //   pathname: "/admin/survey/survey-list",
          // });
        })

        .catch((error) => {
          toast.warning(`Server Errors`);
          this.setState({ loading: false });
          console.log("error response", error);
        });
    }
  };

  updateModaratorAuthor = (data) => {
    return axios
      .post(
        `${process.env.REACT_APP_API_URL}/edit-author-survey`,
        {
          survey_id: data.id,
          authors: this.state.authorId,
        },
        {
          withCredentials: true,
          headers: {
            Bearer: token(),
          },
        }
      )
      .then((res) => {
        console.log(res);
      });
  };
  //META-------------
  setTag = (data) => {
    this.setState({ tag: [...data] });
  };
  multitag = (data) => {
    let tagId = data.map((i) => {
      return i.value;
    });
    this.setState({ selectedTag: data, tagId });
  };
  metaController = (e) => {
    let meta = [...this.state.meta];
    let className = e.target.className;
    let check = className.substr(0, className.indexOf(" "));
    meta[e.target.dataset.d][check] = e.target.value.toLowerCase();
    this.setState({ meta });
  };
  addMeta = () => {
    this.setState((prevState) => ({
      meta: [...prevState.meta, { key: "", content: "" }],
    }));
  };
  //--------------------------------

  //Primary
  getStatus = (data) => {
    //console.log(data)
    if (data.value == "Draft") {
      this.setState({ status: "0", selectedOpt: "Draft" });
    } else if (data.value == "Published") {
      this.setState({ status: "1", selectedOpt: "Published" });
    } else if (data.value == "Inactive") {
      this.setState({ status: "2", selectedOpt: "Inactive" });
    }
  };

  title = (e) => {
    this.setState({ title: e.target.value });
  };
  content = (data) => {
    this.setState({ content: data });
  };
  summary = (data) => {
    this.setState({ summary: data });
  };
  onRecomChange = (e) => {
    this.setState({ user_recomm_limit_type: e.target.value });
  };
  radioCondition = (e) => {
    console.log(e.target.value);
    this.setState({ difficultyornumber: e.target.value });
  };
  file_handle_change = (e) => {
    this.setState({ feature_image: e.target.files[0] });
  };
  Recomm_limit_span_or_number = (e) => {
    this.setState({ user_recomm_limit_span_or_number: e.target.value });
  };

  // user_hour_week_month = (data) => {
  //   //this.setState({ hour_week_month: e.target.value });
  //   if (data.value == "Hour") {
  //     this.setState({user_recomm_limit_span_type: "Hour" });
  //   } else if (data.value == "Week") {
  //     this.setState({ user_recomm_limit_span_type: "Week" });
  //   } else if (data.value == "Month") {
  //     this.setState({ user_recomm_limit_span_type: "Month" });
  //   }
  // };
  multicategory = (data) => {
    let catId = data.map((i) => {
      return i.id;
    });
    this.setState({ selectedCat: data, catId });
  };
  setCategory = (cat) => {
    this.setState({ category: [...cat] });
  };
  setPublishedTime = (t) => {
    this.setState({ Publishedvalue: t });
  };
  setEndTime = (t) => {
    this.setState({ Endsvalue: t });
  };
  back = () => {
    this.props.history.push({
      pathname: "/admin/survey/survey-list",
    });
  };

  setAuthor = (author) => {
    this.setState({ authors: [...author] });
  };
  multiAuthor = (data) => {
    let authorId = data.map((i) => {
      return i.id;
    });

    this.setState({ selectedAuth: data, authorId });
  };
  setKey = (k) => {
    console.log("k", k);
    this.setState({ key: k });
  };
  render() {
    //console.log(this.state.user_recomm_limit_span_or_number)
    // console.log(this.state.difficulty)
    const options = [
      { value: "Draft", label: "Draft" },
      { value: "Published", label: "Published" },
      { value: "Inactive", label: "Inactive" },
    ];
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
            <Tab title="Primary Form" eventKey="Primary Form">
              {this.state.key == "Primary Form" && (
                <Primary
                  history={this.props.history}
                  title={this.title}
                  content={this.content}
                  summary={this.summary}
                  back={this.back}
                  setCategory={this.setCategory}
                  setPublishedTime={this.setPublishedTime}
                  radioCondition={this.radioCondition}
                  setEndTime={this.setEndTime}
                  multicategory={this.multicategory}
                  getStatus={this.getStatus}
                  onRecomChange={this.onRecomChange}
                  Recomm_limit_span_or_number={this.Recomm_limit_span_or_number}
                  user_hour_week_month={this.user_hour_week_month}
                  clickSubmit={this.clickSubmit}
                  isValid={this.isValid}
                  file_handle_change={this.file_handle_change}
                  setAuthor={this.setAuthor}
                  multiAuthor={this.multiAuthor}
                  surveyOwnerId={this.state.surveyOwnerId}
                  state={{ ...this.state }}
                />
              )}
            </Tab>

            <Tab title="Meta Form" eventKey="Meta Form">
              {this.state.key == "Meta Form" && (
                <Meta
                  history={this.props.history}
                  state={{ ...this.state }}
                  setTag={this.setTag}
                  multitag={this.multitag}
                  metaController={this.metaController}
                  addMeta={this.addMeta}
                />
              )}
            </Tab>
          </Tabs>
        </LoadingOverlay>
      </>
    );
  }
}

export default AddSurvey;
