import PropTypes from 'prop-types'
import React from "react"
import { Col, Modal, ModalBody,ModalHeader, Row, Spinner } from "reactstrap"
import warningIcon from "../../assets/images/FlipEx/warning.svg"
const ConfirmModal = ({ show, onConfirmClick, onCloseClick, loading }) => {
  
  return (
    <Modal isOpen={show} toggle={onCloseClick} size='md' centered={true}>
    <ModalHeader toggle={onCloseClick} tag="h4" ></ModalHeader>
   <ModalBody className="py-3 px-5">
  
       <div className="text-center">
       <img src={warningIcon} alt=""  />
         <h4 className='pt-5'>Confirm Transaction</h4>
          <p>You are about to confirm a transaction for a FlipEx user, Please kindy be sure to verify transaction was successfullyapproved before confirming.</p>
       </div>
 
   <Row>
     <Col>
       <div className="text-center mt-3">
       <button
           type="button"
           className="btn btn-default btn-lg ms-2"
           style={{ border: "1px solid gray"}}
           onClick={onCloseClick}
         >
           Cancel
         </button>

         <button
           type="button"
           className="btn btn-default btn-lg ms-2"
           style={{ backgroundColor: "black", color: "white"}}
           onClick={onConfirmClick}
         >
           { !loading && 'Confirm Transaction'}
                       { loading && (
                         <>
                         <Spinner
                           as="span"
                           animation="grow"
                           size="sm"
                           role="status"
                           aria-hidden="true"
                         />
                         Confirming transaction...
                         </>
                       ) 
                   }
         </button>
       
       </div>
     </Col>
   </Row>
 </ModalBody>
</Modal>
  )
}

ConfirmModal.propTypes = {
  onCloseClick: PropTypes.func,
  onConfirmClick: PropTypes.func,
  show: PropTypes.any,
  loading: PropTypes.bool,
}

export default ConfirmModal
