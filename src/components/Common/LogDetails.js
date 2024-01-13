import PropTypes from 'prop-types'
import React from "react"
import NumberFormat from 'react-number-format';
import { Col, Modal, ModalBody,ModalHeader, Row, Table } from "reactstrap"

const LogDetails = ({ show, onCloseClick, planDetails }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} size="lg" centered={true}>
          <ModalHeader toggle={onCloseClick} tag="h4" style={{ paddingLeft: "40px"}} >
         Plan Details
    </ModalHeader>
      <ModalBody className="py-3 px-5">
        <Row>
        <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
              <span>Plan Name</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{planDetails?.plan_name}</span> <hr />

              <span>Charged</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{planDetails?.trading_fee_charged === true ? 'Yes' : 'No'}</span> <br /> <br/>

              <span>Status</span>

              {planDetails?.status === "ACTIVE" ? (
               <>
               <span style={{ float: 'right', color: "green", fontWeight: "bold"}}>{planDetails?.status}</span>
               </>
               ) : planDetails?.status === "STOPPED" ? ( 
                 <>
              <span style={{ float: 'right', color: "red", fontWeight: "bold"}}>{planDetails?.status}</span>
                </>
               ) 
             : null }
             <br/> <br/>
           
            
              <span>Duration</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{planDetails?.duration}</span> <hr /> 

              <span>Weeks</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{planDetails?.weeks} Weeks</span> <br /> <br/>

              <span>Saving Capital</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>
                <NumberFormat
                  value={planDetails?.trading_capital}
                  className="foo"
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                  /> 
              </span> <br /> <br/>

              <span>Total ROI</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>
                <NumberFormat
                  value={planDetails?.total_roi}
                  className="foo"
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                  /> 
              </span> <br /> <br/>

              <span>Weekly Earnings</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>
                <NumberFormat
                  value={planDetails?.weekly_earning}
                  className="foo"
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                  /> 
              </span> <br /> <br/>

              <span>Daily Earnings</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>
                <NumberFormat
                  value={planDetails?.daily_earning}
                  className="foo"
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                  /> 
              </span> <br /> <br/>

              <span>Saving Charges</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>
                <NumberFormat
                  value={planDetails?.trading_fee}
                  className="foo"
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                  /> 
              </span> <br /> <br/>

              <span>Payout Balance</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>
                <NumberFormat
                  value={planDetails?.payout_amount}
                  className="foo"
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                  /> 
              </span> <br /> <br/>

              <span>Available To Withdrawal</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>
                <NumberFormat
                  value={planDetails?.available_to_withdraw}
                  className="foo"
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                  /> 
              </span> <br /> <br/>



              <span>Next Withdrawal Date</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{planDetails?.next_withdrawal_date}</span>  <br /> <br/>

              <span>Start Date</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{planDetails?.start_date}</span>  <br /> <br/>

              <span>Due Date</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{planDetails?.due_date}</span>  <br /> <br/>
             
              <span>Date Created</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{planDetails?.createdAt}</span> 
            </div>

            <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px", marginBottom:"20px"}} className='p-3 mt-3'>
              <h3>User Details</h3>
              <span>Fullname</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{planDetails?.User?.first_name + " " + planDetails?.User?.last_name}</span>
            </div>
        </Row>
      </ModalBody>
    </Modal>
  )
}

LogDetails.propTypes = {
  onCloseClick: PropTypes.func,
  planDetails: PropTypes.any,
  show: PropTypes.any
}

export default LogDetails
