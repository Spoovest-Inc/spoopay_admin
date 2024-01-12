import React, { useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types'
import MetaTags from "react-meta-tags";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { withRouter, Link, useHistory } from "react-router-dom";

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
  Spinner,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
import PendingTrans from "../../assets/images/FlipEx/p_trans.svg"
import PendingCrypto from "../../assets/images/FlipEx/p_crypto.svg"
import PendingGift from "../../assets/images/FlipEx/redeem.svg"
import PendingWithdrawals from "../../assets/images/FlipEx/p_withdrawals.svg"

import TransactionDropdown  from "components/Common/TransactionDropdown"


import { isEmpty, size, map, values } from "lodash";



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



const PendingTransactions = ()  => {

  const [transaction, setTransaction] = useState();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);


  const [ transactions, setTransactions] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const [menu, setMenu] = useState(false)
  

  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: transactions.length, // replace later with size(blogs),
    custom: true,
  };
  // const defaultSorted = [
  //   {
  //     dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
  //     order: "desc", // desc or asc
  //   },
  // ];

  const selectRow = {
    mode: "checkbox",
  };

  const loadTransactions = async() => {
     await  axiosApi.get(`${API_URL}/api/v1/transactions/pending`).then((response) => {
         setTransactions(response.data)
      }).catch((error) => {
      })
  }


  useEffect(() => {
    if (transactions && !transactions.length) {
      loadTransactions()
      setIsEdit(false);
    }
  }, []);


  useEffect(() => {
    setTransaction(transactions);
    setIsEdit(false);
  }, [transactions]);

  useEffect(() => {
    if (!isEmpty(transactions) && !!isEdit) {
      setBlog(transactions);
      setIsEdit(false);
    }
  }, [transactions]);

  const toggle = () => {
    setModal(!modal);
  };



  

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

  





 


  const filterTransactionByType = (e) => {
    setLoading(true)
    axiosApi.get(`${API_URL}/api/v1/transactions/filter/type/${e.target.value}`).then((response) => {
       if(response.data.length > 0){
        setTransactions(response.data)
       }else{
        setTransactions([])
       }
     
     }).catch((errors) => {
         // return errors
         setLoading(false)
       
     })
  }

  const filterTransactionByDate = (e) => {
    setLoading(true)
    axiosApi.get(`${API_URL}/api/v1/transactions/filter/date/${e.target.value}`).then((response) => {
      if(response.data.length > 0){
        setTransactions(response.data)
       }else{
        setTransactions([])
       }
     }).catch((errors) => {
         // return errors
         setLoading(false)
        
     })
  }

  const filterByStatus = (e) => {
    setLoading(true)
    axiosApi.get(`${API_URL}/api/v1/transactions/filter/status/${e.target.value}`).then((response) => {
      if(response.data.length > 0){
        setTransactions(response.data)
       }else{
        setTransactions([])
       }
     }).catch((errors) => {
         // return errors
         setLoading(false)
        
     })
  }



 


  const [pendingTransactions, setPendingTransactions] = useState("");
  const [pendingCrypto, setPendingCrypto] = useState("");
  const [pendingGiftCard, setPendingGiftCard] = useState("");
  const [pendingWithdraws, setPendingWithdraws] = useState("");


  useEffect(() => {
    // dispatch(onGetReports())
      axiosApi.get(`${API_URL}/` + 'api/v1/reports/pending-transactions').then((res) => {
        setPendingTransactions(res.data.pendingTransactions); 
        setPendingCrypto(res.data.pendingCrypto)
        setPendingGiftCard(res.data.pendingGiftCard);
        setPendingWithdraws(res.data.pendingWithdraws);
    }).catch((errors) => {
   
    })
  
}, [ ]);





  const keyField = "createdAt";


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
      text: "Transaction id",
      dataField: "transaction_id",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, transaction) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {transaction.transaction_id} 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
        text: "Transaction type",
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
              transaction.type == "WITHDRAWAL" || transaction.type == "AIRTIME" || transaction.type == "DATA" || transaction.type == "ELECTRICITY" ? (
                 <>
                   &#8358;{transaction.amount}
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
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {transaction.status } 
            </Link>
          </h5>
        
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
        <TransactionDropdown transaction={transaction} menuType={transaction.id}  loadTransactions={loadTransactions} />
       
      ),
    },
  ];





 
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Transaction management | FlipEx Admin dashboard</title>
        </MetaTags>
        <Container fluid>
      
            <Col xl="12">
              <Row>
                {/* Reports Render */}
                <ReportCard reportTitle={"Pending transactions"} colClass="3" reportDes={pendingTransactions} icon={PendingTrans} />
                 <ReportCard reportTitle={"Pending crypto"} colClass="3" reportDes={pendingCrypto} icon={PendingCrypto} />
                 <ReportCard reportTitle={"Pending giftcards"} colClass="3" reportDes={pendingGiftCard} icon={PendingGift} />
                 <ReportCard reportTitle={"Pending withdrawals"} colClass="3" reportDes={pendingWithdraws} icon={PendingWithdrawals} />
                </Row>
              </Col>
          <Row>
            
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
                                    <h5>All Transactions </h5>
                                </Col>


                                <Col sm="8">  
                                <div className="text-sm-end">   
                                    <Form
                                          onSubmit={(e) => {
                                            e.preventDefault();
                                             
                                            return false;
                                          }}
                                        >
                                          <Row form>
                                            <Col xs={12}>
                                          
                                              <Row>
                                              <Col sm="3">
                                                  <div className="mb-3">
                                    
                                                  <select className="form-control" name="type"  onChange={(e) => filterTransactionByType(e)}>
                                                    <option value="" className=" ">Select transaction type</option>
                                                    <option value="WITHDRAWAL">Withdrawal</option>
                                                    <option value="AIRTIME">Airtime</option>
                                                    <option value="DATA">Data</option>
                                                    <option value="CABLE">Cable</option>
                                                    <option value="CRYPTO">Crypto</option>
                                                    <option value="GIFTCARD">Giftcards</option>
                                                    <option value="TRANSFER">Transfer</option>
                                                  </select>
                                                  </div>
                                                </Col>

                                                <Col sm="3">
                                                  <div className="mb-3">
                                    
                                                  <select className="form-control" name="type"  onChange={(e) => filterByStatus(e)}>
                                                    <option value="" className=" ">Select Status</option>
                                                    <option value="PENDING">Pending</option>
                                                    <option value="FAILED">Failed</option>
                                                    <option value="SUCCESS">Approved</option>
                                                    <option value="QUEUED">Queing</option>
                                              
                                                  </select>
                                                  </div>
                                                </Col>
              


                                                <Col sm="3">
                                                  <div className="mb-3">
                                                  <Input
                                                    name="start_date"
                                                    label="Start date"
                                                    type="date"
                                                    onChange={(e) => filterTransactionByDate(e)}
                                                  />
                                                
                                                  </div>
                                                </Col>

                                                <Col sm="3">
                                                  <div className="mb-3">
                                                  <Button
                                                    color="default"
                                                    className="btn-block btn btn-default"
                                                    onClick={null}
                                                    style={{
                                                      border: "1px solid gray"
                                                    }}
                                                >
                                                  <i className="mdi mdi-export" />
                                                  Export
                                                </Button>
                                                  </div>
                                                </Col>

                                              </Row>

                                            
                                            </Col>
                                          </Row>
                                         
                                        </Form>
                                        </div>
                                    </Col>
                              
                              </Row>
                              <Row>
                                <hr />
                                <Col xl="12">
                                  <div className="table-responsive">
                                  {transactions?.length > 0 ? ('') : (
                                  <>
                                   <p style={{ textAlign: "center"}}>No transaction data found, please click <span onClick={() => {loadTransactions()}} style={{ color: "blue"}}>here</span> to reload</p>
                                  </>)}
                                    <BootstrapTable
                                      keyField={keyField}
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                      selectRow={selectRow}
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
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

PendingTransactions.propTypes = {
  onCloseClick: PropTypes.func,
  onApproveClick: PropTypes.func,
  handleSubmit: PropTypes.func,
  show: PropTypes.any,
  loading: PropTypes.bool,
}

export default withRouter(PendingTransactions);