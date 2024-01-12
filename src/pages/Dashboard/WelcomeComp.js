import React from "react"
import PropTypes from "prop-types";
import { Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

import avatar1 from "../../assets/images/users/avatar-1.jpg"
import profileImg from "../../assets/images/profile-img.png"

const WelcomeComp = ({userDetails}) => {
  return (
    <React.Fragment>
      <Card className="overflow-hidden">
        <div className="bg-success bg-soft">
          <Row>
            <Col xs="7">
              <div className="text-default p-3">
                <h5 className="text-default">Welcome Back !</h5>
                <p>FlipEx</p>
              </div>
            </Col>
            <Col xs="5" className="align-self-end">
              <img src={profileImg} alt="" className="img-fluid" />
            </Col>
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="4">
              <div className="avatar-md profile-user-wid mb-4">
                <img
                  src={avatar1}
                  alt=""
                  className="img-thumbnail rounded-circle"
                />
              </div>
              <h5 className="font-size-15 text-truncate">{userDetails?.data.name}</h5>
              <p className="text-muted mb-0 text-truncate">

              { userDetails.data.role == 3 ? (
                 <span>Super Admin</span>
              )  :
                userDetails.data.role == 2 ? (
                   <span>Content creator</span>
              ) : userDetails.data.role  == 1 ? (
                 <span>Level 2 admin</span>
              ): null }
               
                
              </p>
            </Col>

           
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

WelcomeComp.propTypes = {
  userDetails: PropTypes.any,
};

export default WelcomeComp
