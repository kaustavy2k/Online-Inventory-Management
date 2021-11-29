import React, { Component } from "react";
import axios from "axios";
import { Spinner, InputGroup, FormControl } from "react-bootstrap";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import LoadingOverlay from "react-loading-overlay";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DateTimePicker from "react-datetime-picker";
import makeAnimated from "react-select/animated";
import dateFormat from "dateformat";
import { token } from "../../token";
import "../survey.css";
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
const animatedComponents = makeAnimated();
class PrimaryAdd extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tag`, {
        withCredentials: true,
        headers: {
          Bearer: token(),
        },
      })
      .then((res) => {
        let t = [...res.data.data.tag];
        let tag = [];
        t.forEach((i) => {
          tag.push({ value: i.title, label: i.title });
        });
        //this.setState({ tag: [...tag] });
        this.props.setTag(tag);
      });
  }
  render() {
    const colourOptions = [...this.props.state.tag];
    return (
      <>
        {/* <LoadingOverlay
          active={this.props.state.loading}
          spinner={<Spinner animation="grow" variant="primary" size="lg" />}
        > */}
          <CRow>
            <CCol xs="12" md="12">
              <CCard>
                <CCardHeader>
                  Add
                  <small> Meta analyzer</small>
                </CCardHeader>
                <CCardBody>
                  <CForm action="" method="post">
                    <CFormGroup>
                      <CLabel htmlFor="survey">Keyword</CLabel>
                      <div style={{ width: "400px" }}>
                        <CreatableSelect
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          defaultValue={[...this.props.state.selectedTag]}
                          key={[...this.props.state.selectedTag]}
                          isMulti
                          onChange={this.props.multitag}
                          options={colourOptions}
                        />
                      </div>
                      <span style={{ color: "red" }}>
                        {this.props.state.tagerr}
                      </span>
                    </CFormGroup>
                    <CFormGroup onChange={this.props.metaController}>
                      <CLabel htmlFor="survey">Meta Informations</CLabel>
                      {this.props.state.meta.map((cal, ind) => {
                        return (
                          <InputGroup key={ind} className="mb-3">
                            <InputGroup.Prepend>
                              <InputGroup.Text id="inputGroup-sizing-default">
                                Key
                              </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                              defaultValue={cal.key}
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
                              defaultValue={cal.content}
                              data-id={ind}
                              className="content"
                              aria-label="Default"
                              aria-describedby="inputGroup-sizing-default"
                            />
                          </InputGroup>
                        );
                      })}
                      <span style={{ color: "red" }}>
                        {this.props.state.metaerr}
                      </span>
                    </CFormGroup>
                  </CForm>
                  <CButton
                    type="submit"
                    size="sm"
                    color="dark"
                    onClick={this.props.addMeta}
                  >
                    <CIcon name="cil-star" /> Add More Meta
                  </CButton>
                </CCardBody>
              </CCard>
              <ToastContainer />
            </CCol>
          </CRow>
        {/* </LoadingOverlay> */}
      </>
    );
  }
}

export default PrimaryAdd;
