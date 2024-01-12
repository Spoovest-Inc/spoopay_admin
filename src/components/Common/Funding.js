import React from 'react';
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format';
import {
    Card,
    CardBody,
    Button,
    Table
  } from "reactstrap";
const Funding = ({ transactionDetails }) => {
    return (

      <>
      <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
      
        <span>Transaction Type</span>
        <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{transactionDetails?.type}</span> <hr />

        <span>Amount Funded</span>
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
       </div>
     </>
    )

}


Funding.propTypes = {
    transactionDetails: PropTypes.any,
  }

export default Funding;