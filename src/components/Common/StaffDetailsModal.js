import PropTypes from 'prop-types'
import React, { useEffect } from "react"
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import { Col, Modal, ModalBody, Row, Table } from "reactstrap"
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


const UserDetails = ({ show, onCloseClick, userDetail, walletBalance }) => {

  return (
    <Modal isOpen={show} toggle={onCloseClick} centered={true} size="lg">
      <ModalBody className="py-3 px-5">
        <Row>
          <Col lg={12}>
            <div className="text-center">
              <i
                className="mdi mdi-user-circle text-center"
                style={{ fontSize: "9em", color: "green" }}
              />
               <img src={ userDetail.passport_url} alt='' width="250" height="250" style={{ borderRadius: 100}} />


            
            <div className="table-responsive">
                    <Table className="table-nowrap mb-0">
                      <tbody>
                        <tr>
                          <th scope="row">Full Name</th>
                          <td>{ userDetail.title + " " + userDetail.firstName + " " + userDetail.lastName}</td>
                        </tr>
                        <tr>
                          <th scope="row">Mobile</th>
                          <td>{userDetail.phone_number}</td>
                        </tr>
                        <tr>
                          <th scope="row">E-mail</th>
                          <td>{userDetail.email}</td>
                        </tr>
                        <tr>
                          <th scope="row">Nationality</th>
                          <td>{userDetail.nationality}</td>
                        </tr>

                        <tr>
                          <th scope="row">Address</th>
                          <td>{userDetail.address}</td>
                        </tr>

                        <tr>
                          <th scope="row">Position/Job title</th>
                          <td>{userDetail.job_title}</td>
                        </tr>

                        <tr>
                          <th scope="row">Employment Date</th>
                          <td>{userDetail.employment_date}</td>
                        </tr>


                        <tr>
                          <th scope="row">Wallet Balance</th>
                          <td>
                          <NumberFormat
                              value={walletBalance}
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
            <div className="alert alert-success">
                    <h3>Referers Details</h3>
                      <span style={{ float: "left"}}>Fullname</span> <span style={{ float: "right"}}>{userDetail.reference_name}</span> <br />
                      <span style={{ float: "left"}}>Email</span> <span style={{ float: "right"}}>{userDetail.reference_email}</span> <br />
                      <span style={{ float: "left"}}>Phone number</span> <span style={{ float: "right"}}>{userDetail.reference_phone_number}</span>
                  </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center mt-3">
            <i
                className="mdi mdi-close"
                style={{ fontSize: "2em", color: "green" }}
                onClick={onCloseClick}
              />
            
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

UserDetails.propTypes = {
  onCloseClick: PropTypes.func,
  userDetail: PropTypes.any,
  walletBalance: PropTypes.any,
  show: PropTypes.any
}

export default UserDetails
 