import React,{Component} from 'react'
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

class AddCategory extends Component{
    constructor(props){
        super(props)
        this.state = {
            name:"",
            description:"",
            error:"",
            loading:false,
            nameerr:"",
            deserr:""
        }
    }
    
    handleChange = name => event =>{
        this.setState({error:"",nameerr:"",deserr:""})
        this.setState({[name]:event.target.value})
     }
     // Validation
     isValid = () => {
        
        const { name, description } = this.state;
        let back = true
        if (name.length === 0) {
          this.setState({ nameerr: "This field is required", loading: false });
          back= false;
        }
        if (description.length === 0) {
            this.setState({ deserr: "This field is required", loading: false });
            back = false;
          }
        
        return back;
      };
      // submit action
     clickSubmit = event => {
        event.preventDefault();
        this.setState({loading:true})
        if(this.isValid()){
        const {name,description} = this.state
        const data = {
            title:name,
            content:description
        }
        console.log("form data",data);
        let self = this
        axios({
          method: 'post',
          url: process.env.REACT_APP_API_URL+'/category',
          data: data,
          })
          .then(function (response) {
              if(response.data.status === 'success'){ 
                console.log('response data',response); 
                toast.success(`Topic successfully added`);
                self.setState({loading:false})
                setTimeout(() => {
                self.props.history.push({
                  pathname:"/admin/category/category-list",
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
    reset = () =>{
      this.setState({
        name:"",
        description:"",
        error:"",
        loading:false,
        nameerr:"",
        deserr:""
    })
    }
render(){
    const {name,description,error,nameerr,deserr,loading} = this.state;
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
              Add Topic
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <CFormGroup>
                    <CLabel htmlFor="category">Topic Name</CLabel>
                    <CInput id="category" autoComplete="off" placeholder="Enter category name" onChange={this.handleChange("name")} value={name} />
                     <span style={{color:"red"}}>{nameerr}</span>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="category">Description</CLabel>
                    <CInput id="category" autoComplete="off" placeholder="Enter desription" onChange={this.handleChange("description")} value={description}/>
                    <span style={{color:"red"}}>{deserr}</span>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary" onClick={this.clickSubmit} ><CIcon name="cil-scrubber" /> Submit</CButton> <CButton type="reset" onClick={this.reset} size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
          <ToastContainer/>
        </CCol>
      </CRow>
      </LoadingOverlay>
    </>
  )}
}

export default AddCategory
