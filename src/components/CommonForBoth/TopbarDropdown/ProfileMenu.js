import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Row
} from "reactstrap"
import errorIcon from "../../../assets/images/FlipEx/warning.svg"
//i18n
import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// users
import user1 from "../../../assets/images/users/avatar-1.jpg"

const ProfileMenu = props => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)
  const [modal, setModal] = useState(false)
  const[loading, setLoading] = useState(false)

  const [username, setusername] = useState("")

  useEffect(() => {
    if (localStorage.getItem("profile")) {
        const obj = JSON.parse(localStorage.getItem("profile"))
        setusername(obj.data.name)
    }
  }, [props.success])

  const logout = () => {
    localStorage.removeItem("profile")
    props.history.push("/login")
  }

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <React.Fragment>
       <Modal isOpen={modal} toggle={toggle} size='md' centered={true}>
         <ModalHeader toggle={toggle} tag="h4" ></ModalHeader>
      <ModalBody className="py-3 px-5">
       
            <div className="text-center">
            <img src={errorIcon} alt=""  />
              <h4 className='pt-5'>Logout</h4>
               <p>You are about to logout of your admin account, if this is a mistake kindly click cancel.</p>
            </div>
      
        <Row>
          <Col>
            <div className="text-center mt-3">
            <button
                type="button"
                className="btn btn-default btn-lg ms-2"
                style={{ border: "1px solid gray"}}
                onClick={toggle}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-default btn-lg ms-2"
                style={{ backgroundColor: "black", color: "white"}}
                onClick={logout}
              >
                { !loading && "Logout"}
                            { loading && (
                              <>
                              <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                              Logging out...
                              </>
                            ) 
                        }
              </button>
            
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item "
          id="page-header-user-dropdown"
          tag="button"
          style={{ 
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "4px 8px 4px 4px",
            gap: "8px", 
            height: "45px",
            marginTop: "10px",
            backgroundColor:" #F7F7F7",
            borderRadius: "41px"
          }}    
        >
          <img
            className="rounded-circle header-profile-user"
            src={user1}
            alt="Header Avatar"
          />
          <span className="d-none d-xl-inline-block ms-2 me-1">{username}</span>
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block"/>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1"/>
            {props.t("Profile")}{" "}
          </DropdownItem>
         
        
         
          <div className="dropdown-divider"/>
          <div  className="dropdown-item" onClick={() => setModal(true)}>
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"/>
            <span>{props.t("Logout")}</span>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

ProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
  history: PropTypes.any
}

const mapStatetoProps = state => {
  const { error, success } = state
  return { error, success }
}

export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(ProfileMenu))
)
