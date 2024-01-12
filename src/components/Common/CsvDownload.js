import PropTypes from 'prop-types'
import React from "react";
import { CSVLink } from "react-csv";




const CsvDownloadButton = ({ children, data, filename }) => {
  return (
    <CSVLink data={data} filename={filename}>
      {children}
    </CSVLink>
  );
};

CsvDownloadButton.propTypes = {
    children: PropTypes.ReactNode,
    data: PropTypes.any,
    filename: PropTypes.any
}
export default CsvDownloadButton;
