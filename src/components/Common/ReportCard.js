import React from 'react';
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format';
import {
    Card,
    CardBody,
    Col
  } from "reactstrap";
const reportCard = ({ reportTitle, reportDes, icon}) => {
    return (
        <Col>
        <Card className="mini-stats-wid">
          <CardBody>
            <div className="d-flex">
              <div className="flex-grow-1">
                <p className="text-muted fw-medium">
                  { reportTitle }
                  <img src={icon} alt='jjj' height={20} style={{ float:'right'}} />
                </p>
                <h2 className="pt-5">{reportDes}</h2>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    )

}


reportCard.propTypes = {
    reportTitle: PropTypes.any,
    reportDes: PropTypes.any,
    reportIconClass: PropTypes.string,
    colClass: PropTypes.string
  }

export default reportCard;