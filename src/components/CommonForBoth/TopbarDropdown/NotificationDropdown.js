import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";
import axios from "axios";
const API_URL = process.env.REACT_APP_BASE_URL
import { ToastContainer, toast } from 'react-toastify';

import notificationBell from "../../../assets/images/notifications.svg"

const axiosApi = axios.create({
  baseURL: API_URL,
});



axiosApi.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')){
      req.headers.Authorization = `Bearer ${ JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req;
});

//i18n
import { withTranslation } from "react-i18next";



const NotificationDropdown = () => {
 const [notifications, setNotifications] = useState([])

  

 const MINUTE_MS = 50000;

   useEffect(() => {
     const interval = setInterval(() => {
      // dispatch(onGetReports())
      axiosApi.get(`${API_URL}/` + 'api/v1/admin/notifications').then((res) => {
       setNotifications(res.data.data); 
   }).catch((errors) => {
     console.log(errors);
   })
     }, MINUTE_MS);

     return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
   }, [])

  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false);

  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon"
          tag="button"
          id="page-header-notifications-dropdown"
          style={{ 
            width: "45px",
            height: "45px",
            backgroundColor:" #F7F7F7",
            borderRadius: "81.8182px",
            marginTop: "10px",
            marginRight: "10px"
          }}    
        >
          <img src={notificationBell} alt="" />
          {/* <span className="badge bg-danger rounded-pill">{notifications.length}</span> */}
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0">Notifications</h6>
              </Col>
              <div className="col-auto">
                <a href="#" className="small">
                  {" "}
                  View All
                </a>
              </div>
            </Row>
          </div>

                <SimpleBar>
                  { notifications?.map((notification, index) => (
                        <Link to="/transactions" className="text-reset notification-item" key={notification.id}>
                        <div className="d-flex">
                          <div className="avatar-xs me-3">
                            <span className="avatar-title bg-primary rounded-circle font-size-16">
                            </span>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mt-0 mb-1">
                             {notification.meta_data}
                            </h6>
                            <div className="font-size-12 text-muted">
                              <p className="mb-1">
                               {notification.type}
                              </p>
                              <p className="mb-0">
                                <i className="mdi mdi-clock-outline" />{" "}
                                {notification.createdAt}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Link>
                  ))}
            </SimpleBar> 
      
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withTranslation()(NotificationDropdown);

NotificationDropdown.propTypes = {
  t: PropTypes.any,
  notifications: PropTypes.any
};