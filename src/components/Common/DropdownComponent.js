import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
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
  Form,
} from "reactstrap"

import * as Yup from "yup";
import { useFormik } from "formik";

import axios from "axios";
import AdminDetailModal from "./AdminDetails";
import DeleteModal from "components/Common/DeleteModal";
import SuccessModals from "./successModal";

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



const DropdownComponent = ({user, menuType, admin, loadAdmins}) => {
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
  const [deleteDetails, setDeleteDetails] = useState("")
  const [deleteTitle, setDeleteTitle] = useState("")
  const [btMessage, setBtMessage] = useState("")
  
    //delete customer
    const [deleteModal, setDeleteModal] = useState(false);

  const showDetails = (user) => {
    setAdminDetail(user)
    setDetailsModal(true)
 }

 const hideMenu = () => {
  setIsMenu(!menuType)
 }

 const closeBatch = async (id) => {
  setLoading(true);
  axiosApi.put(`${API_URL}/api/v1/admin/admin/close-batch/${id}`).then((response) => {
    setMessageType("Success")
    setMessageTitle("Admin batch closed")
    setMessageDetails("You have closed an admin batch, he or she wont be able to perform any action on the admin.")
    setSuccessModal(true);
    loadAdmins()
    setLoading(false);
  }).catch((err) => {
    setMessageType("Error")
    setMessageTitle("Admin batch closed")
    setMessageDetails("oops, something went wrong", err.response.data.message)
   setLoading(false);
  })
}

const openBatch = async (id) => {
 setLoading(true);
 axiosApi.put(`${API_URL}/api/v1/admin/admin/open-batch/${id}`).then((response) => {
  setMessageType("Success")
  setMessageTitle("Admin batch opened")
  setMessageDetails("You have opened an admin batch, he or she can now be able to perform actions on the admin.")
  setSuccessModal(true);
  loadAdmins()
   setLoading(false);
 }).catch((err) => {
  console.log(err);
  setMessageType("Error")
  setMessageTitle("Admin batch opened")
  setMessageDetails("oops, something went wrong", err.message)
  setLoading(false);
 })

}







const toggle = () => {
  setModal(!modal);
};


const handleUserClick = arg => {
  const theAdmin = arg;
  setTheAdmin({
    id: theAdmin.id,
    name: theAdmin.name,
    email: theAdmin.email,
    country: theAdmin.country,
    phone_number: theAdmin.phone_number
  });
  setIsEdit(true);
  setModal(true)
};

const onClickDelete = (admin) => {
  setTheAdmin(admin);
  setDeleteTitle(`Delete ${admin.name}'s Account`);
  setDeleteDetails("You’re about to delete an admin account, if this is a mistake, kindly click cancel.")
  setBtMessage("Delete Admin")
  setDeleteModal(true);
};

const handleDeleteUser = () => {
  axiosApi.delete(`${API_URL}/api/v1/admin/delete/${admin.id}`).then((response) => {
    setLoading(false);
    setMessageType("Success")
    setMessageTitle("Admin Deleted")
    setMessageDetails("You have succesfully deleted a Flipex admin.")
    setDeleteModal(false);
    setSuccessModal(true);
    loadAdmins()
  }).catch((error) => {
    setMessageType("Error")
    setMessageTitle("Admin deletion failed")
    setMessageDetails("oops, something went wrong", error.response.data.message)
    setDeleteModal(false);
    setSuccessModal(true);
    setLoading(false);
  
  })
};

const handleSubmit = () => {
  setLoading(true);
  const updateUser = {
    id: admin.id,
    name: admin.name,
    role: adminType
  };

  axiosApi.post(`${API_URL}/api/v1/admin/update-admin`, updateUser).then((response) => {
    setLoading(false);
    setMessageType("Success")
    setMessageTitle("Admin level update")
    setMessageDetails("You have succesfully changed admin level.")
    setSuccessModal(true);
    setIsEdit(false);
  }).catch((error) => {
    setMessageType("Error")
    setMessageTitle("Admin level update")
    setMessageDetails("oops, something went wrong", error.response.data.message)
    setSuccessModal(true);
    setLoading(false);
    setIsEdit(false);
  })

  toggle()
}


 


  return (
    <React.Fragment>
       <AdminDetailModal 
        show={detailsModal}
        onCloseClick={() => setDetailsModal(false)}
        adminDetail={adminDetail}
       />  

      <SuccessModals 
         title={messageTitle} 
         details={messageDetails}
         show={successModal} 
         messageType={messageType}
         onCloseClick={() => setSuccessModal(false)}
         />

      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
        deleteTitle={deleteTitle}
        deleteDetails={deleteDetails}
        btMessage={btMessage}
        loading={loading}
      />

       <Dropdown
        isOpen={isMenu}
        onClick={() => setIsMenu(menuType)}
        toggle={() => setIsMenu("")}
        className="d-inline-block"
      >
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
                  <div className="d-flex gap-3">
                    <div className="text-default"   onClick={() => showDetails(user)} >
                     View Details
                   
                  </div>
                  </div>
                  </DropdownItem>

                  <DropdownItem>
                  {loggedInUser.data.role === 4 ? (
                        <div className="text-default"  onClick={() => handleUserClick(user)} >
                          Edit admin
                        </div>
                        ) : null
                        }
                  </DropdownItem>



                  <DropdownItem>
                  {loggedInUser.data.role  == 3 || loggedInUser.data.role == 4 ? (
                                  <>
                                  { user.batch_status === 'close' ? (
                                      <div className="text-default"  onClick={(e) => openBatch(user.id)} >
                                      { loading ? (
                                            <>
                                            <Spinner
                                              as="span"
                                              animation="grow"
                                              size="sm"
                                              role="status"
                                              aria-hidden="true"
                                            />
                                            ...
                                            </>
                                          ) : "Open batch"
                                      }
                                      </div>
                                  ) : 
                                  <div className="text-danger" onClick={(e) => closeBatch(user.id)} >
                                      { loading ?  (
                                            <>
                                            <Spinner
                                              as="span"
                                              animation="grow"
                                              size="sm"
                                              role="status"
                                              aria-hidden="true"
                                            />
                                          ...
                                            </>
                                          ) : "Close batch"
                                      }
                                  </div> 
                                  }
                            
                            </>

                          ) : null
                          }
                  </DropdownItem>
                  <div className="dropdown-divider"/>

                  <DropdownItem>
                        {loggedInUser.data.role === 4 ? (
                            <div className="text-danger" onClick={() => onClickDelete(user)}>
                              Delete Admin
                          </div>
                        ): null
                        }
                  </DropdownItem>
                
                </DropdownMenu>
           </Dropdown>
           <>
                        <Modal isOpen={modal} toggle={toggle}>
                                      <ModalHeader toggle={toggle} tag="h4">
                                       Change admin level
                                      </ModalHeader>
                                      <ModalBody>
                                        <Form
                                          onSubmit={(e) => {
                                            e.preventDefault();
                                            handleSubmit();
                                          }}
                                        >
                                          <Row form>
                                            <Col xs={12}>
                                              
                                            


                                             

                                              <div className="mb-3">
                                                <Label className="form-label">Admin type</Label>
                                                  <select className="form-control" name="admin_role" onChange={(e) => setAdminType(e.target.value)}>
                                                    <option value="1" className=" ">Content creator</option>
                                                    <option value="2">Level 2 admin</option>
                                                    <option value="3">Level 3 admin</option>
                                                    <option value="0">Normal User</option>
                                                  </select>
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
                                                          { !loading && "Change level"}
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
           </>
    </React.Fragment>
  )
}

DropdownComponent.propTypes = {
  user: PropTypes.any,
  menuType: PropTypes.any,
  admin: PropTypes.any,
  loadAdmins: PropTypes.any
}




export default DropdownComponent;