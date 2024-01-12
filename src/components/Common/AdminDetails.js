import PropTypes from 'prop-types'
import React from "react"
import { Col, Modal, ModalBody,ModalHeader, Row, Table } from "reactstrap"
import errorIcon from "../../assets/images/FlipEx/error.svg"
const AdminDetails = ({ show, onCloseClick, adminDetail }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
    <ModalHeader toggle={onCloseClick} tag="h4" style={{ paddingLeft: "40px"}} >
       {adminDetail.first_name + "'s"} Details
    </ModalHeader>
      <ModalBody className="py-3 px-5">
           <div className="avatar-xl" style={{ margin: "auto"}}>
              <span className="avatar-title rounded-circle">
                 
              </span>
            </div>
            <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
              <span>Fullname</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{adminDetail?.first_name + " " + adminDetail?.last_name}</span> <hr />

              <span>Mobile</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{adminDetail?.phone_number}</span> <hr />

              <span>Email</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{adminDetail?.email}</span> <hr />

              <span>Location</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{adminDetail?.country}</span> <hr />

              <span>Batch status</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{adminDetail?.batch_status}</span> <hr />

              <span>Admin Level</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>Level {adminDetail?.role}</span> <hr />
            </div>


      </ModalBody>
    </Modal>
  )
}

AdminDetails.propTypes = {
  onCloseClick: PropTypes.func,
  adminDetail: PropTypes.any,
  show: PropTypes.any
}

export default AdminDetails
