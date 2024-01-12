import React, { useEffect, useState, useRef } from "react";
import MetaTags from "react-meta-tags";

import axios from "axios";
import { toast } from 'react-toastify';
import { withRouter, Link } from "react-router-dom";
import CryptoDetailModal from "../../components/Common/CryptoDetailModal"
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
import * as Yup from "yup";
import { useFormik } from "formik";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import DeleteModal from "components/Common/DeleteModal";
import SuccessModals from "components/Common/successModal";

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


//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";





const Rate = props => {


  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const [currencyName, setCurrencyName] = useState("")
  const [currencySymbol, setCurrencySymbol] = useState("")
  const [rangeFrom, setRangeFrom] = useState("")
  const [rangeTo, setRangeTo] = useState("")
  const [trade_type, setTradeType] = useState("")
  const [naira_rate, setNairaRate] = useState("")
  const [defaultRate, setDefaultRate] = useState("")
  const [messageTitle, setMessageTitle] = useState("")
  const [messageDetails, setMessageDetails] = useState("")
  const [messageType, setMessageType] = useState("")
  const [successModal, setSuccessModal] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState("")
  const [deleteDetails, setDeleteDetails] = useState("")
  const [btMessage, setBtMessage] = useState("")





  const submitForm = () => {
   
    if(isEdit){
      setLoading(true);
        const payload = {
              id: id,
              ngn_rate: naira_rate,
              range_from: rangeFrom,
              range_to: rangeTo,
              default_rate: defaultRate
        }

      axiosApi.put(`${API_URL}/` + 'api/v1/rates/update-rate', payload).then(() => {
       setLoading(false);
       toggle();
       loadCrypto()
        setMessageType("Success")
        setMessageTitle("Rate updated successfully");
        setMessageDetails("You have succesfully updated rate on Flipex admin.")
        setSuccessModal(true);
      }).catch((error) => {
        setMessageType("Error")
        setMessageTitle("Rate updating failed");
        setMessageDetails(error.response.data.message)
        setSuccessModal(true);
     
       setLoading(false);
       toggle();
      })
    }else{
      setLoading(true);
      const payload = {
        currency_name: currencyName,
        currency_symbol: currencySymbol,
        range_from: rangeFrom,
        range_to: rangeTo,
        ngn_rate: naira_rate,
        trade_type: trade_type
  
  }

       axiosApi.post(`${API_URL}/` + 'api/v1/rates/add-rate', payload).then(() => {
        setLoading(false);
        toggle();
        loadCrypto()
        setMessageType("Success")
        setMessageTitle("Rate added successfully");
        setMessageDetails("You have succesfully added a new rate to Flipex admin.")
        setSuccessModal(true);
       }).catch((error) => {
        setMessageType("Error")
        setMessageTitle("Rate adding failed");
        setMessageDetails(error.response.data.message)
        setSuccessModal(true);
        setLoading(false);
        toggle();
       })
    }
  }

 
  
   


const loadCrypto = () => {
  axiosApi.get(`${API_URL}/api/v1/rates/all-rates`).then((res) => {
      setRateRanges(res.data.data)
  }).catch(() => {

  })
}




  
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [cryptoDetailModal, setCryptoDetailModal] = useState(false);
  const [cryptoDetail, setCryptoDetail] = useState([])
  const [rateRanges, setRateRanges] = useState([])

  const [id, setId] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);

  

  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: rateRanges.length, // replace later with size(blogs),
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

  const pushToArray = () => {
    console.log(transaction.id)
  }


  useEffect(() => {
    if (rateRanges && !rateRanges.length) {
      loadCrypto()
      setIsEdit(false);
    }
  }, []);





  const toggle = () => {
    setModal(!modal);
  };

  const handleEditRange = (range) => {
      setId(range.id);
      setNairaRate(range.ngn_rate); 
      setRangeTo(range.range_to)
      setRangeFrom(range.range_from)
      setDefaultRate(range.default_rate);
  
      console.log(rangeFrom);
    setIsEdit(true);
    toggle();
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


  const addNewCrypto = () => {
    setIsEdit(false);
    toggle();
  }

  const deleteCrypto = (range) => {
     setId(range.id);
     setDeleteTitle("Delete Rate")
     setBtMessage("Delete Rate")
     setDeleteDetails("You are about to delete a crypto rate, please be sure you want to carry out these actions, else kindly click on the cancel button to exit.");
     setDeleteModal(true)
  }


  const handleDeleteCrypto = () => {
    setLoading(true)
     axiosApi.delete(`${API_URL}/api/v1/rates/delete-rate/${id}`).then(() => {
      loadCrypto()
       setLoading(false)
       setMessageType("Success")
       setMessageTitle("Rate deleted successfully");
       setMessageDetails("You have succesfully deleted rate from Flipex admin.")
       setSuccessModal(true);

     }).catch((error) => {
       setLoading(false)
       setMessageType("Error")
       setMessageTitle("Rate deleting failed");
       setMessageDetails(error.response.data.message)
       setSuccessModal(true);
     })
    onPaginationPageChange(1);
    setDeleteModal(false);
  };

 



  const cryptoDetails = (crypto) => {
    setCryptoDetail(crypto)
    setCryptoDetailModal(true)
  }

  const keyField = "id";


  const walletListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      // eslint-disable-next-line react/display-name
      formatter: range  => <>{range.id}</>,
    },
   
    

    {
      text: "Currency name",
      dataField: "currency_name",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, range) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {range.currency_name} 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      text: "Range",
      dataField: "range",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, range) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
                ${ range.range_from} - ${ range.range_to }
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      text: "Trade Type",
      dataField: "trade_type",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, range) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
                { range.trade_type }
            </Link>
          </h5>
        
        </>
      ),
    },




    {
      text: "Naira rate",
      dataField: "ngn_rate",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, range) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
            <NumberFormat
                  value={range.ngn_rate} 
                  className="foo"
                  displayType={'text'}
                  thousandSeparator={true}
                  renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                  /> 
              
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
       formatter: (cellContent, crypto) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {crypto.createdAt } 
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
      formatter: (cellContent, range) => (
        <div className="d-flex gap-3">
          
          <div style={{ height: "30px", backgroundColor: "#F7F7F7", borderRadius: "30px", width: "50px", paddingLeft: "2px"}}>
          { loggedInUser.data.role === 3 || loggedInUser.data.role === 2 || loggedInUser.data.role === 4 ? (
              <Link className="text-primary" to="#">
              <i
                className="mdi mdi-pencil font-size-18"
                id="edittooltip"
                onClick={() => handleEditRange(range)}
              ></i>
            </Link>
          ): null}

          { loggedInUser.data.role === 4 || loggedInUser.data.role === 3 ? (
              <Link className="text-danger" to="#">
              <i
                className="mdi mdi-delete font-size-18"
                id="edittooltip"
                onClick={() => deleteCrypto(range)}
              ></i>
            </Link>
          ) : null}

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

      <DeleteModal
        show={deleteModal}
        deleteDetails={deleteDetails}
        deleteTitle={deleteTitle}
        onDeleteClick={handleDeleteCrypto}
        btMessage={btMessage}
        onCloseClick={() => setDeleteModal(false)}
      />
     
    


      <div className="page-content">
        <MetaTags>
          <title>Currency Rates | FlipEx Admin dashboard</title>
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
                    data={rateRanges}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={rateRanges}
                          columns={walletListColumns}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">

                              <Col sm="4">
                                    <h5>Rates</h5>
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
                                   
                                    { loggedInUser.data.role === 4 ? (
                                          <Button
                                          color="default"
                                          className="font-16 btn-block btn btn-default"
                                          onClick={addNewCrypto}
                                          style={{
                                            border: "1px solid gray"
                                          }}
                                        >
                                          <i className="mdi mdi-plus me-1" />
                                          Add Rate
                                        </Button>
                                    ): null }

                                   
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

                                            

                                    <Modal isOpen={modal} toggle={toggle}>
                                      <ModalHeader toggle={toggle} tag="h4">
                                        {!!isEdit ? "Edit rate" : "Add Rate"}
                                   
                                      </ModalHeader>
                                      <ModalBody>
                                        <Form
                                          onSubmit={(e) => {
                                            e.preventDefault();
                                              submitForm()
                                            return false;
                                          }}
                                        >
                                          <Row form>
                                          <div style={{ border: "1px solid #E5E5E5", borderRadius: "8px", marginTop: "20px"}} className="p-2">
                                            <Col xs={12}>
                                              {!isEdit ? 
                                                 <div className="mb-3">
                                                 <Label className="form-label">Currency name</Label>
                                                 <select className="form-control" name="currency_symbol" onChange={(e) => setCurrencyName(e.target.value)}>
                                                      <option value="" className=" ">Select currency name</option>
                                                      <option value="Bitcoin" className=" ">Bitcoin</option>
                                                      <option value="Ethereum">Ethereum</option>
                                                      <option value="Tether">Tether</option>
                                                      <option value="Litecoin">Litecoin</option>
                                                      <option value="Usdcoin">Usdcoin</option>
                                                      <option value="Usdt">Usdt</option>
                                                    </select>
                                               </div> : null
                                              }
                                             
                                             

                                              {!isEdit ?
                                              <div className="mb-3">
                                              <Label className="form-label">Currency symbol</Label>
                                              <select className="form-control" name="currency_symbol"  onChange={(e) => setCurrencySymbol(e.target.value)}>
                                                   <option value="" className=" ">Select symbol</option>
                                                   <option value="BTC" className=" ">BTC</option>
                                                   <option value="ETH">ETH</option>
                                                   <option value="USDC">USDC</option>
                                                   <option value="LTC">LTC</option>
                                                   <option value="USDT">USDT</option>
                                                 </select>
                                                </div> : null
                                                }

                                        {!isEdit ?
                                              <div className="mb-3">
                                              <Label className="form-label">Trade Type</Label>
                                              <select className="form-control" name="trade_type"  onChange={(e) => setTradeType(e.target.value)}>
                                                   <option value="" className=" ">Select trade type</option>
                                                   <option value="BUY" className=" ">Buy</option>
                                                   <option value="SELL">Sell</option>

                                                 </select>
                                                </div> : null
                                                }
                                              
                                             
                                              <Row>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Label className="form-label">Range from($)</Label>
                                                        <Input
                                                        name="range_from"
                                                        label="Range from"
                                                        type="text"
                                                        value={rangeFrom}
                                                        onChange={(e) => setRangeFrom(e.target.value)}
                                  
                                                        />
                                                    </div>
                                                </Col>

                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Label className="form-label">Range to($)</Label>
                                                        <Input
                                                        name="range_to"
                                                        label="Range to"
                                                        type="text"
                                                        value={rangeTo}
                                                        onChange={(e) => setRangeTo(e.target.value)}
                                                        
                                                       />
                                                    </div>
                                                </Col>
                                              </Row>

                                        
                                              
                                                   <div className="mb-3">
                                                        <Label className="form-label">Naira rate(&#8358;)</Label>
                                                        <Input
                                                        name="naira_rate"
                                                        label="Naira rate"
                                                        type="text"
                                                        value={naira_rate}
                                                        onChange={(e) => setNairaRate(e.target.value)}
    
                                                        />
                                                      
                                                      </div>
                                          

                                        
                                            </Col>
                                            </div>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <div className="text-end" style={{ marginTop: "20px"}}>
                                                <button
                                                  type="submit"
                                                  className="btn btn-primary"
                                                >
                                                      { !loading &&  !!isEdit ? "Update rate" : "Add Rate" }
                                                          { loading && (
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
                                                          ) 
                                                     }
                                                </button>
                                              </div>
                                            </Col>
                                          </Row>
                                        </Form>
                                      </ModalBody>
                                    </Modal>
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

export default withRouter(Rate);