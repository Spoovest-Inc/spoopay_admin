import React from 'react';
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format';
import {
    Card,
    CardBody,
    Col
  } from "reactstrap";

const DashboardReport = ({reportTitle,reportDes,reportIconClass}) => {
    return (
        <Col md="4">
        <Card className="mini-stats-wid">
          <CardBody>
            <div className="d-flex">
              <div className="flex-grow-1">
                <p className="text-muted fw-medium">
                  {reportTitle}
                </p>
                <h4 className="mb-0">{reportDes}</h4>
              </div>
              <div className="avatar-sm rounded-circle bg-success align-self-center mini-stat-icon">
                <span className="avatar-title rounded-circle bg-success">
                  <i
                    className={
                      "bx " + reportIconClass + " font-size-24"
                    }
                  ></i>
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    )
}
DashboardReport.propTypes = {
    reportTitle: PropTypes.any,
    reportDes: PropTypes.any,
    reportIconClass: PropTypes.string,
  }

export default DashboardReport;