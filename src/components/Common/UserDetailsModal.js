import PropTypes from 'prop-types'
import React, { useEffect } from "react"
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import { Col, Modal, ModalBody, ModalHeader, Row, Table } from "reactstrap"
import axios from "axios";
const API_URL = process.env.REACT_APP_BASE_URL


const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')){
      req.headers.Authorization = `Bearer ${ JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req;
});


const UserDetails = ({ show, onCloseClick, userDetail, userWallets, refBonus }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true}>
    <ModalHeader toggle={onCloseClick} tag="h4" style={{ paddingLeft: "40px"}} >
       {userDetail.first_name}s Details
    </ModalHeader>
      <ModalBody className="py-3 px-5">
           <div className="avatar-xl" style={{ margin: "auto"}}>
              <span className="avatar-title rounded-circle">
                 
              </span>
            </div>
            <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
              <span>Fullname</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{userDetail?.first_name + " " + userDetail?.last_name}</span> <hr />

              <span>Mobile</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{userDetail?.phone_number}</span> <hr />

              <span>Email</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{userDetail?.email}</span> <hr />

              <span>Country</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{userDetail?.country}</span> <hr />

              <span>Username</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{userDetail?.username}</span> <hr />

              <span>Refferal Code</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{userDetail?.referral_code}</span> <hr />

            

             
                <h4>User Wallets</h4>
               {userWallets?.map((wallet) => (
                <>
                        <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
                        <span>Wallet Type</span>
                        <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{wallet.wallet_type}</span> <br />
                        <span>Wallet Balance</span>
                        <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>
                        <NumberFormat
                          value={wallet.balance}
                          className="foo"
                          displayType={'text'}
                          thousandSeparator={true}
                          renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                          /> 
                        </span>  <br/>

                        <span>Wallet Currency</span>
                        <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{wallet.currency}</span> <br />



                        </div>
                </>
               ))}

              <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
              <span>Reffered Users</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>0</span> <hr />

              <span>Refferal Bonus</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>
              <NumberFormat
                value={refBonus}
                className="foo"
                displayType={'text'}
                thousandSeparator={true}
                renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                /> 
              </span> <hr />
              </div>



           
            </div>


      </ModalBody>
    </Modal>
  )
}

UserDetails.propTypes = {
  onCloseClick: PropTypes.func,
  userDetail: PropTypes.any,
  walletBalance: PropTypes.any,
  usdtBalance: PropTypes.any,
  refBonus: PropTypes.any,
  show: PropTypes.any,
  userWallets: PropTypes.any
  
}

export default UserDetails
