import PropTypes from 'prop-types'
import React from "react"
import { Col, Modal, ModalBody,ModalHeader, Row, Spinner } from "reactstrap"
import errorIcon from "../../assets/images/FlipEx/warning.svg"
const DeleteModal = ({ show, onDeleteClick, onCloseClick, loading, deleteDetails, btMessage, deleteTitle }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} size='md' centered={true}>
         <ModalHeader toggle={onCloseClick} tag="h4" ></ModalHeader>
      <ModalBody className="py-3 px-5">
       
            <div className="text-center">
            <img src={errorIcon} alt=""  />
              <h4 className='pt-5'>{deleteTitle}</h4>
               <p>{deleteDetails}</p>
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
                onClick={onDeleteClick}
              >
                { !loading && `${ btMessage}`}
                            { loading && (
                              <>
                              <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                              Processing...
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

DeleteModal.propTypes = {
  onCloseClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  loading: PropTypes.any,
  deleteDetails: PropTypes.any,
  deleteTitle: PropTypes.string,
  show: PropTypes.any,
  btMessage: PropTypes.string,
}

export default DeleteModal
