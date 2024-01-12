import React, { useEffect, useState, useRef, useMemo } from "react";
import MetaTags from "react-meta-tags";
import { withRouter, Link } from "react-router-dom";
import panel from "../../../assets/images/FlipEx/panel.svg"
import person from "../../../assets/images/FlipEx/person.svg"
import shield from "../../../assets/images/FlipEx/sheild.svg"
import personalInfo from "../../../assets/images/FlipEx/pifo.svg"
import downIcon from "../../../assets/images/FlipEx/down.svg"
import passwordLock from "../../../assets/images/FlipEx/password.svg"
import SuccessModals from "../../../components/Common/successModal";
import PropTypes from 'prop-types'





import axios from "axios";
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
  Spinner,
  Form,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import * as Yup from "yup";
import { useFormik } from "formik";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import { ToastContainer, toast } from 'react-toastify';
import images from "assets/images";

//Import modals


import ReportCard from "components/Common/ReportCard";

import DropdownComponent  from "components/Common/DropdownComponent"

// users
import user1 from "../../../assets/images/users/avatar-1.jpg"
const API_URL = process.env.REACT_APP_BASE_URL


const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')){
      req.headers.Authorization = `Bearer ${ JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req;
});



import { isEmpty, size, map } from "lodash";


//redux
import { useSelector, useDispatch } from "react-redux";

const AdminList = props => {

  const [menu, setMenu] = useState(false)

  const [countsLoading, setCountsLoading] = useState(false);
	const [countriesError, setCountriesError] = useState(null);
	const [countriesData, setCountriesData] = useState([]);
  const [country, setCountry] = useState('');
  const [username, setusername] = useState("")

  const dispatch = useDispatch();
  const [admin, setAdmin] = useState();
  const [admins, setAdmins] = useState([]);
  const [totalAdmins, setTotalAdmins] = useState();
  const [levelOneAdmins, setLevelOneAdmins] = useState();
  const [superAdmins, setSuperAdmins] = useState();
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const [personalInfor, setPersonalInfor] = useState(true)
  const [adminType, setAdminType] = useState("")
  const [messageTitle, setMessageTitle] = useState("")
  const [messageDetails, setMessageDetails] = useState("")
  const [messageType, setMessageType] = useState("")
  const [successModal, setSuccessModal] = useState(false);
  // const [ permissions, setPermissions] = useState({ can_delete: false, can_update: false, can_create: false, can_approve: false, can_decline: false, can_confirm: false })
  const [ verification_token, setVerificationToken] = useState("")
  const [adminDetail, setAdminDetail] = useState([])
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: (admin && admin.name) || '',
      email: (admin && admin.email) || '',
      phone_number: (admin && admin.phone_number) || '',
      
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter full name"),
      email: Yup.string().required("Please Enter  Email"),
      phone_number: Yup.number().required("Please enter phone number")

    }),
    onSubmit: (values) => {
      if (isEdit) {
        setLoading(true);
        const updateUser = {
          id: admin.id,
          name: admin.name,
          role: adminType
        };
      
        axiosApi.post(`${API_URL}/api/v1/admin/update-admin`, updateUser).then((response) => {
          setLoading(false);
          toast("Admin updated successfully")
          validation.resetForm();
          setIsEdit(false);
        }).catch((error) => {
         
          setLoading(false);
          validation.resetForm();
          setIsEdit(false);
        })
      }else {
      
         setLoading(true);
        const newUser = {
          name: values["name"],
          email: values["email"],
          phone_number: values["phone_number"],
          password: values["password"],
          country: country,
          role: adminType,
        };
        // save new user
        axiosApi.post(`${API_URL}/api/v1/admin/create`, newUser).then((response) => {
          setLoading(false);
          setMessageType("Success")
          setMessageTitle("Admin added successfully");
          setMessageDetails("You have succesfully added an admin to Flipex.")
          setSuccessModal(true);
          validation.resetForm();
        }).catch((error) => {
          setMessageType("Error")
          setMessageTitle("Admin added failed");
          setMessageDetails(error.response.data.message)
          setSuccessModal(true);
          setLoading(false);
          validation.resetForm();
        
        })
        
      }
      toggle();
    },
  });



  const getCountries = () => {
    axiosApi.get('https://countriesnow.space/api/v0.1/countries/states').then((response) => {
      setCountriesData(response.data.data);
      setCountsLoading(false);
    }).catch((error) => {
      setCountriesError(error);
      setCountsLoading(false);
    })
  }

  const loadAdmins = () => {
    axiosApi.get(`${API_URL}/api/v1/admin/admins`).then((response) => {
     setAdmins(response.data.data);
    }).catch((error) => {
      
    
    })
  }


  useEffect(() => {
    getCountries();
    loadAdmins()
  }, [])





  const [userList, setUserList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false)
  const [passwordInfo, setPasswordInfo] = useState(false)









  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: admins.length, // replace later with size(admins),
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
      text: "Fullname",
      dataField: "name",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {user.name}
            </Link>
          </h5>
          <p className="text-muted mb-0">{user.designation}</p>
        </>
      ),
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
    },

    {
      text: "Phone number",
      dataField: "phone_number",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {user.phone_number}
            </Link>
          </h5>
        </>
      ),
    },

    {
      text: "Admin Type",
      dataField: "role",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, user) => (
        <>
          <h5 className="font-size-14 mb-1">
            { user.role === 1 ? (
               <Link to="#" className="text-dark">
                 Level 1
             </Link>
            )
            : (
              <Link to="#" className="text-dark">
              Super Admin
            </Link>
            )   
          }
           
          </h5>
       
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

      <DropdownComponent user={user} menuType={user.phone_number} admin={user} loadAdmins={loadAdmins} />
      ),
    },
  ];


  


 


  useEffect(() => {
    if (admins && !admins.length) {
     loadAdmins()
      setIsEdit(false);
    }
  }, []);

  useEffect(() => {
    // dispatch(onGetReports())
      axiosApi.get(`${API_URL}/` + 'api/v1/reports/admin-reports', {   headers: {
        "Accept": "application/json",
        "Access-Control-Allow-Origin":"*"
    }}).then((res) => {
        setTotalAdmins(res.data.totalAdmins); 
        setLevelOneAdmins(res.data.levelOneAdmins)
        setSuperAdmins(res.data.superAdmins);
    }).catch((errors) => {
    })
  
}, [ ]);

  useEffect(() => {
    setAdmin(admins);
    setIsEdit(false);
  }, [admins]);

  useEffect(() => {
    if (!isEmpty(admins) && !!isEdit) {
      setAdmin(admins);
      setIsEdit(false);
    }
  }, [admins]);

  const toggle = () => {
    setModal(!modal);
  };

  const togglePersonalInfo = () => {
    setPersonalInfor(!personalInfor);
  }

  const togglePassword = () => {
    setPasswordInfo(!passwordInfo);
  }

 

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


  const handleUserClicks = () => {
    setUserList("");
    setIsEdit(false);
    toggle();
  };

 

  const keyField = "id";

  return (
    <React.Fragment>
        <SuccessModals 
         title={messageTitle} 
         details={messageDetails}
         show={successModal} 
         messageType={messageType}
         onCloseClick={() => setSuccessModal(false)}
         />
      <div className="page-content">
        <MetaTags>
          <title>Admins | Spoopay Admin Dashboard</title>
        </MetaTags>
        <Container fluid>
         
          <Row>
          <Col lg={12}>
               <Row>
                {/* Reports Render */}
                 <ReportCard reportTitle={"Total Admins"} reportDes={totalAdmins}  icon={shield} />
                 <ReportCard reportTitle={"Level 1 admins"} reportDes={levelOneAdmins} icon={person}  />
                 <ReportCard reportTitle={"Super admins"} reportDes={superAdmins} icon={panel}  />
               </Row>
            </Col>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField={keyField}
                    columns={contactListColumns}
                    data={admins}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={admins}
                          columns={contactListColumns}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col sm="4">
                                    <h5>Admins</h5>
                                </Col>
                                <Col sm="8">
                                
                              <div className="text-sm-end">
                                <Row>
                                    <Col sm="5">
                                    <div className="search-box ms-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar {...toolkitProps.searchProps} />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                   </div>
                                    </Col>

                                    <Col sm="6">
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

                                    { loggedInUser.data.role === 4 ? (
                                          <Button
                                          color="default"
                                          className="font-16 btn-block btn btn-default"
                                          onClick={handleUserClicks}
                                          style={{
                                            border: "1px solid gray"
                                          }}
                                        >
                                          <i className="mdi mdi-plus me-1" />
                                          Add new admin
                                        </Button>
                                    ): null }

                                   
                                    </Col>
                                  </Row>

                                     
                                  
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <hr />
                                <Col xl="12">
                                  <div className="table-responsive">
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

                                    <Modal isOpen={modal} toggle={toggle} size="md">
                                      <ModalHeader toggle={toggle} tag="h4">
                                        {!!isEdit ? "Change permissions" : "Add new admin"}
                                      </ModalHeader>
                                      <hr />
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
                                              <div style={{ marginBottom: "5px"}}>
                                                <span>
                                                 <img src={personalInfo} alt="" />
                                                </span>
                                                <span style={{ paddingLeft: "5px", fontSize: "18px", paddingTop:'10px'}}>Personal Information</span>
                                                <span style={{ float: "right"}} onClick={togglePersonalInfo}>
                                                  <img src={downIcon} alt="" />
                                                </span>
                                              </div>
                                           
                                            {personalInfor ?
                                              (
                                              <>
                                                <div style={{ border: "1px solid #E5E5E5", borderRadius: "8px", marginTop: "20px"}} className="p-2">
                                              <Row>
                                                  <Col md={6}>
                                                      { !isEdit ? (
                                                    <div className="mb-3">
                                                    <Label className="form-label">Fullname</Label>
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
                                                    {validation.touched.name && validation.errors.name ? true : false? (
                                                      <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                                                    ) : null}
                                                  
                                                  </div>

                                                  ) : null}
                                                  </Col>

                                                  <Col md={6}>
                                                  { !isEdit ? (   <div className="mb-3">
                                                    <Label className="form-label">Phone number</Label>
                                                    <Input
                                                      name="phone_number"
                                                      label="phone_number"
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
                                                  </div>) : null}
                                                  </Col>
                                              </Row>

                                              <Row>
                                                <Col md={6}>
                                                    { !isEdit ? (  <div className="mb-3">
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
                                                  </div>) : null}
                                                </Col>
                                                <Col md={6}>
                                                <div className="mb-3">
                                                <Label className="form-label">Admin Role</Label>
                                                  <select className="form-control" name="admin_role" onChange={(e) => setAdminType(e.target.value)}>
                                                    <option value="1" className=" ">Content creator</option>
                                                    <option value="2">Level 2 admin</option>
                                                    <option value="3">Level 3 admin</option>
                                          
                                                  </select>
                                              </div>
                                                </Col>
                                              </Row>

                                            



                                              { !isEdit ? (   <div className="mb-3">
                                                <Label className="form-label">Country</Label>
                                                <select className="form-control" name="country" onChange={(e) => setCountry(e.target.value)}>
                                                <option value="">
                                                  {countsLoading ? "Fetching Countries" : "-- Select Country --"}
                                                </option>
                                                {countriesData?.map(({ name, iso2 }) => (
                                                  <option key={iso2} value={name}>
                                                    {name}
                                                  </option>
                                                ))}
                                          
                                                  </select>
                                               
                                               
                                              </div>) : null}
                                              </div>
                                              </>)
                                            : 
                                            null
                                            }
                                            
                                            
                                            <div style={{ marginBottom: "5px", marginTop: "20px"}}>
                                                <span>
                                                 <img src={passwordLock} alt="" />
                                                </span>
                                                <span style={{ paddingLeft: "5px", fontSize: "18px", paddingTop:'20px'}}>Set Password</span>
                                                <span style={{ float: "right"}} onClick={togglePassword}>
                                                  <img src={downIcon} alt="" />
                                                </span>
                                              </div>

                                            {passwordInfo ? (
                                            <>
                                              <div style={{ border: "1px solid #E5E5E5", borderRadius: "8px", }} className="p-2 mt-2">
                                              <Row>
                                                <Col md={6}>
                                                    
                                                { !isEdit ? ( <div className="mb-3">
                                                  <Label className="form-label">password</Label>
                                                  <Input
                                                    name="password"
                                                    label="password"
                                                    type="text"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.password || ""}
                                                    invalid={
                                                      validation.touched.password && validation.errors.projects ? true : false
                                                    }
                                                  />
                                                  {validation.touched.password && validation.errors.password ? (
                                                    <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                  ) : null}
                                                </div>
                                                  ) : null}
                                                 </Col>
                                                <Col md={6}>
                                                    
                                              { !isEdit ? ( <div className="mb-3">
                                                <Label className="form-label">Re-enter password</Label>
                                                <Input
                                                  name="password"
                                                  label="password"
                                                  type="text"
                                                  onChange={validation.handleChange}
                                                  onBlur={validation.handleBlur}
                                                  value={validation.values.password || ""}
                                                  invalid={
                                                    validation.touched.password && validation.errors.projects ? true : false
                                                  }
                                                />
                                                {validation.touched.password && validation.errors.password ? (
                                                  <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                                                ) : null}
                                              </div>
                                                ) : null}
                                                </Col>
                                              </Row>
                                                </div>
                                            </>
                                            ) : null}
                                          


                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <div className="text-end mt-5">

                                                   <button
                                                     onClick={toggle}
                                                     className="btn btn-default"
                                                    style={{ border: "1px solid gray", marginRight: "10px" }}
                                                    >
                                                      Cancel
                                                    </button>

                                              
                                                    <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                    >
                                                        { !loading &&  isEdit ? "Update admin" : "Add admin" }
                                                            { loading && (
                                                              <>
                                                              <Spinner
                                                                as="span"
                                                                animation="grow"
                                                                size="sm"
                                                                role="status"
                                                                aria-hidden="true"
                                                              />
                                                              Loading...
                                                              </>
                                                            ) 
                                                        }
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

AdminList.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any
}
export default withRouter(AdminList);