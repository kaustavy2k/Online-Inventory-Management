import React,{Component} from 'react'
import { Link ,Redirect} from 'react-router-dom'
import {signin,authenticate} from './api'
import { Spinner } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            email:"",
            password:"",
            error:"",
            redirectTo:false,
            loading:false
        }
    }
    handleChange = name => event =>{
      this.setState({error:""})
      this.setState({[name]:event.target.value})
    }
    clickSubmit = event => {
      // event.preventDefault();
      // this.setState({loading:true})
      // const {email,password} = this.state
      // let roleType=''
      // const user = {
      //     email,
      //     password
      // }
      // signin(user)
      // .then(async data=>{
      //   console.log("success response",data);
      //  // return false
      //    if(data.status=='failed'){
      //         //toast.warning(`Incorrect email or password`);
      //         await this.setState({error:data.message,loading:false})
      //     }else{
      //       //if(typeof window !== 'undefined'){
      //         if(data.data.hasOwnProperty('admin_role')){
      //         console.log('role',data.data.admin_role.role_name);
      //          roleType=data.data.admin_role.role_name
            
      //         if(roleType== 'Super admin' || roleType== 'Admin' || roleType== 'Author'){
      //          await localStorage.setItem('AuthData',JSON.stringify(data))   
               //await this.setState({redirectTo:true})  
               this.props.history.push({
                pathname: "/dashboard",              
               });
              //  window.location = "/admin/dashboard";
              // }else{
              //   this.setState({error:'sorry! You do not have  access',loading:false})
              // }
            // }else{
            //   this.setState({error:'sorry! You do not have  access',loading:false})
            // } 

              
      //       }          
      //     }
      // });
      // console.log("user data",user);
   
  }
  _handleKeyDown = (e) => {
    console.log("event",e)
    if (e.key === 'Enter') {
      this.clickSubmit(e)
      console.log('do validate');
    }
  }



  render(){
    const {email,password,error,redirectTo,loading} = this.state;
    // if(redirectTo){
    //         return <Redirect to="/admin/dashboard" />
    //     }
  return (
    <LoadingOverlay
      active={this.state.loading}
      spinner={<Spinner animation="grow" variant="primary" size="lg" />}
    >
    <div className="c-app c-default-layout flex-row align-items-center">
      
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onKeyDown={this._handleKeyDown}>
                  
                <div className="alert alert-danger" style={{display:error?"":"none"}}>
                  {this.state.error}
                </div>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" onChange={this.handleChange("email")} value={email} autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" onChange={this.handleChange("password")} value={password} autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4"  onClick={this.clickSubmit}>Login</CButton>
                      </CCol>
                      
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>BSA</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
    <ToastContainer/>
    </LoadingOverlay>
  )
  }
}

export default Login
