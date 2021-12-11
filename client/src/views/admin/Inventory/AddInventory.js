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

class AddInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: [{ item: "", cost: "",quantity:"" }],
      loading: false,
      err: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      [event.target.value + "err"]: "",
    });
  };
  addController = (e) => {
    let add = [...this.state.add];
    let className = e.target.name;
    let check = className.substr(0, className.indexOf(" "));
    add[e.target.dataset.id][check] = e.target.value.toLowerCase();
    this.setState({ add, err: "" });
  };

  add = () => {
    this.setState((prevState) => ({
      add: [...prevState.add, { name: "", cost: "",quantity:"" }],
    }));
  };
  clickSubmit = (event) => {
    event.preventDefault();
    if (this.validate()) {
      this.setState({ loading: true });
      const data = {
        data: this.state.add,
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}/addinventoryitems`, data, {
          withCredentials: true,
        })
        .then((response) => {
          toast.success(`Item successfully added`);
          this.setState({ loading: false });
          setTimeout(() => {
            this.props.history.push({
              pathname: "/inventory/items",
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
  validate = () => {
    let formIsValid = true;
    let err = "";
    for (let i of this.state.add) {
      if (!i.item.length || !i.cost.length|| !i.quantity.length) {
        formIsValid = false;
        err = "Please fill all data";
        break;
      }
    }
    this.setState({ err });
    return formIsValid;
  };
  reset = () => {
    this.setState({
      add: [{ item: "", cost: "",quantity:"" }],
      loading: false,
      err: "",
    });
  };
  render() {
    const { err } = this.state;
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
                      <CForm onChange={this.addController} key={ind}>
                        <CFormGroup>
                          <CLabel>Item Name*</CLabel>
                          <CInput
                            name="item "
                            autoComplete="off"
                            placeholder="Enter item name"
                            onChange={this.handleChange}
                            data-id={ind}
                            value={i.item}
                          />
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel>Quantity*</CLabel>
                          <CInput
                            name="quantity "
                            type="number"
                            autoComplete="off"
                            placeholder="Enter quantity"
                            onChange={this.handleChange}
                            data-id={ind}
                            value={i.quantity}
                          />
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel>Cost*</CLabel>
                          <CInput
                            name="cost "
                            type="number"
                            autoComplete="off"
                            placeholder="Enter cost"
                            onChange={this.handleChange}
                            data-id={ind}
                            value={i.cost}
                          />
                        </CFormGroup>
                      </CForm>
                    );
                  })}
                  <span style={{ color: "red" }}>{err}</span>
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

export default AddInventory;
