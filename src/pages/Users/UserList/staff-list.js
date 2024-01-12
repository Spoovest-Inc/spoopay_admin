import React, { useEffect, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import NumberFormat from 'react-number-format';
import AuthCode from "react-auth-code-input"
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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner,
  FormGroup,
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

import Breadcrumbs from "components/Common/Breadcrumb";

import SuspendUserModel  from "components/Common/SuspendUser";
import ActivateUserModal from "components/Common/ActivateUserModal";
import StaffDetailsModal from "components/Common/StaffDetailsModal";
import TransactionModal from "components/Common/TransactionModal";
import ReportCard from "components/Common/ReportCard"
import DeleteModal from "components/Common/DeleteModal";
import SuccessModals from "components/Common/successModal";
import TotalStaffIcon from "../../../assets/images/FlipEx/totalStaffs.svg"
import SuspendedIcon from "../../../assets/images/FlipEx/suspendedStaffs.svg"
import StaffsOnLeaveIcon from "../../../assets/images/FlipEx/leaveStaffs.svg"
import ActiveStaffIcon from "../../../assets/images/FlipEx/activeStaffs.svg"
import personalInfoIcon from "../../../assets/images/FlipEx/pifo.svg"
import downIcon from "../../../assets/images/FlipEx/down.svg"
import upIcon from "../../../assets/images/FlipEx/up.svg"



import { isEmpty, size, map } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { users } from "common/data";



const ContactsList = props => {

    const [userDetail, setUserDetail] = useState([])

    const [transactions, setTransactions] = useState([])
    const [userName, setUserName] = useState("")

    //delete customer
    const [deleteModal, setDeleteModal] = useState(false);

    // suspend user modal
    const [suspendModal, setSuspendModal] = useState(false);
  
    // activate user's account
    const [activateModal, setActivateModal] = useState(false);
  
    // user details
    const [userDetailModal, setUserDetailModal] = useState(false);
  
    // transaction modal 
    const [transactionModal, setTransactionModal] = useState(false);
    const [verifyTokenModal, setVerifyTokenModal] = useState(false);
    const [fundWalletModal, setFundWalletModal] = useState(false);
    const [withdrawWalletModal, setWithdrawWalletModal] = useState(false);



    



    const dispatch = useDispatch();
    const [contact, setContact] = useState();
    const [id, setId] = useState("")

    const loggedInUser = JSON.parse(localStorage.getItem("profile"))
    let admin_name = loggedInUser.data.email;

    const [totalStaffs, setTotalStaffs] = useState("");
    const [activeStaffs, setActiveStaffs] = useState("");
    const [suspendedStaffs, setSuspendedStaffs] = useState("");
    const [staffOnLeave, setStaffOnLeave] = useState("");
    const [tokenVerification, setTokenVerification] = useState(false)
    const [activityToken, setActivityToken] = useState("")
    const [amount, setAmount] = useState("")
    const [walletBalance, setWalletBalance] = useState(0)
    const [isWithdrawing, setIsWithdrawing] = useState("no")
    const [isFunding, setIsFunding] = useState("no")
    const [staffs, setStaffs] = useState([])
    const [admins, setAdmins] = useState()
    const [image, setImage] = useState("")
    const [isMenu, setIsMenu] = useState("")
    const [personalInfor, setPersonalInfor] = useState(false)
    const [referenceInfo, setReferenceInfo] = useState(false)
    const [employmentInfo, setEmploymentInfo] = useState(false)
    const [messageTitle, setMessageTitle] = useState("")
    const [messageDetails, setMessageDetails] = useState("")
    const [messageType, setMessageType] = useState("")
    const [successModal, setSuccessModal] = useState(false);
   


    const loadStaffs = () => {
      axiosApi.get(`${API_URL}/` + 'api/v1/staff/all-staffs').then((res) => {
        setStaffs(res.data.data)
      }).catch((errors) => {
       
      })
    }

    const loadStaffUsers = () => {
      axiosApi.get(`${API_URL}/` + 'api/v1/staff/staff-users').then((res) => {
        setAdmins(res.data)
      }).catch((errors) => {
      
      })
    }


    useEffect(() => {
      // dispatch(onGetReports())
        axiosApi.get(`${API_URL}/` + 'api/v1/staff/staff-report').then((res) => {
          setTotalStaffs(res.data.totalStaffs); 
          setActiveStaffs(res.data.activeStaff)
          setSuspendedStaffs(res.data.suspendedStaff);
          setStaffOnLeave(res.data.staffOnLeave)
      }).catch((errors) => {
  
      })

      loadStaffs()
      loadStaffUsers()
    
  }, [ ]);


  const togglePersonalInfo = () => {
    setPersonalInfor(!personalInfor);
  }

  const toggleReferenceInfo = () => {
    setReferenceInfo(!referenceInfo);
  }

  const toggleEmploymentInfo = () => {
    setEmploymentInfo(!employmentInfo);
  }
  

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      first_name: (contact && contact.first_name) || '',
      last_name: (contact && contact.last_name) || '',
      phone_number: (contact && contact.phone_number) || '',
      employment_date: (contact && contact.employment_date) || '',
      nationality: (contact && contact.nationality) || '',
      address: (contact && contact.address) || '',
      reference_email: (contact && contact.reference_email) || '',
      reference_name: (contact && contact.reference_name) || '',
      reference_phone_number: (contact && contact.reference_phone_number) || '',
      email: (contact && contact.email) || '',
      job_title: (contact && contact.job_title) || '',
      gender: (contact && contact.gender) || '',
      title: (contact && contact.title) || '',
      date_of_birth: (contact && contact.date_of_birth) || '',
      user_id: (contact && contact.user_id) || '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("Please enter first name"),
      last_name: Yup.string().required("Last name can not be empty"),
      employment_date: Yup.string().required("Please enter employment date"),
      phone_number: Yup.string().required("Please enter phone number"),
      nationality: Yup.string().required("Please enter country"),
      address: Yup.string().required("Please address can not be empty"),
      email: Yup.string().required("Please Enter Your Email"),
      reference_email: Yup.string().required("Please Enter reference Email"),
      reference_phone_number: Yup.string().required("Please Enter reference phone number"),
      reference_name: Yup.string().required("Please Enter reference name"),
      title: Yup.string().required("Please select a valid title"),
      job_title: Yup.string().required("Please Enter a valid job title"),
      gender: Yup.string().required("Please select a valid gender"),
      date_of_birth: Yup.string().required("Please enter date of birth"),
      // user_id: Yup.string().required("Please select and assign a user ID"),


    }),
    onSubmit: (values) => {
      if (isEdit) {
         const staffData = {
             first_name: values.first_name,
             last_name: values.last_name,
             id: contact.id,
             email: values.email,
             phone_number: values.phone_number,
             nationality: values.nationality,
             address: values.address,
             gender: values.gender,
             title: values.title,
             job_title: values.job_title,
             reference_email: values.reference_email,
             reference_phone_number: values.reference_phone_number,
             reference_name: values.reference_name,
             employment_date: values.employment_date,
             date_of_birth: values.date_of_birth,
             user_id: values.user_id
         }
     

        // update user
          axiosApi.put(`${API_URL}/` + 'api/v1/staff/update', staffData).then((res) => {
            toast("Staff profile has been updated successfully")
            setLoading(false)
            toggle();
            loadStaffs()
        }).catch((error) => {
        
          setLoading(false)
          toggle();
        })
      
       
        validation.resetForm();
        setIsEdit(false);
      } else {
        setLoading(true)
         const formData = new FormData();
         formData.append("first_name", values["first_name"])
         formData.append("last_name", values["last_name"])
         formData.append("email", values["email"])
         formData.append("phone_number", values["phone_number"])
         formData.append("nationality", values["nationality"])
         formData.append("address", values["address"])
         formData.append("gender", values["gender"])
         formData.append("title", values["title"])
         formData.append("job_title", values["job_title"])
         formData.append("reference_email", values["reference_email"])
         formData.append("reference_phone_number", values["reference_phone_number"])
         formData.append("reference_name", values["reference_name"])
         formData.append("imageURL", image)
         formData.append("user_id", values["user_id"])
         formData.append("employment_date", values["employment_date"])
         formData.append("date_of_birth", values["date_of_birth"])

        // save new staff
        axiosApi.post(`${API_URL}/` + 'api/v1/staff/create', formData).then((res) => {
            setMessageType("Success")
            setMessageTitle("Staff Created");
            setMessageDetails("Staff profile has been created successfully")
            setLoading(false);
            setSuccessModal(true)
            toggle();
            loadStaffs()
        }).catch((error) => {
            setMessageType("Error")
            setMessageTitle("Staff Creation Failed");
            setMessageDetails(error.response.data.message)
            setLoading(false)
          toggle();
        })
      }
    
    },
  });

 



