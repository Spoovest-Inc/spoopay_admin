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




const ServiceProvider = props => {


  const [loading, setLoading] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const [modal, setModal] = useState(false);
  const [serviceProviders, setServiceProviders] = useState([])
  const [messageTitle, setMessageTitle] = useState("")
  const [messageDetails, setMessageDetails] = useState("")
  const [messageType, setMessageType] = useState("")
  const [successModal, setSuccessModal] = useState(false);
  const [deleteDetails, setDeleteDetails] = useState("")
  const [deleteTitle, setDeleteTitle] = useState("")
  const [btMessage, setBtMessage] = useState("")
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState("");

  // Form data 
  const [formData, setFormData] = useState({ provider_name: "", services: ""})

 



  const submitForm = () => {
      setLoading(true);
      const payload = {
        provider_name: formData.provider_name,
        services: formData.services,
      }

       axiosApi.post(`${API_URL}/` + 'api/v1/admin/service-provider/create', payload).then((res) => {
        setLoading(false);
        toggle();
        setMessageType("Success")
        setMessageTitle("Service Provider Added")
        setMessageDetails("You have succesfully added a service to the FlipEx admin.")
        setSuccessModal(true);
        loadServiceProvider()
       }).catch((error) => {
        setMessageType("Error")
        setMessageTitle("Service provider creation failed")
        setMessageDetails("oops, something went wrong", error.response.data.message)
        setSuccessModal(true);
        setLoading(false);
        toggle();
       })
    }
  

 
  
   


const loadServiceProvider = () => {
  axiosApi.get(`${API_URL}/api/v1/admin/service-provider/all`).then((res) => {
      setServiceProviders(res.data)
  }).catch(() => {
      
  })
}






  

  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: serviceProviders.length, // replace later with size(blogs),
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
    if (serviceProviders && !serviceProviders.length) {
      loadServiceProvider()
    }
  }, []);





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




 const addNewCode = () => {
  setModal(true)
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
      text: "Provider Name",
      dataField: "task_title",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, provider) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {provider.provider_name} 
            </Link>
          </h5>
        
        </>
      ),
    },


    {
      text: "Status",
      dataField: "status",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, provider) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {provider.status} 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      text: "Services",
      dataField: "services",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, provider) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {provider.services} 
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
       formatter: (cellContent, provider) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {provider.createdAt } 
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
      formatter: (cellContent, provider) => (
        <div className="d-flex gap-3">
            { loggedInUser.data.role === 3 || loggedInUser.data.role === 4 ? (
                        <>
                            { provider.status == "RUNNING" ? (
                            <>
                             { loading ? (
                             <>                                      
                                <Spinner
                                  as="span"
                                  animation="grow"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                                De-activating...
                                                        
                             </>
                             ) : (<><i className='bx bxs-lock-alt' onClick={() => handleDeactivate(provider)}></i></>)}
                         
                            </>
                            ) : provider.status == "STOPPED" ? 
                            (
                            <>
                            { loading ? (
                            <>
                             <Spinner
                                  as="span"
                                  animation="grow"
                                  size="sm"
                                  role="status"
                                  aria-hidden="true"
                                />
                                Activating...
                            </>
                            ) : (<> <i className='bx bxs-lock-open-alt text-success' onClick={() => handleActivate(provider)}></i></>)}

                            </>
                            ): null}
                        </>
                            
            ): null}

              { loggedInUser.data.role === 4 ? (
                        <i className='bx bxs-trash text-danger' onClick={() => deleteCode(provider)}></i>
                    ) : null}
        </div>
      ),
    },
  ];



  const handleActivate = (provider) => {
    setLoading(true)
    axiosApi.put(`${API_URL}/api/v1/admin/service-provider/activate/${provider.id}`).then(() => {
     setMessageType("Success")
     setMessageTitle("Service activated")
     setMessageDetails("You have succesfully activated a Flipex service provider.")
     setSuccessModal(true);
     setLoading(false)
     loadServiceProvider()
    }).catch((error) => {
      setLoading(false)
      setMessageType("Error")
     setMessageTitle("Service Activation failed")
     setMessageDetails("oops, something went wrong", error.response.data.message)
     setSuccessModal(true);
    })
  }


  const deleteCode = (provider) => {
    setId(provider.id);
    setDeleteTitle("Delete Provider");
    setDeleteDetails(`You are about to delete ${provider.provider_name} service provider, if these was a mistake, kindly click on the cancel button`)
    setBtMessage("Delete Provider")
    setDeleteModal(true);

 }


 const handleDeleteTask = () => {
   setLoading(true)
    axiosApi.delete(`${API_URL}/api/v1/admin/service-provider/delete/${id}`).then(() => {
     setMessageType("Success")
     setMessageTitle("Service Deleted")
     setMessageDetails("You have succesfully deleted a Flipex service provider.")
     setDeleteModal(false);
     setSuccessModal(true);
     setLoading(false)
     loadServiceProvider()

    }).catch((error) => {
    setLoading(false)
    setMessageType("Error")
    setMessageTitle("Service deletion failed")
    setMessageDetails("oops, something went wrong", error.response.data.message)
    setDeleteModal(false);
    setSuccessModal(true);
    })
 };

 const handleDeactivate = (provider) => {
   setLoading(true)
   axiosApi.put(`${API_URL}/api/v1/admin/service-provider/deactivate/${provider.id}`).then((res) => {
    setMessageType("Success")
    setMessageTitle("Service provider de-activated")
    setMessageDetails("You have succesfully de-activated a Flipex service provider.")
    setSuccessModal(true);
    setLoading(false)
    loadServiceProvider()
   }).catch((error) => {
     setLoading(false)
     setMessageType("Error")
    setMessageTitle("Service provider de-activation failed")
    setMessageDetails("oops, something went wrong", error.response.data.message)
    setSuccessModal(true);
   })

 }

 
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
        onDeleteClick={handleDeleteTask}
        onCloseClick={() => setDeleteModal(false)}
        deleteTitle={deleteTitle}
        deleteDetails={deleteDetails}
        btMessage={btMessage}
        loading={loading}
      />

      <div className="page-content">
        <MetaTags>
          <title>Service Providers | FlipEx Admin dashboard</title>
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
                    data={serviceProviders}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={serviceProviders}
                          columns={walletListColumns}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col md="6">
                                  SERVICE PROVIDERS
                                </Col>
                                <Col md="6">
                                   <div className="text-sm-end">   
                                  
                                               { loggedInUser.data.role === 3 || loggedInUser.data.role === 4 || loggedInUser.data.role === 2 ? (
                                                <Button
                                                color="default"
                                                className="font-16 btn-block btn btn-default"
                                                onClick={addNewCode}
                                                style={{
                                                  border: "1px solid gray"
                                                }}
                                                >
                                                <i className="mdi mdi-plus-circle-outline me-1" />
                                                Add Service Provider 
                                                </Button>
                                            ) : null}
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
                                         Create provider
                                      </ModalHeader>
                                      <ModalBody>
                                        <hr />
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
                                             
                                             
                                             <div className="mb-3">
                                                <Label className="form-label">Provider Name</Label>
                                                <Input
                                                  name="provider_name"
                                                  type="text"
                                                  onChange={(e) => setFormData({...formData, provider_name: e.target.value})}
                                                  value={formData.provider_name || ""}
                                                 
                                                />
                                                
                                              </div>

                                              <div className="mb-3">
                                                <Label className="form-label">Services</Label>
                                                <Input
                                                  name="services"
                                                  type="text"
                                                  onChange={(e) => setFormData({...formData, services: e.target.value})}
                                                  value={formData.services || ""}
                                                 
                                                />
                                                
                                              </div>

                                           
                  
                        
                                            </Col>
                                            </div>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <div className="text-end mt-3">
                                                <button
                                                  type="submit"
                                                  className="btn btn-primary"
                                                >
                                                         { loading ? (
                                                         <>
                                                            <Spinner
                                                              as="span"
                                                              animation="grow"
                                                              size="sm"
                                                              role="status"
                                                              aria-hidden="true"
                                                            />
                                                            creating provider...
                                                         </>
                                                         ) : (
                                                         <>
                                                           Save service
                                                         </>
                                                         )}
                                                    
                                                         
                                                          
                                                    
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

export default withRouter(ServiceProvider);