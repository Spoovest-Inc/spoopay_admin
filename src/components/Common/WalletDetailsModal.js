import PropTypes from 'prop-types'
import React, { useEffect } from "react"
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import { Col, Modal, ModalBody, ModalHeader, Row, Table } from "reactstrap"
import axios from "axios";
const API_URL = process.env.REACT_APP_BASE_URL




const WalletDetailsModal = ({ show, onCloseClick, walletDetails, isLoading, activate, deActivate}) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
    <ModalHeader toggle={onCloseClick} tag="h4" style={{ paddingLeft: "40px"}} >
       {walletDetails?.User?.name}s Crypto Wallet Details
    </ModalHeader>
      <ModalBody className="py-3 px-5">
           <div className="avatar-xl" style={{ margin: "auto", marginTop: "60px"}}>
              <span className="avatar-title" >
              <img src={walletDetails.qr_image_url} alt='' style={{ marginBottom: "60px"}} />
              </span>
            </div>
            <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
              <span>Fullname</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{walletDetails?.User?.name}</span> <hr />

              <span>Currency</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{walletDetails?.currency}</span> <hr />

              <span>Network</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{walletDetails?.network}</span> <hr />

              <span>Wallet Address</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{walletDetails?.wallet_address}</span> <hr />

              <span>Wallet ID</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{walletDetails?.wallet_id}</span> <hr />

              <span>External User ID </span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{walletDetails?.external_user_id}</span> <hr />
          
              <span>Status</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{walletDetails?.status}</span> <hr />

            

              <span>Wallet Balance</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>
              <NumberFormat
                value={walletDetails?.balance}
                className="foo"
                displayType={'text'}
                thousandSeparator={true}
                renderText={(value, props) => <div {...props}>{value}</div>}
                /> 
              </span> <hr />

          

                { walletDetails.status === "ACTIVE" ? (<button onClick={activate}>Activate</button>) : (  <button onClick={deActivate}>De-activate</button>)}
           
            </div>


      </ModalBody>
    </Modal>
  )
}

WalletDetailsModal.propTypes = {
  onCloseClick: PropTypes.func,
  walletDetails: PropTypes.any,
  show: PropTypes.any,
  isLoading: PropTypes.bool,
  activate: PropTypes.any,
  deActivate: PropTypes.any
}

export default WalletDetailsModal
