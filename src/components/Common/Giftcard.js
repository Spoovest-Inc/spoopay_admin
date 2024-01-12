import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format';
import firebase from 'firebase/compat/app'
import  {firestore} from "firebase/compat/firestore";
import { saveAs} from "file-saver"
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


const GiftCard =  ({ transactionDetails }) => {
  
  const [cardName, setCardName] = useState("")
 
  const [user_id, setUserId] = useState(transactionDetails.user_id)




 

  const downloadImage = (image) => {
    saveAs(`${image}`, 'image.jpg')
  }

 
    return (
      <Row>
    

            {transactionDetails?.giftcard_images === null ? (
              <>
              <h3>No uploaded images for the card.</h3>
              </>

            ) : (
              <>
               <Col lg={4} style={{ border: "1px solid gray", borderRadius: "5px"}}>
                 <img src={transactionDetails?.giftcard_images[0]} alt={transactionDetails.cardName}  onClick={(e) => downloadImage(e)} style={{ height: '100%', width: '100%' }} />
               </Col>
   
               <Col lg={4} style={{ border: "1px solid gray", borderRadius: "5px"}}>
               <img src={transactionDetails?.giftcard_images[1]} alt={transactionDetails.cardName}  onClick={(e) => downloadImage(e)} style={{ height: '100%', width: '100%' }} />
               </Col>
              </>
              
            )}

          
          <br />


          <>
      <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
      
        <span>Transaction Type</span>
        <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{transactionDetails?.type}</span> <hr />

        <span>Naira Value</span>
        <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>
        <NumberFormat
           value={transactionDetails.corresponding_ngn_amount}
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
            ) : transactionDetails.status === "QUEUED" ? (
           
               <>
             <span style={{ color: "purlpe"}}>{transactionDetails.status}</span>
             </>
           
             ) : transactionDetails.status === "PENDING" ? (
             <>
             <span style={{ color: "orange"}}>{transactionDetails.status}</span>
             </>
            ) : null }
           </span> <hr />


         <span>Denomination</span>
         <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{transactionDetails?.range}</span> <hr />

         <span>Traded Value</span>
         <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{transactionDetails?.amount + " " + transactionDetails.currency}</span> <hr />

         <span>Rate</span>
         <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{transactionDetails?.rate}/$</span> <hr />

         <span>Card Type</span>
         <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{transactionDetails?.giftcard_category_type}</span> <hr />

       
         {transactionDetails.giftcard_category_type === "E-Code" && 
                   (
                   <>
                  <span>Card Type</span>
                  <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{transactionDetails.number}</span> <hr />
                   </>
                   )  
              }
      

         <span>Date</span>
         <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{transactionDetails?.createdAt}</span> <hr />
       </div>
     </>
    </Row>  
       
    )

}


GiftCard.propTypes = {
    transactionDetails: PropTypes.any,
  }

export default GiftCard;