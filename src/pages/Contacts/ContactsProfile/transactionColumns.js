import React, { useEffect, useState } from "react"
import MetaTags from 'react-meta-tags';
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"

const transactionColumns = ({ transaction}) => [
  {
    dataField: "id",
    text: "#",
    sort: true,
    formatter: transaction => <>{transaction.id}</>,
  },
  {
    dataField: "type",
    text: "Type",
    sort: true,

    formatter: (cellContent, transaction) => (
      <>
        <h5 className="font-size-14 mb-1">
          <Link to="#" className="text-dark">
            { } 
          </Link>
        </h5>
      
      </>
    ),
  },
 
  {
    dataField: "deadline",
    text: "Deadline",
    sort: true,
  },
  {
    dataField: "created_at",
    text: "Date",
    sort: true,
  },
]

export default transactionColumns
