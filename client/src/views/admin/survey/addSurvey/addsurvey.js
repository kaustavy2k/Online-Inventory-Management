import Primary from "./primaryAdd";
import Meta from "./metaAdd";
import React, { Component } from "react";
import axios from "axios";
import { Spinner, Tabs, Tab } from "react-bootstrap";
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

class AddSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      nameerr: "",
      deserr: "",
      staterr: "",
      caterr: "",
      sumerr: "",
      tagerr: "",
      metaerr: "",
      ckeditor: "",
      exceedError: "",
      difficultyornumbererr:'',
      Publishedvalue: new Date(),
      Endsvalue: null,
      category: [],
      catId: [],
      tagId: [],
      authorId: [],
      selectedCat: [],
      selectedTag: [],
      title: "",
      content: "",
      summary: "",
      user_recomm_limit_type: 2,
      difficultyornumber: 9,
      user_recomm_limit_span_type: "",
      user_recomm_limit_inseconds: "",
      selectedOpt: "Published",
      status: "1",
      tag: [],
      feature_image: "",
      meta: [{ key: "", content: "" }],
      max_difficulty: "",
      authors: [],
      selectedAuth: [],
    };
  }
  isValid = () => {
    let back = true;
    if (!this.state.title) {
      this.setState({ nameerr: "Name is required", loading: false });
      back = false;
    } else {
      this.setState({ nameerr: "" });
    }

    if (!this.state.difficultyornumber) {
      this.setState({ difficultyornumbererr: "This field is required", loading: false });
      back = false;
    } else {
      this.setState({ difficultyornumbererr: "" });
    }

    if (!this.state.content) {
      this.setState({ deserr: "Content is required", loading: false });
      back = false;
    } else {
      this.setState({ deserr: "" });
    }
    if (!this.state.summary) {
      this.setState({ sumerr: "Summary is required", loading: false });
      back = false;
    } else {
      this.setState({ sumerr: "" });
    }
    if (this.state.status == null) {
      this.setState({ staterr: "Status is required", loading: false });
      back = false;
    } else {
      this.setState({ staterr: "" });
    }
    if (!this.state.catId.length) {
      this.setState({ caterr: "Topic is required", loading: false });
      back = false;
    } else {
      this.setState({ caterr: "" });
    }
    if (this.state.summary.split(" ").length > 300) {
      //this.setState({ caterr: "Catagory is required", loading: false });
      back = false;
    }
    // if (!this.state.tagId.length) {
    //   this.setState({ tagerr: "Tag is required", loading: false });
    //   back = false;
    // } else {
    //   this.setState({ caterr: "", loading: false });
    // }
    // for (let i = 0; i < this.state.meta.length; i++) {
    //   if (
    //     (!this.state.meta[i].key && this.state.meta[i].content) ||
    //     (!this.state.meta[i].content && this.state.meta[i].content)
    //   ) {
    //     this.setState({
    //       metaerr: "Both Key and Content is required",
    //       loading: false,
    //     });
    //     back = false;
    //     break;
    //   }
    // }
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
    event.preventDefault();
    this.setState({ loading: true });
    let Endsvalue = this.state.Endsvalue
      ? (Endsvalue = dateFormat(this.state.Endsvalue, "yyyy-mm-dd,H:MM:ss"))
      : null;

    if (this.isValid()) {
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
        // user_recomm_limit_span_or_number:
        //   this.state.user_recomm_limit_span_or_number,
        //user_recomm_limit_span_type: this.state.user_recomm_limit_span_type,

        publishedAt: dateFormat(
          this.state.Publishedvalue,
          "yyyy-mm-dd,H:MM:ss"
        ),
        endsAt: Endsvalue,
      };
      // console.log(this.state.feature_image)
      // return
      axios
        .post(`${process.env.REACT_APP_API_URL}/Add-Survey`, formdata, {
          withCredentials: true,
          headers: {
            Bearer: token(),
          },
        })
        .then( async (response) => {
          if(this.state.authorId.length>0){
            await this.saveModaratorAuthor(response.data.data[0])
          }
          return axios.post(
            `${process.env.REACT_APP_API_URL}/add-Category_survey/`,
            {
              survey_id: response.data.data[0].id,
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
          return axios.post(
            `${process.env.REACT_APP_API_URL}/add-Tag_survey/`,
            {
              survey_id: response.data.data[0].poll_id,
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
          if (response.data) {
            return axios.post(
              `${process.env.REACT_APP_API_URL}/addSurveyMeta/`,
              {
                survey_id: response.data.bfanalyzer_survey_id,
                categories: this.state.meta,
              },
              {
                withCredentials: true,
                headers: {
                  Bearer: token(),
                },
              }
            );
          } else {
            return;
          }
        })
        .then(() => {
          this.setState({ loading: false });
          toast.success(`Analyzer Successfully Added`);
          setTimeout(() => {
            this.props.history.push({
              pathname: "/admin/survey/survey-list",
            });
          }, 1500);
        })

        .catch((error) => {
          toast.warning(`Server Errors`);
          this.setState({ loading: false });
          console.log("error response", error);
        });
    }
  };

  saveModaratorAuthor = (data) => {
  return axios.post(
    `${process.env.REACT_APP_API_URL}/add-author-survey/`,
    {
      survey_id: data.id,
      authors: this.state.authorId,
    },
    {
      withCredentials: true,
      headers: {
        Bearer: token(),
      },
    }).then((res) => {
     console.log(res)
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
    meta[e.target.dataset.id][check] = e.target.value.toLowerCase();
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
    if (data.value == "Draft") {
      this.setState({ status: "0", selectedOpt: "Draft" });
    } else if (data.value == "Published") {
      this.setState({ status: "1", selectedOpt: "Published" });
    } else if (data.value == "Inactive") {
      this.setState({ status: "2", selectedOpt: "Inactive" });
    }
  };

  title = (e) => {
    this.setState({ title: e.target.value ,nameerr:''});
  };
  content = (data) => {
    this.setState({ content: data,deserr:'' });
  };
  onRecomChange = (e) => {
    console.log(e.target.value);
    this.setState({ user_recomm_limit_type: e.target.value });
  };
  radioCondition = (e) => {
    //console.log(e)
    this.setState({ difficultyornumber: e.target.value,difficultyornumbererr:'' });
  };

  file_handle_change = (e) => {
    this.setState({ feature_image: e.target.files[0] });
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

  summary = (data) => {
    this.setState({ summary: data ,sumerr:'',exceedError:''});
  };
  setDifficulty = (e) => {
    console.log(e.target.value);
    this.setState({ max_difficulty: e.target.value });
  };
  multicategory = (data) => {
    let catId = data.map((i) => {
      return i.id;
    });
    this.setState({ selectedCat: data, catId ,caterr:''});
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

  setAuthor = (author) => {
    this.setState({ authors: [...author] });
  };
  multiAuthor = (data) => {
    let authorId = data.map((i) => {
      return i.id;
    });
    this.setState({ selectedAuth: data, authorId });
  };

  reset = () => {
    document.getElementsByClassName("survey")[0].value = "";
    this.setState({
      Endsvalue: null,
      Publishedvalue: new Date(),
      ckeditor: "<p></p>",
      title: "",
      content: "",
      summary: "",
      meta: [{ title: "", content: "" }],
      selectedCat:[],
      selectedTag:[]
    });
  };
  render() {
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
          <Tabs>
            <Tab title="Primary Form" eventKey="Primary Form">
              <Primary
                history={this.props.history}
                title={this.title}
                content={this.content}
                summary={this.summary}
                reset={this.reset}
                setCategory={this.setCategory}
                setAuthor={this.setAuthor}
                setPublishedTime={this.setPublishedTime}
                setEndTime={this.setEndTime}
                setDifficulty={this.setDifficulty}
                multicategory={this.multicategory}
                multiAuthor={this.multiAuthor}
                getStatus={this.getStatus}
                clickSubmit={this.clickSubmit}
                isValid={this.isValid}
                onRecomChange={this.onRecomChange}
                radioCondition={this.radioCondition}
                user_hour_week_month={this.user_hour_week_month}
                file_handle_change={this.file_handle_change}
                state={{ ...this.state }}
              />
            </Tab>
            <Tab title="Meta Form" eventKey="Meta Form">
              <Meta
                history={this.props.history}
                state={{ ...this.state }}
                setTag={this.setTag}
                multitag={this.multitag}
                metaController={this.metaController}
                addMeta={this.addMeta}
              />
            </Tab>
          </Tabs>
        </LoadingOverlay>
      </>
    );
  }
}

export default AddSurvey;
