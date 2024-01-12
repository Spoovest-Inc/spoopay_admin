import React, { useEffect, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";

import NumberFormat from 'react-number-format';
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
import 'moment-timezone';
import moment from 'moment-timezone';
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import SuccessModals from "components/Common/successModal";
import WalletDetailsModal from "components/Common/WalletDetailsModal";

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






const Rate = props => {

  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const [messageTitle, setMessageTitle] = useState("")
  const [messageDetails, setMessageDetails] = useState("")
  const [messageType, setMessageType] = useState("")
  const [successModal, setSuccessModal] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState("")
  const [deleteDetails, setDeleteDetails] = useState("")
  const [btMessage, setBtMessage] = useState("")
  const [id, setId] = useState("")
  const [modal, setModal] = useState(false);
  const [wallets, setWallets] = useState([])
  const [walletDetails, setWalletDetails] = useState("")





 
   


const loadWallets = () => {
  axiosApi.get(`${API_URL}/api/v1/crypto/all-wallets`).then((res) => {
      setWallets(res.data)
  }).catch(() => {

  })
}


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
 







  

  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: wallets.length, // replace later with size(blogs),
    custom: true,
  };
  const defaultSorted = [
    {
      dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ];

  const selectRow = {
    mode: "checkbox",
    onClick: { hello: () => { console.log("Hello")} }
  };


  useEffect(() => {
    if (wallets && !wallets.length) {
      loadWallets()
    }
  }, []);

  const openDetails = (wallet) => {
     setId(wallet.id)
     setWalletDetails(wallet)
     setModal(true)
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

  const onCloseClick = () => {
    setModal(false)
  }

  const activate = () => {
    let data = {
        id: id,
        action_type: "activate"
    }
    axiosApi.post(`${API_URL}/api/v1/crypto/activate-and-deactivate-wallet`, data).then((res) => {
        onCloseClick()
        loadWallets()
        setId("")
        setMessageType("Success")
        setMessageTitle("wallet Activated")
        setMessageDetails("You have activated a users crypto wallet.")
        setSuccessModal(true)
    }).catch((error) => {
        setMessageType("Error")
        setMessageTitle("Wallet Activation Failed")
        setMessageDetails("oops, something went wrong, try again or contact your administrator")
    })
  }

  const deActivate = () => {
    let data = {
        id: id,
        action_type: "de-activate"
    }
    axiosApi.post(`${API_URL}/api/v1/crypto/activate-and-deactivate-wallet`, data).then((res) => {
        onCloseClick()
        loadWallets()
        setId("")
        setMessageType("Success")
        setMessageTitle("wallet De-activated")
        setMessageDetails("You have de-activated a users crypto wallet.")
        setSuccessModal(true)
    }).catch((error) => {
        setMessageType("Error")
        setMessageTitle("Wallet De-activationn Failed")
        setMessageDetails("oops, something went wrong, try again or contact your administrator.")
    })
  }

  


 



 
 



  const keyField = "id";


  const walletListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      // eslint-disable-next-line react/display-name
      formatter: wallet  => <>{wallet.id}</>,
    },


    {
        text: "User",
        dataField: "name",
        sort: true,
        // eslint-disable-next-line react/display-name
        formatter: (cellContent, wallet) => (
          <>
            <h5 className="font-size-14 mb-1">
              <Link to="#" className="text-dark">
                {wallet.User.name} 
              </Link>
            </h5>
          
          </>
        ),
      },
   
    

    {
      text: "Currency",
      dataField: "currency_name",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, wallet) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {wallet.currency} 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
        text: "Network",
        dataField: "currency_name",
        sort: true,
        // eslint-disable-next-line react/display-name
        formatter: (cellContent, wallet) => (
          <>
            <h5 className="font-size-14 mb-1">
              <Link to="#" className="text-dark">
                {wallet.network} 
              </Link>
            </h5>
          
          </>
        ),
      },


    {
      text: "Balance",
      dataField: "ngn_rate",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, wallet) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
            <NumberFormat
                  value={wallet.balance} 
                  className="foo"
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={(value, props) => <div {...props}>{value}</div>}
                  /> 
              
            </Link>
          </h5>
        
        </>
      ),
    },


    {
        text: "Status",
        dataField: "range",
        sort: true,
        // eslint-disable-next-line react/display-name
        formatter: (cellContent, wallet) => (
          <>
            <h5 className="font-size-14 mb-1">
              <Link to="#" className="text-dark">
                    {wallet.status}
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
       formatter: (cellContent, wallet) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {moment(formatDate(wallet.createdAt)).format('MMM Do YYYY') } 
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
      formatter: (cellContent, wallet) => (
        <div className="d-flex gap-3">
          
          <div style={{ height: "30px", backgroundColor: "#F7F7F7", borderRadius: "30px",  paddingLeft: "2px"}}>
          { loggedInUser.data.role === 3 || loggedInUser.data.role === 2 || loggedInUser.data.role === 4 ? (
              <Link className="text-primary" to="#">
              <i
                className="bx bx-cool font-size-18"
                id="edittooltip"
                onClick={() => openDetails(wallet)}
              ></i>
            </Link>
          ): null}
          </div>
          
        
        </div>
      ),
    },
  ];

 
  return (
    <React.Fragment>

       <SuccessModals 
         title={messageTitle} 
         details={messageDetails}
         show={successModal} 
         messageType={messageType}
         onCloseClick={() => setSuccessModal(false)}
        />

       {/* <WalletDetailsModal 
         walletDetails={walletDetails}
         show={modal} 
         activate={() => {activate}}
         deActivate={deActivate}
         onCloseClick={onCloseClick}
        /> */}

    

    
     
    


      <div className="page-content">
        <MetaTags>
          <title>Cyrpto Wallets | FlipEx Admin dashboard</title>
        </MetaTags>
        <Container fluid>
        
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField={keyField}
                    columns={walletListColumns}
                    data={wallets}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={wallets}
                          columns={walletListColumns}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">

                              <Col sm="4">
                                    <h5>Crypto Wallets</h5>
                                </Col>
                            
                                <Col sm="8">
                                <div className="text-sm-end">
                                <Row>
                                    <Col sm="5">
                                    <div className="search-box ms-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar {...toolkitProps.searchProps} />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                   </div>
                                    </Col>

                                    <Col sm="6">
                                  
                                   
                                    </Col>
                                  </Row>

                                     
                                  
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <hr />
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
          </Row>

 <Modal isOpen={modal} toggle={onCloseClick} centered={true}>
    <ModalHeader toggle={onCloseClick} tag="h4" style={{ paddingLeft: "40px"}} >
       {walletDetails?.User?.name}s Crypto Wallet Details
    </ModalHeader>
      <ModalBody className="py-3 px-5">
           <div className="avatar-xl" style={{ margin: "auto", marginTop: "60px"}}>
              <span className="avatar-title" >
              <img src={walletDetails.qr_image_url} alt='' style={{ marginBottom: "60px"}} />
              </span>
            </div>
            <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
              <span>Fullname</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{walletDetails?.User?.name}</span> <hr />

              <span>Currency</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{walletDetails?.currency}</span> <hr />

              <span>Network</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{walletDetails?.network}</span> <hr />

              <span>Wallet Address</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{walletDetails?.wallet_address}</span> <hr />

              <span>Wallet ID</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{walletDetails?.wallet_id}</span> <hr />

              <span>External User ID </span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{walletDetails?.external_user_id}</span> <hr />
          
              <span>Status</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{walletDetails?.status}</span> <hr />

            

              <span>Wallet Balance</span>
              <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>
              <NumberFormat
                value={walletDetails?.balance}
                className="foo"
                displayType={'text'}
                thousandSeparator={true}
                renderText={(value, props) => <div {...props}>{value}</div>}
                /> 
              </span> <hr />

          

                { walletDetails.status === "ACTIVE" ? (<button className=" btn btn-primary" color="primary" onClick={() => deActivate()}>De-activate</button>) : (  <button className=" btn btn-primary" color="primary" onClick={() => activate()}>Activate</button>)}
           
            </div>


      </ModalBody>
    </Modal>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Rate);