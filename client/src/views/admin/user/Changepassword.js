import React from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {token} from '../token'

class Changepassword extends React.Component {
    constructor() {
    super();
    this.state = {
      input: {},
      errors: {}
    };
     
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
     
  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
    if(event.target.name == 'confirm_password'){
      delete this.state.errors.confirm_password
    }
    if(event.target.name == 'old_password'){
      delete this.state.errors.old_password
    }
    if(event.target.name == 'new_password'){
      delete this.state.errors.new_password
    }
    this.setState({
      input:input,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  
    if(this.validate()){
        const data = {

            old_pass:this.state.input.old_password,
            new_pass:this.state.input.new_password
        }
        const localstoredata = JSON.parse(localStorage.getItem('AuthData'))
        const userid = localstoredata.data.id;
        //console.log('localstoredata',localstoredata.data.id)
        let self = this
        console.log("form data:",data);
        axios({
            method: 'patch',
            url: `${process.env.REACT_APP_API_URL}/Password-change/${userid}`,
            data: data,            
            withCredentials: true,
             headers:{
              Bearer:token(),
            }
            })
            .then(function (response) {
                if(response.data.status === 'success'){ 
                  console.log('response data',response); 
                  toast.success(`Password successfully updated`);
                  self.setState({loading:false})
                  
                } else{
                    toast.warning(`invalid old password`);
                    
                    self.setState({loading:false})  
                    console.log("response",response);
                }
            }).catch(function (error) {
              //this.setState({loading: false}) 
              toast.warning(`Invalid old password`);
              self.setState({loading:false})
              console.log("error response",error);          
            });
        
    }
  }
  
  validate(){
      let input = this.state.input;
      let errors = {};
      let isValid = true;

      if (!input["old_password"]) {
        isValid = false;
        errors["old_password"] = "Please enter your password.";
      }
  
      if (!input["new_password"]) {
        isValid = false;
        errors["new_password"] = "Please enter your new password.";
      }
  
      if (!input["confirm_password"]) {
        isValid = false;
        errors["confirm_password"] = "Please enter your confirm password.";
      }
  
      if (typeof input["new_password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {
          
        if (input["new_password"] != input["confirm_password"]) {
          isValid = false;
          errors["new_password"] = "Passwords don't match.";
        }
      } 
  
      this.setState({
        errors: errors
      });
  
      return isValid;
  }
     
  render() {
    return (
      <div className="card">
          <div className="card-header">Change Password</div>
          <div className="card-body">
          <form onSubmit={this.handleSubmit}> 
            <div className="form-group">
                <label for="password">Old Password:</label>
                <input 
                type="password" 
                name="old_password" 
                value={this.state.input.password}
                onChange={this.handleChange}
                className="form-control" 
                placeholder="Enter old password" 
                id="old_password" /> 
                
                <div className="text-danger">{this.state.errors.old_password}</div>
            </div> 
            <div className="form-group">
                <label for="password">New Password:</label>
                <input 
                type="password" 
                name="new_password" 
                value={this.state.input.password}
                onChange={this.handleChange}
                className="form-control" 
                placeholder="Enter new password" 
                id="new_password" /> 
                
                <div className="text-danger">{this.state.errors.new_password}</div>
            </div>
    
            <div class="form-group">
                <label for="password">Confirm Password:</label>
                <input 
                type="password" 
                name="confirm_password" 
                value={this.state.input.confirm_password}
                onChange={this.handleChange}
                className="form-control" 
                placeholder="Enter confirm password" 
                id="confirm_password" />
    
                <div className="text-danger">{this.state.errors.confirm_password}</div>
            </div>
              
            <input type="submit" value="Submit" className="btn btn-primary" />
           </form>
           <ToastContainer/>
          </div>       
      </div>
    );
  }
}
  
export default Changepassword;