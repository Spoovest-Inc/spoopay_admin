import React, {useState} from 'react';
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format';
import {
    Card,
    CardBody,
    Button,
    Table
  } from "reactstrap";

  import logolight from "../../assets/images/flipBlack.png";
import batchImage from "../../assets/images/batch.png";
import timeImage from "../../assets/images/time.png";
import axios from "axios";



const API_URL = process.env.REACT_APP_BASE_URL


const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')){
      req.headers.Authorization = `Bearer ${ JSON.parse(localStorage.getItem('profile')).token}`,
      req.headers.Accept = 'application/json'
  }
  return req;
});


const Development = () => {
    const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem("profile")))

    return (
        <Card style={{ borderRadius: "16px", border:" 2px solid #E7E9EB"}}>
                <CardBody>
                <img src={logolight}   width="20%"  className="auth-logo-light" />
                      <hr />
                     <h4 
                     style={{ 
                        width: "219px",
                        height: "30px",
                        fontFamily: 'Euclid Circular A',
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "24px",
                        lineHeight: "30px",
                       
                        color: "#000000",
                        }}>Developing......</h4>

                       <p style={{ 
                        width: "219px",
                        height: "40px",
                        fontFamily: 'Euclid Circular A',
                        fontStyle: "normal",
                        fontWeight: "500",
                        color: "#717171",
                       }}>
                        Hello {userDetails?.name} please kindly wait as we develop this page.
                       
                      </p>

                      <img src={batchImage}    width="36%"  style={{ marginLeft: "35%", marginTop: "40px"}}/>

                      <button style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        marginTop: "30px",
                        alignItems: "center",
                        padding: "11px 20px",
                        gap: "10px",
                        width: "100%",
                        height: "42px",
                        backgroundColor: "#FBE4C5",
                        border: "none",
                        borderRadius: "8px",
                      }} onClick={() => history.push("/login")} >  <img src={timeImage} />Please checkback later for update.</button>
                </CardBody>
              
              </Card>
    )

}



export default Development;