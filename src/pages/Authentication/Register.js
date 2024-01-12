import React from 'react'
import MetaTags from "react-meta-tags";
import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label } from "reactstrap";
import image from "../../../src/assets/images/404.svg"
const Register = () => {
  return (
    <React.Fragment>
    <MetaTags>
      <title>404 | Sorry page not found</title>
    </MetaTags>
   
    <div className="account-pages my-5 pt-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={12} lg={6} xl={5}>
              <img src={image} alt="" />
              <p className="text-success">oops you are on the wrong page!!</p>
          </Col>
        </Row>
      </Container>
    </div>
  </React.Fragment>
 
  )
}

export default Register