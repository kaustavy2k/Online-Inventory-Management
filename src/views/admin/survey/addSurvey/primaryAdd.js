import React, { Component } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import Select from "react-select";
import LoadingOverlay from "react-loading-overlay";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DateTimePicker from "react-datetime-picker";
import makeAnimated from "react-select/animated";
import dateFormat from "dateformat";
import { token } from "../../token";
import "../survey.css";
import { InputGroup, FormControl } from "react-bootstrap";
import NumericInput from 'react-numeric-input';
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
const animatedComponents = makeAnimated();
class PrimaryAdd extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/category`, {
        withCredentials: true,
        headers: {
          Bearer: token(),
        },
      })
      .then((res) => {
        let category = [...res.data.data.category];
        let cat = [];
        category.forEach((i) => {
          cat.push({ value: i.title, label: i.title, id: i.id });
        });
       
        this.props.setCategory(cat);
      });
      this.getAllAuthor()
  }


  getAllAuthor=()=> {
    axios
      .get(`${process.env.REACT_APP_API_URL}/get-all-author`, {
        withCredentials: true,
        headers: {
          Bearer: token(),
        },
      })
      .then((res) => {
        let author = [...res.data.data.author];
        let authors = [];
        author.forEach((i) => {
          authors.push({ value: i.name, label: i.name, id: i.id });
        });
        // this.setState({ category: [...cat] });
        this.props.setAuthor(authors);
      });
  }


  render() {
    const colourOptions = [...this.props.state.category];
    const authorOptions = [...this.props.state.authors];
    const options = [
      { value: "Draft", label: "Draft" },
      { value: "Published", label: "Published" },
      { value: "Inactive", label: "Inactive" },
    ];
    const options2 = [
      { value: "Hour", label: "Hour" },
      { value: "Week", label: "Week" },
      { value: "Month", label: "Month" },
    ];
    return (
      <>
          <CRow>
            <CCol xs="12" md="12">
              <CCard>
                <CCardHeader>
                  Add
                  <small> Primary analyzer</small>
                </CCardHeader>
                <CCardBody>
                  <CForm action="" method="post">
                    <CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="survey">Topic*</CLabel>
                      <div style={{ width: "400px" }}>
                        <Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          defaultValue={[...this.props.state.selectedCat]}
                          key={[...this.props.state.selectedCat]}
                          isMulti
                          options={colourOptions}
                          onChange={this.props.multicategory}
                        />
                      </div>
                      <span style={{ color: "red" }}>
                        {this.props.state.caterr}
                      </span>
                    </CFormGroup>
                      <CLabel htmlFor="survey">Analyzer Title*</CLabel>
                      <CInput
                        className="survey"
                        autoComplete="off"
                        placeholder="Enter Title"
                        onChange={this.props.title}
                        value={this.props.state.title}
                      />
                      <span style={{ color: "red" }}>
                        {this.props.state.nameerr}
                      </span>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="survey">Feature image (Optional)</CLabel>
                      <br/>
                      <input type="file" accept="image/*" onChange={this.props.file_handle_change} name="feature_image" />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="survey">Summary*</CLabel>
                      {/* <CInput
                        className="survey"
                        autoComplete="off"
                        placeholder="Enter Summary"
                        onChange={(e) => (this.summary = e.target.value)}
                      /> */}
                      <CKEditor
                        data={this.props.state.summary}
                        editor={ClassicEditor}
                        //data="<p>Hello from CKEditor 5!</p>"
                        // onReady={(editor) => {
                        //   // You can store the "editor" and use when it is needed.
                        //   console.log("Editor is ready to use!", editor);
                        // }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          this.props.summary(data);
                          //console.log({ event, editor, data });
                        }}
                      />
                      <span style={{ color: "red" }}>
                        {this.props.state.sumerr}
                      </span>&nbsp;
                      <span style={{ color: "red" }}>
                        {this.props.state.exceedError}
                      </span>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="survey">Content*</CLabel>
                      {/* <CInput
                        className="survey"
                        autoComplete="off"
                        placeholder="Enter Content"
                        onChange={(e) => (this.content = e.target.value)}
                      /> */}

                      <CKEditor
                        editor={ClassicEditor}
                        //   config={ {
                        //     plugins: [ Paragraph ],
                        // } }
                        data={this.props.state.content}
                        // onReady={(editor) => {
                        //   // You can store the "editor" and use when it is needed.
                        //   console.log("Editor is ready to use!", editor);
                        // }}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          this.props.content(data);
                          //console.log({ event, editor, data });
                        }}
                        // onBlur={ ( event, editor ) => {
                        //     console.log( 'Blur.', editor );
                        // } }
                        // onFocus={ ( event, editor ) => {
                        //     console.log( 'Focus.', editor );
                        // } }
                      />
                      <span style={{ color: "red" }}>
                        {this.props.state.deserr}
                      </span>
                    </CFormGroup>
                    {/* <CFormGroup style={{ width: "200px" }} onChange={this.props.setDifficulty}>
                    <CLabel>Max Difficulty Number*</CLabel>
                    <InputGroup className="mb-3">
                    
                      <FormControl  placeholder="Enter difficulty" />
                    </InputGroup>
                    <span style={{ color: "red" }}>
                      {this.props.state.costerr}
                    </span>
                  </CFormGroup> */}
                    <CFormGroup>
                      <CLabel htmlFor="survey">Status*</CLabel>
                      <div style={{ width: "200px" }}>
                        <Select
                          defaultValue={{
                            value: this.props.state.selectedOpt,
                            label: this.props.state.selectedOpt,
                          }}
                          options={options}
                          onChange={this.props.getStatus}
                        />
                      </div>
                      <span style={{ color: "red" }}>
                        {this.props.state.staterr}
                      </span>
                    </CFormGroup>
                   
                    <CFormGroup>
                      <CLabel htmlFor="survey">Published At*</CLabel>
                      <br></br>
                      <DateTimePicker
                        onChange={this.props.setPublishedTime}
                        value={this.props.state.Publishedvalue}
                        minDate={new Date()}
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="survey">Ends At</CLabel>
                      <br></br>
                      <DateTimePicker
                        onChange={this.props.setEndTime}
                        value={this.props.state.Endsvalue}
                        minDate={new Date()}
                      />
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="survey"></CLabel>
                      <br></br>
                      {/* <input  type="radio" name='user_recom' value={1} checked={1 == this.props.state.user_recomm_limit_type} onChange={(e)=>this.props.onRecomChange(e)}/> Limit by recomendation number */}

                      <input  type="radio" name='user_recom' value={2} checked={2 == this.props.state.user_recomm_limit_type} onChange={(e)=>this.props.onRecomChange(e)}/> Limit by max difficulty
                    </CFormGroup>
                    <CFormGroup >
                      {/* <CLabel htmlFor="survey">Limit by recomendation number*</CLabel> */}
                      <div className="row col-md-3">
                        {/* <div className="col-md-3" style={{display:this.props.state.user_recomm_limit_type?'':'none'}}> */}
                            {/* <NumericInput min={1} max={100} value={this.props.state.user_recomm_limit_span_or_number} onChange={this.props.Recomm_limit_span_or_number}/> */}
                            <CInput
                              className="survey"
                              autoComplete="off"
                              placeholder="Enter Number"
                              onChange={this.props.radioCondition}
                              value={this.props.state.difficultyornumber}
                            />
                            <span style={{ color: "red" }}>
                        {this.props.state.difficultyornumbererr}
                      </span>
                          {/* <span style={{ color: "red" }}>                        
                          </span> */}
                        {/* </div> */}
                        {/* <div className="col-md-3" style={{display:this.props.state.user_recomm_limit_type==2?'':'none'}}>
                          <Select
                            defaultValue={{
                              value: this.props.state.user_recomm_limit_span_type,
                              label: 'SELECT (Hour/Week/Month)',
                            }}
                            options={options2}
                            onChange={this.props.user_hour_week_month}
                          />
                        </div> */}
                      </div>
                      
                      {/* <select>
                        <option value="Hour">Hour</option>
                        <option value="Week">Week</option>
                        <option value="Month">Month</option>
                      </select> */}
                      
                    </CFormGroup>
                    {AuthData.data.admin_role.role_name=='Author'?      
                    <CFormGroup>
                      <CLabel htmlFor="survey">Add Moderator</CLabel>
                      <div style={{ width: "400px" }}>
                        <Select
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          defaultValue={[...this.props.state.selectedAuth]}
                          isMulti
                          options={authorOptions}
                          onChange={this.props.multiAuthor}
                        />
                      </div>
                     
                    </CFormGroup>
                    :""
                    }
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
                  &nbsp;
                  <CButton
                    type="reset"
                    size="sm"
                    color="danger"
                    onClick={this.props.reset}
                  >
                    <CIcon name="cil-ban" /> Reset
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

export default PrimaryAdd;
