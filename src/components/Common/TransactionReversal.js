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
    Col,
    Spinner
  } from "reactstrap";
import { toast } from 'react-toastify';


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


const TransactionReversal =  ({ transactionDetails }) => {
  const [reversals, setReversals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getReversals()
  }, [])



  const getReversals = () => {
      axiosApi.get(`${API_URL}/api/v1/transactions/reversed_transactions/${transactionDetails.id}`).then((response) => {
          setReversals(response.data.data)
      }).catch((error) => {
        console.log(error.message)
      })
  }

  const reverseTransaction = (id) => {
         loading(true)
        axiosApi.get(`${API_URL}/api/v1/transactions/reverse/${id}`).then(() => {
                toast("Transaction reversal was successful")
                setLoading(false)
        }).catch((error) => {
            toast("oops, something went wrong: " + error.message)
            setLoading(false)
        })
  }



      

 
    return (
      <Row>
        <Col lg={12}>
          <div className="text-align-left">
            <div className="table-responsive">
                    <Table className="table-nowrap mb-0">
                        { reversals.length > 0 ? (
                             <>
                            { reversals.map((reverse) => (
                                <tbody key={reverse.id}>
                                <tr>
                                  <th scope="row">Status</th>
                                  <td>{reverse.status}</td>
                                </tr>
        
                                <tr>
                                  <th scope="row">Amount</th>
                                  <td>
                                  <NumberFormat
                                    value={reverse.amount}
                                    className="foo"
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                                    /> 
                                </td>
                                </tr>
        
                                <tr>
                                  <th scope="row">Date</th>
                                  <td>{reverse.createdAt}</td>
                                </tr>
        
                             
                              </tbody>
                             ))}
                             </>
                        ) : (
                            <p style={{ textAlign: 'center', padding: '30px'}}>No reversal record for this transaction</p>
                        ) }
                     
                      
                    </Table>
                  </div>
      </div>
        </Col>

        <Col lg={12}>
            { transactionDetails.status === "FAILED" && transactionDetails.is_reversed === false ? (
                <>
               {reversals.length == 0 ? (
              <Button onClick={(e) => reverseTransaction(transactionDetails.id)}>
                 { loading ? (
                     <>
                     <Spinner
                       as="span"
                       animation="grow"
                       size="sm"
                       role="status"
                       aria-hidden="true"
                     />
                     Reversing...
                     </>
                 ) : (
                    "Reverse transaction"
                 )}
              
                </Button>
                ): null
                 }
                </>
            ): null}
        
          
        </Col>
        
      </Row>
       
    )

}


TransactionReversal.propTypes = {
    transactionDetails: PropTypes.any,
  }

export default TransactionReversal;