import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Avatar from "../../../assets/images/FlipEx/avatar.svg"
import { Link, withRouter } from "react-router-dom"
import * as Yup from "yup";
import { useFormik } from "formik";
import { map } from "lodash"
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Table,
  Label,
  FormFeedback,
  Input,
  Spinner,
  Form,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"


import ToolkitProvider from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"
import activityColumns from "./activityColumns"

const ContactsProfile = props => {

  const [adminActivities, setAdminActivities] = useState([])
  const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem("profile")))
  const [loading, setLoading] = useState(false)

const loadAdminProfile = () => {

}

const toggle = () => {
  setModal(!modal);
};

const validation = useFormik({
  // enableReinitialize : use this flag when initial values needs to be changed
  enableReinitialize: true,

  initialValues: {
    name: (userProfile && userProfile.name) || '',
    email: (userProfile && userProfile.email) || '',
    phone_number: (userProfile && userProfile.phone_number) || '',
    
  },
  validationSchema: Yup.object({
    name: Yup.string().required("Please Enter full name"),
    email: Yup.string().required("Please Enter  Email"),
    phone_number: Yup.number().required("Please enter phone number")

  }),
  onSubmit: (values) => {
       setLoading(true);
      const newUser = {
        name: values["name"],
        email: values["email"],
        phone_number: values["phone_number"],
        password: values["password"],
        country: country,
        role: adminType,
      };
      // save new user
      axiosApi.post(`${API_URL}/api/v1/admin/create`, newUser).then((response) => {
        setLoading(false);
        setMessageType("Success")
        setMessageTitle("Admin added successfully");
        setMessageDetails("You have succesfully added an admin to Flipex.")
        setSuccessModal(true);
        validation.resetForm();
      }).catch((error) => {
        setMessageType("Error")
        setMessageTitle("Admin added failed");
        setMessageDetails(error.response.data.message)
        setSuccessModal(true);
        setLoading(false);
        validation.resetForm();
      
      })
    toggle();
  },
});


  useEffect(() => {
    loadAdminProfile()
  }, [loadAdminProfile])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile |FlipEx Admin  </title>
        </MetaTags>
        <Container fluid>
          <Row>
            <Col xl="6">
              <Card>
                <CardBody>
                   <span>
                    <img src={Avatar} alt="" />
                   </span>
                  <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
                   <h3>Contact Details</h3>

                             <Form
                                          onSubmit={(e) => {
                                            e.preventDefault();
                                            validation.handleSubmit();
                                            return false;
                                          }}
                                        >
                                          <Row form>
                                            <Col xs={12}>
                                            
                                    
                                              <>
                                               <div style={{ border: "1px solid #E5E5E5", borderRadius: "8px", marginTop: "20px"}} className="p-2">
                                              <Row>
                                                  <Col md={12}>
                                                    <div className="mb-3">
                                                    <Label className="form-label">Fullname</Label>
                                                    <Input
                                                      name="name"
                                                      type="text"
                                                      onChange={validation.handleChange}
                                                      onBlur={validation.handleBlur}
                                                      value={validation.values.name || ""}
                                                      invalid={
                                                        validation.touched.name && validation.errors.name ? true : false
                                                      }
                                                    />
                                                    {validation.touched.name && validation.errors.name ? true : false? (
                                                      <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                                                    ) : null}
                                                  
                                                  </div>

                                              
                                                  </Col>
                                              </Row>

                                              <Row>
                                                <Col md={6}>
                                                   <div className="mb-3">
                                                    <Label className="form-label">Email</Label>
                                                    <Input
                                                      name="email"
                                                      label="Email"
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
                                                </Col>

                                                <Col md={6}>
                                                    <div className="mb-3">
                                                    <Label className="form-label">Phone number</Label>
                                                    <Input
                                                      name="phone_number"
                                                      label="phone_number"
                                                      type="text"
                                                      onChange={validation.handleChange}
                                                      onBlur={validation.handleBlur}
                                                      value={validation.values.phone_number || ""}
                                                      invalid={
                                                        validation.touched.phone_number && validation.errors.phone_number ? true : false
                                                      }
                                                    />
                                                    {validation.touched.phone_number && validation.errors.phone_number ? (
                                                      <FormFeedback type="invalid">{validation.errors.phone_number}</FormFeedback>
                                                    ) : null}
                                                  </div>
                                                  </Col>
                                              </Row>

                                              
                                              <Row>
                                            <Col>
                                              <div className="">
                                                    <button
                                                    type="submit"
                                                    className="btn btn-primary"
                                                    >
                                                        { !loading && "Save Update" }
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
                                            </Col>
                                          </Row>

                                           <h5 className="pt-3">Security</h5>

                                           <div className="">
                                                    <button
                                                    style={{ border: '1px solid gray'}}
                                                    className="btn btn-default btn-lg"
                                                    >
                                                        Logout   <i className="mdi mdi-arrow-right me-1" />
                                                    </button>

                                                    <button
                                                    style={{ border: '1px solid gray', marginLeft: "20px"}}
                                                    className="btn btn-default btn-lg"
                                                    >
                                                      Delete Account
                                                      <i className="mdi mdi-arrow-right me-1" />
                                                    </button>
                                                

                                                
                                               

                                             
                                              </div>
                                         </div>
                                              </>
                                        
                                            
                                            
                                         

                                          
                                          


                                            </Col>
                                          </Row>
                                         
                                        </Form>
                  </div>
            
                  </CardBody>
                </Card>


            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

ContactsProfile.propTypes = {
  userProfile: PropTypes.any,
  onGetUserProfile: PropTypes.func,
}

const mapStateToProps = ({ contacts }) => ({
  userProfile: contacts.userProfile,
})

const mapDispatchToProps = dispatch => ({
  onGetUserProfile: () => dispatch(getUserProfile()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactsProfile))
