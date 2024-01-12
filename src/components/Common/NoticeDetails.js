import PropTypes from 'prop-types'
import React from "react"
import { Col, Modal, ModalBody, Row, Table } from "reactstrap"

const NoticeDetails = ({ show, onCloseClick, noticeDetails }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} size="lg" centered={true}>
      <ModalBody className="py-3 px-5">
        <Row>
          <Col lg={12}>
            <div className="text-center">
              <div>
              <div className="table-responsive">
                    { noticeDetails.content}
                  </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center mt-3">
            <i
                className="mdi mdi-close"
                style={{ fontSize: "2em", color: "green" }}
                onClick={onCloseClick}
              />
            
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

NoticeDetails.propTypes = {
  onCloseClick: PropTypes.func,
  noticeDetails: PropTypes.any,
  show: PropTypes.any
}

export default NoticeDetails
