import React, { Component } from "react";
import axios from "axios";
import { Spinner, Tabs, Tab } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { toast, ToastContainer } from "react-toastify";
import PrimaryAdd from "./primaryAdd";
import dateFormat from "dateformat";
//import MediaAdd from "./mediaAdd";
import "../recommendation.css";
import "react-toastify/dist/ReactToastify.css";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
  CSwitch,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

class AddRecommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      content: "",
      loading: false,
      nameerr: "",
      deserr: "",
      filedocerr: "",
      filevideoerr: "",
      files: [],
      doc: [],
      video: [],
      limit: 0,
      cost: null,
      Implementationvalue: null,
      user_recomm_limit_span_or_number: "",
      user_recomm_limit_span_type: "Hour",
      costerr: "",
      difficulty:2
    };
  }

  handleChange = (event, change) => {
    // this.setState({ error: "", nameerr: "", deserr: "" });
    this.setState({ [change]: event.target.value });
  };
  resetbutton = () => {
    this.setState({
      name: "",
      content: "",
      loading: false,
      nameerr: "",
      deserr: "",
      filedocerr: "",
      filevideoerr: "",
      files: [],
      doc: [],
      video: [],
      limit: 0,
      cost: null,
      Implementationvalue: null,
      user_recomm_limit_span_or_number: "",
      user_recomm_limit_span_type: "Hour",
      costerr: "",
      difficulty:2
    })
  }
  mediaHandlerDelete = (del, id) => {
    let files;
    let flag = 1;
    if (id == "myUniqueUploadId") {
      files = [...this.state.video, ...del.cachedFileArray];
      for (let obj in del.cachedFileArray) {
        if (del.cachedFileArray[obj].size > 5000000) {
          this.setState({
            filedocerr: "5MB exceeded",
            files,
          });
          flag = 0;
          break;
        }
      }
      if (flag == 1) {
        this.setState({ files, filedocerr: "" });
      }
      //console.log("delete", files);
    } else {
      files = [...this.state.doc, ...del.cachedFileArray];
      for (let obj in del.cachedFileArray) {
        if (del.cachedFileArray[obj].size > 1000000 * 120) {
          this.setState({
            filevideoerr: "120MB exceeded",
            files,
          });
          flag = 0;
          //console.log("loop")
          break;
        }
      }
      if (flag == 1) {
        this.setState({ files, filevideoerr: "" });
        //console.log("loopffhfh")
      }
      //console.log("delete", files);
    }
  };
  mediaHandler = (doc, video) => {
    let files = [...doc.cachedFileArray, ...video.cachedFileArray];
    //console.log('doc.cachedFileArray',files)
    let docfiles = [...doc.cachedFileArray];
    let videofiles = [...video.cachedFileArray];
    console.log("checking", files);
    //console.log("files",files[0])
    let obj;
    for (obj in docfiles) {
      //console.log("obj",files[obj].size)
      if (docfiles[obj].size > 5000000) {
        this.setState({
          filedocerr: "5MB exceeded",
        });
        break;
      }
    }
    for (obj in videofiles) {
      //console.log("obj",files[obj].size)
      if (videofiles[obj].size > 1000000 * 120) {
        this.setState({
          filevideoerr: "120MB exceeded",
        });
        break;
      }
    }
    this.setState({
      files: files,
      doc: doc.cachedFileArray,
      video: video.cachedFileArray,
    });
  };
  difficultyHandler = (e) => {
    //console.log("diff",e)
    this.setState({ difficulty: e.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.name !== prevState.name) {
      if (this.state.name.length) {
        this.setState({ nameerr: "" });
      }
    }
    if (this.state.name !== prevState.name) {
      if (this.state.name.length) {
        this.setState({ nameerr: "" });
      }
    }
  }
  // Validation
  isValid = () => {
    const { name, content, cost, filedocerr, filevideoerr } = this.state;
    let back = true;
    if (name.length === 0) {
      this.setState({ nameerr: "Name is required", loading: false });
      back = false;
    } else {
      this.setState({ nameerr: "" });
    }
    if (content.length === 0) {
      this.setState({ deserr: "Content is required", loading: false });
      back = false;
    } else {
      this.setState({ deserr: "" });
    }
    if (cost === -1) {
      this.setState({ costerr: "Enter proper amount", loading: false });
      back = false;
    } else {
      this.setState({ costerr: "" });
    }
    if (filedocerr) {
      back = false;
    }
    if (filevideoerr) {
      back = false;
    }
    return back;
  };
  // submit action
  clickSubmit = (event) => {
    event.preventDefault();
    let Implementationvalue = this.state.Implementationvalue
      ? (Implementationvalue = dateFormat(
          this.state.Implementationvalue,
          "yyyy-mm-dd,H:MM:ss"
        ))
      : null;
      //console.log("obj state",this.state.files)
    const formdata = new FormData();
    for (let obj in this.state.files) {
      console.log("obj",this.state.files[obj])
      formdata.append("" + obj, this.state.files[obj]);
    }
    console.log("formdata test",formdata)
    this.setState({ loading: true });
    if (this.isValid()) {
      const {
        name,
        content,
        cost,
        difficulty,
        user_recomm_limit_span_or_number,
        user_recomm_limit_span_type,
      } = this.state;
      const data = {
        name,
        content,
        Implementationvalue,
        cost,
        difficulty,
        user_recomm_limit_span_or_number,
        user_recomm_limit_span_type,
      };
      axios
        .post(` ${process.env.REACT_APP_API_URL}/add-recommendation`, data, {
          withCredentials: true,
        })
        .then((response) => {
          //let filename = files.delfile.name;
          return axios.post(
            `${process.env.REACT_APP_API_URL}/add-media/${response.data.data[0].id}`,
            formdata,
            {
              withCredentials: true,
            }
          );
        })
        .then((res) => {
          toast.success(`Recommendation successfully added`);
          this.setState({ loading: false });
          setTimeout(() => {
            this.props.history.push({
              pathname: "/admin/recommendation/recommendation-list",
            });
          }, 1500);
        })
        .catch((error) => {
          //this.setState({loading: false})
          toast.warning(`Server Errors`);
          this.setState({ loading: false });
          console.log("error response", error);
        });
    } else {
      this.setState({ loading: false });
    }
  };
  content = (data) => {
    this.setState({ content: data ,deserr:''});
  };
  setImplementationTime = (t) => {
    this.setState({ Implementationvalue: t });
  };
  cost = (c) => {
    if (isNaN(c.target.value)) {
      this.setState({ cost: -1 });
    } else {
      this.setState({ cost: c.target.value, costerr: "" });
    }
  };
  Recomm_limit_span_or_number = (e) => {
    this.setState({ user_recomm_limit_span_or_number: e.target.value });
  };

  user_hour_week_month = (data) => {
    //this.setState({ hour_week_month: e.target.value });
    if (data.value == "Hour") {
      this.setState({ user_recomm_limit_span_type: "Hour" });
    } else if (data.value == "Week") {
      this.setState({ user_recomm_limit_span_type: "Week" });
    } else if (data.value == "Month") {
      this.setState({ user_recomm_limit_span_type: "Month" });
    }
  };
  clear = (e) => {
    if (e.target.id == "cleardocfiles") {
      this.setState({ files: this.state.video, doc: [] });
    } else {
      this.setState({ files: this.state.doc, video: [] });
    }
  };
  render() {
    console.log("files", this.state.files);
    return (
      <>
        <LoadingOverlay
          active={this.state.loading}
          spinner={<Spinner animation="grow" variant="primary" size="lg" />}
        >
          <PrimaryAdd
          difficultyHandler={this.difficultyHandler}
            handleChange={this.handleChange}
            mediaHandler={this.mediaHandler}
            mediaHandlerDelete={this.mediaHandlerDelete}
            clickSubmit={this.clickSubmit}
            content={this.content}
            cost={this.cost}
            setImplementationTime={this.setImplementationTime}
            Recomm_limit_span_or_number={this.Recomm_limit_span_or_number}
            user_hour_week_month={this.user_hour_week_month}
            state={{ ...this.state }}
            clear={this.clear}
            resetbutton={this.resetbutton}
          />
          {/* <Tabs>
            <Tab title="Primary Form" eventKey="Primary Form">
              <PrimaryAdd
                handleChange={this.handleChange}
                mediaHandler={this.mediaHandler}
                clickSubmit={this.clickSubmit}
                state={{ ...this.state }}
              />
            </Tab>
            {/* <Tab title="Media Form" eventKey="Media Form">
              <MediaAdd mediaHandler={this.mediaHandler}
              state={{...this.state}} />
            </Tab> */}
          {/* <Tab
              title="Answer Combination Form"
              eventKey="Answer Combination Form"
            >
              Answer Combination
            </Tab>
          </Tabs> */}
        </LoadingOverlay>
        <ToastContainer />
      </>
    );
  }
}

export default AddRecommendation;
