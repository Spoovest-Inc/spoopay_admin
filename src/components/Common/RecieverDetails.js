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


const RecieverDetails =  ({ userDetails, wallet_balance }) => {

    return (
      <Row>
        <Col lg={12}>
          <div className="text-align-left">
            <div className="table-responsive">
                    <Table className="table-nowrap mb-0">
                      <tbody>
                        <tr>
                          <th scope="row">Fullname</th>
                          <td>{userDetails.name}</td>
                        </tr>
                       
                        <tr>
                          <th scope="row">Email</th>
                          <td>{userDetails.email}</td>
                        </tr>

                       
                        <tr>
                          <th scope="row">Phone number</th>
                          <td>{userDetails.phone_number}</td>
                        </tr>

                        <tr>
                          <th scope="row">Country</th>
                          <td>{userDetails.country}</td>
                        </tr>

                      

                     

                        <tr>
                          <th scope="row">Wallet balance</th>
                          <td>
                          <NumberFormat
                            value={wallet_balance}
                            className="foo"
                            displayType={'text'}
                            thousandSeparator={true}
                            renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                            /> 
                        </td>
                        </tr>

                     
                      </tbody>
                    </Table>
                  </div>
      </div>
        </Col>
        
      </Row>
       
    )

}


RecieverDetails.propTypes = {
  userDetails: PropTypes.any,
  wallet_balance: PropTypes.any
  }

export default RecieverDetails;