import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import AuthCode from "react-auth-code-input"
import { ToastContainer, toast } from 'react-toastify';
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
import ApproveModal from "components/Common/ApproveModal";
import ConfirmModal from "components/Common/ConfirmModal";
import DeclineModal from "components/Common/DeclineModal";
import TransactionDetails from "../../components/Common/TransactionDetails"
import transactions from "pages/Transactions/transactions";



const TransactionDropdown = ({ menuType, admin, loadTransactions, transaction}) => {
  // Declare a new state variable, which we'll call "menu"
  const [isMenu, setIsMenu] = useState("")
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const [loading, setLoading] = useState(false)
  const [detailsModal, setDetailsModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [adminDetail, setAdminDetail] = useState([])
  const [isEdit, setIsEdit] = useState(false);
  const [theAdmin, setTheAdmin] = useState(admin);
  const [modal, setModal] = useState(false);
  const [adminType, setAdminType] = useState("")
  const [messageTitle, setMessageTitle] = useState("")
  const [messageDetails, setMessageDetails] = useState("")
  const [messageType, setMessageType] = useState("")
  const [confirmModal, setConfirmModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [blogModal, setBlogModal] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [id, setId] = useState("");
  const [ecode, setEcode] = useState("")
  const [tokenVerification, setTokenVerification] = useState(false)
  const [activityToken, setActivityToken] = useState("")
  const [updateModal, setUpdateModal] = useState(false);
  const [verifyTokenModal, setVerifyTokenModal] = useState(false);
  const [serviceProvider, setServiceProvider] = useState("");
  


// import all functions here
const verifyModalToggle = () => {
    setVerifyTokenModal(!verifyTokenModal)
  }

  const updateModalToggle = () => {
    setUpdateModal(!updateModal);
  }

const verifyCode = async () => {
    setLoading(true);

     const data = {
       activity_token: activityToken
     }

     await axiosApi.post(`${API_URL}/` + 'api/v1/admin/verify-activity-token', data).then((res) => {
          setActivityToken(true)
          setVerifyTokenModal(false)
          setLoading(false)
          setApproveModal(true);
    }).catch((error) => {
     toast(error.response.data.message)
     setLoading(false)
    })
  }


  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = async () => {

    setLoading(true);

    const formData = {
         id: id,
         ecode: ecode
    }
     await axiosApi.put(`${API_URL}/` + 'api/v1/transactions/update', formData).then((res) => {
     window.location.reload(false);  
     toast("E-code updated successfully")
     setLoading(false)
    }).catch((error) => {
     toast(error.message)
     setLoading(false)
    })
}


const blogDetails = (transaction) => {
    setTransactionDetails(transaction)
    setBlogModal(true)
  }

const declineTrans = () => {
      setLoading(true)
      axiosApi.put(`${API_URL}/api/v1/transactions/decline/${id}`).then((res) => {
        setMessageType("Success")
        setMessageTitle("Decline Transaction");
        setMessageDetails("Transaction has been declined successfully")
        setLoading(false)
        setDeclineModal(false);
        setSuccessModal(true)
        loadTransactions()
        setApproveModal(false);
     }).catch((errors) => {
         // return errors
          setLoading(false)
          setMessageType("Error")
          setMessageTitle("Decline Transaction Failed");
          setMessageDetails(errors.response.data.message)
          setDeclineModal(false);
          setSuccessModal(true)
     })
  }


  const handleConfirmClick = () => {
    setLoading(true)
    axiosApi.put(`${API_URL}/api/v1/transactions/confirm/${id}`).then(() => {
      setMessageType("Success")
      setMessageTitle("Confirm Transaction");
      setMessageDetails("Transaction has been confirm successfully")
      setConfirmModal(false);
      setSuccessModal(true)
      setLoading(false)
      loadTransactions()
     }).catch((errors) => {
         // return errors
         setLoading(false)
          setMessageType("Error")
          setMessageTitle("Confirm Transaction Failed");
          setMessageDetails(errors.response.data.message)
          setConfirmModal(false);
          setSuccessModal(true)
     })
  
  };

  const handleApproveClick = () => {
    setLoading(true)
    console.log(transaction.type)
    if(transaction.type === "GIFTCARD" || transaction.type === "CRYPTO") {
      axiosApi.put(`${API_URL}/` + 'api/v1/transactions/approve/' + id).then(() => {
        setMessageType("Success")
        setMessageTitle("Approve Transaction");
        setMessageDetails("Transaction has been approved successfully")
        setApproveModal(false);
        setTokenVerification(false)
        setSuccessModal(true)
        setLoading(false)
        loadTransactions()
        setApproveModal(false);
       }).catch((errors) => {
           // return errors
           setLoading(false)
            setMessageType("Error")
            setMessageTitle("Approve Transaction Failed");
            setMessageDetails(errors.response.data.message)
            setTokenVerification(false)
            setApproveModal(false);
            setSuccessModal(true)
       })
    
    }
      if(serviceProvider === "flutterwave"){
      axiosApi.put(`${API_URL}/` + 'api/v1/transactions/approve/' + id).then(() => {
        setMessageType("Success")
        setMessageTitle("Approve Transaction");
        setMessageDetails("Transaction has been approved successfully")
        setApproveModal(false);
        setTokenVerification(false)
        setSuccessModal(true)
        setLoading(false)
        loadTransactions()
        setApproveModal(false);
       }).catch((errors) => {
           // return errors
           setLoading(false)
            setMessageType("Error")
            setMessageTitle("Approve Transaction Failed");
            setMessageDetails(errors.response.data.message)
            setTokenVerification(false)
            setApproveModal(false);
            setSuccessModal(true)
       })
     }else{
      let transaction_id = id;
      axiosApi.post(`${API_URL}/api/v2/admin/transaction/approve`, transaction_id).then(() => {
        setMessageType("Success")
        setMessageTitle("Approve Transaction");
        setMessageDetails("Transaction has been approved successfully")
        setApproveModal(false);
        setTokenVerification(false)
        setSuccessModal(true)
        setLoading(false)
        loadTransactions()
        setApproveModal(false);
      }).catch((errors) => {
        setLoading(false)
        setMessageType("Error")
        setMessageTitle("Approve Transaction Failed");
        setMessageDetails(errors.response.data.message)
        setTokenVerification(false)
        setApproveModal(false);
        setSuccessModal(true)
      })
     }
  };

 const onConfirmClick = (id) => {
    setId(id)
    setConfirmModal(true);
  }

  const onDeclineClick = (id) => {
    setId(id)
    setDeclineModal(true);
  }

  const onUpdateClick = (id) => {
    setId(id)
    setUpdateModal(true);
  }



  const onApproveClick = (id) => {
    if(tokenVerification == true){
      setId(id)
      setApproveModal(true);
    }else{
      setId(id)
     setVerifyTokenModal(true)
    }
  };

  const handleChange = (code) => {
    setActivityToken(code)
}






  return (
    <React.Fragment>
      <SuccessModals 
         title={messageTitle} 
         details={messageDetails}
         show={successModal} 
         messageType={messageType}
         onCloseClick={() => setSuccessModal(false)}
         />

        <ApproveModal
            show={approveModal}
            onApproveClick={handleApproveClick}
            onCloseClick={() => setApproveModal(false)}
            loading={loading}
        />

        <ConfirmModal
            show={confirmModal}
            onConfirmClick={handleConfirmClick}
            onCloseClick={() => setConfirmModal(false)}
            loading={loading}
        />

        <TransactionDetails
            show={blogModal}
            transactionDetails={transactionDetails}
            onCloseClick={() => setBlogModal(false)}
            loading={loading}
        />

        <DeclineModal
            show={declineModal}
            onDeclineClick={declineTrans}
            onCloseClick={() => setDeclineModal(false)}
            loading={loading}
        />



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
                    <div className="text-primary" onClick={() => blogDetails(transaction)}>
                        View details
                    </div>
                  </DropdownItem>

                  <DropdownItem>
                  {transaction.status === 'PENDING' && transaction.type != 'AIRTIME' && (loggedInUser.data.role === 2 || loggedInUser.data.role === 4 || loggedInUser.data.role === 3) ? (
                   <div className="pt-10" title="Approve transaction" onClick={() => onApproveClick(transaction.id)}>
                   <span  className="text-primary">Approve</span>
                 </div>
             ) : null
            }
                  </DropdownItem>



                  <DropdownItem>
                  {transaction.status === 'PENDING' && transaction.type != 'AIRTIME' &&  (loggedInUser.data.role === 2 || loggedInUser.data.role === 4 || loggedInUser.data.role === 3) ? (
                    <div className="pt-10" title="Decline transaction" onClick={() => onDeclineClick(transaction.id)} >
                    <span  className="text-danger">Decline</span>
                    </div>
             ) : null
            }
                  </DropdownItem>

                  <div className="dropdown-divider"/>

                  <DropdownItem>
                  {transaction.status == "QUEUED" && (loggedInUser.data.role === 2 || loggedInUser.data.role === 4 || loggedInUser.data.role === 3) ? (
                   <div className="pt-10" title="Confirm transaction" onClick={() => onConfirmClick(transaction.id)}>
                     <span  className="text-success">Confirm</span>
                  </div>
              ): null
         
                 }
                  </DropdownItem>
                
                </DropdownMenu>
           </Dropdown>
           <>
           {/* Modal 1 */}
       
                   <Modal isOpen={updateModal} toggle={updateModalToggle}>
                    <ModalHeader toggle={updateModalToggle} tag="h4">
                        Update E-code
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSubmit();
                          return false;
                        }}
                      >
                        <Row form>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">E-Code</Label>
                              <Input
                                name="ecode"
                                type="text"
                                onChange={(e) => setEcode(e.target.value)}
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
                                        ( "Update Code" )
                                    }
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
        

           {/* modal 2 */}

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
                           { transaction.type === "WITHDRAWAL" && (<>
                            <Col md="12">
                             
                             <div className="mb-3">
                                 <Label className="form-label">Sevice Provider</Label>
                                   <select className="form-control" name="service_porvider" onChange={(e) => setServiceProvider(e.target.value)}>
                                     <option  className=" ">Select Service Provider </option>
                                     <option value="flutterwave" className=" ">Flutterwave </option>
                                     <option value="monify">Monify</option>
                                   </select>
                               </div>
                             </Col>
                           </>)}
                          

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

           {/* modal 3 */}
           </>
    </React.Fragment>
  )
}

TransactionDropdown.propTypes = {
  user: PropTypes.any,
  menuType: PropTypes.any,
  admin: PropTypes.any,
  loadTransactions: PropTypes.any,
  transaction: PropTypes.any
}




export default TransactionDropdown;