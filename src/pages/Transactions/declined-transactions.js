import React, { useEffect, useState, useRef } from "react";
import PropTypes from 'prop-types'
import MetaTags from "react-meta-tags";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { withRouter, Link, useHistory } from "react-router-dom";
import TransactionDetails from "../../../src/components/Common/TransactionDetails"
import Development from "../../components/Common/Development"
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
  const [transactions, setTransactions] = useState([]);
  

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


  const loadData = async () => {
     try {
        await axiosApi.get(`${API_URL}/api/v1/transactions/declined`).then((response) => {
          setTransactions(response.data);
        })
     } catch (error) {
       
     }
  }


  useEffect(() => {
    if (transactions && !transactions.length) {
         loadData();
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

  //delete transaction modals
  const [approveModal, setApproveModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [verifyTokenModal, setVerifyTokenModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);



 


 







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
        </div>
      ),
    },
  ];



  
 
  return (
    <React.Fragment>
   
   

      <TransactionDetails
        show={blogModal}
        transactionDetails={transactionDetails}
        onCloseClick={() => setBlogModal(false)}
        loading={loading}
      />

    

     


      <div className="page-content">
        <MetaTags>
          <title>Transaction management | FlipEx Admin dashboard</title>
        </MetaTags>
        <Container fluid>
        <Row className="justify-content-center">
           <Col md={4}>
             <Development />
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