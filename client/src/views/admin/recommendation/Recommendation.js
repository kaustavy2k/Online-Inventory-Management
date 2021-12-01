import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Spinner, Dropdown } from "react-bootstrap";
import dateFormat from "dateformat";
import LoadingOverlay from "react-loading-overlay";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import reacthtmlparser from "react-html-parser";
import moment from "moment"
import "./recommendation.css";
import { token } from "../token";
let timer;
var AuthData = JSON.parse(localStorage.getItem("AuthData")); 
class Recommendation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recommendation: [],
      loading: false,
      deleted: 0,
    };
  }
  list = () => {
    this.setState({ loading: true });
    axios
      .get(`${process.env.REACT_APP_API_URL}/get-recommendation`)
      .then((res) => {
        this.setState({ recommendation: [...res.data.data], loading: false });
      })
      .catch((err) => {
        toast.warning(`~Server Error~`);
        this.setState({ loading: false });
      });
  };
  filterRecommendation = (event) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.setState({ loading: true });
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/get-recommendation?search=${event.target.value}`,
        withCredentials: true,
      })
        .then((res) => {
          this.setState({ recommendation: [...res.data.data], loading: false });
        })
        .catch((error) => {
          this.setState({ loading: false });
          toast.warning(`Server Error~`);
        });
    }, 500);
  };
  componentDidMount() {
    this.list();
  }
  componentDidUpdate(prevprops, prevState) {
    if (prevState.deleted != this.state.deleted) {
      this.list();
    }
  }

  delete = (id) => {
    const cnfirm = window.confirm(
      `Are you sure you want to delete this recommendation?`
    );
    if (cnfirm) {
      this.setState({ loading: true, deleted: 0 });
      axios
        .delete(`${process.env.REACT_APP_API_URL}/del-recommendation/${id}`, {
          withCredentials: true,
        })

        .then((response) => {
          return axios.delete(
            `${process.env.REACT_APP_API_URL}/delete-media/`,
            {
              data: {
                files: response.data.data.files,
              },
            },
            {
              withCredentials: true,
            }
          );
        })
        .then((res) => {
          toast.success(`Recommendation successfully delete`);
          this.setState({ loading: false, deleted: 1 });
        })
        .catch((error) => {
          this.setState({ loading: false });
          toast.warning(`Cannot delete parent recommendation`);
          console.log("error response", error);
        });
    }
  };
  edit = (id, obj) => {
    let avgtime
    if(obj.avgtime){
      avgtime=new Date(obj.avgtime)
    }
    this.props.history.push({
      pathname: "/admin/recommendation/edit-recommendation/" + id,
      state: {
        ...obj,avgtime
      },
    });
  };
  timeHandler=(time)=>{
    let check=moment(time).utc().format("LLLL")
    if(check==="Invalid date"){
      check="---"
    }
   return (<p>{check}</p>)
  }
  render() {
    return (
      <>
        <ToastContainer />
        <LoadingOverlay
          active={this.state.loading}
          spinner={<Spinner animation="grow" variant="primary" size="lg" />}
        >
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search"
              name="searchname"
              onChange={this.filterRecommendation}
            />
          </fieldset>
          <div className="card">
            <div className="card-header">Recommendation List</div>
            <div className="card-body scroller">
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Content</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated At</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.recommendation.map((item, i) => (
                    <tr key={i}>
                      <th scope="row">{item.id}</th>
                      <td>{item.name}</td>
                      <td>
                        <div className="limitcontent">
                          {reacthtmlparser(item.content)}
                        </div>
                      </td>
                      <td>
                        <div className="limitdates">
                        {this.timeHandler(item.createdAt)}
                        </div>
                      </td>
                      <td>
                        <div className="limitdates">
                          {this.timeHandler(item.updatedAt)}
                        </div>
                      </td>
                      <td>
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="secondary"
                            id="dropdown-basic"
                          >
                            Select Action
                          </Dropdown.Toggle>
                          {AuthData.data.admin_role.role_name!='Author'?  
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={this.edit.bind(this, item.id, {
                                name: item.name,
                                content: item.content,
                                cost:item.estimated_cost,
                                avgtime:item.implementation_time,
                                difficulty:item.difficulty,
                                user_recomm_limit_span_or_number:item.user_recomm_limit_span_or_number,
                                user_recomm_limit_span_type:item.user_recomm_limit_span_type,
                              })}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={this.delete.bind(this, item.id)}
                            >
                              Delete
                            </Dropdown.Item>
                            {/* <Dropdown.Item
                              onClick={this.manageMedia.bind(this, item.id)}
                            >
                              Manage Media
                            </Dropdown.Item> */}
                          </Dropdown.Menu>
                          :""
                          }

                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </LoadingOverlay>
      </>
    );
  }
}

export default Recommendation;
