import React, { useEffect, useState, useRef } from "react";
import MetaTags from "react-meta-tags";

import axios from "axios";
import { toast } from 'react-toastify';
import { withRouter, Link } from "react-router-dom";
import CryptoDetailModal from "../../../components/Common/CryptoDetailModal"
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


import { isEmpty, size, map, values } from "lodash";
import transactionColumns from "pages/Contacts/ContactsProfile/transactionColumns";





const CryptoRateRange = props => {


  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const [currencyName, setCurrencyName] = useState("")
  const [currencySymbol, setCurrencySymbol] = useState("")
  const [rangeFrom, setRangeFrom] = useState("")
  const [rangeTo, setRangeTo] = useState("")
  const [naira_rate, setNairaRate] = useState("")
  const [defaultRate, setDefaultRate] = useState("")




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

      axiosApi.put(`${API_URL}/` + 'api/v1/crypto/update-range', payload).then(() => {
       setLoading(false);
       toggle();
       loadCrypto()
       toast("Crypto updated")
      }).catch((error) => {
        toast("oops something went wrong", error)
     
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
        default_rate: defaultRate
  }

       axiosApi.post(`${API_URL}/` + 'api/v1/crypto/add-range', payload).then(() => {
        setLoading(false);
        toggle();
        loadCrypto()
        toast("Crypto range added successfully")
       }).catch((error) => {
         toast("oops something went wrong", error)
        setLoading(false);
        toggle();
       })
    }
  }

 
  
   


const loadCrypto = () => {
  axiosApi.get(`${API_URL}/api/v1/crypto/all-range`).then((res) => {
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
  }, [rateRanges]);


  useEffect(() => {
    setRateRanges(rateRanges);
    setIsEdit(false);
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
     setDeleteModal(true)
  }


  const handleDeleteCrypto = () => {
    setLoading(true)
     axiosApi.delete(`${API_URL}/api/v1/crypto/delete-crypto/${id}`).then(() => {
      loadCrypto()
       toast("Crypto has been deleted")
      setLoading(false)

     }).catch((error) => {
       setLoading(false)
      toast("Error deleting", error.response)
      console.log(error.response.data.message)
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
      text: "USD rate",
      dataField: "usd_rate",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, range) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
            <NumberFormat
              value= {range.usd_rate} 
              className="foo"
              displayType={'text'}
              thousandSeparator={true}
              renderText={(value, props) => <div {...props}>${value}</div>}
              /> 
             
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
      text: "Default rate",
      dataField: "default_rate",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, range) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
            <NumberFormat
                  value={range.default_rate} 
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
          
          
          { loggedInUser.data.role === 3 || loggedInUser.data.role === 4 ? (
              <Link className="text-success" to="#">
              <i
                className="mdi mdi-pencil font-size-18"
                id="edittooltip"
                onClick={() => handleEditRange(range)}
              ></i>
            </Link>
          ): null}

          { loggedInUser.data.role === 4 ? (
              <Link className="text-danger" to="#">
              <i
                className="mdi mdi-delete font-size-18"
                id="edittooltip"
                onClick={() => deleteCrypto(range)}
              ></i>
            </Link>
          ) : null}

        </div>
      ),
    },
  ];

 
  return (
    <React.Fragment>

      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteCrypto}
        onCloseClick={() => setDeleteModal(false)}
      />
     
    


      <div className="page-content">
        <MetaTags>
          <title>Crypto rate range | FlipEx Admin dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="crypto" breadcrumbItem="Crypto rate range" />
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
                                  <div className="search-box ms-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar {...toolkitProps.searchProps} />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm="8">
                                  <div className="text-sm-end">
                                    { loggedInUser.data.role === 3 && (
                                        <Button
                                        color="primary"
                                        className="font-16 btn-block btn btn-success"
                                        onClick={addNewCrypto}
                                        >
                                        <i className="mdi mdi-plus-circle-outline me-1" />
                                        Add new rate range 
                                        </Button>
                                    )}
                                   
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

                                            

                                    <Modal isOpen={modal} toggle={toggle}>
                                      <ModalHeader toggle={toggle} tag="h4">
                                        {!!isEdit ? "Edit Crypto rate range" : "Add crypto rate range"}
                                   
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
                                            <Col xs={12}>
                                              {!isEdit ? 
                                                 <div className="mb-3">
                                                 <Label className="form-label">Currency name</Label>
                                                 <select className="form-control" name="currency_symbol" onChange={(e) => setCurrencyName(e.target.value)}>
                                                      <option value="" className=" ">Select crypto name</option>
                                                      <option value="Bitcoin" className=" ">Bitcoin</option>
                                                      <option value="Ethereum">Ethereum</option>
                                                      <option value="Tether">Tether</option>
                                                      <option value="Litecoin">Litecoin</option>
                                                      <option value="Usdcoin">Usdcoin</option>
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

                                               <Row>
                                                   <Col md={6}>
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

                                                   <Col md={6}>
                                                   <div className="mb-3">
                                                        <Label className="form-label">Default rate(&#8358;)</Label>
                                                        <Input
                                                        name="default_rate"
                                                        label="Default rate"
                                                        type="text"
                                                        value={defaultRate}
                                                        onChange={(e) => setDefaultRate(e.target.value)}
                                                       
                                                        />
                                                       
                                                    </div>
                                                   </Col>
                                               </Row>
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <div className="text-end">
                                                <button
                                                  type="submit"
                                                  className="btn btn-success save-user"
                                                >
                                                      { !loading &&  !!isEdit ? "Update range" : "Add range" }
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

export default withRouter(CryptoRateRange);