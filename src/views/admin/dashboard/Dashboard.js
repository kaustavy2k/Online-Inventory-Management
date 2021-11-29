import React, { Component } from "react";
import { Spinner, Dropdown } from "react-bootstrap";
import LoadingOverlay from "react-loading-overlay";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import reacthtmlparser from "react-html-parser";
import { token } from "../token";
import makeAnimated from "react-select/animated";
import { Link } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import moment from "moment";
import "react-date-range/dist/theme/default.css";
import "./dashboard.css";
const animatedComponents = makeAnimated();
let timer;
var AuthData = JSON.parse(localStorage.getItem("AuthData"));
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      updated: [],
      current_page: 1,
      per_page: 10,
      totalPage: null,
      totalData: 0,
      loading: false,
      deleted: 0,
      categoryId: [],
      tagId: [],
      filterSearch: 0,
      sortConfig: {
        key: null,
        direction: null,
      },
      filter: { category: [], tag: [], status: [], publishedAt: [] },
      dateRange: [
        {
          startDate: new Date(),
          endDate: null,
          key: "selection",
        },
      ],
    };
    this.searchref = React.createRef();
  }
  surveyList = () => {
    let self = this;
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/survey-list?page=${this.state.current_page}&numPerPage=${this.state.per_page}`,
        {
          params: this.state.filter,
          withCredentials: true,
          headers: {
            Bearer: token(),
          },
        }
      )
      .then(function (response) {
        let users = [...response.data.Survey];
        let current_page = parseInt(response.data.pagination.current);
        let per_page = response.data.pagination.perPage;
        let totalData = response.data.pagination.totalData;
        let totalPage = response.data.pagination.totalPages;
        self.setState({
          users,
          current_page,
          per_page, // survey = survey.filter(function (item) {
          //   return (
          //     item.summary.toLowerCase().search(search.toLowerCase()) !== -1 ||
          //     item.title.toLowerCase().search(search.toLowerCase()) !== -1
          //   );
          // });
          totalPage,
          totalData,
          loading: false,
          filterSearch: 0,
        });
        return axios.get(`${process.env.REACT_APP_API_URL}/category`, {
          withCredentials: true,
          headers: {
            Bearer: token(),
          },
        });
      })
      .then((res) => {
        let cat = [...res.data.data.category];
        let categoryId = [];
        cat.forEach((i) => {
          categoryId.push({ value: i.title, label: i.title, id: i.id });
        });
        this.setState({
          categoryId,
          filterSearch: 0,
        });
        return axios.get(`${process.env.REACT_APP_API_URL}/tag`, {
          withCredentials: true,
          headers: {
            Bearer: token(),
          },
        });
      })
      .then((res) => {
        let tag = [...res.data.data.tag];
        let tagId = [];
        tag.forEach((i) => {
          tagId.push({ value: i.title, label: i.title, id: i.id });
        });
        this.setState({
          filterSearch: 0,
          tagId,
        });
      })
      .catch(function (error) {
        self.setState({ loading: false, filterSearch: 0 });
        //toast.warning(message);
        console.log("error response", error);
      });
  };

  filterList = (event) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log("hi");
      this.setState({ loading: true });
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/survey-list?search=${event.target.value}`,
        params: this.state.filter,
        withCredentials: true,
        headers: {
          Bearer: token(),
        },
      })
        .then((response) => {
          let users = [...response.data.Survey];
          this.setState({ users, loading: false });
        })
        .catch((error) => {
          this.setState({ loading: false });
          toast.warning(`Server Error~`);
        });
    }, 500);
  };
  //   componentDidMount() {
  //     this.setState({ loading: true });
  //     this.surveyList();
  //   }
  //   componentDidUpdate(prevprops, prevState) {
  //     if (
  //       prevState.deleted != this.state.deleted ||
  //       prevState.current_page != this.state.current_page ||
  //       this.state.filterSearch
  //     ) {
  //       this.searchref.current.value = "";
  //       this.surveyList();
  //     }
  //     if (
  //       prevState.sortConfig.key != this.state.sortConfig.key ||
  //       prevState.sortConfig.direction != this.state.sortConfig.direction
  //     ) {
  //       let sortableItems = [...this.state.users];
  //       //console.log("key in comp", sortableItems);
  //       if (this.state.sortConfig !== null) {
  //         sortableItems.sort((a, b) => {
  //           if (a[this.state.sortConfig.key] < b[this.state.sortConfig.key]) {
  //             return this.state.sortConfig.direction === "ascending" ? -1 : 1;
  //           }
  //           if (a[this.state.sortConfig.key] > b[this.state.sortConfig.key]) {
  //             return this.state.sortConfig.direction === "ascending" ? 1 : -1;
  //           }
  //           return 0;
  //         });
  //       }
  //       //console.log("key in comp2", sortableItems);
  //       this.setState({ users: [...sortableItems] });
  //     }
  //   }
  requestSort = (key) => {
    let direction = "ascending";
    if (
      this.state.sortConfig &&
      this.state.sortConfig.key === key &&
      this.state.sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    this.setState({ sortConfig: { key, direction } });
  };
  deleteSurvey = (id, Ownerusers_id) => {
    let cnfirm = false;
    if (
      Ownerusers_id == AuthData.data.id ||
      AuthData.data.admin_role.role_name == "Admin" ||
      AuthData.data.admin_role.role_name == "Super admin"
    ) {
      cnfirm = window.confirm(`Are you sure you want to delete this analyzer?`);

      if (cnfirm) {
        this.setState({ loading: true, deleted: 0 });
        axios
          .delete(`${process.env.REACT_APP_API_URL}/delete-Survey/${id}`, {
            withCredentials: true,
            headers: {
              Bearer: token(),
            },
          })
          .then((res) => {
            console.log(res.data.totalCount);
            this.setState({
              loading: false,
              deleted: 1,
              totalData: res.data.totalCount,
            });
            toast.success("Analyzer deleted successfully");
          })
          .catch((error) => {
            this.setState({ loading: false, deleted: 0 });
            toast.warning("Cannot delete analyzer having Question");
          });
      }
    } else {
      cnfirm = window.confirm(`Not deleted ,You are not in this survey owner.`);
    }

    //console.log("confirmmmm",cnfirm)
  };
  editSurvey = (id, obj) => {
    let publishedAt = new Date(obj.publishedAt);
    let endsAt;
    if (obj.endsAt) {
      endsAt = new Date(obj.endsAt);
    }

    let category = [];
    let tag = [];
    let author = [];
    let published;
    if (obj.published == "0") {
      published = "Draft";
    } else if (obj.published == "1") {
      published = "Published";
    } else if (obj.published == "2") {
      published = "Inactive";
    }
    if (obj.catid[0] !== null) {
      obj.catid.forEach((item, index) => {
        category.push({
          value: obj.category[index],
          label: obj.category[index],
          id: parseInt(item),
        });
      });
    }
    if (obj.tagid[0] !== null) {
      obj.tagid.forEach((item, index) => {
        tag.push({
          value: obj.tag[index],
          label: obj.tag[index],
          id: parseInt(item),
        });
      });
      //console.log(tag)
    }
    //console.log('atttttt',obj.author_id)
    if (obj.author_id[0] !== null) {
      obj.author_id.forEach((item, index) => {
        author.push({
          value: obj.authorname[index],
          label: obj.authorname[index],
          id: parseInt(item),
        });
      });
    }

    this.props.history.push({
      pathname: "/admin/survey/edit-survey/" + id,
      state: {
        ...obj,
        category,
        tag,
        author,
        published,
        publishedAt,
        endsAt,
      },
    });
  };
  viewSurvey = (id, obj) => {
    let publishedAt = new Date(obj.publishedAt);
    let endsAt;
    if (obj.endsAt) {
      endsAt = new Date(obj.endsAt);
    }

    let category = [];
    let tag = [];
    let author = [];
    let published;
    if (obj.published == "0") {
      published = "Draft";
    } else if (obj.published == "1") {
      published = "Published";
    } else if (obj.published == "2") {
      published = "Inactive";
    }
    if (obj.catid[0] !== null) {
      obj.catid.forEach((item, index) => {
        category.push({
          value: obj.category[index],
          label: obj.category[index],
          id: parseInt(item),
        });
      });
    }
    if (obj.tagid[0] !== null) {
      obj.tagid.forEach((item, index) => {
        tag.push({
          value: obj.tag[index],
          label: obj.tag[index],
          id: parseInt(item),
        });
      });
      //console.log(tag)
    }
    //console.log('atttttt',obj.author_id)
    if (obj.author_id[0] !== null) {
      obj.author_id.forEach((item, index) => {
        author.push({
          value: obj.authorname[index],
          label: obj.authorname[index],
          id: parseInt(item),
        });
      });
    }

    this.props.history.push({
      pathname: "/admin/survey/view-survey/" + id,
      state: {
        ...obj,
        category,
        tag,
        author,
        published,
        publishedAt,
        endsAt,
      },
    });
  };
  handlePageChange(pageNumber) {
    this.setState({ current_page: pageNumber, loading: true });
  }
  categorySelector = (data) => {
    let catId = data.map((i) => {
      return i.id;
    });
    this.setState({
      filterSearch: 1,
      filter: { ...this.state.filter, category: catId },
      loading: true,
    });
  };
  tagSelector = (data) => {
    let tagId = data.map((i) => {
      return i.id;
    });
    this.setState({
      filterSearch: 1,
      filter: { ...this.state.filter, tag: tagId },
      loading: true,
    });
  };
  statusSelector = (data) => {
    let statusId = data.map((i) => {
      return i.id;
    });
    this.setState({
      filterSearch: 1,
      filter: { ...this.state.filter, status: statusId },
      loading: true,
    });
  };
  rangeSelector = (item) => {
    console.log("item item hh", item);
    this.setState({
      filterSearch: 1,
      dateRange: [item.selection],
      filter: { ...this.state.filter, publishedAt: [item.selection] },
      loading: true,
    });
  };
  redirectQuestion = (uid, survey) => {
    this.props.history.push({
      pathname: `/admin/question/list-question/`,
      state: {
        survey_id: uid,
        survey_name: survey,
      },
    });
  };
  viewDownload = (uid) => {
    this.props.history.push({
      pathname: "/admin/survey-pdf/" + uid,
      state: {
        survey_id: uid,
      },
    });
  };
  redirectRecommendation = () => {
    this.props.history.push({
      pathname: `/admin/recommendation/recommendation-list/`,
    });
  };
  timeHandler = (time) => {
    let check = moment(time).utc().format("LLLL");
    if (check === "Invalid date") {
      check = "---";
    }
    return <p>{check}</p>;
  };
  render() {
    console.log(this.state);
    console.log(document.cookie);

    const { users, current_page, per_page, totalData } = this.state;

    const colourOptions = [
      { value: "Draft", label: "Draft", id: 0 },
      { value: "Published", label: "Published", id: 1 },
      { value: "Inactive", label: "Inactive", id: 2 },
    ];
    console.log(this.state.users);
    return (
      <>
        <ToastContainer />
        <LoadingOverlay
          active={this.state.loading}
          spinner={<Spinner animation="grow" variant="primary" size="lg" />}
        >
          <form>
            <fieldset className="form-group">
              <input
                type="text"
                id="search"
                className="form-control form-control-lg"
                placeholder="Search"
                ref={this.searchref}
                onChange={this.filterList}
              />
            </fieldset>
          </form>
          <br></br>
          <div className="card">
            <div className="card-header">College Inventory</div>

            <div className="card-body scroller">
              <br></br>
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">SL</th>
                    <th scope="col">
                      <Dropdown.Toggle
                        className="headingSort"
                        onClick={this.requestSort.bind(this, "title")}
                        style={{
                          backgroundColor: "#636f83",
                          borderStyle: "none",
                        }}
                      >
                        <strong>Item</strong>
                      </Dropdown.Toggle>
                    </th>
                    {/* <th scope="col">Content</th> */}
                    <th scope="col">Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={i}>
                      <td>{(current_page - 1) * 10 + (i + 1)}</td>
                      <td>
                        <div className="limittitle">{user.title}</div>
                      </td>
                      <td>
                        {user.published == 0
                          ? "Draft"
                          : user.published == 1
                          ? "Published"
                          : "Inactive"}
                      </td>
                      <td></td>
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

export default Dashboard;
