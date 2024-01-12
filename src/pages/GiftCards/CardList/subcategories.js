import React, { useEffect, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
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


import SubcategoryDropdown from "components/Common/SubcategoryDropdown";
import SuccessModals from "components/Common/successModal";

import { isEmpty, size, map } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";

const Subcategories = props => {

  const dispatch = useDispatch();
  const [giftcardList, setGiftcardList] = useState("");
  const [giftcard, setGiftCard] = useState("");
  const [cards, setCards] = useState([]);

  const [giftCardId, setGiftCardId] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const [messageTitle, setMessageTitle] = useState("")
  const [messageDetails, setMessageDetails] = useState("")
  const [messageType, setMessageType] = useState("")
  const [successModal, setSuccessModal] = useState(false);



  
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  


const loadCards = () => {
  axiosApi.get(`${API_URL}/api/v1/giftcards/number-cards`).then((res) => {
    setCards(res.data)
  }).catch(() => {
    
  })
}

const loadCardSubcategories = () => {
  axiosApi.get(`${API_URL}/api/v1/giftcards/all-subsadmin`).then((res) => {
    setGiftcardList(res.data.data)
  }).catch(() => {
    
  })
}





  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: giftcardList.length, // replace later with size(users),
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
      loadCardSubcategories()
      loadCards()
      setIsEdit(false);
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

  //delete card
  const [deleteModal, setDeleteModal] = useState(false);

  

 
  const handleAddClick = ()  => {
    setIsEdit(false);
    toggle();
  };









  const handleSubmit = async (e) => {
      setLoading(true);
            let data = {
              giftcard_id: giftCardId,
              card_number: cardNumber
            }
          await axiosApi.post(`${API_URL}/` + 'api/v1/giftcards/add-subcategory', data).then((res) => {
            setMessageType("Success")
            setMessageTitle("Card Added")
            setMessageDetails("You have succesfully added a Flipex card.")
            setSuccessModal(true);
           loadCardSubcategories()
            setLoading(false);
          }).catch((errors) => {
            setMessageType("Error")
            setMessageTitle("Card creation failed")
            setMessageDetails("oops, something went wrong", errors.response.data.message)
            setSuccessModal(true);
              setLoading(false);
          })
       
      toggle();
  }

  const keyField = "id"



  const giftcardListColumn = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      // eslint-disable-next-line react/display-name
      formatter: giftcard => <>{giftcard.id}</>,
    },
   
    

    {
      text: "Card Name",
      dataField: "cardName",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, giftcard) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {giftcard.card_name} 
            </Link>
          </h5>
        
        </>
      ),
    },


    {
      text: "Card Number",
      dataField: "cardNumber",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, giftcard) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {giftcard.card_number } 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      text: "Card Status",
      dataField: "status",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, giftcard) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {giftcard.status } 
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
      formatter: (cellContent, giftcard) => (
       <SubcategoryDropdown giftcard={giftcard} menuType={giftcard.id} loadCards={loadCards} loadCardSubcategories={loadCardSubcategories}  />
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
      <div className="page-content">
        <MetaTags>
          <title>GiftCard Subcategories | FlipEX dashboard</title>
        </MetaTags>
        <Container fluid>
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField={keyField}
                    columns={giftcardListColumn}
                    data={giftcardList}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={giftcardList}
                          columns={giftcardListColumn}
                          bootstrap4
                          
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                               <Col md="6">GIFTCARD SUBCATEGORIES</Col>
                                <Col sm="6">
                                  <div className="text-sm-end">
                                    <Row>
                                      <Col md="6">
                                      <div className="search-box ms-2 mb-2 d-inline-block">
                                          <div className="position-relative">
                                            <SearchBar {...toolkitProps.searchProps} />
                                            <i className="bx bx-search-alt search-icon" />
                                          </div>
                                          </div>
                                      </Col>
                                      <Col md="6">
                                      {loggedInUser.data.role == 3 || loggedInUser.data.role == 2 ||  loggedInUser.data.role == 4 ? (
                                      <Button
                                      color="default"
                                      className="font-16 btn-block btn btn-default"
                                      onClick={handleAddClick}
                                      style={{
                                        border: "1px solid gray"
                                      }}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      Add new subcategory
                                    </Button>
                                    ) : null}
                                  
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
                                        {!!isEdit ? "Edit Card" : "Add Card with numbers"}
                                      </ModalHeader>
                                      <ModalBody>
                                        <hr />
                                        <Form
                                          onSubmit={(e) => {
                                            e.preventDefault();
                                            handleSubmit();
                                          }}
                                          encType="multipart/form-data"
                                        >
                                          <Row form>
                                          <div style={{ border: "1px solid #E5E5E5", borderRadius: "8px", marginTop: "20px"}} className="p-2">
                                            <Col xs={12}>
                                              <div className="mb-3">
                                                <Label className="form-label">Card name</Label>
                                                <select className="form-control" name="range" onChange={(e) => setGiftCardId(e.target.value)}>
                                                     <option value="" className=" ">Select Card</option>
                                                    { cards?.map((card, index) => (
                                                        <>
                                                          <option value={card.id} className=" ">{card.cardName}</option>
                                                        </>
                                                    ))}
                                                   </select>
                                              </div>

                                              <div className="mb-3">
                                                <Label className="form-label">Card number</Label>
                                               
                                                      <Input
                                                        name="cardNumber"
                                                        label="Card Number"
                                                        type="text"
                                                        value={cardNumber}
                                                        onChange={(e) => setCardNumber(e.target.value)}
                                  
                                                        />
                                              </div>
                                            </Col>
                                            </div>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <div className="text-end mt-3">
                                              <button
                                                  type="button"
                                                  className="btn btn-default"
                                                  style={{
                                                    border: "1px solid gray",
                                                    marginRight: "20px"
                                                  }}
                                                  onClick={toggle}
                                                >
                                                    Cancel
                         
                                                </button>

                                                <button
                                                  type="submit"
                                                  className="btn btn-primary"
                                                >
                                                     { !loading && 'Save'}
                                                          { loading && (
                                                            <>
                                                            <Spinner
                                                              as="span"
                                                              animation="grow"
                                                              size="sm"
                                                              role="status"
                                                              aria-hidden="true"
                                                            />
                                                            Uploading...
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



export default withRouter(Subcategories);