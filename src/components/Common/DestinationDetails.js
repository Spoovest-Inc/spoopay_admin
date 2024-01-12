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


const DestinationDetails =  ({ destinationAccount }) => {
    return (
      <>
       <h4 className='pt-3'>Destination Details</h4>
       <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
         <span>Account Name</span>
         <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{destinationAccount?.account_name}</span> <hr />

          <span>Bank Name</span>
          <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{destinationAccount?.bank_name}</span> <hr />

          <span>Account Number</span>
          <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{destinationAccount?.account_number}</span>
        </div>
      </>
   
    )

}


DestinationDetails.propTypes = {
    destinationAccount: PropTypes.any,
  }

export default DestinationDetails;