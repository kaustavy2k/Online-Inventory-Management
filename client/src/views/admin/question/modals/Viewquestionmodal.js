import React, { Component } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ReactHtmlParser from "react-html-parser";
import { toast, ToastContainer } from "react-toastify";
import reacthtmlparser from "react-html-parser";
import { Spinner, Modal } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "react-loading-overlay";
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { Link } from "react-router-dom";
import {
  getsurvey,
  addQuestion,
  singlefetchQuestion,
  editQuestion,
} from "../api";
import axios  from "axios";
import { token } from "../../token";

class Viewquestionmodal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      loading: false,
      question:{},
      answer:[],
    };
  }

  componentDidUpdate(prevProps, prevState) {
     console.log("prevprop",prevProps)
    // console.log("this props",this.props)
    if (
        this.props.show &&
        this.props.question_id != prevProps.question_id
      ){
        console.log('apicall') 
        this.setState({ loading: true }); 
        this.question_details()
      }
  }
 
  question_details = ()=>{
    axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/question-answer/${this.props.question_id}`,
      })
      .then((res)=>{
         console.log('response',res.data)
         this.setState({question:res.data.question,answer:res.data.answer, loading: false})
      })
      .catch((err)=>{
          console.log('error')
      })
   }
   generatePDF = () => {
    var doc = new jsPDF("p","pt","a4");
  
      doc.html(document.querySelector("#content"),{
      
        callback:function(doc){ 

          //   var pageCount = doc.internal.getNumberOfPages()
          //   doc.deletePage(pageCount) 
          // var tt = doc.internal.pageSize.height - 10   
          // doc.addPage(tt)     
            doc.save("question.pdf")
            
        }
    })

  }
  render() {
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.handleShowView}
          animation={false}
          size="lg"
        >
          <LoadingOverlay
            active={this.state.loading}
            spinner={<Spinner animation="grow" variant="primary" size="lg" />}
          >
            <Modal.Header closeButton>
              <Modal.Title>View Question and Answer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="card">
                <div className="card-header">View Question and Answer</div>
                <div className="card-body" id="content">
                 

                <div className="row">
                    <div className="col-md-2">
                        <h5> Question : </h5>
                    </div>
                    <div className="col-md-10">
                        {reacthtmlparser(this.state.question.content)}
                    </div>   
                </div>
                <div><b>List Order : </b> {this.state.question.list_order}</div>
                <div><b>Status : </b> {this.state.question.active?'Active':'Inactive'}</div>
                <br/>
                {this.state.answer.length>0 && (                               
                                 <table style={{border: "1px solid black",tableLayout:"auto",width: "100%"}}>
                                    <thead >
                                    <tr>
                                        <th scope="col" style={{border: "1px solid black"}}>List order</th>
                                        <th scope="col" style={{border: "1px solid black"}}>Answer</th>
                                        <th scope="col" style={{border: "1px solid black"}}>Next Question</th>
                                        <th scope="col" style={{border: "1px solid black"}}>Recommendation</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.answer.length>0 && this.state.answer.map((item, i) => {
                                     return <tr  key={i}>
                                            <td style={{border: "1px solid black"}}>{item.list_order}</td>
                                            <td style={{border: "1px solid black"}}>{item.content}</td>
                                            <td style={{border: "1px solid black"}}>{reacthtmlparser(item.nextquestion_name)}</td>
                                            <td style={{border: "1px solid black"}}>{item.recomendation_name}</td>
                                        </tr>
                                    })}
                                    </tbody>
                                </table>
                                )}


                </div>
              </div>
            </Modal.Body>
            {/* <Modal.Footer>
            <button onClick={this.generatePDF} className="btn btn-primary" type="primary">Download</button>
          </Modal.Footer> */}
          </LoadingOverlay>
        </Modal>
      </>
    );
  }
}

export default Viewquestionmodal;
