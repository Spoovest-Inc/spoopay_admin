import PropTypes from "prop-types";
import MetaTags from "react-meta-tags";
import React, {useState, useEffect} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import AuthCode from "react-auth-code-input"
//apply base url for axios
const API_URL = process.env.REACT_APP_BASE_URL

const axiosApi = axios.create({
  baseURL: API_URL,
});



import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label, Spinner,FormGroup, CardHeader, } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter, Link } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";


// actions
import { loginUser } from "../../store/actions";


// import images
import profile from "assets/images/profile-img.png";
import logolight from "../../assets/images/FlipEx/logo.png";



const VerifyToken = props => {

  
  const dispatch = useDispatch();



  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      otp: otp,
      otpType: "EMAIL-VERIFICATION",
      email: email
  }
  setLoading(true);
   axiosApi.post(`${API_URL}/` + 'api/v1/admin/verify-admin', data).then((res) => {
        if(res.data.code == 200){
          localStorage.setItem("profile", JSON.stringify(res.data));
          props.history.push("/affirmation");
        }else{ 
        }  
   
   }).catch((err) => {
      setTokenError(err.response.data.message)
      setLoading(false);
   })
  }

  const verifyAdmin = () => {
    setLoading(false);
    axiosApi.post(`${API_URL}/` + 'api/v1/admin/verify-token').then((res) => {
      if(res.data.code == 200){
        localStorage.setItem("profile", JSON.stringify(res));
        props.history.push("/dashbboard");
      }else{
      }  
 
 }).catch((err) => {
    setTokenError(err.response.data.message)
    setLoading(false);
 })
  }




  useEffect(() => {
    if (localStorage.getItem("profile")) {
        const obj = JSON.parse(localStorage.getItem("profile"))
        setEmail(obj.email)
    
    }
  }, [])




const [tokenError, setTokenError] = useState("")
const [loading, setLoading] = useState(false)
const [email, setEmail] = useState("")
const [otp, setOtp] = useState("")


const resendCode = () => {
    const data = {
        email: email
    }
    axiosApi.post(`${API_URL}/` + "api/v1/admin/resend-code", data).then((res) => {
        setLoading(false);
        toast("Code has been sent successfully")
     }).catch((err) => {
        setTokenError(err.message)
        setLoading(false);
     })
}

const handleChange = (code) => {
    setOtp(code)
}

useEffect(() => {
  if (localStorage.getItem("profile")) {
      const obj = JSON.parse(localStorage.getItem("profile"))
      setEmail(obj.email)
  
  }
}, [])




  return (
    <React.Fragment>
      <MetaTags>
        <title>Verify token | FlipEX Admin Dashboard</title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
            <Row className="justify-content-center">
              <Col md={4}>
                <Card style={{ borderRadius: "16px", border:" 2px solid #E7E9EB"}}>
                 

                  <CardBody>
                    <img src={logolight}   width="20%"  className="auth-logo-light" />
                      <hr />
                      {tokenError ? <Alert color="danger">{tokenError}</Alert> : null}
                     <h4 style={{ paddingTop: "30px"}}>Enter verification code</h4>
                      <p style={{ paddingTop: "10px"}}>
                        We&apos;ve sent a code to{" "}
                        <span className="font-weight-semibold">
                         { email }
                          </span>
                      </p>


                      <Form   className="form-horizontal"> 
                            <Row>
                              <Col xs={12}>
                                <FormGroup className="verification-2 mb-3">
                                 
                                  <AuthCode
                                    characters={4}
                               
                                    className="form-control form-control-lg text-center"
                                    inputStyle={{
                                      width: "50px",
                                      height: "calc(1.5em + 1rem + 2px)",
                                      padding: ".5rem 1rem",
                                      borderRadius: "8px",
                                      fontSize: "1.01562rem",
                                      textAlign: "center",
                                      marginRight: "15px",
                                      border: "1px solid #ced4da",
                                      textTransform: "uppercase",
                                      borderRadius: ".4rem"
                                    }}
                                    onChange={handleChange}
                                  />
                                </FormGroup>

                                <span>Didn&apos;t get a code?</span> <span  onClick={(e) => { resendCode()}} style={{ color: "#000"}}>Click to Resend</span>
                              </Col>
                            </Row>
                            <Row style={{ marginTop: "30px"}}>
                              <Col md={6}>
                                <button type="submit" style={{
                                   display: "flex",
                                   flexDirection: "row",
                                   justifyContent: "center",
                                   alignItems: "center",
                                   padding: "21px 20px",
                                   gap: "10px",
                                   width: "100%",
                                   height: "40px",
                                   color: '#000',
                                   backgroundColor:"#fff",
                                   borderRadius: "8px",
                                   border: "1px solid gray"
                                }}>Back</button>
                              </Col>
                              <Col md={6}>
                              <button  style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "21px 20px",
                                gap: "10px",
                                width: "100%",
                                height: "40px",
                                color: '#fff',
                                backgroundColor:"#000000",
                                borderRadius: "8px",
                                border: "none"
                              }} onClick={(e) =>  handleSubmit(e) }>   
                              { !loading && 'Verify'}
                              { loading && (
                                <>
                                 <Spinner
                                  as="span"
                                  animation="grow"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                                Loading...
                                </>
                              ) 
                              }</button>
                              </Col>
                            </Row>
                          </Form>


                  </CardBody>
                </Card>
              </Col>
            </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(VerifyToken);

VerifyToken.propTypes = {
  history: PropTypes.object,
};
