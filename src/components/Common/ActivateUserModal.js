import PropTypes from 'prop-types'
import React from "react"
import { Col, Modal, ModalBody, ModalHeader, Row, Spinner } from "reactstrap"
import warningIcon from "../../assets/images/FlipEx/warning.svg"
const AcivateUserModal = ({ show, onActivateClick, onCloseClick, loading }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} size='md' centered={true}>
    <ModalHeader toggle={onCloseClick} tag="h4" ></ModalHeader>
   <ModalBody className="py-3 px-5">
  
       <div className="text-center">
       <img src={warningIcon} alt=""  />
         <h4 className='pt-5'>Activate Account</h4>
          <p>You are about active a Flipex users account, kindly be sure you want to do this or click on the cancel button to exit.</p>
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
           onClick={onActivateClick}
         >
           { !loading && 'Active Account'}
                       { loading && (
                         <>
                         <Spinner
                           as="span"
                           animation="grow"
                           size="sm"
                           role="status"
                           aria-hidden="true"
                         />
                         Activating Account...
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

AcivateUserModal.propTypes = {
  onCloseClick: PropTypes.func,
  onActivateClick: PropTypes.func,
  loading: PropTypes.bool,
  show: PropTypes.any
}

export default AcivateUserModal
