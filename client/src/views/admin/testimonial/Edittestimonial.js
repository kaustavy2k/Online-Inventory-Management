import React, { Component } from "react";
import ReactHtmlParser from "react-html-parser";
import { toast, ToastContainer } from "react-toastify";
import DefaultProfile from "../user/avatar.png";
import { Spinner, Modal } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay";
import { Link } from "react-router-dom";
import axios  from "axios";
import { token } from "../token";
import "../survey/survey.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
 class Edittestimonial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading:false,
            name:'',
            content:'',
            image:'',
            imageurl:'',
            designation:'',
            status:'',
            nameerr:'',
            contenterr:'',
            statuserr:'',
            testimonial_id:''


        }
    }
    async componentDidUpdate(prevProps, prevState) {
        // console.log("this props",this.props)
        if (
          this.props.obj.name != prevProps.obj.name ||
          this.props.testimonial_id != prevProps.testimonial_id 
        ) {
          await this.setState({
            content: this.props.obj.content,
            name: this.props.obj.name,
            designation:this.props.obj.designation,
            status:this.props.obj.status,
            imageurl:this.props.obj.image,
            testimonial_id:this.props.testimonial_id
          });
        }
      }
    handleChangeInput = (event) =>{
        this.setState({contenterr:'',nameerr:'',statuserr:''})
        if(event.target.name=='image'){
            this.setState({[event.target.name]:event.target.files[0]})
        }else{
            this.setState({[event.target.name]:event.target.value})
        }     
    }

    ckeditor = (data) => {
      this.setState({ content: data });
    };
    // Validation
    isValid = () => {

        const { name, content ,image,designation,status} = this.state;
        let back = true
        if (name.length === 0) {
            this.setState({ nameerr: "This field is required", loading: false });
            back= false;
        }
        if (content.length === 0) {
            this.setState({ contenterr: "This field is required", loading: false });
            back = false;
            }
            
        if (status.length === 0) {
            this.setState({ statuserr: "This field is required", loading: false });
            back = false;
            }
        
        return back;
        };
    handleSubmit = (e) =>{
        e.preventDefault()
        this.setState({ loading: true });
        const { name, content ,image,designation,status,testimonial_id} = this.state;
      if(this.isValid()){
        const formdata = new FormData();
            formdata.append("name", name);
            formdata.append("content", content);
            formdata.append("image", image);
            formdata.append("designation", designation);
            formdata.append("status", status);
            let self = this
            axios
            .patch(`${process.env.REACT_APP_API_URL}/testimonial/${testimonial_id}`, formdata, {
              withCredentials: true,
              headers: {
                Bearer: token(),
              },
            })
          .then(function (response) {
              if(response.data.status === 'success'){ 
                console.log('response data',response); 
                toast.success(`Testimonial successfully updated`);
                self.setState({loading:false,name:'',content:'',designation:'',status:'',image:''})
                self.props.handleShowEdit()
                self.props.fetchtestimonial()
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
    render() {
        const {name,content,image,designation,status,imageurl} = this.state
        console.log('tesrt',this.state.content)
        return (
            <>
        <Modal
          show={this.props.show}
          onHide={this.props.handleShowEdit}
          animation={false}
          size="lg"
        >
          <LoadingOverlay
            active={this.state.loading}
            spinner={<Spinner animation="grow" variant="primary" size="lg" />}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Testimonial </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="card">
                <div className="card-header">Edit Testimonial</div>
                <div className="card-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                          <label>Name *</label>
                          <input
                            name="name"
                            value={name}
                            onChange={
                                this.handleChangeInput
                            }
                            autoComplete="off"
                            className="form-control"
                            placeholder="Enter name"
                            />
                          <div className="text-danger">
                            {this.state.nameerr}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Content *</label>
                          {/* <textarea
                            // style={{height:"45px"}}
                            name="content"
                            value={content}
                            onChange={
                                this.handleChangeInput
                            }
                            autoComplete="off"
                            className="form-control"
                            placeholder="Enter content"
                            type="text"
                            /> */}
                            {console.log('hhhhh',this.state.content)}
                    <CKEditor
                      data={this.props.obj.content}
                      editor={ClassicEditor}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        this.ckeditor(data);
                        //console.log({ event, editor, data });
                      }}
                    />
                          <div className="text-danger">
                            {this.state.contenterr}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                      <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Status *</label>

                          <select
                            className="form-control"
                            name="status"
                            value={status}
                            onChange={
                                this.handleChangeInput
                            }
                          >
                            <option value="">SELECT</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                          </select>
                          <div className="text-danger">
                            {this.state.statuserr}
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Designation (Optional)</label>
                          <input
                            // style={{height:"45px"}}
                            name="designation"
                            value={designation}
                            onChange={
                                this.handleChangeInput
                            }
                            autoComplete="off"
                            className="form-control"
                            placeholder="Enter designation"
                            type="text"
                            />
                          <div className="text-danger">
                            {this.state.designationerr}
                          </div>
                        </div>
                      </div>
                      </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Image (Optional)</label><br/>
                          <img
                            src={`${imageurl}`}
                            onError={(i) =>
                              (i.target.src = `${DefaultProfile}`)
                            }
                            style={{ width: "40px", height: "40px" }}
                            className="img-thumbnail"
                          /> &nbsp;&nbsp;
                          <input type="file" className="form-control" accept="image/*" name="image" onChange={this.handleChangeInput} name="image" />
                          <div className="text-danger">
                            {this.state.imageerr}
                          </div>
                        </div>
                      </div>
                    </div>
                    <input
                      type="submit"
                      value="Submit"
                      className="btn btn-primary"
                    />
                  </form>
                </div>
              </div>
            </Modal.Body>
            {/* <Modal.Footer>
            <Button variant="primary" onClick={this.saveallAnswer}>
              Save Changes
            </Button>
            <Button variant="secondary" onClick={this.props.handleShow}>
              Close
            </Button>
          </Modal.Footer> */}
          </LoadingOverlay>
        </Modal>   
            </>
        )
    }
}

export default Edittestimonial
