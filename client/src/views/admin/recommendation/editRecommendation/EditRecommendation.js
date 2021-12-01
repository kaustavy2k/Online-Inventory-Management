import React, { Component } from "react";
import axios from "axios";
import { Spinner, Tabs, Tab } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { toast, ToastContainer } from "react-toastify";
import PrimaryEdit from "./editPrimary";
import "../recommendation.css";
//import MediaEdit from "./editMedia"
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

class EditRecommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.location.state.name,
      content: this.props.location.state.content,
      cost: this.props.location.state.cost,
      difficulty: this.props.location.state.difficulty,
      Implementationvalue: this.props.location.state.avgtime,
      user_recomm_limit_span_or_number: this.props.location.state.user_recomm_limit_span_or_number,
      user_recomm_limit_span_type: this.props.location.state.user_recomm_limit_span_type,
      loading: false,
      getdoc: [],
      getvideo: [],
      files: [],
      nameerr: "",
      deserr: "",
      filedocerr: "",
      filevideoerr: "",
      costerr: "",
      doc: [],
      video: [],
    };
  }
  getMedia = () => {
    this.setState({ loading: true });
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/get-media/${this.props.match.params.id}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        let getdoc = [];
        let getvideo = [];
        res.data.data.forEach((item) => {
          if (item.type == "video/mp4") {
            getvideo.push(item);
          } else {
            getdoc.push(item);
          }
        });
        this.setState({ getdoc, getvideo, loading: false });
      })
      .catch((err) => {
        toast.warning("Server Error");
        this.setState({ loading: false });
      });
  };
  componentDidMount() {
    this.getMedia();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.name !== prevState.name) {
      if (this.state.name.length) {
        this.setState({ nameerr: "" });
      }
    }
    if (this.state.content !== prevState.content) {
      if (this.state.content.length) {
        this.setState({ deserr: "" });
      }
    }
  }
  difficultyHandler = (e) => {
    //console.log("diff",e)
    this.setState({ difficulty: e.value });
  };

  handleChange = (event, change) => {
    // this.setState({ error: "", nameerr: "", deserr: "" });
    this.setState({ [change]: event.target.value });
  };
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
    let docfiles = [...doc.cachedFileArray];
    let videofiles = [...video.cachedFileArray];
    // console.log("checking", files);
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
  content = (data) => {
    this.setState({ content: data });
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
    
    if (this.isValid()) {
      this.setState({ loading: true });
      const formdata = new FormData();
      for (let obj in this.state.files) {
        //console.log("obj",this.state.files[obj])
        formdata.append("" + obj, this.state.files[obj]);
      }
      const {difficulty, name, content, cost, Implementationvalue,user_recomm_limit_span_or_number,user_recomm_limit_span_type } = this.state;
      const data = {
        name,
        content,
        difficulty,
        estimated_cost: cost,
        implementation_time: Implementationvalue,
        user_recomm_limit_span_or_number:user_recomm_limit_span_or_number,
        user_recomm_limit_span_type:user_recomm_limit_span_type
      };
      // console.log(data);
      axios
        .patch(
          ` ${process.env.REACT_APP_API_URL}/edit-recommendation/${this.props.match.params.id}`,
          data,
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          return axios.post(
            `${process.env.REACT_APP_API_URL}/add-media/${this.props.match.params.id}`,
            formdata,
            {
              withCredentials: true,
            }
          );
        })
        .then((res) => {
          toast.success(`Recommendation successfully added`);
          this.setState({ loading: false });
          this.getMedia();
          let el = document.getElementsByClassName(
            "custom-file-container__image-clear cleardoc"
          );
          el[0].click();
          el[1].click();
        })
        .catch((error) => {
          //this.setState({loading: false})
          toast.warning(`Server Errors`);
          this.setState({ loading: false });
          console.log("error response", error);
        });
    }
  };
  clear = (e) => {
    if (e.target.id == "cleardocfiles") {
      this.setState({ files: this.state.video, doc: [] });
    } else {
      this.setState({ files: this.state.doc, video: [] });
    }
  };
  Recomm_limit_span_or_number = (e) => {
    
    this.setState({ user_recomm_limit_span_or_number: e.target.value });
  };

  
  user_hour_week_month = (data) => {  
    //this.setState({ hour_week_month: e.target.value });
    if (data.value == "Hour") {
      this.setState({user_recomm_limit_span_type: "Hour" });
    } else if (data.value == "Week") {
      this.setState({ user_recomm_limit_span_type: "Week" });
    } else if (data.value == "Month") {
      this.setState({ user_recomm_limit_span_type: "Month" });
    }
  };
  back = () => {
    this.props.history.push({
      pathname: "/admin/recommendation/recommendation-list",
    });
  };
  deleteMedia = (id) => {
    console.log(id);
    let confirm = window.confirm("Do you want to delete this file?");
    if (confirm) {
      this.setState({ loading: true });
      axios
        .delete(`${process.env.REACT_APP_API_URL}/delete-media/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          toast.success("Media successfully deleted");
          this.getMedia();
        })
        .catch((err) => {
          toast.warning("Cannot delete,Server Error");
          this.setState({ loading: false });
        });
    }
  };
  render() {
    // console.log("files", this.state.files);
    return (
      <>
        <LoadingOverlay
          active={this.state.loading}
          spinner={<Spinner animation="grow" variant="primary" size="lg" />}
        >
          <PrimaryEdit
          difficultyHandler={this.difficultyHandler}
            match={this.props.match}
            handleChange={this.handleChange}
            mediaHandler={this.mediaHandler}
            mediaHandlerDelete={this.mediaHandlerDelete}
            clickSubmit={this.clickSubmit}
            content={this.content}
            cost={this.cost}
            setImplementationTime={this.setImplementationTime}
            state={{ ...this.state }}
            clear={this.clear}
            Recomm_limit_span_or_number={this.Recomm_limit_span_or_number}
            user_hour_week_month={this.user_hour_week_month}
            back={this.back}
            deleteMedia={this.deleteMedia}
          />
          <ToastContainer />
        </LoadingOverlay>
      </>
    );
  }
}

export default EditRecommendation;
