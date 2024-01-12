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




const SpecialCodes = props => {


  const [loading, setLoading] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const [modal, setModal] = useState(false);
  const [specialCodes, setSpecialCodes] = useState([])
  const [messageTitle, setMessageTitle] = useState("")
  const [messageDetails, setMessageDetails] = useState("")
  const [messageType, setMessageType] = useState("")
  const [successModal, setSuccessModal] = useState(false);
  const [deleteDetails, setDeleteDetails] = useState("")
  const [deleteTitle, setDeleteTitle] = useState("")
  const [btMessage, setBtMessage] = useState("")
  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState("");
  const [codeModal, setCodeModal] = useState(false)
  const [specialCodeModal, setSpecialCodesModal] = useState(false)
  const [codeDetails, setCodeDetails] = useState("")
  const [codeRanges, setCodeRanges] = useState()

  const [addNewRange, setAddNewRange] = useState(false)

  // Form data 
  const [formData, setFormData] = useState({ code: "", status: "", max_distribution: "", usage_frequency: "", range_from: 0, range_to: 0, amount: 0})
  const  [range_and_amount, setRangeAndAmount] = useState([])
  
 
  const toggleAddNewRange = () => {
       setAddNewRange(!addNewRange)
  }



  const submitForm = () => {
      setLoading(true);
      const data = {
         "max": formData.range_to,
         "min": formData.range_from,
         "amount": formData.amount
      }

      range_and_amount.push(data);
      const payload = {
        code: formData.code,
        status: formData.status,
        max_distribution: formData.max_distribution,
        range_and_amount: range_and_amount,
        usage_frequency: formData.usage_frequency
      }


       axiosApi.post(`${API_URL}/` + 'api/v1/admin/special-code/create', payload).then((res) => {
        setLoading(false);
        setMessageType("Success")
        setMessageTitle("Special Code Added")
        setMessageDetails("You have succesfully created a special code.")
        setSuccessModal(true);
        loadSpecialCCodes()
    
       }).catch((error) => {
        setMessageType("Error")
        setMessageTitle("Special code creation failed")
        setMessageDetails("oops, something went wrong", error.response.data.message)
        setSuccessModal(true);
        setLoading(false);
        toggle();
       })
    }

    const submitNewRange = () => {
      setLoading(true);
      const data = {
         "max": formData.range_to,
         "min": formData.range_from,
         "amount": formData.amount
      }
      
      let code = codeRanges
      console.log(code)
      code.push(data)
      
      const payload = {
        id: codeDetails.id,
        range_and_amount: code
      }

   
       axiosApi.post(`${API_URL}/` + 'api/v1/admin/special-code/add-range', payload).then((res) => {
        setLoading(false);
        setMessageType("Success")
        setMessageTitle("Range Added")
        setMessageDetails("You have succesfully added range to a code.")
        setSuccessModal(true);
        loadSpecialCCodes()
    
       }).catch((error) => {
        setMessageType("Error")
        setMessageTitle("Special code creation failed")
        setMessageDetails("oops, something went wrong", error.response.data.message)
        setSuccessModal(true);
        setLoading(false);
      
       })

  
    }
  

 
  
   


const loadSpecialCCodes = () => {
  axiosApi.get(`${API_URL}/api/v1/admin/special-code/all`).then((res) => {
      setSpecialCodes(res.data)
  }).catch(() => {
      
  })
}






  

  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: specialCodes.length, // replace later with size(blogs),
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
    if (specialCodes && !specialCodes.length) {
      loadSpecialCCodes()
    }
  }, []);

  const viewCodeDetails = (code) => {
     setCodeDetails(code)
     setCodeRanges(code.range_and_amount)
    setSpecialCodesModal(true)
  }





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
      text: "Special Code",
      dataField: "task_title",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, code) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {code.code} 
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
      formatter: (cellContent, code) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {code.status} 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      text: "Usage Count",
      dataField: "usage_count",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, code) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {code.usage_count} 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      text: "Max Distribution",
      dataField: "reward_amount",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, code) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
             {code.max_distribution}
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      text: "Usage Frequency",
      dataField: "usage_frequency",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, code) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
             {code.usage_frequency}
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
       formatter: (cellContent, code) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {code.createdAt } 
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
      formatter: (cellContent, code) => (
        <div className="d-flex gap-3">
           {loggedInUser.data.role === 3 || loggedInUser.data.role === 4 ?(
                 <i
                 className="mdi mdi-eye font-size-18"
                 onClick={() => viewCodeDetails(code)}
               ></i>
           ) : null}
            { loggedInUser.data.role === 3 || loggedInUser.data.role === 4 ? (
                        <>
                            { code.status == "ACTIVE" ? (
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
                             ) : (<><i className='bx bxs-lock-alt' onClick={() => handleDeactivate(code)}></i></>)}
                         
                            </>
                            ) : code.status == "INACTIVE" ? 
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
                            ) : (<> <i className='bx bxs-lock-open-alt text-success' onClick={() => handleActivate(code)}></i></>)}

                            </>
                            ): null}
                        </>
                            
            ): null}

              { loggedInUser.data.role === 4 ? (
                        <i className='bx bxs-trash text-danger' onClick={() => deleteCode(code)}></i>
                    ) : null}
        </div>
      ),
    },
  ];



  const handleActivate = (code) => {
    setLoading(true)
    axiosApi.put(`${API_URL}/api/v1/admin/special-code/activate/${code.id}`).then(() => {
     setMessageType("Success")
     setMessageTitle("Code activated")
     setMessageDetails("You have succesfully activated a Flipex special code.")
     setSuccessModal(true);
     setLoading(false)
     loadSpecialCCodes()
    }).catch((error) => {
      setLoading(false)
      setMessageType("Error")
     setMessageTitle("Code Activation failed")
     setMessageDetails("oops, something went wrong", error.response.data.message)
     setSuccessModal(true);
    })
  }


  const deleteCode = (code) => {
    setId(code.id);
    setDeleteTitle("Delete Code");
    setDeleteDetails(`You are about to delete ${code.code} special code, if these was a mistake, kindly click on the cancel button`)
    setBtMessage("Delete Code")
    setDeleteModal(true);

 }


 const handleDeleteTask = () => {
   setLoading(true)
    axiosApi.delete(`${API_URL}/api/v1/admin/special-code/delete/${id}`).then(() => {
     setMessageType("Success")
     setMessageTitle("Code Deleted")
     setMessageDetails("You have succesfully deleted a Flipex special code.")
     setDeleteModal(false);
     setSuccessModal(true);
     setLoading(false)
     loadSpecialCCodes()

    }).catch((error) => {
    setLoading(false)
    setMessageType("Error")
    setMessageTitle("Code deletion failed")
    setMessageDetails("oops, something went wrong", error.response.data.message)
    setDeleteModal(false);
    setSuccessModal(true);
    })
 };

 const handleDeactivate = (code) => {
   setLoading(true)
   axiosApi.put(`${API_URL}/api/v1/admin/special-code/deactivate/${code.id}`).then((res) => {
    setMessageType("Success")
    setMessageTitle("Special Code De-activated")
    setMessageDetails("You have succesfully de-activated a Flipex special code.")
    setSuccessModal(true);
    setLoading(false)
    loadSpecialCCodes()
   }).catch((error) => {
     setLoading(false)
     setMessageType("Error")
    setMessageTitle("Special code de-activation failed")
    setMessageDetails("oops, something went wrong", error.response.data.message)
    setSuccessModal(true);
   })

 }

 const addRange = () => {
  const data = {
    "max": formData.range_to,
    "min": formData.range_from,
    "amount": formData.amount
 }
 range_and_amount.push(data);
 setCodeRanges(JSON.stringify(range_and_amount))
 console.log(range_and_amount)

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
          <title>Special Codes | FlipEx Admin dashboard</title>
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
                    data={specialCodes}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={specialCodes}
                          columns={walletListColumns}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col md="6">
                                  SPECIAL CODES
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
                                                Add code 
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
                                         Create Special Code
                                      </ModalHeader>
                                      <ModalBody>
                                        <hr />

                                        <Form   onSubmit={(e) => {
                                            e.preventDefault();
                                            addRange()
                                            return false;
                                          }}>
                                        <div style={{ border: "1px solid #E5E5E5", borderRadius: "8px", marginTop: "20px"}} className="p-2">
                                                <h5>Added Ranges</h5>
                                                 {codeRanges}
                                               </div>
                                            <hr />
                                        <div style={{ border: "1px solid #E5E5E5", borderRadius: "8px", marginTop: "20px"}} className="p-2">
                                                <Row>
                                                  <Col md="6">
                                                    <div className="mb-3">
                                                        <Label className="form-label">Range From</Label>
                                                        <Input
                                                          name="range_from"
                                                          type="text"
                                                          onChange={(e) => setFormData({...formData, range_from: e.target.value})}
                                                          value={formData.range_from || ""}
                                                        
                                                        />
                                                        
                                                      </div>
                                                  </Col>
                                                  <Col md="6">
                                                    <div className="mb-3">
                                                      <Label className="form-label">Range To</Label>
                                                      <Input
                                                          name="range_to"
                                                          type="text"
                                                          onChange={(e) => setFormData({...formData, range_to: e.target.value})}
                                                          value={formData.range_to || ""}
                                                        
                                                        />
                                                        </div>
                                                    </Col>
                                                </Row>

                                                   <div className="mb-3">
                                                      <Label className="form-label">Amount</Label>
                                                      <Input
                                                          name="amount"
                                                          type="text"
                                                          onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                                          value={formData.amount || ""}
                                                        
                                                        />
                                                        </div>
                                                        <button type="submit"  className="btn btn-primary">Add Range</button>
                                               </div>
                                        </Form>

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
                                             
                                                <Row>
                                                  <Col md="7">
                                                    <div className="mb-3">
                                                    <Label className="form-label">Special Code</Label>
                                                    <Input
                                                      name="code"
                                                      type="text"
                                                      onChange={(e) => setFormData({...formData, code: e.target.value})}
                                                      value={formData.code || ""}
                                                    
                                                    />
                                                    
                                                  </div>
                                                  </Col>

                                                  <Col md="5">
                                                      <div className="mb-3">
                                                      <Label className="form-label">Special Code</Label>
                                                        <select className="form-control" name="usage_frquency"  onChange={(e) => setFormData({...formData, usage_frequency: e.target.value})}>
                                                          <option value="" className=" ">Select Usage Frequency</option>
                                                          <option value="ONE-TIME">One-Time</option>
                                                          <option value="GENERAL">General</option>
                                                        </select>
                                                        </div>
                                                  </Col>
                                                </Row>
                                               

                                                <Row>
                                                  <Col md="6">
                                                    <div className="mb-3">
                                                        <Label className="form-label">Max Distribution</Label>
                                                        <Input
                                                          name="max_distribution"
                                                          type="text"
                                                          onChange={(e) => setFormData({...formData, max_distribution: e.target.value})}
                                                          value={formData.max_distribution || ""}
                                                        
                                                        />
                                                        
                                                      </div>
                                                  </Col>
                                                  <Col md="6">
                                                    <div className="mb-3">
                                                      <Label className="form-label">Status</Label>
                                                      <select className="form-control" name="status"  onChange={(e) => setFormData({...formData, status: e.target.value})}>
                                                          <option value="" className=" ">Select status</option>
                                                          <option value="ACTIVE">Active</option>
                                                          <option value="INACTIVE">Not Active</option>
                                                        </select>
                                                        </div>
                                                    </Col>
                                                </Row>

                                             

                                            
                  
                        
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
                                                            creating code...
                                                         </>
                                                         ) : (
                                                         <>
                                                           Save Code
                                                         </>
                                                         )}
                                                    
                                                         
                                                          
                                                    
                                                </button>
                                              </div>
                                            </Col>
                                          </Row>
                                         
                                        </Form>

                                      

                                     
                                      </ModalBody>
                                    </Modal>


                                            {/* Details modal */}
        <Modal isOpen={specialCodeModal} toggle={toggle}>
              <ModalHeader toggle={() => setSpecialCodesModal(false)} tag="h4">
                    {/* {codeDetails?.code} */}
              </ModalHeader>
              <ModalBody>
                <hr />
                  <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>

                            <>
                         
                                 {/* <span>Special Code</span>
                                <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{codeDetails?.code}</span> <hr />

                                <span>Status</span>
                                <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{codeDetails?.status}</span> <hr />

                                <span>Max Distribution</span>
                                <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{codeDetails?.max_distribution}</span> <hr />

                                <span>Usage Count</span>
                                <span style={{ float: 'right', color: "#000", fontWeight: "bold"}}>{codeDetails?.usage_count}</span> <hr /> */}
                         
                              
                            </>
                     
                         

                  </div>

                  <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
                            <span>Code Ranges</span> <br />
                              {JSON.stringify(codeRanges)}
                          <hr />
                        
                    <button className="btn btn-primary" onClick={() =>toggleAddNewRange()}>Add Range</button>

                    <hr />
                     {addNewRange ? (
                     <>
                    <div>
                    <Form
                                          onSubmit={(e) => {
                                            e.preventDefault();
                                              submitNewRange()
                                            return false;
                                          }}
                                        >
                                          <Row form>
                                          <div style={{ border: "1px solid #E5E5E5", borderRadius: "8px", marginTop: "20px"}} className="p-2">
                                            <Col xs={12}>
                                             

                                    
                                                <Row>
                                                  <Col md="6">
                                                    <div className="mb-3">
                                                        <Label className="form-label">Range From</Label>
                                                        <Input
                                                          name="range_from"
                                                          type="text"
                                                          onChange={(e) => setFormData({...formData, range_from: e.target.value})}
                                                          value={formData.range_from || ""}
                                                        
                                                        />
                                                        
                                                      </div>
                                                  </Col>
                                                  <Col md="6">
                                                    <div className="mb-3">
                                                      <Label className="form-label">Range To</Label>
                                                      <Input
                                                          name="range_to"
                                                          type="text"
                                                          onChange={(e) => setFormData({...formData, range_to: e.target.value})}
                                                          value={formData.range_to || ""}
                                                        
                                                        />
                                                        </div>
                                                    </Col>
                                                </Row>

                                                   <div className="mb-3">
                                                      <Label className="form-label">Amount</Label>
                                                      <Input
                                                          name="amount"
                                                          type="text"
                                                          onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                                          value={formData.amount || ""}
                                                        
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
                                                            creating range...
                                                         </>
                                                         ) : (
                                                         <>
                                                           Save Range
                                                         </>
                                                         )}
                                                    
                                                         
                                                          
                                                    
                                                </button>
                                              </div>
                                            </Col>
                                          </Row>
                                        </Form>
                      </div>
                     </>) : (null)}
                   
                  </div>
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

export default withRouter(SpecialCodes);