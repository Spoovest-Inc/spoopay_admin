import PropTypes from "prop-types";
import React, {useState} from "react";
import MetaTags from 'react-meta-tags';
import { Link } from "react-router-dom";
import { Col, Container, Form, Row, Input, Label, FormFeedback,Alert, Spinner} from "reactstrap";
import EyeShowIcon from "../../assets/images/FlipEx/eye.svg"
import EyeHideIcon from "../../assets/images/FlipEx/hide.svg"
import axios from "axios";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// import images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/flipBlack.png";
import CarouselPage from "../AuthenticationInner/CarouselPage";



import { useSelector, useDispatch } from "react-redux";

import { withRouter } from "react-router-dom";



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

import SuccessModals from "../../components/Common/successModal";


const Login = props => {
  const [showPassword, setShowPassword] = React.useState(true);
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [messageTitle, setMessageTitle] = useState("")
  const [messageDetails, setMessageDetails] = useState("")
  const [messageType, setMessageType] = useState("")
  const [successModal, setSuccessModal] = useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
      new_password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
      new_password: Yup.string().required("Please Enter Your new password")
    }),
    onSubmit: async (values) => {
      setLoading(true)
      await axiosApi.post(`${API_URL}/api/v1/admin/change-password`, values).then((res) => {
        setLoading(false)
        setMessageType("Success")
        setMessageTitle("Password changed sucesfully");
        setMessageDetails("You have succesfully changed your admin password on Flipex.")
        setSuccessModal(true)
        props.history.push("/login")
      }).catch((error) => {
        setError(error.response.data.message)
        setLoading(false)
      })
    }
  });







  // handleValidSubmit
  const handleValidSubmit = (event, values) => {
    dispatch(loginUser(values, props.history));
  };
  return (
    <React.Fragment>
       <SuccessModals 
         title={messageTitle} 
         details={messageDetails}
         show={successModal} 
         messageType={messageType}
         onCloseClick={() => setSuccessModal(false)}
         />
      <div>
        <MetaTags>
          <title>New Admin Change Password | FlipEx Dashboard</title>
        </MetaTags>
        <Container fluid className="p-0">
          <Row className="g-0">
            <CarouselPage />

            <Col xl={4}>
              <div className="auth-full-page-content p-md-5 p-2 justify-content-center">
                <div className="w-100">
                  <div className="d-flex flex-column h-100">
                    <div className="my-auto">
                      <div>
                        <h5  style={{ fontFamily: "Euclid Circular A", fontWeight: "500", fontSize: "24px", color: "#000"}}>Welcome to FlipEX</h5>
                        <p style={{ fontFamily: "Euclid Circular A", fontStyle: "normal", lineHeight: "20px", fontWeight: "500", fontSize: "16px", color: "#717171" }}>
                          Please enter your details to activate your admin account!.
                        </p>
                        {error ? <Alert color="danger">{error}</Alert> : null}
                      </div>

                      <div className="mt-4">
                        <Form className="form-horizontal"
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                        >
                          <div className="mb-3">
                            <Label style={{ fontFamily: "Euclid Circular A", color: "#000000", fontWeight: "500", fontSize: "16px"}}>Email Address</Label>
                             <Input
                              style={{ backgroundColor: '#F9F9F9', height: '60px', width: '392px', border: '2px solid #E7E9EB', borderRadius: '8px', boxSizing: 'border-box'}}
                              name="email"
                              className="form-control"
                              placeholder="Enter your email..."
                              type="email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              
                              invalid={
                                validation.touched.email && validation.errors.email ? true : false
                              }
                            />

                            
                            {validation.touched.email && validation.errors.email ? (
                              <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3" >
                            <Label style={{ fontFamily: "Euclid Circular A", color: "#000000", fontWeight: "500", fontSize: "16px"}}>Old Password</Label>
                            <div style={{ position: "relative"}}>
                              <Input
                                style={{ backgroundColor: '#F9F9F9', height: '60px', width: '392px', border: '2px solid #E7E9EB', borderRadius: '8px', boxSizing: 'border-box'}}
                                name="password"
                                value={validation.values.password || ""}
                                type={showPassword ? "text" : "password"}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                invalid={
                                  validation.touched.password && validation.errors.password ? true : false
                                }
                              /> 

                              <img src={showPassword ? EyeShowIcon : EyeHideIcon}   onClick={() => setShowPassword(!showPassword)} alt="" style={{ position: "absolute", top: 15, right: 3}} />
                            </div>
                            
                            {validation.touched.password && validation.errors.password ? (
                              <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3" >
                            <Label style={{ fontFamily: "Euclid Circular A", color: "#000000", fontWeight: "500", fontSize: "16px"}}>Your New Password</Label>
                            <div style={{ position: "relative"}}>
                              <Input
                                style={{ backgroundColor: '#F9F9F9', height: '60px', width: '392px', border: '2px solid #E7E9EB', borderRadius: '8px', boxSizing: 'border-box'}}
                                name="new_password"
                                value={validation.values.new_password || ""}
                                type={showPassword ? "text" : "password"}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                invalid={
                                  validation.touched.new_password && validation.errors.new_password ? true : false
                                }
                              /> 

                              <img src={showPassword ? EyeShowIcon : EyeHideIcon}   onClick={() => setShowPassword(!showPassword)} alt="" style={{ position: "absolute", top: 15, right: 3}} />
                            </div>
                            
                            {validation.touched.new_password && validation.errors.new_password ? (
                              <FormFeedback type="invalid">{validation.errors.new_password}</FormFeedback>
                            ) : null}
                          </div>

                         

                          <div className="mt-3 d-grid">
                            <button
                              style={{ 
                                 display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItem: "center",
                                padding: "21px 20px",
                                gap: "10px", 
                                width: "392px",
                                height: "62px",                    
                                backgroundColor: "#000000",
                                borderRadius: "8px",
                                color: '#FFFFFF'
                              }}
                              type="submit"
                            >
                              { !loading && 'Change password'}
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
                          }
                            </button>
                          </div>

                        </Form>

                      
                        <div className="mt-5 text-center">
                         
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 mt-md-5 text-center">
                     
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};


export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
