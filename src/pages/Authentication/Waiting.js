import React, {useState, useEffect} from "react"
import MetaTags from 'react-meta-tags';
import PropTypes from "prop-types";
import { withRouter, Link, useHistory } from "react-router-dom";

import { Row, Col, CardBody, Card, Container } from "reactstrap";

import { Route, Redirect } from "react-router-dom"

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


import logolight from "../../assets/images/flipBlack.png";
import batchImage from "../../assets/images/batch.png";
import timeImage from "../../assets/images/time.png";
//redux
import { useSelector, useDispatch } from "react-redux";
// actions
import { createBatch, logoutUser } from "../../store/actions";
import { fetchBatch } from "../../store/actions"


//Import Images
import error from "../../assets/images/error-img.png"
import { fetchTodayBatch } from "helpers/backend_helper";

const Waiting = props => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [fullname, setFullname] = useState("")

    useEffect(() => {
        if (localStorage.getItem("user")) {
          const obj = JSON.parse(localStorage.getItem("user"));
          const name = obj.name
          setFullname(name)
        }
      }, []);

   


 

      const logUserOut = () => {
          dispatch(logoutUser(history))
      }

    

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-5">
        <MetaTags>
          <title>Wait for batch | FlipEX Admin Dashboard</title>
        </MetaTags>
        <Container>
        <Row className="justify-content-center">
           <Col md={4}>
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
                        }}>Waiting for batch......</h4>

                       <p style={{ 
                        width: "219px",
                        height: "40px",
                        fontFamily: 'Euclid Circular A',
                        fontStyle: "normal",
                        fontWeight: "500",
                        color: "#717171",
                       }}>
                        Hello {fullname} please kindly wait for the batch to be openned for work today.
                       
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
                      }} onClick={() => history.push("/login")} >  <img src={timeImage} />Go to dashboard if batch is open.</button>
                </CardBody>
              
              </Card>
           </Col>
         </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Waiting)


Waiting.propTypes = {
  history: PropTypes.object,
};
