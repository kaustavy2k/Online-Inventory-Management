import React from 'react';
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
  
    this.setState({
      input:input
    });
  }



  handleSubmit(event) {
    event.preventDefault();
  
    if(this.validate()){
        console.log(this.state);
  
        let input = {};
        input["password"] = "";
        input["confirm_password"] = "";
        this.setState({input:input});
  
        alert('Demo Form is submited');
    }
  }
  
  validate(){
      let input = this.state.input;
      let errors = {};
      let isValid = true;

      if (!input["oldpassword"]) {
        isValid = false;
        errors["oldpassword"] = "Please enter your password.";
      }
  
      if (!input["password"]) {
        isValid = false;
        errors["password"] = "Please enter your new password.";
      }
  
      if (!input["confirm_password"]) {
        isValid = false;
        errors["confirm_password"] = "Please enter your confirm password.";
      }
  
      if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {
          
        if (input["password"] != input["confirm_password"]) {
          isValid = false;
          errors["password"] = "Passwords don't match.";
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
          <div class="card-header">Change Password</div>
          <div class="card-body">
          <form onSubmit={this.handleSubmit}> 
            <div class="form-group">
                <label for="password">Old Password:</label>
                <input 
                type="password" 
                name="oldpassword" 
                value={this.state.input.password}
                onChange={this.handleChange}
                class="form-control" 
                placeholder="Enter old password" 
                id="password" /> 
                
                <div className="text-danger">{this.state.errors.oldpassword}</div>
            </div> 
            <div class="form-group">
                <label for="password">New Password:</label>
                <input 
                type="password" 
                name="password" 
                value={this.state.input.password}
                onChange={this.handleChange}
                class="form-control" 
                placeholder="Enter new password" 
                id="password" /> 
                
                <div className="text-danger">{this.state.errors.password}</div>
            </div>
    
            <div class="form-group">
                <label for="password">Confirm Password:</label>
                <input 
                type="password" 
                name="confirm_password" 
                value={this.state.input.confirm_password}
                onChange={this.handleChange}
                class="form-control" 
                placeholder="Enter confirm password" 
                id="confirm_password" />
    
                <div className="text-danger">{this.state.errors.confirm_password}</div>
            </div>
              
            <input type="submit" value="Submit" class="btn btn-primary" />
           </form>
          </div>       
      </div>
    );
  }
}
  
export default Changepassword;