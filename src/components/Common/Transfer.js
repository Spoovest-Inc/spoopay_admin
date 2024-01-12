import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format';
import {
    Card,
    CardBody,
    Button,
    Table
  } from "reactstrap";
  import axios from "axios";
  import RecieverDetails from "../../../src/components/Common/RecieverDetails"

  const API_URL = process.env.REACT_APP_BASE_URL;


const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')){
      req.headers.Authorization = `Bearer ${ JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req;
});

const Transfer = ({ transactionDetails }) => {
    const [user_id, setUserId] = useState(transactionDetails.participant_id)
    const [userDetails, setUserDetails] = useState([]);
    const [wallet_balance, setWalletBalance] = useState("");

    console.log(transactionDetails.participant_id)

    const getUserDetails = () => {
        axiosApi.get(`${API_URL}/api/v1/users/profile/${transactionDetails.participant_id}`).then((response) => {
            setUserDetails(response.data)
            setWalletBalance(response.data.data.Wallet.naira_balance)
        }).catch((error) => {
          console.log(error.message)
        })
    }


  useEffect(() => {
    getUserDetails()
  }, [])

  

    return (
      <>
      <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
      
        <span>Transaction Type</span>
        <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{transactionDetails?.type}</span> <hr />

        <span>Amount Sent</span>
        <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>
        <NumberFormat
           value={transactionDetails.amount}
           className="foo"
           displayType={'text'}
           thousandSeparator={true}
           renderText={(value, props) => <div {...props}>{value} {transactionDetails.currency}</div>}
           /> 
         </span> <hr />

         <span>Status</span>
         <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>
            {transactionDetails.status === "SUCCESS" ? (
            <>
             <span style={{ color: "green"}}>{transactionDetails.status}</span>
            </>
            ) : transactionDetails.status === "FAILED" ? ( 
              <>
             <span style={{ color: "red"}}>{transactionDetails.status}</span>
             </>
            ) : transactionDetails.status === "QUEIUED" ? (
           
               <>
             <span style={{ color: "purlpe"}}>{transactionDetails.status}</span>
             </>
           
             ) : transactionDetails.status === "PENDING" ? (
             <>
             <span style={{ color: "orange"}}>{transactionDetails.status}</span>
             </>
            ) : null }
           </span> <hr />

           <span>Previous Balance</span>
           <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>
           <NumberFormat
           value={transactionDetails.old_balance}
           className="foo"
           displayType={'text'}
           thousandSeparator={true}
           renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
           /> 
            </span> <hr />

           <span>New Balance</span>
           <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>
           <NumberFormat
           value={transactionDetails.new_balance}
           className="foo"
           displayType={'text'}
           thousandSeparator={true}
           renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
           /> 
            </span> <hr />


         <span>Date</span>
         <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{transactionDetails?.createdAt}</span> <hr />
      
         <RecieverDetails userDetails={userDetails} wallet_balance={wallet_balance} />
        </div>
     
      </>
    )

}


Transfer.propTypes = {
    transactionDetails: PropTypes.any,
  }

export default Transfer;