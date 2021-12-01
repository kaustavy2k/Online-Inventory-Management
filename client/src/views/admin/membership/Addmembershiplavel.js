import React, { Component } from 'react'
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {token} from '../token'
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
    CSwitch
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
 class Addmembershiplavel extends Component {
     constructor(props){
         super(props)
         this.state = {
             membershipname:'',
             membershippoint:'',
             membershipbatchimage:'',
             membershipnameerr:'',
             membershippointerr:'',
             membershipbatchimageerr:'',
             loading:false,
         }
     }
    // Validation
    isValid = () => {

    const { membershipname, membershippoint ,membershipbatchimage} = this.state;
    let back = true
    if (membershipname.length === 0) {
        this.setState({ membershipnameerr: "This field is required", loading: false });
        back= false;
    }
    if (membershippoint.length === 0) {
        this.setState({ membershippointerr: "This field is required", loading: false });
        back = false;
        }
        if (isNaN(membershippoint)) {
            this.setState({ membershippointerr: "Must be number", loading: false });
            back = false;
            }
    if (membershipbatchimage.length === 0) {
        this.setState({ membershipbatchimageerr: "This field is required", loading: false });
        back = false;
        }
    
    return back;
    };
    clickSubmit = (event) =>{
        event.preventDefault();
        const { membershipname, membershippoint ,membershipbatchimage} = this.state;
        this.setState({loading:true})
        if(this.isValid()){
            const formdata = new FormData();
            formdata.append("name", this.state.membershipname);
            formdata.append("point", this.state.membershippoint);
            formdata.append("batch_image", this.state.membershipbatchimage);
            let self = this
            axios
            .post(`${process.env.REACT_APP_API_URL}/membership`, formdata, {
              withCredentials: true,
              headers: {
                Bearer: token(),
              },
            })
          .then(function (response) {
              if(response.data.status === 'success'){ 
                console.log('response data',response); 
                toast.success(`Membership Level successfully added`);
                self.setState({loading:false})
                setTimeout(() => {
                self.props.history.push({
                  pathname:"/admin/all-membership",
                }); 
              }, 1500);
              } else{
                  toast.warning(`Error`);
                  self.setState({loading:false})  
                  console.log("response",response);
              }
          }).catch(function (error) {
            //this.setState({loading: false}) 
            toast.warning(`Server Errors`);
            self.setState({loading:false})
            console.log("error response",error);          
          });
        }
    }
     handleChange = (event)=>{
         this.setState({membershipnameerr:'',
         membershippointerr:'',
         membershipbatchimageerr:''})
         if(event.target.name == 'membershipbatchimage'){
            this.setState({[event.target.name]:event.target.files[0]})
         }else{
            this.setState({[event.target.name]:event.target.value})
         }
      
     }
    render() {
        const {membershipname,membershippoint,membershipbatchimage,membershipnameerr,membershippointerr,membershipbatchimageerr} = this.state
        return (
            <>
     
     <LoadingOverlay
      active={this.state.loading}
      spinner={<Spinner animation="grow" variant="primary" size="lg" />}
    >
      <CRow>       
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
              Add Membership Level
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <CFormGroup>
                    <CLabel htmlFor="category">Add Membership Name</CLabel>
                    <CInput id="membershipname" name="membershipname" autoComplete="off" placeholder="Enter membership name" value={membershipname} onChange={this.handleChange}  />
                     <span style={{color:"red"}}>{membershipnameerr}</span>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="category">Membership Point</CLabel>
                    <CInput id="membershippoint" value={membershippoint}  name="membershippoint" autoComplete="off" placeholder="Enter number" onChange={this.handleChange} />
                    <span style={{color:"red"}}>{membershippointerr}</span>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="category">Membership batch image</CLabel>
                    <br/>
                    <input type="file" accept="image/*" name="membershipbatchimage" onChange={this.handleChange} name="membershipbatchimage" />
                    <br/> <span style={{color:"red"}}>{membershipbatchimageerr}</span>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary" onClick={this.clickSubmit} ><CIcon name="cil-scrubber" /> Submit</CButton> 
            </CCardFooter>
          </CCard>
          <ToastContainer/>
        </CCol>
      </CRow>
      </LoadingOverlay>
    </>
        )
    }
}

export default Addmembershiplavel
