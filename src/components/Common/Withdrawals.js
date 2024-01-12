import React from 'react';
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format';
import {
    Card,
    CardBody,
    Button,
    Table
  } from "reactstrap";
  import axios from "axios";
  import DestinationDetails from "../../../src/components/Common/DestinationDetails"

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

const Withdrawals = ({ transactionDetails }) => {
  const [destinationAccount, setDestinationAccount] = React.useState()

  React.useEffect(() => {
   axiosApi.get(`${API_URL}/api/v1/transactions/transaction_destination/${transactionDetails.id}`).then((response) => {
        setDestinationAccount(response.data.bank_details_exists)
        console.log(response.data)
    }).catch((error) => {
      console.error(error)
    })
  }, [])

    return (
      <>
       <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
       
         <span>Transaction Type</span>
         <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{transactionDetails?.type}</span> <hr />

         <span>Amount withrawn</span>
         <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>
         <NumberFormat
            value={transactionDetails.amount}
            className="foo"
            displayType={'text'}
            thousandSeparator={true}
            renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
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


          <span>Date</span>
          <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{transactionDetails?.createdAt}</span> <hr />
        </div>

        <DestinationDetails destinationAccount={destinationAccount} />
      </>
    )

}


Withdrawals.propTypes = {
    transactionDetails: PropTypes.any,
  }

export default Withdrawals;