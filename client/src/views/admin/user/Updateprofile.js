import React, { Component } from 'react'
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {token} from '../token'

class Updateprofile extends Component {
    constructor() {
        super();
        this.state = {
          inputdata: {},
          errors: {},
          loading:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        let inputdata = this.state.inputdata;
        inputdata[event.target.name] = event.target.value;
        //let errors = {};
        //errors['state'] = "";
        this.setState({
            inputdata:inputdata,
            errors:{}
        });
      }
      validate(){
        let input = this.state.inputdata;
        let errors = {};
        let isValid = true;
  
        if (!input["name"]) {
          isValid = false;
          errors["name"] = "Please enter your name";
        }
    
        if (!input["mobile"]) {
          isValid = false;
          errors["mobile"] = "Please enter your mobile";
        }
    
        if (!input["email"]) {
          isValid = false;
          errors["email"] = "Please enter your email";
        }
        if (!input["city"]) {
            isValid = false;
            errors["city"] = "Please enter your city";
          }
          if (!input["zip"]) {
            isValid = false;
            errors["zip"] = "Please enter your zip";
          }
          if (!input["state"]) {
            isValid = false;
            errors["state"] = "Please enter your state";
          }
          if (!input["country"]) {
            isValid = false;
            errors["county"] = "Please enter your county";
          }
       
    
        this.setState({
          errors: errors
        });
    
        return isValid;
    }
    async componentDidMount(){
        const localstoredata = JSON.parse(localStorage.getItem('AuthData'))
        const userid = localstoredata.data.id;
        //console.log('token hhh ggg lll',token())
        let self = this
       await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}/User-details/${userid}`,
            withCredentials: true,
            headers: {
              Bearer: `${token()}`
            }
            })
            .then(function (response) {
                if(response.data.status === 'success'){ 
                  console.log('response data',response); 
                  self.setState({loading:false,inputdata:(response.data.data)[0]})
                  //console.log('res data',(response.data.data)[0].name)
                } else{
                    toast.warning(`failed to fetch`);                    
                    self.setState({loading:false})  
                    console.log("response",response);
                }
            }).catch(function (error) {
              //this.setState({loading: false}) 
              //toast.warning(`Server Errors`);
              self.setState({loading:false})
              console.log("error response",error);          
            });
    }
    async handleSubmit(event) {
        event.preventDefault(); 
             
        if(this.validate()){
            let self = this
            self.setState({loading:true})
            const localstoredata = JSON.parse(localStorage.getItem('AuthData'))
            const userid = localstoredata.data.id;
            axios({
                method: 'patch',
                url: `${process.env.REACT_APP_API_URL}/User-Update/${userid}`,
                data:self.state.inputdata,
                withCredentials: true,
                headers: {
                  Bearer: `${token()}`
                }
                })
                .then(function (response) {
                    if(response.data.status === 'success'){ 
                      console.log('response data',response); 
                      self.setState({loading:false})
                      toast.success(`Profile successfully updated`);
                    } else{
                        toast.warning(`failed to fetch`);                    
                        self.setState({loading:false})  
                        console.log("response",response);
                    }
                }).catch(function (error) {
                  //this.setState({loading: false}) 
                  //toast.warning(`Server Errors`);
                  self.setState({loading:false})
                  console.log("error response",error);          
                });
        }
    }
       
    render() {
        const {inputdata} = this.state
        return (
         <LoadingOverlay
            active={this.state.loading}
            spinner={<Spinner animation="grow" variant="primary" size="lg" />}
            >
            <div className="card">
                <div className="card-header">Profile Update </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                            <label>Name:</label>
                            <input 
                            type="text" 
                            name="name"
                            value={inputdata.name}
                            className="form-control" 
                            placeholder="Enter name" 
                            onChange={this.handleChange}
                            id="name" />                        
                            <div className="text-danger">{this.state.errors.name}</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                            <label>Mobile:</label>
                            <input 
                            type="text" 
                            name="mobile"
                            className="form-control"
                            value={inputdata.mobile} 
                            placeholder="Enter mobile" 
                            onChange={this.handleChange}
                            id="mobile" />                        
                            <div className="text-danger">{this.state.errors.mobile}</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                            <label>Email:</label>
                            <input 
                            type="text" 
                            name="email"
                            className="form-control" 
                            placeholder="Enter email"
                            value={inputdata.email}  
                            onChange={this.handleChange}
                            id="email" />                        
                            <div className="text-danger">{this.state.errors.email}</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                            <label>City:</label>
                            <input 
                            type="text" 
                            name="city"
                            className="form-control" 
                            placeholder="Enter city" 
                            value={inputdata.city} 
                            onChange={this.handleChange}
                            id="city" />                        
                            <div className="text-danger">{this.state.errors.city}</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                            <label>Zip:</label>
                            <input 
                            type="text" 
                            name="zip"
                            value={inputdata.zip} 
                            className="form-control" 
                            placeholder="Enter zip"
                            onChange={this.handleChange} 
                            id="zip" />                        
                            <div className="text-danger">{this.state.errors.zip}</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                            <label >State:</label>
                            <input 
                            type="text" 
                            name="state"
                            className="form-control" 
                            placeholder="Enter state" 
                            value={inputdata.state} 
                            onChange={this.handleChange}
                            id="state" />                        
                            <div className="text-danger">{this.state.errors.state}</div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                            <label>Country:</label>
                            <input 
                            type="text" 
                            name="country"
                            className="form-control" 
                            placeholder="Enter country"
                            value={inputdata.country} 
                            onChange={this.handleChange} 
                            id="country" />                        
                            <div className="text-danger">{this.state.errors.county}</div>
                            </div>
                        </div>
                     </div>
                     <input type="submit" value="Submit" className="btn btn-primary" />
                     <ToastContainer/>
                    </form>
                </div>
               
            </div>
             </LoadingOverlay>
        )
    }
}

export default Updateprofile
