import React, { Component } from 'react'
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify'
import { Spinner } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css'
import LoadingOverlay from 'react-loading-overlay'
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

 class AddTag extends Component {
     constructor(props){
         super(props)
         this.state ={
              title:"",
              content:"",
              loading:false
         }
     }
     reset = () =>{
      this.setState({
        title:"",
        content:"",
        loading:false,
        titleerr:"",
        contenterr:""
    })
    }
     handleChange = name => event =>{
        this.setState({error:"",titleerr:"",contenterr:""})
        this.setState({[name]:event.target.value})
     }
      // Validation
      isValid = () => {
    
        const { title, content } = this.state;
        let back = true
        if (title.length === 0) {
          this.setState({ titleerr: "This field is required", loading: false });
          back= false;
        }
        if (content.length === 0) {
            this.setState({ contenterr: "This field is required", loading: false });
            back = false;
          }
        
        return back;
      };
     // submit action
     clickSubmit = event => {
        event.preventDefault();
        this.setState({loading:true})
        if(this.isValid()){
          const {title,content} = this.state
          const data = {
              title:title,
              content:content
          }
          console.log("form data",data);
          let self = this
          // axios({
          //   method: 'post',
          //   url: process.env.REACT_APP_API_URL+'/tag',
          //   data: data,
          //   })
            axios.post(process.env.REACT_APP_API_URL+'/tag',data)
            .then(function (response) {
                if(response.data.status === 'success'){ 
                  console.log('response data',response); 
                  toast.success(`Keyword successfully added`);
                  setTimeout(() => {
                  self.props.history.push({
                    pathname:"/admin/tag/tag-list",
                  }); 
                }, 1500);
                } else{
                  toast.warning(`Error`);
                    console.log("response",response);
                }
            }).catch(err =>{
              self.setState({loading: false}) 
              toast.warning(`Server Error`);
              console.log(err);
          })
        }
        
    } 
    render() {
        const {title,content,titleerr,contenterr,loading} = this.state
        return (
          <LoadingOverlay
          active={this.state.loading}
          spinner={<Spinner animation="grow" variant="primary" size="lg" />}
        >
            <div>
               <CRow>       
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
              Add keyword
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <CFormGroup>
                    <CLabel htmlFor="category">Keyword Name</CLabel>
                    <CInput id="category" autoComplete="off" placeholder="Enter tag name" onChange={this.handleChange("title")} value={title} />
                    <span style={{color:"red"}}>{titleerr}</span>
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="category">Description</CLabel>
                    <CInput id="category" autoComplete="off" placeholder="Enter desription" onChange={this.handleChange("content")} value={content}/>
                    <span style={{color:"red"}}>{contenterr}</span> 
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary" onClick={this.clickSubmit} ><CIcon name="cil-scrubber" /> Submit</CButton> <CButton type="reset" size="sm" color="danger" onClick={this.reset}><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
        </CCol>
        <ToastContainer/>
      </CRow>
            </div>
            </LoadingOverlay>
        )
    }
}

export default AddTag
