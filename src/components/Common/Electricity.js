import React from 'react';
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format';
import {
    Card,
    CardBody,
    Button,
    Table
  } from "reactstrap";
const Electricity = ({ transactionDetails }) => {
    return (
      <>
      <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
      
        <span>Transaction Type</span>
        <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{transactionDetails?.type}</span> <hr />

        <span>Unit Amount</span>
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

           <span>Service Provider</span>
           <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{transactionDetails?.narration}</span> <hr />

           <span>Meter Number</span>
           <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{transactionDetails?.number}</span> <hr />


         <span>Date</span>
         <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{transactionDetails?.createdAt}</span> <hr />
       </div>
     </>
    )

}


Electricity.propTypes = {
    transactionDetails: PropTypes.any,
  }

export default Electricity;