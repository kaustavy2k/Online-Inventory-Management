import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import { Spinner } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import FileUploadWithPreview from "file-upload-with-preview";
import { toast, ToastContainer } from "react-toastify";
import DateTimePicker from "react-datetime-picker";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { InputGroup, FormControl } from "react-bootstrap";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "react-toastify/dist/ReactToastify.css";
import "file-upload-with-preview/dist/file-upload-with-preview.min.css";
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
// import usersData from "src/views/users/UsersData";

class primaryAdd extends Component {
  constructor(props) {
    super(props);
    this.uploaddoc = "";
    this.uploadvideo = "";
  }
  componentDidMount() {
    this.uploaddoc = new FileUploadWithPreview("myUniqueUploadId");
    this.uploadvideo = new FileUploadWithPreview("myUniqueUploadIdvideo");
    window.addEventListener("fileUploadWithPreview:imageDeleted", (e) => {
      // console.log("delete",e.detail)
      this.props.mediaHandlerDelete(e.detail, e.detail.uploadId);
    });
  }
  check = (e) => {
    this.props.mediaHandler(this.uploaddoc, this.uploadvideo);
  };
  render() {
    console.log(this.props.state.difficulty);
    const options2 = [
      { value: "Hour", label: "Hour" },
      { value: "Week", label: "Week" },
      { value: "Month", label: "Month" },
    ];
    const labelwords = ["Simple", "Average", "Difficult", "Hard"];
    const options3 = [
      { value: "2", label: "Simple" },
      { value: "4", label: "Average" },
      { value: "6", label: "Difficult" },
      { value: "8", label: "Hard" },
    ];
    return (
      <>
        <CRow>
          <CCol xs="12" md="12">
            <CCard>
              <CCardHeader>
                Add
                <small> Recommendation</small>
              </CCardHeader>
              <CCardBody>
                <CForm className="scroller">
                  <CFormGroup>
                    <CLabel>Name</CLabel>
                    <CInput
                      autoComplete="off"
                      placeholder="Enter Name"
                      onChange={(e) => this.props.handleChange(e, "name")}
                      value={this.props.state.name}
                    />
                    <span style={{ color: "red" }}>
                      {this.props.state.nameerr}
                    </span>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>Content</CLabel>
                    <CKEditor
                      editor={ClassicEditor}
                      data={this.props.state.content}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        this.props.content(data);
                      }}
                    />
                    <span style={{ color: "red" }}>
                      {this.props.state.deserr}
                    </span>
                  </CFormGroup>
                  <CFormGroup onChange={this.props.cost}>
                    <CLabel>Estimated cost (optional) </CLabel>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        placeholder="Enter amount"
                        defaultValue={this.props.state.cost}
                      />
                    </InputGroup>
                    <span style={{ color: "red" }}>
                      {this.props.state.costerr}
                    </span>
                  </CFormGroup>
                  {/* <CFormGroup>
                      <CLabel>Avg Implementation Time</CLabel>
                      <br></br>
                      <DateTimePicker
                        onChange={this.props.setImplementationTime}
                        value={this.props.state.Implementationvalue}
                        minDate={new Date()}
                      />
                    </CFormGroup> */}
                  <CFormGroup>
                    <CLabel htmlFor="survey">Difficulty Level</CLabel>
                    <div className="row">
                      {/* <div className="col-md-3">
                            <CInput
                              className="survey"
                              autoComplete="off"
                              placeholder="Enter Number"
                              onChange={this.props.Recomm_limit_span_or_number}
                              value={this.props.state.user_recomm_limit_span_or_number}
                            />
                          <span style={{ color: "red" }}>                        
                          </span>
                        </div> */}
                      <div className="col-md-3">
                        <Select
                          defaultValue={{
                            value: this.props.state.difficulty,
                            label:
                              labelwords[this.props.state.difficulty / 2 - 1],
                          }}
                          options={options3}
                          onChange={this.props.difficultyHandler}
                        />
                      </div>
                    </div>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="survey">
                      Estimated implementation time (Optional)
                    </CLabel>
                    <div className="row">
                      <div className="col-md-3">
                        {/* <NumericInput min={1} max={100} value={this.props.state.user_recomm_limit_span_or_number} onChange={this.props.Recomm_limit_span_or_number}/> */}
                        <CInput
                          className="survey"
                          autoComplete="off"
                          placeholder="Enter Number"
                          onChange={this.props.Recomm_limit_span_or_number}
                          value={
                            this.props.state.user_recomm_limit_span_or_number
                          }
                        />
                        <span style={{ color: "red" }}></span>
                      </div>
                      <div className="col-md-3">
                        <Select
                          defaultValue={{
                            value: this.props.state.user_recomm_limit_span_type,
                            label: this.props.state.user_recomm_limit_span_type,
                          }}
                          options={options2}
                          onChange={this.props.user_hour_week_month}
                        />
                      </div>
                    </div>

