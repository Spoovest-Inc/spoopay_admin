import React, { useEffect, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
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


import {
  getWallet as onGetWallet,
  updateWallet as onUpdateWallet,

} from "store/crypto/actions";
import { isEmpty, size, map, values } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { symbol } from "prop-types";



const CurrencyList = props => {
  const dispatch = useDispatch();
  const [crypto, setCrypto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const [currency_symbol, setCurrencySymbol] = useState("")

    // validation
    const validation = useFormik({
      // enableReinitialize : use this flag when initial values needs to be changed
      enableReinitialize: true,
  
      initialValues: {
        currency_name: (crypto && crypto.currency_name) || '',
      },
      validationSchema: Yup.object({
  
      }),
      onSubmit: async(values) => {
        if(isEdit){
          setLoading(true);
          const formData = new FormData();
          formData.append('id', id);
          formData.append('currency_name', values.currency_name);
          formData.append('currency_symbol', currency_symbol);
          formData.append('imageURL', image);
         

          axiosApi.put(`${API_URL}/` + 'api/v1/crypto/update-crypto', formData).then(() => {
           validation.resetForm();
           setLoading(false);
           toggle();
           loadCrypto()
           toast("Crypto updated")
          }).catch((error) => {
            toast("oops something went wrong", error)
           validation.resetForm();
           setLoading(false);
           toggle();
          })
        }else{
          setLoading(true);
           const formData = new FormData();
           formData.append('currency_name', values.currency_name);
           formData.append('currency_symbol', currency_symbol);
           formData.append('imageURL', image);
          


           axiosApi.post(`${API_URL}/` + 'api/v1/crypto/add-crypto', formData).then(() => {
            validation.resetForm();
            setLoading(false);
            toggle();
            loadCrypto()
            toast("Crypto added successfully")
           }).catch((error) => {
             toast("oops something went wrong", error)
            validation.resetForm();
            setLoading(false);
            toggle();
           })

         
       
       
        }
       
      },
    });







  // const { cryptos } = useSelector(state => ({
  //   cryptos: state.crypto.cryptos
  // }));

  
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [cryptoDetailModal, setCryptoDetailModal] = useState(false);
  const [cryptoDetail, setCryptoDetail] = useState([])
  const [cryptos, setCryptos] = useState([])
  const [id, setId] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);


  const loadCrypto = () => {
    axiosApi.get(`${API_URL}/api/v1/crypto/rates`).then((res) => {
        setCryptos(res.data)
    }).catch(() => {
  
    })
  }

  

  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: cryptos.length, // replace later with size(blogs),
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
  };


  useEffect(() => {
    if (cryptos && !cryptos.length) {
      loadCrypto()
      setIsEdit(false);
    }
  }, [dispatch, cryptos]);


  useEffect(() => {
    setCrypto(cryptos);
    setIsEdit(false);
  }, [cryptos.data]);

  useEffect(() => {
    if (!isEmpty(cryptos) && !!isEdit) {
      setCryptos(cryptos);
      setIsEdit(false);
    }
  }, [cryptos.data]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleEditWallet = arg  => {
    const crypto = arg;
    setCrypto({
      id: crypto.id,
      ngn_rate: crypto.ngn_rate,
      currency_symbol: crypto.currency_symbol,
      currency_name: crypto.currency_name,
      wallet_address: crypto.wallet_address,
      usd_rate: crypto.usd_rate
    });
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

  const deleteCrypto = (crypto) => {
     setId(crypto.id);
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
      formatter: crypto => <>{crypto.id}</>,
    },
    {
      dataField: "img",
      text: "Logo",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, crypto) => (
        <>
          {!crypto.image_url ? (
            <div className="avatar-xs">
              <span className="avatar-title rounded-circle">
                {crypto.currency_name}
              </span>
            </div>
          ) : (
            <div>
              <img
                className="rounded-circle avatar-xs"
                 src={crypto.image_url}
                alt={crypto.currency_name}
              />
            </div>
          )}
        </>
      ),
    },
    

    {
      text: "Currency name",
      dataField: "currency_name",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, crypto) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {crypto.currency_name} 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      text: "Symbol",
      dataField: "currency_symbol",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, crypto) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {crypto.currency_symbol} 
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
      formatter: (cellContent, crypto) => (
        <div className="d-flex gap-3">
             <div className="text-success" onClick={() => cryptoDetails(crypto)}>
            <i
              className="mdi mdi-eye font-size-18"
            ></i>
          </div>

          { loggedInUser.data.role === 3 || loggedInUser.data.role === 2 || loggedInUser.data.role === 4 ? (
              <Link className="text-success" to="#">
              <i
                className="mdi mdi-pencil font-size-18"
                id="edittooltip"
                onClick={() => handleEditWallet(crypto)}
              ></i>
            </Link>
          ): null}

          { loggedInUser.data.role === 4 || loggedInUser.data.role ===3 ? (
              <Link className="text-danger" to="#">
              <i
                className="mdi mdi-delete font-size-18"
                id="edittooltip"
                onClick={() => deleteCrypto(crypto)}
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
     
      <CryptoDetailModal
        show={cryptoDetailModal}
        cryptoDetail={cryptoDetail}
        onCloseClick={() => setCryptoDetailModal(false)}
      />


      <div className="page-content">
        <MetaTags>
          <title>Crypto management | FlipEx Admin dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="crypto" breadcrumbItem="Crypto currencies" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField={keyField}
                    columns={walletListColumns}
                    data={cryptos}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={cryptos}
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
                                  
                                        <Button
                                        color="primary"
                                        className="font-16 btn-block btn btn-success"
                                        onClick={addNewCrypto}
                                        >
                                        <i className="mdi mdi-plus-circle-outline me-1" />
                                        Add new crypto
                                        </Button>
                                    
                                   
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
                                        {!!isEdit ? "Edit Crypto" : "Add crypto"}
                                      </ModalHeader>
                                      <ModalBody>
                                        <Form
                                          onSubmit={(e) => {
                                            e.preventDefault();
                                            validation.handleSubmit();
                                            return false;
                                          }}
                                        >
                                          <Row form>
                                            <Col xs={12}>
                                              <div className="mb-3">
                                                <Label className="form-label">Currency name</Label>
                                                <Input
                                                  name="currency_name"
                                                  type="text"
                                                  onChange={validation.handleChange}
                                                  onBlur={validation.handleBlur}
                                                  value={validation.values.currency_name || ""}
                                                  invalid={
                                                    validation.touched.name && validation.errors.currency_name ? true : false
                                                  }
                                                />
                                                {validation.touched.name && validation.errors.currency_name ? true : false? (
                                                  <FormFeedback type="invalid">{validation.errors.currency_name}</FormFeedback>
                                                ) : null}
                                              
                                              </div>


                                              <div className="mb-3">
                                                <Label className="form-label">Currency symbol</Label>
                                                 <select className="form-control" onChange={(e) => setCurrencySymbol(e.target.value)}>
                                                    <option>ETH</option>
                                                    <option>USDC</option>
                                                    <option>BTC</option>
                                                    <option>LTC</option>
                                                    <option>USDT</option>
                                                 </select>
                                              </div>

                                              <div className="mb-3">
                                                <Label className="form-label">Currency image</Label>
                                                <Input
                                                  name="image_url"
                                                  label="Image"
                                                  type="file"
                                                  onChange={(e) => setImage(e.target.files[0])}
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
                                                      { !loading &&  !!isEdit ? "Update crypto" : "Add crypto" }
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

export default withRouter(CurrencyList);