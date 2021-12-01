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

class AskItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add: [{ item: "", quantity: "", status: "" }],
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

  //add more
  addController = (e) => {
    let add = [...this.state.add];
    let className = e.target.name;
    let check = className.substr(0, className.indexOf(" "));
    add[e.target.dataset.id][check] = e.target.value.toLowerCase();
    add[e.target.dataset.id].status = "approved";
    this.setState({ add, err: "" });
  };

  add = () => {
    this.setState((prevState) => ({
      add: [...prevState.add, { name: "", quantity: "", status: "" }],
    }));
  };

  // submit action
  clickSubmit = (event) => {
    event.preventDefault();
    if (this.validate()) {
      let cnfirm = false;

      cnfirm = window.confirm(`Are you sure you want to order these items?`);

      if (cnfirm) {
        this.setState({ loading: true });
        const data = {
          data: this.state.add,
        };
        console.log(data);
        axios
          .post(`${process.env.REACT_APP_API_URL}/addtransactionitems`, data, {
            withCredentials: true,
          })
          .then((response) => {
            toast.success(`Item asked from inventory`);
            this.setState({ loading: false });
            setTimeout(() => {
              this.props.history.push({
                pathname: "/admin/permissions",
              });
            }, 1500);
          })
          .catch((error) => {
            toast.warning(`Server Errors`);
            this.setState({ loading: false });
            console.log("error response", error);
          });
      }
    }
  };
  validate = () => {
    let formIsValid = true;
    let err = "";
    for (let i of this.state.add) {
      if (!i.item.length || !i.quantity.length) {
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
      add: [{ item: "", quantity: "" }],
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
                <CCardHeader>Ask For Items</CCardHeader>
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
                    <CIcon name="cil-scrubber" /> Ask
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

export default AskItems;
