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



const StaffDropdown = ({user, menuType, admin, loadAdmins}) => {
  // Declare a new state variable, which we'll call "menu"
  const [isMenu, setIsMenu] = useState("")
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const [loading, setLoading] = useState(false)
  const [detailsModal, setDetailsModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [adminDetail, setAdminDetail] = useState([])
  const [modal, setModal] = useState(false);
  const [messageTitle, setMessageTitle] = useState("")
  const [messageDetails, setMessageDetails] = useState("")
  const [messageType, setMessageType] = useState("")


  

  const showDetails = (user) => {
    setAdminDetail(user)
    setDetailsModal(true)
 }

 const hideMenu = () => {
  setIsMenu(!menuType)
 }




const toggle = () => {
  setModal(!modal);
};




 


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
                  <div className="text-success" onClick={() => userDetails(user)}>
                    View Staff
                  </div>
                  </DropdownItem>

                  <DropdownItem>
                  { loggedInUser.data.role === 3 || loggedInUser.data.role == 4 ? (
                    <div className="text-success"  onClick={() => handleUserClick(user)}>
                      Edit Staff
                  </div>
                ): null}
                  </DropdownItem>



                  <DropdownItem>
                        { loggedInUser.data.role === 3 && (
                        <>
                            {user.status === 'ACTIVE' ? (
                            <div className="text-danger"    onClick={() => onSuspendClick(user)}>
                                Suspend Staff
                            </div>
                            ) : (
                            <div className="text-success"   onClick={() => onActivateClick(user)}>
                                Activate Staff
                            </div>
                            )}
                            </>
                        )}
                  </DropdownItem>
            
                  <DropdownItem>
                  { loggedInUser.data.role === 4 && (
                        <div className="text-success"  onClick={() => userTransactions(user)}>
                         Staff Transactions
                       </div>
                      )}
                  </DropdownItem>

                  <DropdownItem>
                    { loggedInUser.data.role === 4 && (
                            <div className="text-success" onClick={(e) => fundWalletClick(user)}>
                            Pay salary 
                        </div>
                        )}
                  </DropdownItem>

                  <DropdownItem>
                  { loggedInUser.data.role === 4 && (
                        <div className="text-danger" onClick={(e) => removeWalletClick(user.id)}>
                        Withdraw
                    </div>
                    )}
                  </DropdownItem>
                
                </DropdownMenu>
                </Dropdown>
    </React.Fragment>
  )
}

StaffDropdown.propTypes = {
  user: PropTypes.any,
  menuType: PropTypes.any,
  admin: PropTypes.any,
  loadAdmins: PropTypes.any
}




export default StaffDropdown;