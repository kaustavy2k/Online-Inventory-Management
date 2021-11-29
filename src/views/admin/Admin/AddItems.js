import React, { Component } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

class AddItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: [{ name: "", quantity: "" }],
      error: "",
      loading: false,
      nameerr: "",
      deserr: "",
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "", nameerr: "", deserr: "" });
    this.setState({ [name]: event.target.value });
  };

  // Validation
  isValid = () => {
    const { name, quantity } = this.state;
    let back = true;
    if (name.length === 0) {
      this.setState({ nameerr: "This field is required", loading: false });
      back = false;
    }
    if (quantity.length === 0) {
      this.setState({ deserr: "This field is required", loading: false });
      back = false;
    }
    return back;
  };

  //add more
  addController = (e) => {
    let add = [...this.state.add];
    let className = e.target.className;
    let check = className.substr(0, className.indexOf(" "));
    add[e.target.dataset.id][check] = e.target.value.toLowerCase();
    this.setState({ add });
  };

  add = () => {
    this.setState((prevState) => ({
      add: [...prevState.add, { name: "", quantity: "" }],
    }));
  };

  // submit action
  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    if (this.isValid()) {
      const { name, quantity } = this.state;
      const data = {
        title: name,
        content: quantity,
      };
      console.log("form data", data);
      let self = this;
      axios({
        method: "post",
        url: process.env.REACT_APP_API_URL + "/category",
        data: data,
      })
        .then(function (response) {
          if (response.data.status === "success") {
            console.log("response data", response);
            toast.success(`Topic successfully added`);
            self.setState({ loading: false });
            setTimeout(() => {
              self.props.history.push({
                pathname: "/dashboard",
              });
            }, 1500);
          } else {
            toast.warning(`Error`);
            self.setState({ loading: false });
            console.log("response", response);
          }
        })
        .catch(function (error) {
          toast.warning(`Server Errors`);
          self.setState({ loading: false });
          console.log("error response", error);
        });
    }
  };
  reset = () => {
    this.setState({
      name: "",
      quantity: "",
      error: "",
      loading: false,
      nameerr: "",
      deserr: "",
    });
  };
  render() {
    const { name, quantity, nameerr, deserr } = this.state;
    return (
      <>
        <LoadingOverlay
          active={this.state.loading}
          spinner={<Spinner animation="grow" variant="primary" size="lg" />}
        >
          <CRow>
            <CCol xs="12" md="12">
              <CCard>
                <CCardHeader>Add Item</CCardHeader>
                <CCardBody>
                  {this.state.add.map((i, ind) => {
                    return (
                      <CForm action="" method="post" key={ind}>
                        <CFormGroup>
                          <CLabel htmlFor="category">Item Name</CLabel>
                          <CInput
                            id="category"
                            autoComplete="off"
                            placeholder="Enter item name"
                            onChange={this.handleChange("name")}
                            value={i.name}
                          />
                          <span style={{ color: "red" }}>{nameerr}</span>
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="category">Quantity</CLabel>
                          <CInput
                            type="number"
                            id="category"
                            autoComplete="off"
                            placeholder="Enter quantity"
                            onChange={this.handleChange("quantity")}
                            value={i.quantity}
                          />
                          <span style={{ color: "red" }}>{deserr}</span>
                        </CFormGroup>
                      </CForm>
                    );
                  })}
                </CCardBody>
                <CCardFooter>
                  <CButton
                    type="submit"
                    size="sm"
                    color="primary"
                    onClick={this.clickSubmit}
                  >
                    <CIcon name="cil-scrubber" /> Submit
                  </CButton>
                  &nbsp;
                  <CButton
                    type="submit"
                    size="sm"
                    color="dark"
                    onClick={this.add}
                  >
                    <CIcon name="cil-star" /> Add More Items
                  </CButton>
                  &nbsp;
                  <CButton
                    type="reset"
                    onClick={this.reset}
                    size="sm"
                    color="danger"
                  >
                    <CIcon name="cil-ban" /> Reset
                  </CButton>
                </CCardFooter>
              </CCard>
              <ToastContainer />
            </CCol>
          </CRow>
        </LoadingOverlay>
      </>
    );
  }
}

export default AddItems;
