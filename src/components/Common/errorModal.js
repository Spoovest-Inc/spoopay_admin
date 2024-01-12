import PropTypes from 'prop-types'
import React from "react"
import { Col, Modal, ModalBody, Row, Table } from "reactstrap"
import icon from "../../assets/images/FlipEx/error.svg"

const ErrorModals = ({show, title, details, onCloseClick }) => {
  return (
    <Modal  
     isOpen={show}
      toggle={onCloseClick} size="md" centered={true}>
      <ModalBody className="py-3 px-5" style={{ textAlign: "center"}}>
         <img src={icon} alt=""  />
        <h4 className="pt-5">{title}</h4>
        <p>{details}</p>
        
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%'}}
            >
            Continue
            </button>
          
      </ModalBody>
    </Modal>
  )
}

ErrorModals.propTypes = {
  onCloseClick: PropTypes.func,
  details: PropTypes.any,
  title: PropTypes.any,
  show: PropTypes.bool
}

export default ErrorModals
