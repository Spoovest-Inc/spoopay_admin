import PropTypes from 'prop-types'
import React from "react"
import { Col, Modal, ModalBody,ModalHeader, Row, Table } from "reactstrap"

const LogDetails = ({ show, onCloseClick, logDetail }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} size="lg" centered={true}>
          <ModalHeader toggle={onCloseClick} tag="h4" style={{ paddingLeft: "40px"}} >
         Log Info
    </ModalHeader>
      <ModalBody className="py-3 px-5">
        <Row>
        <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
              <span>Admins Fullname</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{logDetail.adminName}</span> <hr />

              <span>Phone Mobile</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{logDetail?.adminPhoneNumber}</span> <hr />

              <span>Email</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{logDetail?.adminEmail}</span> <hr />

              <span>Action type</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{logDetail?.actionType}</span> <hr />

              <span>Date</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{logDetail?.createdAt}</span> <hr />
            </div>

            <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px", marginBottom:"20px"}} className='p-3 mt-3'>
              <span>Log Details</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{logDetail.logMessage}</span>
            </div>
        </Row>
      </ModalBody>
    </Modal>
  )
}

LogDetails.propTypes = {
  onCloseClick: PropTypes.func,
  logDetail: PropTypes.any,
  show: PropTypes.any
}

export default LogDetails
