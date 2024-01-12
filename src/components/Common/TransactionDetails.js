import PropTypes from 'prop-types'
import React from "react"
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import Crypto from "../Common/CryptoCard"
import Withdrawals from "../Common/Withdrawals"
import GiftCards from "../Common/Giftcard"
import TransactionUser from "../Common/TrasactionUser"
import TransactionReversal from '../Common/TransactionReversal'
import Airtime from "../Common/Airtime"
import Data from "../Common/Data"
import Electricity from "../Common/Electricity"
import Cable from "../Common/Cable"
import Transfer from "../Common/Transfer"
import Funding from '../Common/Funding'
const TransactionDetails = ({ show, onCloseClick, transactionDetails }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true} size='md'>
    <ModalHeader toggle={onCloseClick} tag="h4" style={{ paddingLeft: "40px"}} >
      Transaction Details
    </ModalHeader>
    <ModalBody className="py-3 px-5">
      <hr />
        <Row>
          <Col lg={12}>
      
  
              { transactionDetails.type == "CRYPTO" ? (
                 <Crypto transactionDetails={transactionDetails} />
              )  :
                  transactionDetails.type == "WITHDRAWAL" ? (
                   <Withdrawals transactionDetails={transactionDetails} />
                  
                  
              ) :  transactionDetails.type == "AIRTIME" ? (
                <Airtime transactionDetails={transactionDetails} />

              )  :  transactionDetails.type == "DATA" ? (
                <Data transactionDetails={transactionDetails} />
              )  
              :  transactionDetails.type == "ELECTRICITY" ? (
                <Electricity transactionDetails={transactionDetails} />
              )
              :  transactionDetails.type == "FUNDING" ? (
                <Funding transactionDetails={transactionDetails} />
              )
              :  transactionDetails.type == "CABLE" ? (
                <Cable transactionDetails={transactionDetails} />
              )
              :  transactionDetails.type == "TRANSFER" ? (
                <Transfer transactionDetails={transactionDetails} />
              )
              
              : transactionDetails.type == "GIFTCARD" ? (
                  <GiftCards transactionDetails={transactionDetails} />
              ): null }
           

              <h4 className='pt-3'>User Details</h4>
       
              <TransactionUser transactionDetails={transactionDetails} />
             


              <hr />
              <h4>Reversals</h4>
              <TransactionReversal transactionDetails={transactionDetails}  />
                          

      
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

TransactionDetails.propTypes = {
  onCloseClick: PropTypes.func,
  transactionDetails: PropTypes.any,
  show: PropTypes.any
}

export default TransactionDetails
