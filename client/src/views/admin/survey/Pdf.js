import React, { Component } from 'react'
import ReactToPdf from 'react-to-pdf';
import axios from "axios";
import {Card,Badge,Spinner} from 'react-bootstrap'
import reacthtmlparser from "react-html-parser";
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
const ref = React.createRef();

class Pdf extends Component {
    constructor(props){
        super(props)
        this.state = {
            survey_details:{},
            question:[]
        }
    }
    componentDidMount(){
        this.survey_details()
    }
    generatePDF = () => {
      var doc = new jsPDF("p","pt","a4");
    
        doc.html(document.querySelector("#content"),{
        
          callback:function(doc){ 

            //   var pageCount = doc.internal.getNumberOfPages()
            //   doc.deletePage(pageCount) 
            // var tt = doc.internal.pageSize.height - 10   
            // doc.addPage(tt)     
              doc.save("survey.pdf")
              
          }
      })

    }
    survey_details = ()=>{
        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}/survey-pdf/${this.props.location.state.survey_id}`,
          })
          .then((res)=>{
             console.log('response',res.data)
             this.setState({survey_details:res.data.surveydetails[0],question:res.data.question})
          })
          .catch((err)=>{
              console.log('error')
          })
    }
     
    render() {
        return (
            <>
                <div className="card" style={{width:"595px"}}>
                    <div className="card-body" id="content" ref={ref} style={{width:"595px",fontSize:"10px"}}>
                       
                        <div className="mb-2">
                        <h4>Analyzer Name:</h4> {this.state.survey_details.title}
                        </div>

                        <div className="mb-2">
                        <b>Content:</b> {reacthtmlparser(this.state.survey_details.content)}
                        </div>

                        <div className="mb-2">
                        <b>Summary:</b> {reacthtmlparser(this.state.survey_details.summary)} 
                        </div>
                        
                        <div className="mb-2">
                        <b>Max difficulty:</b>  {this.state.survey_details.max_difficulty}
                        </div>
                         <br/>
                        <div className="mb-8">
                        <h3><u>Question and Answer</u></h3>
                        </div>
                        <br/>
                        <div>
                           {this.state.question.length>0 && this.state.question.map((ques,index)=>(
                               <>
                              <div  key={index}>
                                <div className="row">
                                    <div className="col-md-3">
                                      <h5>{index+1}. Question : </h5>
                                    </div>
                                    <div className="col-md-9">
                                     {reacthtmlparser(ques.content)}
                                    </div>   
                                </div>
                                <div><b>List Order : </b> {ques.list_order}</div>
                                <br/>
                                {ques.answer.length>0 && (                               
                                 <table style={{border: "1px solid black",tableLayout:"auto",width: "100%"}}>
                                    <thead >
                                    <tr>
                                        {/* <th scope="col" style={{border: "1px solid black"}}>SL</th> */}
                                        <th scope="col" style={{border: "1px solid black"}}>List order</th>
                                        <th scope="col" style={{border: "1px solid black"}}>Answer</th>
                                        <th scope="col" style={{border: "1px solid black"}}>Next Question</th>
                                        <th scope="col" style={{border: "1px solid black"}}>Recommendation</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {ques.answer.length>0 && ques.answer.map((item, i) => {
                                     return <tr  key={i}>
                                            {/* <td style={{border: "1px solid black"}}>{i+1}</td> */}
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
                              <br/>
                              </>                             
                           ))}
                        </div>
                    </div>
                    <div className="card-footer">
                        <button onClick={this.generatePDF} className="btn btn-primary" type="primary">Download</button>
                    </div>
                </div>
           </>
        )
    }
}


export default Pdf
