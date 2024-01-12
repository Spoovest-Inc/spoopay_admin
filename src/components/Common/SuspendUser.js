import PropTypes from 'prop-types'
import React from "react"
import { Col, Modal, ModalBody,ModalHeader, Row , Spinner } from "reactstrap"
import warningIcon from "../../assets/images/FlipEx/warning.svg"
const SuspendUserModel = ({ show, onSuspendClick, onCloseClick, loading }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} size='md' centered={true}>
    <ModalHeader toggle={onCloseClick} tag="h4" ></ModalHeader>
   <ModalBody className="py-3 px-5">
  
       <div className="text-center">
       <img src={warningIcon} alt=""  />
         <h4 className='pt-5'>Suspend User</h4>
          <p>You are about to suspend a FlipEx User, kindly be sure you want to perform these action, or click on cancel to exit.</p>
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
           onClick={onSuspendClick}
         >
           { !loading && 'Suspend User'}
                       { loading && (
                         <>
                         <Spinner
                           as="span"
                           animation="grow"
                           size="sm"
                           role="status"
                           aria-hidden="true"
                         />
                         Suspending user...
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

SuspendUserModel.propTypes = {
  onCloseClick: PropTypes.func,
  onSuspendClick: PropTypes.func,
  loading: PropTypes.any,
  show: PropTypes.any
}

export default SuspendUserModel