                    {/* <select>
                        <option value="Hour">Hour</option>
                        <option value="Week">Week</option>
                        <option value="Month">Month</option>
                      </select> */}
                  </CFormGroup>
                  <br></br>
                  <div className="display_delete">
                    <div
                      className="custom-file-container upload"
                      data-upload-id="myUniqueUploadId"
                    >
                      <label>
                        Upload File
                        <div
                          onClick={this.props.clear}
                          className="custom-file-container__image-clear cleardoc"
                          title="Clear Image"
                          id="cleardocfiles"
                        >
                          &times;
                        </div>
                        &nbsp;
                        <span style={{ color: "green" }}>(max 5 MB each)</span>
                      </label>
                      <label className="custom-file-container__custom-file">
                        <input
                          onChange={this.check}
                          type="file"
                          className="custom-file-container__custom-file__custom-file-input"
                          accept="image/*,application/pdf,application/docx,application/doc,application/txt"
                          multiple
                          aria-label="Choose File"
                        />
                        <input
                          type="hidden"
                          name="MAX_FILE_SIZE"
                          value="5000000"
                        />
                        <span className="custom-file-container__custom-file__custom-file-control"></span>
                      </label>
                      <div className="custom-file-container__image-preview"></div>
                      <span style={{ color: "red" }}>
                        {this.props.state.filedocerr}
                      </span>
                    </div>
                    <div>
                      <CLabel>Delete File</CLabel>
                      <div className="row deletediv">
                        {this.props.state.getdoc.map((item, id) => {
                          return (
                            <div className="deletechild" key={id}>
                              {item.type.match("image.*") ? (
                                <img
                                  className="imgsize"
                                  src={item.url}
                                  onClick={() =>
                                    window.open(`${item.url}`, "_blank")
                                  }
                                />
                              ) : (
                                <iframe
                                  className="imgsize"
                                  src={item.url}
                                  onClick={() =>
                                    window.open(`${item.url}`, "_blank")
                                  }
                                />
                              )}
                              <span
                                onClick={this.props.deleteMedia.bind(
                                  this,
                                  item.id
                                )}
                                title="Delete File"
                                className="closediv"
                              >
                                X
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="display_delete">
                    <div
                      className="custom-file-container upload"
                      data-upload-id="myUniqueUploadIdvideo"
                    >
                      <label>
                        Upload Video(.mp4)
                        <div
                          onClick={this.props.clear}
                          className="custom-file-container__image-clear cleardoc"
                          title="Clear Image"
                          id="clearvideofiles"
                        >
                          &times;
                        </div>
                        &nbsp;
                        <span style={{ color: "green" }}>
                          (max 120 MB each)
                        </span>
                      </label>
                      <label className="custom-file-container__custom-file">
                        <input
                          onChange={this.check}
                          type="file"
                          className="custom-file-container__custom-file__custom-file-input"
                          accept="video/*"
                          multiple
                          aria-label="Choose File"
                        />
                        <input
                          type="hidden"
                          name="MAX_FILE_SIZE"
                          value="5000000"
                        />
                        <span className="custom-file-container__custom-file__custom-file-control"></span>
                      </label>
                      <div className="custom-file-container__image-preview"></div>
                      <span style={{ color: "red" }}>
                        {this.props.state.filevideoerr}
                      </span>
                    </div>
                    <div>
                      {" "}
                      <CLabel>Delete Video</CLabel>
                      <div className="row deletediv">
                        {this.props.state.getvideo.map((item, id) => {
                          return (
                            <div className="deletechild" key={id}>
                              {item.type.match("image.*") ? (
                                <img
                                  className="imgsize"
                                  src={item.url}
                                  onClick={() =>
                                    window.open(`${item.url}`, "_blank")
                                  }
                                />
                              ) : (
                                <iframe
                                  className="imgsize"
                                  src={item.url}
                                  onClick={() =>
                                    window.open(`${item.url}`, "_blank")
                                  }
                                />
                              )}
                              <span
                                onClick={this.props.deleteMedia.bind(
                                  this,
                                  item.id
                                )}
                                title="Delete Video"
                                className="closediv"
                              >
                                X
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </CForm>
              </CCardBody>
              <CCardFooter>
                <CButton
                  type="submit"
                  size="sm"
                  color="primary"
                  onClick={this.props.clickSubmit}
                >
                  <CIcon name="cil-scrubber" /> Submit
                </CButton>
                <CButton
                  onClick={this.props.back}
                  type="reset"
                  size="sm"
                  color="danger"
                >
                  <CIcon name="cil-ban" /> Back
                </CButton>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </>
    );
  }
}

export default primaryAdd;
