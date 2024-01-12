import PropTypes from 'prop-types'
import React from "react"
import { Col, Modal, ModalBody, Row, Table } from "reactstrap"
import NumberFormat from 'react-number-format';
const TaskDetail = ({ show, onCloseClick, taskDetail }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} size="lg" centered={true}>
      <ModalBody className="py-3 px-5">
      <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
              <span>Title</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{taskDetail?.title}</span> <hr />

              <span>Type</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{taskDetail?.transaction_type}</span> <hr />

              <span>Status</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{taskDetail?.state}</span> <hr />

              <span>Transaction amount from</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>
                <NumberFormat
                  value={taskDetail.amount_range_from} 
                  className="foo"
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                  /> 
              </span> <hr />

              <span>Transaction amount to</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>
              <NumberFormat
                  value={taskDetail.amount_range_to} 
                  className="foo"
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                  /> 
              </span> <hr />

              <span>Reward Amount</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>
              <NumberFormat
                  value={taskDetail.reward_amount} 
                  className="foo"
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                  /> 
              </span> <hr /> 

              <span>Run from</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{taskDetail?.start_date}</span> <hr />

              <span>Run to</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{taskDetail?.end_date}</span> <hr />        
            </div>
      </ModalBody>
    </Modal>
  )
}

TaskDetail.propTypes = {
  onCloseClick: PropTypes.func,
  taskDetail: PropTypes.any,
  show: PropTypes.any
}

export default TaskDetail
