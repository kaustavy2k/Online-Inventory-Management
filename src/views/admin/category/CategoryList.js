import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import {Button} from 'react-bootstrap'
import DataTable from "react-data-table-component";
import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {token} from '../token'
 class CategoryList extends Component {
    constructor(props){
        super(props)
        this.state = {
            categories:[],
            searchname:""
        }
    }
    list = async () =>{  
        let self = this    
            return await fetch(`${process.env.REACT_APP_API_URL}/category`,{
                method:"GET"
            })
            .then(response=>{
                return response.json();
            }).then(data=>{
                if(data.data.failed){
                    console.log(data.error)
                }else{
                    let categories = [...data.data.category]
                    categories.forEach((photo, index) => { photo.serial = index + 1; });
                    self.setState({categories})
                    console.log(self.state.categories)
                }
            })
        
    }
    componentDidMount(){
      this.list()
    }
    filterList = (e) => {
        let data = ''
        const {categories } = this.state;
        let filter = e.target.value
        if(filter !== ''){
               data =  categories.filter((val)=>{
                if(filter === ''){
                    console.log('test',e.target.value)
                    return this.list()
                }else if(val.title.toLowerCase().includes(filter.toLowerCase())){
                    return val
                }
              })
              this.setState({categories:data})
        }else{
            this.list() 
        }
        

        
      };

    delete = async (id) =>{
        let self = this;
        const cnfirm = window.confirm(
            `Are you sure you want to delete this topic?`
        )
        if(cnfirm){
            await axios({
                method: 'delete',
                url: `${process.env.REACT_APP_API_URL}/category/${id}`,
                })
                .then(function (response) {
                    if(response.data.status === 'success'){ 
                      console.log('response data',response); 
                      toast.success(`Topic successfully deleted`);
                      self.list()
                    } else{
                      toast.warning(`Error`);
                        console.log("response",response);
                    }
                }).catch(function (error) {
                  //this.setState({loading: false}) 
                  toast.warning(`~Server Error~`);
                  console.log("error response",error);          
                });
        }
        
    }

    columns = [  
        {
            name: '#',
            cell: row => row.serial,
          },    
        {
            name: "Name",
            cell: row => row.title,
          },
          {
            name: "Description",
            cell: row =>  row.content.substring(0, 15),
          },
          {
            name: "Actions",
            cell: row =>  {
                        return(
                          <div>
                                 <Link className="btn btn-outline-primary mr-2" to={`/admin/category/category-edit/${row.id}`}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></Link>  
                                 &nbsp;<button onClick={()=>this.delete(row.id)} className="btn btn-danger"><i class="fa fa-trash" aria-hidden="true"></i></button>
                            </div>
                            )
                            } 
                           ,
            width: '300px'
          },       
      ];






    render() {
        const {categories,searchname} = this.state
        
      
        return (
            <div className="card">
                {/* {result.map((category,i)=>
                ( 
                <div key={i}>{category.title}</div>
                )
                )} */}
              <div className="card-header">Topic List
              <fieldset className="form-group" style={{float:"right"}}>
                    <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Search"
                    name="searchname"
                    onChange={this.filterList}
                    />
                </fieldset>
              </div>
              <div className="card-body">
              <DataTable
                    columns={this.columns}
                    data={categories}
                    pagination={true}
                    NoDataComponent={"No data"}                  
                />
                
                
                </div>
                <ToastContainer/> 
            </div>
        )
    }
}

export default CategoryList