const [loading, setLoading] = useState(false);

  
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);


  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: staffs.length, // replace later with size(users),
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
                {user.firstName.charAt(0) + user.lastName.charAt(0)}
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
              {user.firstName + " " + user.lastName} 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      dataField: "email",
      text: "Email",
      sort: true,
    },

    {
      dataField: "phone_number",
      text: "Phone Number",
      sort: true,
    },

    {
      dataField: "job_title",
      text: "Position",
      sort: true,
    },

    // {
    //   dataField: "Wallet Balance",
    //   text: "balance",
    //   sort: true,

    //    // eslint-disable-next-line react/display-name
    //    formatter: (cellContent, user) => (
    //     <>
    //       <h5 className="font-size-14 mb-1">
    //       <NumberFormat
    //         value={user["Wallet"][naira_balance]}
    //         className="foo"
    //         displayType={'text'}
    //         thousandSeparator={true}
    //         renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
    //         /> 
    //       </h5>
        
    //     </>
    //   ),
    // },

    {
      dataField: "Status",
      text: "status",
      sort: true,

       // eslint-disable-next-line react/display-name
       formatter: (cellContent, user) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {user.employment_status } 
            </Link>
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
     
      <>
         { loggedInUser.data.role === 4  && (
                    <div className="text-success" onClick={(e) => fundWalletClick(user)}>
                    Pay salary 
                  </div>
         )}
      </>


      )}
  ];



  const toggle = () => {
    setModal(!modal);
  };

  const verifyModalToggle = () => {
    setVerifyTokenModal(!verifyTokenModal)
  }

  const withdrawToggle = () => {
    setWithdrawWalletModal(!withdrawWalletModal); 
  }

  const fundWalletToggle = () => {
     setFundWalletModal(!fundWalletModal)
  }


  const verifyCode = async () => {
    setLoading(true);

     const data = {
       activity_token: activityToken
     }

     await axiosApi.post(`${API_URL}/` + 'api/v1/admin/verify-activity-token', data).then((res) => {
          toast("Token verified")
          setActivityToken(true)
          setVerifyTokenModal(false)
          setLoading(false)

          if(isWithdrawing == "yes"){
            setWithdrawWalletModal(true)
          }else if(isFunding == "yes"){
            setFundWalletModal(true)
          }
     
    }).catch((error) => {

     setLoading(false)
    })
  }

  const handleDeleteUser = async () => {
      await axiosApi.delete(`${API_URL}/` + 'api/v1/staff/delete/' + contact.id).then(() => {
        toast("Staff was deleted successfully")
        onPaginationPageChange(1);
        setDeleteModal(false);
        loadStaffs();
      }).catch((error) => {
          toast("oops something went wrong", error)
          onPaginationPageChange(1);
          setDeleteModal(false);
      })
  
  };




  const handleUserClick = arg => {
    const user = arg;

    setContact({
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      phone_number: user.phone_number,
      nationality: user.nationality,
      address: user.address,
      gender: user.gender,
      title: user.title,
      job_title: user.job_title,
      reference_email: user.reference_email,
      reference_phone_number: user.reference_phone_number,
      reference_name: user.reference_name,
      employment_date: user.employment_date,
      date_of_birth: user.date_of_birth,
      user_id: user.user_id
    });
    setIsEdit(true);

    toggle();
  };

  const handleStaffCreation = () => {
    setLoading(false)
      setModal(true)
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



  const onClickDelete = (users) => {
    setContact(users);
    setDeleteModal(true);
  };

  const onSuspendClick = (user) => {
    setId(user.id);
    setSuspendModal(true);
  }

  const onActivateClick = (user) => {
    setId(user.id);
    setActivateModal(true);
  }

  const handleActivateAccount = () => {
      setLoading(true);
    axiosApi.put(`${API_URL}/api/v1/users/activate/${id}`).then((res) => {
        setLoading(false);
        toast("User has been activated successfully")
    }).catch((error) => {
        setLoading(false);
        toast("oops, something went wrong", error.data);
    })
    setActivateModal(false);
  }

  const handleSuspendUser = () => {
    setLoading(true);
    axiosApi.put(`${API_URL}/api/v1/users/suspend-account/${id}`).then((res) => {
      setLoading(false);
      toast("User has been suspended successfully")
    }).catch((error) => {
      setLoading(false);
      toast("oops, something went wrong", error.message);
    })
    setSuspendModal(false);
  };



  const userDetails = (user) => {
    // get user details from the backend 
    axiosApi.get(`${API_URL}/api/v1/users/profile/${user.user_id}`).then((response) => {
      setWalletBalance(response.data.data.Wallet.naira_balance)
  }).catch((error) => {
    console.log(error.message)
  })

    setUserDetail(user);
    setUserDetailModal(true);
  }

  const userTransactions = async (user) => {
    setUserName(user.firstName + ' ' + user.lastName);

     await axiosApi.get(`${API_URL}/api/v1/users/transactions/${user.user_id}`).then((response) => {
        setTransactions(response.data.transactions);
     }).catch((err) => {

     })
    setTransactionModal(true)
  }


  const removeWalletClick = async (id) => {
    try {
      await axiosApi.get(`${API_URL}/api/v1/users/wallet/${id}`).then((response) => {
          setWalletBalance(response.data.data.naira_balance)
      }).catch((error) => {});
     } catch (error) {
      console.log("oops something went wrong", error);
     }

     if(tokenVerification == true){
      setId(id)
      setWithdrawWalletModal(true);
    }else{
      setId(id)
      setIsWithdrawing("yes")
      setVerifyTokenModal(true)
    }
    
  }

   const removeWallet = (id) => {
        const wallet_data = {
          id: id,
          amount: amount
      }
      setLoading(true);
      axiosApi.put(`${API_URL}/api/v1/users/remove-cash`, wallet_data).then(() => {
        toast("Your withdrawal was made successfully");
        setLoading(false);
        setWithdrawWalletModal(false);
      }).catch(() => {
        setLoading(false);
        toast("oops, something went wrong. Please try again later.");
      });
   }

   const fundWalletClick = async (user) => {
       try {
        axiosApi.get(`${API_URL}/api/v1/users/wallet/${user.user_id}`).then((response) => {
            setWalletBalance(response.data.data.naira_balance)
        }).catch((error) => {});
       } catch (error) {
        console.log("oops something went wrong", error);
       }

      
    if(tokenVerification == true){
      setId(user.id)
      setFundWalletModal(true);
    }else{
      setId(user.id)
      setIsFunding("yes");
      setVerifyTokenModal(true)
    }
  
   }

   const fundWallet = () => {
       const wallet_data = {
           id: id,
           amount: amount
       }
       setLoading(true);
       axiosApi.post(`${API_URL}/api/v1/staff/pay-salary`, wallet_data).then((response) => {
          setMessageType("Success")
          setMessageTitle("Salary Paid");
          setMessageDetails("Salary has been paid successfully")
          setLoading(false);
          setSuccessModal(true)
          setFundWalletModal(false);
          setTokenVerification(false)
       }).catch((error) => {
        setTokenVerification(false)
        setMessageType("Error")
        setMessageTitle("Salary Payment Failed");
        setMessageDetails(error.response.data.message)
        setSuccessModal(true)
        setLoading(false);

       });
   }

   const handleChange = (code) => {
    setActivityToken(code)
}




  const keyField = "id";

  return (
    <React.Fragment>
       {/* include all the popup modals */}
      <SuspendUserModel
        show={suspendModal}
        onSuspendClick={handleSuspendUser}
        onCloseClick={() => setSuspendModal(false)}
        loading={loading}
      />

      <ActivateUserModal
        show={activateModal}
        onActivateClick={handleActivateAccount}
        onCloseClick={() => setActivateModal(false)}
        loading={loading}
      />

      <StaffDetailsModal
        show={userDetailModal}
        userDetail={userDetail}
        walletBalance={walletBalance}
        onCloseClick={() => setUserDetailModal(false)}
      />

      <TransactionModal
        show={transactionModal}
        userName={userName}
        onCloseClick={() => setTransactionModal(false)}
        transactions={transactions}
      />


      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
        loading={loading}
      />

    <SuccessModals 
         title={messageTitle} 
         details={messageDetails}
         show={successModal} 
         messageType={messageType}
         onCloseClick={() => setSuccessModal(false)}
         />


    




      <div className="page-content">
        <MetaTags>
          <title>Staff profile | FlipEx admin dashboard</title>
        </MetaTags>
        <Container fluid>
          <Row>
            <Col lg={12}>
               <Row>
                {/* Reports Render */}
                 <ReportCard reportTitle={"Total staffs"} reportDes={totalStaffs} icon={TotalStaffIcon} />
                 <ReportCard reportTitle={"Active staffs"} reportDes={activeStaffs} icon={ActiveStaffIcon} />
                 <ReportCard reportTitle={"Suspended staffs"} reportDes={suspendedStaffs} icon={SuspendedIcon} />
                 <ReportCard reportTitle={"Staffs on leave"} reportDes={staffOnLeave} icon={StaffsOnLeaveIcon} />
                
               </Row>
            </Col>

            <Col>
            <Modal isOpen={verifyTokenModal} toggle={verifyModalToggle}>
                    <ModalHeader toggle={verifyModalToggle} tag="h4">
                        Verify token
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          verifyCode();
                          return false;
                        }}
                      >
                        <Row form>
                        <Card style={{ borderRadius: "16px", border:" 2px solid #E7E9EB"}}>
                          <CardBody>
                           
                
                           <Row>
                        
                             <Col xs={12}>
                               <FormGroup className="verification-2 mb-3">
                                 <AuthCode
                                   characters={4}
                              
                                   className="form-control form-control-lg text-center"
                                   inputStyle={{
                                     width: "50px",
                                     height: "calc(1.5em + 1rem + 2px)",
                                     padding: ".5rem 1rem",
                                     borderRadius: "8px",
                                     fontSize: "1.01562rem",
                                     textAlign: "center",
                                     marginRight: "15px",
                                     border: "1px solid #ced4da",
                                     textTransform: "uppercase",
                                     borderRadius: ".4rem"
                                   }}
                                   onChange={handleChange}
                                 />
                               </FormGroup>

                             </Col>
                           </Row>
                           <Row style={{ marginTop: "30px"}}>
                             <Col md={6}>
                               <button  style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  padding: "21px 20px",
                                  gap: "10px",
                                  width: "100%",
                                  height: "40px",
                                  color: '#000',
                                  backgroundColor:"#fff",
                                  borderRadius: "8px",
                                  border: "1px solid gray"
                               }} onClick={verifyModalToggle}>Back</button>
                             </Col>
                             <Col md={6}>
                             <button type="submit"  style={{
                               display: "flex",
                               flexDirection: "row",
                               justifyContent: "center",
                               alignItems: "center",
                               padding: "21px 20px",
                               gap: "10px",
                               width: "100%",
                               height: "40px",
                               color: '#fff',
                               backgroundColor:"#000000",
                               borderRadius: "8px",
                               border: "none"
                             }}>   
                             { !loading && 'Verify Token'}
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
                             }</button>
                             </Col>
                           </Row>

                 </CardBody>
               </Card>
              
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>

              </Col>


              <Col>
                   <Modal isOpen={ fundWalletModal } toggle={fundWalletToggle}>
                    <ModalHeader toggle={fundWalletToggle} tag="h4">

                     Fund wallet

                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          fundWallet()
                          return false;
                        }}
                      >
                        <Row form>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">Amount</Label>
                              <Input
                                name="amount"
                                type="text"
                                onChange={(e) => setAmount(e.target.value)}
                              />
                              <span>Current balance: { walletBalance }</span>
                            </div>

                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="submit"
                                className="btn btn-primary"
                              >
                              
                                        { loading ?  (
                                          <>
                                          <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                          />

                                         Crediting...

                                      
                                          </>
                                        ) :
                                        ( "Credit Now"   )
                                    }
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
              </Col>


              <Col>
                   <Modal isOpen={ withdrawWalletModal } toggle={withdrawToggle}>
                    <ModalHeader toggle={withdrawToggle} tag="h4">

                     Withdraw

                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                         removeWallet() 
                          return false;
                        }}
                      >
                        <Row form>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">Amount</Label>
                              <Input
                                name="amount"
                                type="text"
                                onChange={(e) => setAmount(e.target.value)}
                              />
                              <span>Current balance: { walletBalance }</span>
                            </div>

                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="submit"
                                className="btn btn-primary"
                              >
                              
                                        { loading ?  (
                                          <>
                                          <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                          />

                                         Withdrawing...

                                      
                                          </>
                                        ) :
                                        ( "Withdraw now"   )
                                    }
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
              </Col>
              
         

            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField={keyField}
                    columns={contactListColumns}
                    data={staffs}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={staffs}
                          columns={contactListColumns}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col sm="4" style={{ paddingTop: "10px", fontFamily: "Euclid Circular A"}}>
                                  STAFFS
                                </Col>
                                <Col sm="8">
                                  <div className="text-sm-end">
                                    <Row>
                                      <Col md="6">
                                      <div className="search-box ms-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar {...toolkitProps.searchProps} />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                  </div>
                                      </Col>
                                      <Col md="6">
                                      <Button
                                      color="default"
                                      className="font-16 btn-block btn btn-default"
                                      onClick={handleStaffCreation}
                                      style={{
                                        border: "1px solid gray",
                                        marginRight: "10px",
                                      }}

                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      Create new staff profile
                                    </Button>
                                      </Col>
                                    </Row>
                                   
                                  </div>
                                </Col>
                              </Row>
                              <Row>
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

                                    <Modal isOpen={modal} toggle={toggle} size="lg">
                                      <ModalHeader toggle={toggle} tag="h4">
                                        New Staff Profile
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
                                            <div style={{ marginBottom: "5px"}}>
                                                <span>
                                                 <img src={personalInfoIcon} alt="" />
                                                </span>
                                                <span style={{ paddingLeft: "5px", fontSize: "18px", paddingTop:'10px'}}>Personal Information</span>
                                                <span style={{ float: "right"}} onClick={togglePersonalInfo}>
                                                  <img src={personalInfor ? upIcon : downIcon} alt="" />
                                                </span>
                                              </div>

                                           { personalInfor ? (
                                             <>
                                               <div style={{ border: "1px solid #E5E5E5", borderRadius: "8px", marginTop: "20px"}} className="p-2">
                                               <Row>
                                              <Col sm="6">
                                              <div className="mb-3">
                                                <Label className="form-label">Title</Label>
                                                  <select className="form-control" name="title"   onChange={validation.handleChange}  invalid={
                                                      validation.touched.title && validation.errors.title ? true : false
                                                    }>
                                                    <option value="" className=" ">Select title</option>
                                                    <option value="mr">Mr</option>
                                                    <option value="mrs">Mrs</option>
                                                    <option value="miss">Miss</option>
                                                  </select>

                                                  {validation.touched.title && validation.errors.title ? (
                                                    <FormFeedback type="invalid">{validation.errors.title}</FormFeedback>
                                                  ) : null}
                                                 </div>
                                              </Col>

                                              <Col sm="6">
                                              <div className="mb-3">
                                                <Label className="form-label">Gender</Label>
                                                  <select className="form-control" name="gender"  onChange={validation.handleChange}  invalid={
                                                      validation.touched.gender && validation.errors.gender ? true : false
                                                    }>
                                                    <option value="" className=" ">Select gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                  </select>
                                                  {validation.touched.gender && validation.errors.gender ? (
                                                    <FormFeedback type="invalid">{validation.errors.gender}</FormFeedback>
                                                  ) : null}
                                                 </div>
                                              </Col>
                                             </Row>


                                             <Row>
                                                <Col sm="6">
                                                  <div className="mb-3">
                                                  <Label className="form-label">First name</Label>
                                                  <Input
                                                    name="first_name"
                                                    type="text"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.first_name || ""}
                                                    invalid={
                                                      validation.touched.first_name && validation.errors.first_name ? true : false
                                                    }
                                                  />
                                                  {validation.touched.first_name && validation.errors.first_name ? (
                                                    <FormFeedback type="invalid">{validation.errors.first_name}</FormFeedback>
                                                  ) : null}
                                                  </div>
                                                </Col>

                                                <Col sm="6">
                                                  <div className="mb-3">
                                                  <Label className="form-label">Last name</Label>
                                                  <Input
                                                    name="last_name"
                                                    type="text"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.last_name || ""}
                                                    invalid={
                                                      validation.touched.last_name && validation.errors.last_name ? true : false
                                                    }
                                                  />
                                                  {validation.touched.last_name && validation.errors.last_name ? (
                                                    <FormFeedback type="invalid">{validation.errors.last_name}</FormFeedback>
                                                  ) : null}
                                                  </div>
                                                </Col>
                                              </Row>

                                              <Row>
                                              <Col sm="6">
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
                                              </Col>

                                              <Col sm="6">
                                              <div className="mb-3">
                                                <Label className="form-label">Phone number</Label>
                                                <Input
                                                  name="phone_number"
                                                  label="Phone number"
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
                                              <div className="mb-3">
                                                <Label className="form-label">Nationality</Label>
                                                <Input
                                                  name="nationality"
                                                  label="Country"
                                                  type="text"
                                                  onChange={validation.handleChange}
                                                  onBlur={validation.handleBlur}
                                                  value={validation.values.nationality || ""}
                                                  invalid={
                                                    validation.touched.nationality && validation.errors.nationality ? true : false
                                                  }
                                                />
                                                {validation.touched.nationality && validation.errors.nationality ? (
                                                  <FormFeedback type="invalid">{validation.errors.nationality}</FormFeedback>
                                                ) : null}
                                              </div>
                                              </Col>
                                              <Col>
                                              <div className="mb-3">
                                                <Label className="form-label">Home Address</Label>
                                                <Input
                                                  name="address"
                                                  label="Home address"
                                                  type="text"
                                                  onChange={validation.handleChange}
                                                  onBlur={validation.handleBlur}
                                                  value={validation.values.address || ""}
                                                  invalid={
                                                    validation.touched.address && validation.errors.address ? true : false
                                                  }
                                                />
                                                {validation.touched.address && validation.errors.address ? (
                                                  <FormFeedback type="invalid">{validation.errors.address}</FormFeedback>
                                                ) : null}
                                              </div>
                                              </Col>
                                             </Row>
                                           
                                               </div>
                                             </>
                                           ) : null}
                                            

                                            
                                            <div style={{ marginBottom: "5px", marginTop: "10px"}}>
                                                <span>
                                                 <img src={personalInfoIcon} alt="" />
                                                </span>
                                                <span style={{ paddingLeft: "5px", fontSize: "18px", paddingTop:'10px'}}>Reference Information</span>
                                                <span style={{ float: "right"}} onClick={toggleReferenceInfo}>
                                                  <img src={personalInfor ? upIcon : downIcon} alt="" />
                                                </span>
                                              </div>

                                                  {referenceInfo ? (
                                                  <>
                                                    <div style={{ border: "1px solid #E5E5E5", borderRadius: "8px", marginTop: "20px"}} className="p-2">
                                                    <Row>
                                                <Col sm="4">
                                                  <div className="mb-3">
                                                  <Label className="form-label">Reference Name</Label>
                                                  <Input
                                                    name="reference_name"
                                                    label="Country"
                                                    type="text"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.reference_name || ""}
                                                    invalid={
                                                      validation.touched.reference_name && validation.errors.reference_name ? true : false
                                                    }
                                                  />
                                                  {validation.touched.reference_name && validation.errors.reference_name ? (
                                                    <FormFeedback type="invalid">{validation.errors.reference_name}</FormFeedback>
                                                  ) : null}
                                                  </div>
                                                </Col>

                                                <Col sm="4">
                                                  <div className="mb-3">
                                                  <Label className="form-label">Reference Email</Label>
                                                  <Input
                                                    name="reference_email"
                                                    label="Reference Email"
                                                    type="text"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.reference_email || ""}
                                                    invalid={
                                                      validation.touched.reference_email && validation.errors.reference_email ? true : false
                                                    }
                                                  />
                                                  {validation.touched.reference_email && validation.errors.reference_email ? (
                                                    <FormFeedback type="invalid">{validation.errors.reference_email}</FormFeedback>
                                                  ) : null}
                                                  </div>
                                                </Col>

                                                <Col sm="4">
                                                  <div className="mb-3">
                                                  <Label className="form-label">Reference Phone number</Label>
                                                  <Input
                                                    name="reference_phone_number"
                                                    label="Reference Phone Number"
                                                    type="text"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.reference_phone_number || ""}
                                                    invalid={
                                                      validation.touched.reference_phone_number && validation.errors.reference_phone_number ? true : false
                                                    }
                                                  />
                                                  {validation.touched.reference_phone_number && validation.errors.reference_phone_number ? (
                                                    <FormFeedback type="invalid">{validation.errors.reference_phone_number}</FormFeedback>
                                                  ) : null}
                                                  </div>
                                                </Col>
                                              </Row>
                                                    </div>
                                                  </>
                                                  ) : null}
 
                                             


                                                <div style={{ marginBottom: "5px", marginTop: "10px"}}>
                                                <span>
                                                 <img src={personalInfoIcon} alt="" />
                                                </span>
                                                <span style={{ paddingLeft: "5px", fontSize: "18px", paddingTop:'10px'}}>Job Details</span>
                                                <span style={{ float: "right"}} onClick={toggleEmploymentInfo}>
                                                  <img src={personalInfor ? upIcon : downIcon} alt="" />
                                                </span>
                                              </div>

                                              { employmentInfo ? (
                                              <>
                                                <div style={{ border: "1px solid #E5E5E5", borderRadius: "8px", marginTop: "20px"}} className="p-2">
                                                <Row>
                                                <Col sm="4">
                                                  <div className="mb-3">
                                                  <Label className="form-label">Job Title/Position</Label>
                                                  <Input
                                                    name="job_title"
                                                    label="Job title"
                                                    type="text"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.job_title || ""}
                                                    invalid={
                                                      validation.touched.job_title && validation.errors.job_title ? true : false
                                                    }
                                                  />
                                                  {validation.touched.job_title && validation.errors.job_title ? (
                                                    <FormFeedback type="invalid">{validation.errors.job_title}</FormFeedback>
                                                  ) : null}
                                                  </div>
                                                </Col>

                                                <Col sm="4">
                                                  <div className="mb-3">
                                                  <Label className="form-label">Employment Date</Label>
                                                  <Input
                                                    name="employment_date"
                                                    label="Employment date"
                                                    type="date"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.employment_date || ""}
                                                    invalid={
                                                      validation.touched.employment_date && validation.errors.employment_date ? true : false
                                                    }
                                                  />
                                                  {validation.touched.employment_date && validation.errors.employment_date ? (
                                                    <FormFeedback type="invalid">{validation.errors.employment_date}</FormFeedback>
                                                  ) : null}
                                                  </div>
                                                </Col>

                                                <Col sm="4">
                                                  <div className="mb-3">
                                                  <Label className="form-label">Date of Birth</Label>
                                                  <Input
                                                    name="date_of_birth"
                                                    label="Date of Birth"
                                                    type="date"
                                                    onChange={validation.handleChange}
                                                    onBlur={validation.handleBlur}
                                                    value={validation.values.date_of_birth || ""}
                                                    invalid={
                                                      validation.touched.date_of_birth && validation.errors.date_of_birth ? true : false
                                                    }
                                                  />
                                                  {validation.touched.date_of_birth && validation.errors.date_of_birth ? (
                                                    <FormFeedback type="invalid">{validation.errors.date_of_birth}</FormFeedback>
                                                  ) : null}
                                                  </div>
                                                </Col>
                                              </Row>

                                              <Row>
                                                <Col sm="6">
                                                  <div className="mb-3">
                                                    <Label className="form-label">Assign user account to profile</Label>
                                                
                                                    <select className="form-control"   onChange={validation.handleChange} name="user_id"  invalid={
                                                      validation.touched.user_id && validation.errors.user_id ? true : false
                                                    }>
                                                    <option value="" className="">Select user account</option>

                                                    { admins?.map((admin) => (
                                                      <>
                                                      <option value={admin.id}>{admin.name}({admin.email})</option>
                                                      
                                                    </>
                                                    ))}
                                                   
                                                  
                                                  </select>
                                                  {validation.touched.user_id && validation.errors.user_id ? (
                                                    <FormFeedback type="invalid">{validation.errors.user_id}</FormFeedback>
                                                  ) : null}
                                                    </div>
                                                </Col>

                                                <Col sm="6">
                                                  <div className="mb-3">
                                                    <Label className="form-label">Upload Image</Label>
                                                    <Input
                                                      name="imageURL"
                                                      label="Image"
                                                      type="file"
                                                      onChange={(e) => setImage(e.target.files[0])}
                                                    />
                                                    </div>
                                                </Col>
                                              </Row>
                                                </div>
                                              </>
                                              ) : null}

                                              
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <div className="text-end">
                                                <button
                                                  type="submit"
                                                  className="btn btn-primary"
                                                >
                                                 
                                                  { !loading && "Add staff" }
                                                
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

export default withRouter(ContactsList);