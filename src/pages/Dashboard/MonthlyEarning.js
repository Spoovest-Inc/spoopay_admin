import React from "react"
import PropTypes from "prop-types";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import { Link } from "react-router-dom"
import NumberFormat from 'react-number-format';
import ApexRadial from "./ApexRadial"

const MonthlyEarning = ({totalAirtimeSells, totalElectricitySells, totalCableSells, totalDataSells}) => {
  return (
    <React.Fragment>
      {" "}
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Total bill earnings</CardTitle>
          <Row>
            <Col sm="6">
              <h3>
              <NumberFormat
                  value={totalAirtimeSells + totalElectricitySells + totalDataSells + totalCableSells}
                  className="foo"
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                  /> 
              </h3>
              <p className="text-muted">
                <span className="text-success me-2">
                  {" "}
                  12% <i className="mdi mdi-arrow-up"></i>{" "}
                </span>{" "}
                From previous period
              </p>
            </Col>
            <Col sm="6">
              <div className="mt-4 mt-sm-0">
                <ApexRadial />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

MonthlyEarning.propTypes = {
  totalAirtimeSells: PropTypes.any,
  totalElectricitySells: PropTypes.any,
  totalCableSells: PropTypes.any,
  totalDataSells: PropTypes.any
};
export default MonthlyEarning
