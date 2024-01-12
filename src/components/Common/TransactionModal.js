import React, { useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types'
import axios from "axios";
import { withRouter, Link, useHistory } from "react-router-dom";
import NumberFormat from 'react-number-format';
import TransactionDetails from "../../../src/components/Common/TransactionDetails"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  Label,
  FormFeedback,
  Input,
  Form,
  Spinner
} from "reactstrap";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import * as Yup from "yup";
import { useFormik } from "formik";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

import ReportCard from "components/Common/ReportCard"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import ApproveModal from "components/Common/ApproveModal";
import ConfirmModal from "components/Common/ConfirmModal";
import DeclineModal from "components/Common/DeclineModal";

import {
    onGetTransactions,
    approveTransactions,
} from "store/transactions/actions";
import { isEmpty, size, map, values } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";

const API_URL = process.env.REACT_APP_BASE_URL


const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')){
      req.headers.Authorization = `Bearer ${ JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req;
});


 
const Transaction = ({ show, onCloseClick, userName, transactions }) => {


  const [blogModal, setBlogModal] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [loading, setLoading] = useState(false);


  const blogDetails = (transaction) => {
    setTransactionDetails(transaction)
    console.log(transaction);
    setBlogModal(true)
  }

    
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const defaultSorted = [
    {
      dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ];

  const selectRow = {
    mode: "checkbox",
  };

  const { SearchBar } = Search;
const sizePerPage = 10;
const pageOptions = {
  sizePerPage: sizePerPage,
  totalSize: transactions.length, // replace later with size(blogs),
  custom: true,
};

  const transactionListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      // eslint-disable-next-line react/display-name
      formatter: transaction => <>{transaction.id}</>,
    },
   
  

    {
        text: "Type",
        dataField: "transaction_type",
        sort: true,
        // eslint-disable-next-line react/display-name
        formatter: (cellContent, transaction) => (
          <>
            <h5 className="font-size-14 mb-1">
              <Link to="#" className="text-dark">
                {transaction.type} 
              </Link>
            </h5>
          
          </>
        ),
      },

      {
        text: "Amount",
        dataField: "amount",
        sort: true,
        // eslint-disable-next-line react/display-name
        formatter: (cellContent, transaction) => (
          <>
             <h5 className="font-size-14 mb-1">
              <Link to="#" className="text-dark">
              { transaction.type == "CRYPTO" || transaction.type === "TRANSFER" || transaction.type == "GIFTCARD" ? (
                 <>
                 {transaction.amount}{transaction.currency} /   &#8358;{transaction.corresponding_ngn_amount}
                 </>
              )  :
              transaction.type == "WITHDRAWAL" || transaction.type == "AIRTIME" || transaction.type == "DATA" || transaction.type == "FUNDING" || transaction.type == "SIGNUP_BONUS"  || transaction.type == "CABLE" || transaction.type == "ELECTRICITY" ? (
                 <>
                   <NumberFormat
                      value={transaction.amount}
                      className="foo"
                      displayType={'text'}
                      thousandSeparator={true}
                      renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                      /> 
                 </>
              ) 
              : null }
               
              </Link>
            </h5>
          
          </>
        ),
      },

    {
      dataField: "createdAt",
      text: "Date created",
      sort: true,

       // eslint-disable-next-line react/display-name
       formatter: (cellContent, transaction) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {transaction.createdAt } 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      dataField: "Status",
      text: "status",
      sort: true,

       // eslint-disable-next-line react/display-name
       formatter: (cellContent, transaction) => (
        <>
           {transaction.status === "SUCCESS" ? (
             <>
              <span style={{ color: "green"}}>{transaction.status}</span>
             </>
             ) : transaction.status === "FAILED" ? ( 
               <>
              <span style={{ color: "red"}}>{transaction.status}</span>
              </>
             ) : transaction.status === "QUEIUED" ? (
            
                <>
              <span style={{ color: "purlpe"}}>{transaction.status}</span>
              </>
            
              ) : transaction.status === "PENDING" ? (
              <>
              <span style={{ color: "orange"}}>{transaction.status}</span>
              </>
             ) : null }
        
        </>
      ),
    },
  
   
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, transaction) => (
        <div className="d-flex gap-3">
             <div className="text-primary" onClick={() => blogDetails(transaction)}>
            <i
              className="mdi mdi-eye font-size-18"
            ></i>
          </div>

         {/* {transaction.giftcard_category_type == "E-Code" || transaction.giftcard_category_type === "E-code" || transaction.giftcard_category_type === "E Code" && transaction.number === null && loggedInUser.data.role === 2 ? (
                <div className="pt-10" title="Update e code" onClick={() => onUpdateClick(transaction.id)}>
                <span  className="text-success">Update E-code</span>
              </div>
         ): null
         
         }

        {transaction.status == "QUEUED" && (loggedInUser.data.role === 2 || loggedInUser.data.role === 4) ? (
                <div className="pt-10" title="Confirm transaction" onClick={() => onConfirmClick(transaction.id)}>
                <span  className="text-success">Confirm</span>
              </div>
         ): null
         
         }
         
          {transaction.status === 'PENDING' && transaction.type != 'AIRTIME' && (loggedInUser.data.role === 2 || loggedInUser.data.role === 4) ? (
               <div className="pt-10" title="Approve transaction" onClick={() => onApproveClick(transaction.id)}>
                 <span  className="text-success">Approve</span>
               </div>
             ) : null
            }

          {transaction.status === 'PENDING' && transaction.type != 'AIRTIME' &&  (loggedInUser.data.role === 2 || loggedInUser.data.role === 4) ? (
               <div className="pt-10" title="Decline transaction" onClick={() => onDeclineClick(transaction.id)} >
                 <span  className="text-danger">Decline</span>
               </div>
             ) : null
            } */}
        </div>
      ),
    },
  ];

  const keyField = "status";


  var node = useRef();
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page);
    }
  };

  



  return (
    <React.Fragment>
    <TransactionDetails
    show={blogModal}
    transactionDetails={transactionDetails}
    onCloseClick={() => setBlogModal(false)}
    loading={loading}
  />

    <Modal isOpen={show} toggle={onCloseClick} size="lg" centered={true}>
        <ModalHeader toggle={onCloseClick} tag="h4">
            {userName} { '->'} transactions
        </ModalHeader>
      <ModalBody className="py-3 px-5">
        <Row>
        <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
        <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField={keyField}
                    columns={transactionListColumns}
                    data={transactions}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={transactions}
                          columns={transactionListColumns}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col sm="4">
                                  <div className="search-box ms-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar {...toolkitProps.searchProps} />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm="8">
                                  <div className="text-sm-end">
                                    {/* <Button
                                      color="primary"
                                      className="font-16 btn-block btn btn-primary"
                                      onClick={handleUserClicks}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      Create New User
                                    </Button> */}
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col xl="12">
                                  <div className="table-responsive">
                                    <BootstrapTable
                                      keyField={keyField}
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                      selectRow={selectRow}
                                      defaultSorted={defaultSorted}
                                      classes={
                                        "table align-middle table-nowrap table-hover"
                                      }
                                      bordered={false}
                                      striped={false}
                                      responsive
                                      ref={node}
                                    />

                                
                                  </div>
                                </Col>
                              </Row>
                              <Row className="align-items-md-center mt-30">
                                <Col className="pagination pagination-rounded justify-content-end mb-2">
                                  <PaginationListStandalone
                                    {...paginationProps}
                                  />
                                </Col>
                              </Row>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      );
                    }}
                  </PaginationProvider>
                </CardBody>
              </Card>
            </Col>
            </div>
        </Row>
      </ModalBody>
    </Modal>
    </React.Fragment>
  )
}

Transaction.propTypes = {
  onCloseClick: PropTypes.func,
  transactions: PropTypes.array,
  show: PropTypes.any,
  userName: PropTypes.any
}

export default Transaction
