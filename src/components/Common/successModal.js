import PropTypes from 'prop-types'
import React from "react"
import { Col, Modal, ModalBody,ModalHeader, Row, Table } from "reactstrap"
import successIcon from "../../assets/images/FlipEx/success.svg"
import errorIcon from "../../assets/images/FlipEx/error.svg"

const SuccessModals = ({show, title, details, onCloseClick, messageType }) => {
  return (
    <Modal  
     isOpen={show}
      toggle={onCloseClick} size="md" centered={true}>
    <ModalHeader toggle={onCloseClick} tag="h4" style={{ paddingLeft: "40px"}} > </ModalHeader>
      <ModalBody className="py-3 px-5" style={{ textAlign: "center"}}>
         <img src={messageType === "Success" ? successIcon : errorIcon } alt=""  />
        <h4 className="pt-5">{title}</h4>
        <p>{details}</p>
        
          <button
            onClick={onCloseClick}
            className="btn btn-primary"
            style={{ width: '100%'}}
            >
            Continue
            </button>
          
      </ModalBody>
    </Modal>
  )
}

SuccessModals.propTypes = {
  onCloseClick: PropTypes.func,
  details: PropTypes.any,
  title: PropTypes.any,
  show: PropTypes.bool,
  messageType: PropTypes.string,
}

export default SuccessModals
