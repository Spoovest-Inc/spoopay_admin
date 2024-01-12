import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format';
import firebase from 'firebase/compat/app'
import  {firestore} from "firebase/compat/firestore";
import axios from "axios";

import {
    Card,
    CardBody,
    Button,
    Table,
    Row,
    Col
  } from "reactstrap";


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


const TransactionUser =  ({ transactionDetails }) => {
  const [user_id, setUserId] = useState(transactionDetails.user_id)
  const [userDetails, setUserDetails] = useState([]);
  const [wallet_balance, setWalletBalance] = useState("");


  useEffect(() => {
    getUserDetails()
  }, [])



  const getUserDetails = () => {
      axiosApi.get(`${API_URL}/api/v1/users/profile/${transactionDetails.user_id}`).then((response) => {
          setUserDetails(response.data.data)
          setWalletBalance(response.data.data.Wallet.naira_balance)
      }).catch((error) => {
        console.log(error.message)
      })
  }



      

 
    return (
      <>
      <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
      
        <span>Fullname</span>
        <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{userDetails?.name}</span> <hr />

        <span>Email</span>
        <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{userDetails?.email}</span> <hr />

        <span>Phone Number</span>
        <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{userDetails?.phone_number}</span> <hr />

        <span>Country</span>
        <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{userDetails?.country}</span> <hr />

        <span>Username</span>
        <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{userDetails?.username}</span> <hr />

        <span>Wallet Balance</span>
        <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>
        <NumberFormat
           value={userDetails.wallet_balance}
           className="foo"
           displayType={'text'}
           thousandSeparator={true}
           renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
           /> 
         </span> <hr />

  
       </div>

     </>       
    )

}


TransactionUser.propTypes = {
    transactionDetails: PropTypes.any,
  }

export default TransactionUser;