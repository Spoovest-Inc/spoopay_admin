import React, { useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types'
import AuthCode from "react-auth-code-input"
import { ToastContainer, toast } from 'react-toastify';
import { withRouter, Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner,
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
  FormGroup,
  Form,
} from "reactstrap"

import * as Yup from "yup";
import { useFormik } from "formik";

import axios from "axios";
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

// import all components here
import SuccessModals from "./successModal";
import SuspendUserModel  from "components/Common/SuspendUser";
import ActivateUserModal from "components/Common/ActivateUserModal";
import UserDetailsModal from "components/Common/UserDetailsModal";
import TransactionModal from "components/Common/TransactionModal";



const UsersDropdown = ({ user, loadUsers, menuType}) => {
    
        const [suspendModal, setSuspendModal] = useState(false);
        const [userDetail, setUserDetail] = useState([])
        const [transactions, setTransactions] = useState([])
        const [activateModal, setActivateModal] = useState(false);
        const [userDetailModal, setUserDetailModal] = useState(false);
        const [transactionModal, setTransactionModal] = useState(false);
        const [verifyTokenModal, setVerifyTokenModal] = useState(false);
        const [fundWalletModal, setFundWalletModal] = useState(false);
        const [withdrawWalletModal, setWithdrawWalletModal] = useState(false);
        const [bulkSuspendModal, setBulkSuspendModal] = useState(false)
        const [deleteModal, setDeleteModal] = useState(false);
        const [loading, setLoading] = useState(false);
        const [amount, setAmount] = useState("")
        const [walletBalance, setWalletBalance] = useState(0)
        const [usdtBalance, setUsdtBalance] = useState(0)
        const [refBonus, setRefBonus] = useState(0)
        const [isWithdrawing, setIsWithdrawing] = useState("no")
        const [isFunding, setIsFunding] = useState("no")
        const [errorMessage, setErrorMessage] = useState("")
        const [userName, setUserName] = useState("")
        const [isMenu, setIsMenu] = useState("")
        const [messageTitle, setMessageTitle] = useState("")
        const [messageDetails, setMessageDetails] = useState("")
        const [messageType, setMessageType] = useState("")
        const [successModal, setSuccessModal] = useState(false);
        const [tokenVerification, setTokenVerification] = useState(true)
        const [activityToken, setActivityToken] = useState("")

        const loggedInUser = JSON.parse(localStorage.getItem("profile"))
        let admin_name = loggedInUser.data.email;
        const [id, setId] = useState("")


        // Functions
          // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: '',
      country: '',
      phone_number: '',
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

  const makeStaff =  (id) => {
    setLoading(true);
     axiosApi.put(`${API_URL}/` + 'api/v1/users/make-staff/' + id).then((res) => {
          setMessageType("Success")
          setMessageTitle("User made staff");
          setMessageDetails("You have succesfully made a spoopay user as staff.")
          setSuccessModal(true);
          loadUsers()
         setLoading(false)
}).catch((error) => {
      setLoading(false);
      setMessageType("Error")
      setMessageTitle("Made Staff Failed");
      setMessageDetails(error.response.data.message)
      setSuccessModal(true);
})
  }


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

 const bulkSuspendToggle = () => {
     setBulkSuspendModal(!bulkSuspendModal)
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
     toast(error.response.data.message)
     setLoading(false)
    })
  }

  const handleUserClick = arg => {
    const user = arg;

    setContact({
      id: user.id,
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      country: user.country,
    });
    setIsEdit(true);

    toggle();
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
          setMessageType("Success")
          setMessageTitle("Activate Account");
          setMessageDetails("You have succesfully activated a spoopay user account.")
          setActivateModal(false);
          setSuccessModal(true);
    }).catch((error) => {
        setLoading(false);
        setMessageType("Error")
        setMessageTitle("Activate Account Failed");
        setMessageDetails(error.response.data.message)
        setActivateModal(false);
        setSuccessModal(true);
    })
    setActivateModal(false);
  }

  const handleSuspendUser = () => {
    setLoading(true);
    axiosApi.put(`${API_URL}/api/v1/users/suspend-account/${id}`).then((res) => {
          setLoading(false);
          setMessageType("Success")
          setMessageTitle("Suspend Account");
          setMessageDetails("You have succesfully suspended a Spoopay User.")
          setSuspendModal(false);
          setSuccessModal(true);
    }).catch((error) => {
         setLoading(false);
         setMessageType("Error")
         setMessageTitle("Suspend Account Failed");
         setMessageDetails(error.response.data.message)
         setSuspendModal(false);
         setSuccessModal(true);
    })
    setSuspendModal(false);
  };



  const userDetails = (user) => {
    // get user details from the backend 
    axiosApi.get(`${API_URL}/api/v1/users/profile/${user.id}`).then((response) => {
      setWalletBalance(response.data.data.Wallet.balance)
      setUsdtBalance(response.data.data.Wallet.usdt_balance)
      setRefBonus(response.data.data.Wallet.referral_bonus)
  }).catch((error) => {
    console.log(error.message)
  })

    setUserDetail(user);
    setUserDetailModal(true);
  }

  const userTransactions = async (user) => {
    setUserName(user.name);

     await axiosApi.get(`${API_URL}/api/v1/users/transactions/${user.id}`).then((response) => {
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

   const removeWallet = () => {
        const data = {
          id: id,
          amount: amount
      }
      setLoading(true);
      axiosApi.put(`${API_URL}/api/v1/users/remove-cash`, data).then((response) => {
        setLoading(false);
        setWithdrawWalletModal(false);
        setMessageType("Success")
        setMessageTitle("Withdraw");
        setMessageDetails("You have succesfully withdrawn from a Spoopway Wallet.")
        setSuccessModal(true);
      }).catch((error) => {
        setLoading(false);
        setWithdrawWalletModal(false);
        setMessageType("Error")
        setMessageTitle("Withdraw Failed");
        setMessageDetails(error.response.data.message)
        setSuccessModal(true);
      });
   }

   const fundWalletClick = async (user) => {
       try {
            axiosApi.get(`${API_URL}/api/v1/users/wallet/${user.id}`).then((response) => {
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
       axiosApi.put(`${API_URL}/api/v1/users/fund-wallet`, wallet_data).then((response) => {
          setLoading(false);
          setFundWalletModal(false);
          setMessageType("Success")
          setMessageTitle("Fund Wallet");
          setMessageDetails("Wow, Spoopay User wallet has been succesfully funded.")
          setSuccessModal(true);
       }).catch((error) => {
         setLoading(false);
         setMessageType("Error")
         setMessageTitle("Fund Wallet Failed");
         setMessageDetails(error.response.data.message)
         setFundWalletModal(false);
         setSuccessModal(true);
       });
   }

   const suspendUsers = () => {
       setLoading(true);
       let createdAt = suspensionDate;
       axiosApi.put(`${API_URL}/api/v1/users/suspend-users`, createdAt).then((res) => {
          toast("Users has been suspended");
          setLoading(false);
          setSuspendModal(false);
       }).catch((error) => {
         setLoading(false);
         toast("oops, something went wrong. Please try again later.", error);
       })
   }

   const handleChange = (code) => {
    setActivityToken(code)
}

   return (
    <React.Fragment>
    {/* include all the popup modals */}
    <SuccessModals 
         title={messageTitle} 
         details={messageDetails}
         show={successModal} 
         messageType={messageType}
         onCloseClick={() => setSuccessModal(false)}
   />

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

   <UserDetailsModal
     show={userDetailModal}
     userDetail={userDetail}
     walletBalance={walletBalance}
     usdtBalance={usdtBalance}
     refBonus={refBonus}
     onCloseClick={() => setUserDetailModal(false)}
   />

   <TransactionModal
     show={transactionModal}
     userName={userName}
     onCloseClick={() => setTransactionModal(false)}
     transactions={transactions}
   />

   {/* Dropdown menu */}

   <Dropdown
        isOpen={isMenu}
         onClick={() => setIsMenu(menuType)}
          toggle={() => setIsMenu("")}
           className="d-inline-block" >
                <DropdownToggle
                  className="font-8 btn-block btn btn-default"
                  id="page-header-user-dropdown"
                  tag="button"
                  style={{
                    border: "1px solid inherit",
                    borderRadius: "100px",
                    width: "40px",
                    height: "40px"
                  }}

                >
                 <i className="mdi mdi-dots-vertical me-3" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem>
                  <div className="text-primary" onClick={() => userDetails(user)}>
                     View Details
                 </div>
                  </DropdownItem>

                  <DropdownItem>
                  { loggedInUser.data.role === 4  || loggedInUser.data.role === 3 ? (
                    <>
                        {user.status === 'ACTIVE' ? (
                        <Link className="text-danger" title="Suspend user" to="#" onClick={() => onSuspendClick(user)}>
                            Suspend User
                        </Link>
                        ) : (
                        <Link className="text-success" to="#"   onClick={() => onActivateClick(user)}>
                            Active Accound
                        </Link>
                        )}
                        </>
                    )  : null }
                
                  </DropdownItem>



                  <DropdownItem>
                     <Link className="text-primary" to="#"   onClick={() => userTransactions(user)}>
                            View Transactions
                    </Link>
                  </DropdownItem>

                  <div className="dropdown-divider"/>
                 
                  <DropdownItem>
                  { loggedInUser.data.role === 4 && (
                        <div className="text-primary" onClick={(e) => fundWalletClick(user)}>
                        Fund Wallet
                    </div>
                   )}
                  </DropdownItem>

                  <DropdownItem>
                  { loggedInUser.data.role === 4 && (
                        <div className="text-primary" onClick={(e) => removeWalletClick(user.id)}>
                        Withdraw from wallet
                    </div>
                    )}
                  </DropdownItem>

                


                
                
                </DropdownMenu>
           </Dropdown>

      {/* Modals */}
      <>
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
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">Activity Token</Label>
                              <Input
                                name="activity_token"
                                type="text"
                                onChange={(e) => setActivityToken(e.target.value)}
                              />
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
                              
                                        { loading ?  (
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
                                        ) :
                                        ( "Verify token" )
                                    }
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>


                    {/* Suspend bulk modal */}
                  <Modal isOpen={ bulkSuspendModal } toggle={bulkSuspendToggle}>
                    <ModalHeader toggle={bulkSuspendToggle} tag="h4">

                     Bulk suspend users by sign up date

                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          suspendUsers()
                          return false;
                        }}
                      >
                        <Row form>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">Signed Up Date</Label>
                              <Input
                                  name="createdAt"
                                  label="Signed up date"
                                  type="date"
                                  onChange={(e) => setSuspensionDate(e.target.value)}
                                />
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
                              
                                        { loading ?  (
                                          <>
                                          <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                          />

                                         Suspending...

                                      
                                          </>
                                        ) :
                                        ( "Suspend now"   )
                                    }
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>

                  {/* Fund wallet modal */}

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
                        <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
      
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
                                        ( "Credit now"   )
                                    }
                              </button>
                            </div>
                          </Col>
                        </Row>
                        </div>
                      </Form>
                    </ModalBody>
                  </Modal>

                {/* Withdraw Modal */}

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
                         <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
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
                        </div>
                      </Form>
                    </ModalBody>
                  </Modal>

                  {/* verification modal */}

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
      </>



 </React.Fragment>
   )

}

UsersDropdown.propTypes = {
    user: PropTypes.any,
    menuType: PropTypes.any,
    loadUsers: PropTypes.any,
  }

export default UsersDropdown;