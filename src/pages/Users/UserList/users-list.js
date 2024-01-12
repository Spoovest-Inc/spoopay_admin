import React, { useEffect, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import TotalUsersIcon from "../../../assets/images/FlipEx/t_users.svg"
import ActiveUsersIcon from "../../../assets/images/FlipEx/active_users.svg"
import SuspendedUsersIcon from "../../../assets/images/FlipEx/suspended_users.svg";
import NumberFormat from 'react-number-format';
import { ToastContainer, toast } from 'react-toastify';
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
  Spinner,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";


const API_URL = process.env.REACT_APP_BASE_URL;


const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')){
      req.headers.Authorization = `Bearer ${ JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req;
});


import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import * as Yup from "yup";
import { useFormik } from "formik";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

import images from "assets/images";
import UsersDropdown from "components/Common/UsersDropdown";
import ReportCard from "components/Common/ReportCard"


import {
  getUsers as onGetUsers,
  addNewUser as onAddNewUser,
  updateUser as onUpdateUser,
  deleteUser as onDeleteUser,
  suspendUser as onSuspendUser,
  activateUser as onActivateUser,
  getUserProfile as onGetUserDetails
} from "store/contacts/actions";
import { isEmpty, size, map } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";



const ContactsList = props => {
    const [menu, setMenu] = useState(false)


    const dispatch = useDispatch();
    const [contact, setContact] = useState();


    const loggedInUser = JSON.parse(localStorage.getItem("profile"))
    let admin_name = loggedInUser.data.email;

    const [totalUsers, setTotalUsers] = useState("");
    const [activeUsers, setActiveUsers] = useState("");
    const [suspendedUsers, setSuspendedUsers] = useState("");



    // filter form datas 
    const [done, setDone] = useState("")
    const [type, setType] = useState("")
    const [start_date, setStartDate] = useState("")
    const [end_date, setEndDate] = useState("")
    
    const [users, setUsers] = useState([])
    const [suspensionDate, setSuspensionDate] = useState("")


   const loadReports = () => {
      // dispatch(onGetReports())
      axiosApi.get(`${API_URL}/` + 'api/v1/reports/user-reports').then((res) => {
        setTotalUsers(res.data.totalUsers); 
        setActiveUsers(res.data.activeUsers)
        setSuspendedUsers(res.data.suspendedUsers);
    }).catch((errors) => {
    })
   }


   const loadUsers = () => {
    axiosApi.get(`${API_URL}/` + 'api/v1/users/all').then((res) => {
      setUsers(res.data); 
  }).catch((errors) => {

  })
   }

    useEffect(() => {
      loadReports()
      loadUsers()
  }, [0]);
  

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: '',
      country: '',
      phone_number:  '',
      email:  '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please users name"),
      phone_number: Yup.string().required("Please enter phone number"),
      country: Yup.string().required("Please enter country"),
      email: Yup.string().required("Please Enter Your Email"),


    }),
    onSubmit: (values) => {
        const newUser = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          name: values["name"],
          country: values["country"],
          email: values["email"],
          phone_number: values["phone_number"],
          admin_name: loggedInUser.data.name,
          admin_email: loggedInUser.data.email,
          admin_phone: loggedInUser.data.phone_number,
        };
        // save new user
        dispatch(onAddNewUser(newUser));
      toggle();
    },
  });




const [loading, setLoading] = useState(false);
const [isSpininng, setIsSpining] = useState(false);

  
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);


  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: users?.length, // replace later with size(users),
    custom: true,
  };
  const defaultSorted = [
    {
      dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ];

  const selectRow = {
    mode: "checkbox",
  };

  const contactListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      // eslint-disable-next-line react/display-name
      formatter: user => <>{user.id}</>,
    },
    {
      dataField: "img",
      text: "#",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <>
          {!user.img ? (
            <div className="avatar-xs">
              <span className="avatar-title rounded-circle">
                {user.first_name.charAt(0)}
              </span>
            </div>
          ) : (
            <div>
              <img
                className="rounded-circle avatar-xs"
                src={images[user.img]}
                alt=""
              />
            </div>
          )}
        </>
      ),
    },
    

    {
      text: "FullName",
      dataField: "name",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {user.first_name + " " + user.last_name} 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      text: "Email",
      dataField: "email",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {user.email} 
            </Link>
          </h5>
        
        </>
      ),
    },

   

   

   

    {
      text: "Sign Up Date",
      dataField: "createdAt",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {user.createdAt} 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      dataField: "Status",
      text: "status",
      sort: true,

       // eslint-disable-next-line react/display-name
       formatter: (cellContent, user) => (
        <>
         {user.status === "ACTIVE" ? (
             <>
              <span style={{ color: "green"}}>{user.status}</span>
             </>
             ) : user.status === "SUSPENDED" ? ( 
               <>
              <span style={{ color: "red"}}>{user.status}</span>
              </>
             ) : user.status === "LEAVE" ? (
            
                <>
              <span style={{ color: "purlpe"}}>{user.status}</span>
              </>
            
             ) : null }
  
        
        </>
      ),
    },

   
  
   
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
       <UsersDropdown user={user} loadUsers={loadUsers} menuType={user.id} />
      ),
    },
  ];


 


  const filterUsers = () => {
    setLoading(true)
     axiosApi.get(`${API_URL}/api/v1/admin//users/groups/${type}/${done}/${start_date}/${end_date}`).then((res) => {
     if(res.data.data.users.count > 0){
      setUsers(res.data.data.users.rows)
     }else{
      setUsers([])
     }
      setLoading(false)
     }).catch((error) => {
        toast(error.message)
        setLoading(false)
     })
  }





  const toggle = () => {
    setModal(!modal);
  };




  


 
  var node = useRef();
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page);
    }
  };






  const keyField = "id";

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Users | Spoopay admin dashboard</title>
        </MetaTags>
        <Container fluid>
       
          <Row>
            <Col lg={12}>
               <Row>
                {/* Reports Render */}
                 <ReportCard reportTitle={"Total users"} reportDes={totalUsers} icon={TotalUsersIcon} />
                 <ReportCard reportTitle={"Active users"} reportDes={activeUsers} icon={ActiveUsersIcon} />
                 <ReportCard reportTitle={"Suspended users"} reportDes={suspendedUsers} icon={SuspendedUsersIcon}/>
                
               </Row>
            </Col>

          





            



            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField={keyField}
                    columns={contactListColumns}
                    data={users}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={users}
                          columns={contactListColumns}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                 <Col sm="4">
                                    <h5>Spoopay Users</h5>
                                 </Col>
                                    <Col md="8">     
                                    <div className="text-sm-end">
                                      <Row>
                                        <Col md="4">
                                          <div className="search-box ms-2 mb-2 d-inline-block">
                                          <div className="position-relative">
                                            <SearchBar {...toolkitProps.searchProps} />
                                            <i className="bx bx-search-alt search-icon" />
                                          </div>
                                          </div>
                                        </Col>

                                        <Col md="8">
                                        <Dropdown
                                          isOpen={menu}
                                          toggle={() => setMenu(!menu)}
                                          className="d-inline-block"
                                        >
                                                  <DropdownToggle
                                                    className="font-16 btn-block btn btn-default"
                                                    id="page-header-user-dropdown"
                                                    tag="button"
                                                    style={{
                                                      border: "1px solid gray",
                                                      marginRight: "10px",
                                                    }}
 
                                                  >
                                                    <i className="mdi mdi-filter me-1" />
                                                    <span className="d-none d-xl-inline-block ms-2 me-1">Filter</span>

                                                  </DropdownToggle>
                                                  <DropdownMenu className="dropdown-menu-end">
                                                    <DropdownItem>
                                                    <span>Filter by date</span>
                                                    </DropdownItem>

                                                    <DropdownItem>
                                                    <span>Filter by role</span>
                                                    </DropdownItem>
                                                  
                                                  
                                                  
                                                    <div className="dropdown-divider"/>
                                                  
                                                  </DropdownMenu>
                                             </Dropdown>

                                             <Button
                                              color="default"
                                              className="font-16 btn-block btn btn-default"
                                              onClick={null}
                                              style={{
                                                border: "1px solid gray"
                                              }}
                                            >
                                              <i className="mdi mdi-export me-1" />
                                              Export
                                            </Button>
                                        </Col>
                                      </Row>
                                    </div>
                                    </Col>
                              </Row>
                              <Row>
                                <hr />
                                <Col xl="12">
                                  
                                  <div className="table-responsive">
                                  {users?.length > 0 ? ('') : (
                                  <>
                                   <p style={{ textAlign: "center"}}>No user data found, please click <span onClick={() => {loadUsers()}} style={{ color: "blue"}}>here</span> to reload</p>
                                  </>)}
                                    <BootstrapTable
                                      keyField={keyField}
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                      selectRow={selectRow}
                                      defaultSorted={defaultSorted}
                                      classes={
                                        "table align-middle table-nowrap table-hover"
                                      }
                                      bordered={false}
                                      striped={false}
                                      responsive
                                      ref={node}
                                    />

                                    <Modal isOpen={modal} toggle={toggle}>
                                      <ModalHeader toggle={toggle} tag="h4">
                                        {!!isEdit ? "Edit User" : "Add User"}
                                      </ModalHeader>
                                      <ModalBody>
                                        <Form
                                          onSubmit={(e) => {
                                            e.preventDefault();
                                            validation.handleSubmit();
                                            return false;
                                          }}
                                        >
                                          <Row form>
                                            <Col xs={12}>
                                              <div className="mb-3">
                                                <Label className="form-label">Name</Label>
                                                <Input
                                                  name="name"
                                                  type="text"
                                                  onChange={validation.handleChange}
                                                  onBlur={validation.handleBlur}
                                                  value={validation.values.name || ""}
                                                  invalid={
                                                    validation.touched.name && validation.errors.name ? true : false
                                                  }
                                                />
                                                {validation.touched.name && validation.errors.name ? (
                                                  <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                                                ) : null}
                                              </div>
                                              <div className="mb-3">
                                                <Label className="form-label">Country</Label>
                                                <Input
                                                  name="country"
                                                  label="Country"
                                                  type="text"
                                                  onChange={validation.handleChange}
                                                  onBlur={validation.handleBlur}
                                                  value={validation.values.country || ""}
                                                  invalid={
                                                    validation.touched.country && validation.errors.country ? true : false
                                                  }
                                                />
                                                {validation.touched.country && validation.errors.country ? (
                                                  <FormFeedback type="invalid">{validation.errors.country}</FormFeedback>
                                                ) : null}
                                              </div>
                                              <div className="mb-3">
                                                <Label className="form-label">Email</Label>
                                                <Input
                                                  name="email"
                                                  label="Email"
                                                  type="email"
                                                  onChange={validation.handleChange}
                                                  onBlur={validation.handleBlur}
                                                  value={validation.values.email || ""}
                                                  invalid={
                                                    validation.touched.email && validation.errors.email ? true : false
                                                  }
                                                />
                                                {validation.touched.email && validation.errors.email ? (
                                                  <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                                                ) : null}
                                              </div>
                                              
                                              <div className="mb-3">
                                                <Label className="form-label">Phone number</Label>
                                                <Input
                                                  name="phone_number"
                                                  label="Projects"
                                                  type="text"
                                                  onChange={validation.handleChange}
                                                  onBlur={validation.handleBlur}
                                                  value={validation.values.phone_number || ""}
                                                  invalid={
                                                    validation.touched.phone_number && validation.errors.phone_number ? true : false
                                                  }
                                                />
                                                {validation.touched.phone_number && validation.errors.phone_number ? (
                                                  <FormFeedback type="invalid">{validation.errors.phone_number}</FormFeedback>
                                                ) : null}
                                              </div>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <div className="text-end">
                                                <button
                                                  type="submit"
                                                  className="btn btn-success save-user"
                                                >
                                                  Save
                                                </button>
                                              </div>
                                            </Col>
                                          </Row>
                                        </Form>
                                      </ModalBody>
                                    </Modal>
                                  </div>
                                </Col>
                              </Row>
                              <Row className="align-items-md-center mt-30">
                                <Col className="pagination pagination-rounded justify-content-end mb-2">
                                  <PaginationListStandalone
                                    {...paginationProps}
                                  />
                                </Col>
                              </Row>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      );
                    }}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ContactsList);