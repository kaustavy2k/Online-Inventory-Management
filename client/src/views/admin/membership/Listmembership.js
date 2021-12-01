import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import DefaultProfile from "../user/avatar.png";
import { Spinner } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay'
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {token} from '../token'
 class Listmembership extends Component {
     constructor(props){
         super(props)
         this.state = {
             lists:[],
             loading:false,
         }
     }
     fetchmember = () =>{
        axios
        .get(
          `${process.env.REACT_APP_API_URL}/membership`,
          {
            withCredentials: true,
            headers: {
              Bearer: token(),
            },
          }
        ).then((res)=>{
            if(res.data.status === 'success'){
              this.setState({lists:res.data.details})
            }
         //console.log('res data',res.data.details)
        }).catch((err)=>{

        })
     }
     componentDidMount(){
        this.fetchmember()
     }
     memberdel =(id)=>{
         var cnf = window.confirm('Are you sure that you want to delete this item?')
        if(cnf){
            this.setState({ loading: true});
            axios
          .delete(`${process.env.REACT_APP_API_URL}/membership/${id}`, {
            withCredentials: true,
            headers: {
              Bearer: token(),
            },
          })
          .then((res) => {
            this.setState({
              loading: false,
            });
            toast.success("Membership Level deleted successfully");
            this.fetchmember()
          })
          .catch((error) => {
            this.setState({ loading: false });
            toast.warning("Cannot delete");
          });
         
        }
     }
     editmembership = (id, obj) => {
        this.props.history.push({
            pathname: "/admin/edit-membership" ,
            state:{
                ...obj,
                id
            }
        })
     }
    render() {
        return (
            <>
            <ToastContainer />
            <LoadingOverlay
            active={this.state.loading}
            spinner={<Spinner animation="grow" variant="primary" size="lg" />}
            >
             <div className="card">
              <div className="card-header">Membership Level List</div>
              <div className="card-body scroller">
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">SL</th>
                    <th scope="col">Batch Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Point</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                    {this.state.lists.map((list,index)=>(
                        <tr key={index}>
                        <td scope="col">{index+1}</td>
                        <td scope="col">
                        <img
                            src={`${list.batch_image}`}
                            onError={(i) =>
                              (i.target.src = `${DefaultProfile}`)
                            }
                            style={{ width: "40px", height: "40px" }}
                            className="img-thumbnail"
                          />
                        </td>
                        <td scope="col">{list.name}</td>
                        <td scope="col">{list.point}</td>
                        <td scope="col">{list.created_at}</td>
                        <td scope="col">{list.updated_at}</td>
                        <td scope="col">
                        <button className="btn btn-outline-primary mr-2" onClick={this.editmembership.bind(this,list.id,{
                          name:list.name,
                          point:list.point,
                          batch_image:list.batch_image
                        })}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>  
                        &nbsp;<button className="btn btn-danger" onClick={()=>this.memberdel(list.id)}><i class="fa fa-trash" aria-hidden="true"></i></button>
                        </td>
                        </tr>
                    ))}
                
                </tbody>
                </table>
              </div>
             </div>
             </LoadingOverlay>
            </>
        )
    }
}

export default Listmembership
