import React, {useState, useEffect} from "react"
import MetaTags from 'react-meta-tags';
import PropTypes from "prop-types";
import { withRouter, Link, useHistory } from "react-router-dom";

import { Row, Col, CardBody, Card, Container } from "reactstrap";

import { Route, Redirect } from "react-router-dom"

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


import logolight from "../../assets/images/FlipEx/logo.png";
import batchImage from "../../assets/images/FlipEx/affirm.jpg";
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
    const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
    const [time, setTime] = useState("")

   


 

      const logUserOut = () => {
          dispatch(logoutUser(history))
      }

      useEffect(() => {
        formatAMPM(new Date)
      }, [])

      const  formatAMPM = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        setTime(strTime)
        return strTime;
      }
      


    

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-5">
        <MetaTags>
          <title>Daily Affirmation | FlipEX Admin Dashboard</title>
        </MetaTags>
        <Container>
   
        <Row className="justify-content-center">
           <Col md={6}>
              <Card style={{ borderRadius: "16px", border:" 2px solid #E7E9EB"}}>
                <CardBody>
                <img src={logolight}   width="20%"  className="auth-logo-light" />
                      <hr />

                      <h6 style={{ 
                        height: "40px",
                        fontFamily: 'Euclid Circular A',
                        fontStyle: "normal",
                        fontWeight: "500",
                        color: "#717171",
                        textAlign: "center",
                        paddingTop: "30px"
                       }}>
                        
                        Good afternoon {loggedInUser.data.name}, Hope your day is going fine, Please kindly read the short affirmation note below to 
                      have a great working experience @FlipEx today.
                       
                      </h6>

                      <img src={batchImage}    width="100%"  style={{ marginTop: "40px"}}/>

                     
                  
                      <button style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        marginTop: "50px",
                        alignItems: "center",
                        gap: "10px",
                        width: "100%",
                        height: "42px",
                        backgroundColor: "#FBE4C5",
                        border: "none",
                        borderRadius: "8px",
                      }} onClick={() => history.push("/dashboard")} >  <img src={timeImage} />Click to start making FlipEx Users happy.</button>
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
