import React, { useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types'
import MetaTags from "react-meta-tags";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { withRouter, Link, useHistory } from "react-router-dom";
import TransactionDetails from "../../components/Common/TransactionDetails"
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



const TransactionList = ()  => {


  const [transaction, setTransaction] = useState();
  const [loading, setLoading] = useState(false);



  
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [blogModal, setBlogModal] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState([]);
  const [transactions, setTransactions] = useState([])
  const [id, setId] = useState("");
  const [tokenVerification, setTokenVerification] = useState(false)
  const [activityToken, setActivityToken] = useState("")
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
  

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

  const loadTransactions = async () => {
      await axiosApi.get(`${API_URL}/api/v1/transactions/queing`).then((response) => {
        setTransactions(response.data);
      }).catch((err) => {
        toast("oops, something went wrong fetching queuing transactions");
      });
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

  const verifyModalToggle = () => {
    setVerifyTokenModal(!verifyTokenModal)
  }

  const updateModalToggle = () => {
    setUpdateModal(!updateModal);
  }

  

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

  //delete transaction modals
  const [approveModal, setApproveModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [verifyTokenModal, setVerifyTokenModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);



  const onUpdateClick = (id) => {
    setId(id)
    setUpdateModal(true);
  }



  const onApproveClick = (id) => {
    if(tokenVerification == true){
      setId(id)
      setApproveModal(true);
    }else{
      setId(id)
     setVerifyTokenModal(true)
    }


   
  };

  const onConfirmClick = (id) => {
    setId(id)
    setConfirmModal(true);
  }

  const onDeclineClick = (id) => {
    setId(id)
    setDeclineModal(true);
  }

  const handleApproveClick = () => {
    setLoading(true)
    axiosApi.put(`${API_URL}/` + 'api/v1/transactions/approve/' + id).then(() => {
      toast("Transactions approved successfully")
      setLoading(false)
      window.location.reload(false);  
      setApproveModal(false);
     }).catch((errors) => {
         // return errors
         setLoading(false)
         toast("oops, something went wrong, try again later", errors)
     })
  
  };


  const handleConfirmClick = () => {
    setLoading(true)
    axiosApi.put(`${API_URL}/api/v1/transactions/confirm/${id}`).then(() => {
      toast("Transactions confirmed successfully")
      setLoading(false)
      window.location.reload(false);  
      setConfirmModal(false);
     }).catch((errors) => {
         // return errors
         setLoading(false)
         toast("oops, something went wrong, try again later", errors)
     })
  
  };

  const checkTransType = (trans) => {
    return trans.status === "QUEUED" 
  }

  const filterTransactionByType = (e) => {
    setLoading(true)
    axiosApi.get(`${API_URL}/api/v1/transactions/filter/type/${e.target.value}`).then((response) => {
       if(response.data.length > 0){
        let newTrans = response.data.filter((tran) => checkTransType(tran))
        console.log(newTrans)
        setTransactions(newTrans)
       }else{
        setTransactions([])
       }
     
     }).catch((errors) => {
         // return errors
         setLoading(false)
         toast("oops, something went wrong, try again later", errors)
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
         toast("oops, something went wrong, try again later", errors)
     })
  }




  const declineTrans = () => {
    axiosApi.put(`${API_URL}/api/v1/transactions/decline/${id}`).then((res) => {
      toast("Transactions decline successfully")
      window.location.reload(false);  
     }).catch((errors) => {
         // return errors
         toast("oops, something went wrong, try again later", errors)
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
        // return errors
        toast("oops, something went wrong, try again later", errors)
    })
  
}, [ ]);




  const blogDetails = (transaction) => {
    setTransactionDetails(transaction)
    console.log(transaction);
    setBlogModal(true)
  }

  const keyField = "status";


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
                {transaction.amount} 
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
        <div className="d-flex gap-3">
             <div className="text-success" onClick={() => blogDetails(transaction)}>
            <i
              className="mdi mdi-eye font-size-18"
            ></i>
          </div>

        

        {transaction.status == "QUEUED" && (loggedInUser.data.role === 2 || loggedInUser.data.role === 4) ? (
                <div className="pt-10" title="Confirm transaction" onClick={() => onConfirmClick(transaction.id)}>
                <span  className="text-success">Confirm</span>
              </div>
         ): null
         
         }
         
        

          
        </div>
      ),
    },
  ];

  const handleSubmit = async () => {
       setLoading(true);

       const formData = {
            id: id,
            ecode: ecode
       }
        await axiosApi.put(`${API_URL}/` + 'api/v1/transactions/update', formData).then((res) => {
        window.location.reload(false);  
        toast("E-code updated successfully")
        setLoading(false)
       }).catch((error) => {
        toast(error.message)
        setLoading(false)
       })
  }

  const verifyCode = async () => {
    setLoading(true);

     const data = {
       activity_token: activityToken
     }

     await axiosApi.post(`${API_URL}/` + 'api/v1/admin/verify-activity-token', data).then((res) => {
          toast("Token verified")
          setActivityToken(true)
          setVerifyTokenModal(false)
          setLoading(false)
          setApproveModal(true);
    }).catch((error) => {
     toast(error.response.data.message)
     setLoading(false)
    })
  }


 
  return (
    <React.Fragment>
     <ApproveModal
        show={approveModal}
        onApproveClick={handleApproveClick}
        onCloseClick={() => setApproveModal(false)}
        loading={loading}
      />

     <ConfirmModal
        show={confirmModal}
        onConfirmClick={handleConfirmClick}
        onCloseClick={() => setConfirmModal(false)}
        loading={loading}
      />

      <TransactionDetails
        show={blogModal}
        transactionDetails={transactionDetails}
        onCloseClick={() => setBlogModal(false)}
        loading={loading}
      />

      <DeclineModal
        show={declineModal}
        onDeclineClick={declineTrans}
        onCloseClick={() => setDeclineModal(false)}
        loading={loading}
      />

     


      <div className="page-content">
        <MetaTags>
          <title>Transaction management | FlipEx Admin dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="transactions" breadcrumbItem="Queuing Transactions" />
            <Col xl="12">
              <Row>
                {/* Reports Render */}
                <ReportCard reportTitle={"Pending transactions"} colClass="3" reportDes={pendingTransactions} reportIconClass="bx-copy-alt" />
                 <ReportCard reportTitle={"Pending crypto"} colClass="3" reportDes={pendingCrypto} reportIconClass="bx-copy-alt" />
                 <ReportCard reportTitle={"Pending giftcards"} colClass="3" reportDes={pendingGiftCard} reportIconClass="bx-copy-alt" />
                 <ReportCard reportTitle={"Pending withdrawals"} colClass="3" reportDes={pendingWithdraws} reportIconClass="bx-copy-alt" />
                </Row>
              </Col>
          <Row>
            <Col lg="12">
             

              <Col>
                   <Modal isOpen={verifyTokenModal} toggle={verifyModalToggle}>
                    <ModalHeader toggle={verifyModalToggle} tag="h4">
                        Verify token
                    </ModalHeader>
                    <ModalBody>
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          verifyCode();
                          return false;
                        }}
                      >
                        <Row form>
                          <Col xs={12}>
                            <div className="mb-3">
                              <Label className="form-label">Activity Token</Label>
                              <Input
                                name="activity_token"
                                type="text"
                                onChange={(e) => setActivityToken(e.target.value)}
                              />
                            </div>

                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <div className="text-end">
                              <button
                                type="submit"
                                className="btn btn-success save-user"
                              >
                              
                                        { loading ?  (
                                          <>
                                          <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                          />
                                          Loading...
                                          </>
                                        ) :
                                        ( "Verify token" )
                                    }
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </Form>
                    </ModalBody>
                  </Modal>
              </Col>
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
                                    <Form
                                          onSubmit={(e) => {
                                            e.preventDefault();
                                              filterUsers()
                                            return false;
                                          }}
                                        >
                                          <Row form>
                                            <Col xs={12}>
                                          
                                              <Row>
              
                                                <Col sm="3">
                                                  <div className="mb-3">
                                                  <Label className="form-label">Transaction type</Label>
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
                                                  <Label className="form-label">Transaction date</Label>
                                                  <Input
                                                    name="start_date"
                                                    label="Start date"
                                                    type="date"
                                                    onChange={(e) => filterTransactionByDate(e)}
                                                  />
                                                
                                                  </div>
                                                </Col>
                                              </Row>

                                            
                                            </Col>
                                          </Row>
                                         
                                        </Form>
                                    </Col>
                              
                              </Row>
                              <Row>
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
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

TransactionList.propTypes = {
  onCloseClick: PropTypes.func,
  onApproveClick: PropTypes.func,
  handleSubmit: PropTypes.func,
  show: PropTypes.any,
  loading: PropTypes.bool,
}

export default withRouter(TransactionList);