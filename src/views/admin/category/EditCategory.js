import React, { Component } from 'react'
import axios from 'axios';
import {Link,Redirect} from 'react-router-dom'
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

 class EditCategory extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: "",
            title:"",
            content:"",
            redirectToList : false,
            error: "",
            loading: false

        }
    }
    componentDidMount(){
        const catid  =  this.props.match.params.id;
        let self = this
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/category/${catid}`,
            }).then(function (response) {
                if(response.data.status === 'success'){ 
                  console.log('response data',response); 
                  self.setState({id:response.data.data.id,title:response.data.data.title,content:response.data.data.content})
                } else{
                    console.log("failed response",response);
                    self.setState({redirectToList:true})
                }
            }).catch(function (error) {
                self.setState({redirectToList: true}) 
                console.log("error response",error);          
              });

    }
    handleChange = name => event =>{
        this.setState({error:""})
        this.setState({[name]:event.target.value})
     }
     //update code
      clickSubmit = event => {
        event.preventDefault();
        this.setState({loading:true})
        
        const {id,title,content} = this.state
        const data = {
            title:title,
            content:content
        }
        console.log("form data",data);
        let self = this
        axios({
          method: 'patch',
          url: `${process.env.REACT_APP_API_URL}/category/${id}`,
          data: data,
          })
          .then(function (response) {
              if(response.data.status === 'success'){ 
                console.log('response data',response); 
                toast.success(`Topic successfully updated`);
                setTimeout(() => {
                self.props.history.push({
                  pathname:"/admin/category/category-list",
                }); 
              }, 1500);
              } else{
                toast.warning(`Error`);
                  console.log("response",response);
              }
          }).catch(function (error) {
            //this.setState({loading: false}) 
            toast.warning(`Server Error`);
            console.log("error response",error);          
          });
    }
    render() {
        const {title,content,redirectToList} = this.state
        if(redirectToList){
            return <Redirect to={`/admin/category/category-list`} />
        }
        return (
            <>
      <CRow>       
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
              Edit Topic
            </CCardHeader>
            <CCardBody>
              <CForm action="" method="post">
                <CFormGroup>
                    <CLabel htmlFor="category">Topic Name</CLabel>
                    <CInput id="category" autoComplete="off" placeholder="Enter category name" onChange={this.handleChange("title")} value={title} />
                </CFormGroup>
                <CFormGroup>
                    <CLabel htmlFor="category">Description</CLabel>
                    <CInput id="category" autoComplete="off" placeholder="Enter desription" onChange={this.handleChange("content")} value={content}/>
                </CFormGroup>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="primary" onClick={this.clickSubmit} ><CIcon name="cil-scrubber" /> Update</CButton>&nbsp; <Link className="btn btn-danger" to="/admin/category/category-list" size="sm" color="danger"> Back</Link>
            </CCardFooter>
          </CCard>
          <ToastContainer/>
        </CCol>
      </CRow>
            </>
        )
    }
}

export default EditCategory
