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




import {
   getGiftCards as onGetGiftCards,
   addGiftCard as onAddCard,
   updateGiftCard as onUpdateCard,
   deleteCard as onDeleteCard,
} from "store/giftcard/actions";
import { isEmpty, size, map } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import SuccessModals from "../../../components/Common/successModal";
import GiftCardDropdown from "components/Common/GiftCardDropdown";



const GiftCardList = props => {
  const history = useHistory()

  const dispatch = useDispatch();
  const [giftcardList, setGiftcardList] = useState("");
  const [giftcard, setGiftCard] = useState("");
  const [giftcardImage, setGiftCardImage] = useState("");

  const [postData, setPostData] = useState( { cardName: '', image: '' });
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const [categoryTypes, setCategoryTypes] = useState([]);
  const [checked, setChecked] = useState(false);
  const [messageTitle, setMessageTitle] = useState("")
  const [messageDetails, setMessageDetails] = useState("")
  const [messageType, setMessageType] = useState("")
  const [successModal, setSuccessModal] = useState(false);
 

  const { giftcards } = useSelector(state => ({
    giftcards: state.giftcards.giftcards,
  }));



  
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  




  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: giftcards.length, // replace later with size(users),
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
    if (giftcards && !giftcards.length) {
      dispatch(onGetGiftCards());
      setIsEdit(false);
    }
  }, [dispatch, giftcards]);


  useEffect(() => {
    setGiftcardList(giftcards);
    setIsEdit(false);
  }, [giftcards]);

  useEffect(() => {
    if (!isEmpty(giftcards) && !!isEdit) {
      setGiftcardList(giftcards);
      setIsEdit(false);
    }
  }, [giftcards]);



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








  const handleAddClick = ()  => {
    setGiftcardList("");
    setIsEdit(false);
    toggle();
  };


  const uploadImage = (e) => {
    setPostData({ ...postData, image: e.target.files[0] });
  }






  const handleSubmit = async (e) => {
      setLoading(true);
      const formData = new FormData();
          formData.append("cardName", postData.cardName);
          formData.append("imageURL", postData.image);
          formData.append("hasSubcategory", checked)
          formData.append("acceptable_types", categoryTypes)
          await axiosApi.post(`${API_URL}/` + 'api/v1/giftcards/create', formData).then((res) => {
            // show success toast alert
            setMessageType("Success")
            setMessageTitle("Card added successfully");
            setMessageDetails("You have succesfully added a giftcard to Flipex.")
            dispatch(onGetGiftCards());
            setLoading(false);
          }).catch((res) => {
            if(res.message === "Request failed with status code 400"){
              setMessageType("Error")
              setMessageTitle("Duplicate card");
              setMessageDetails("Card already exist.")
            }else{
              setMessageType("Error")
              setMessageTitle("Card creation failed");
              setMessageDetails(error.response.data.message)
              setSuccessModal(true);
            }
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
      dataField: "img",
      text: "#",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, giftcard) => (
        <>
          {!giftcard.imageUrl ? (
            <div className="avatar-xs">
              <span className="avatar-title rounded-circle">
                {giftcard.cardName.charAt(0)}
              </span>
            </div>
          ) : (
            <div>
              <img
                className="rounded-circle avatar-xs"
                src={giftcard.imageUrl}
                alt={giftcard.cardName.charAt()}
              />
            </div>
          )}
        </>
      ),
    },
    

    {
      text: "Card Name",
      dataField: "name",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, giftcard) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {giftcard.cardName} 
            </Link>
          </h5>
        
        </>
      ),
    },


    {
      text: "Card Type",
      dataField: "cardName",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, giftcard) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {giftcard.cardType } 
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
          <>
          <GiftCardDropdown menuType={giftcard.id} giftcard={giftcard} />
          </>
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
          <title>GiftCards | FlipEX dashboard</title>
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
                    data={giftcards}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={giftcards}
                          columns={giftcardListColumn}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col sm="7">
                                <h5>GIFTCARDS</h5>
                                </Col>
                                <Col sm="5">
                                  <div className="text-sm-end">

                                   <Row>
                                      <Col md="5">
                                        <div className="search-box ms-2 mb-2 d-inline-block">
                                          <div className="position-relative">
                                            <SearchBar {...toolkitProps.searchProps} />
                                            <i className="bx bx-search-alt search-icon" />
                                          </div>
                                          </div>
                                      </Col>

                                      <Col md="7">
                                      {loggedInUser.data.role == 3 || loggedInUser.data.role == 2 ||  loggedInUser.data.role == 4 ? (
                                      <>
                                        <Button
                                          color="default"
                                          className="font-16 btn-block btn btn-default"
                                          onClick={handleAddClick}
                                          style={{
                                            border: "1px solid gray"
                                          }}
                                        >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      Add new giftcard
                                    </Button>
                                      </>
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

                                    <Modal isOpen={modal} toggle={toggle} size="lg" style={{ borderRadius: "20px"}}>
                                      <ModalHeader toggle={toggle} tag="h4" >
                                          Add Card
                                      </ModalHeader>
                                      <ModalBody>
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
                                                      <Input
                                                        name="cardName"
                                                        label="Card Name"
                                                        type="text"
                                                        placeholder="Enter card name"
                                                        value={postData.cardName}
                                                        onChange={(e) => setPostData({...postData, cardName: e.target.value})}
                                  
                                                        />
                                              </div>

                                              <Col md={6}>
                                                    <div className="mb-3">
                                                        <Label className="form-label">Card has numbers</Label>
                                                        <Input
                                                        type="checkbox"
                                                        onChange={(e) => setChecked(!checked)}
                                                        style={{ marginLeft: 10}}
                                                        />
                                                    </div>
                                                </Col>

                                              <Col md={12}>
                                              <h4>Acceptable Category Type</h4>
                                              <div style={{ display: "flex", flexDirection: "row"}}>
                                              <div className="mb-3">
                                                       
                                                        <Input
                                                        type="checkbox"
                                                        onChange={(e) => { categoryTypes.push('No Receipt')}}
                                                        style={{ marginLeft: "5px"}}
                                                        />
                                                         <Label className="form-label" style={{ paddingLeft: "10px"}}>No Receipt</Label>
                                                    </div>

                                                    <div className="mb-1 ml-3" style={{ marginLeft: "20px"}}>

                                                        <Input
                                                        type="checkbox"
                                                        onChange={(e) => { categoryTypes.push('E-Code')}}
                                                        style={{ marginLeft: "2px"}}
                                                        />
                                                      <Label className="form-label" style={{ paddingLeft: "10px"}}>E Code</Label>
                                                    </div>

                                                    <div className="mb-1 ml-3" style={{ marginLeft: "20px"}}>
                                                       
                                                        <Input
                                                        type="checkbox"
                                                        onChange={(e) => { categoryTypes.push('Cash Receipt')}}
                                                        style={{ marginLeft: "4px"}}
                                                        />
                                                         <Label className="form-label" style={{ paddingLeft: "10px"}}>Cash Receipt</Label>
                                                    </div>

                                                    <div className="mb-1 ml-3" style={{ marginLeft: "20px"}}>
                                                      
                                                        <Input
                                                        type="checkbox"
                                                        onChange={(e) => { categoryTypes.push('Credit Receipt')}}
                                                        style={{ marginLeft: "5px"}}
                                                        />
                                                          <Label className="form-label" style={{ paddingLeft: "10px"}}>Credit Receipt</Label>
                                                    </div>

                                                    <div className="mb-1 ml-3" style={{ marginLeft: "20px"}}>
                                                        <Input
                                                        type="checkbox"
                                                        onChange={(e) => { categoryTypes.push('Debit Receipt')}}
                                                        style={{ marginLeft: "3px"}}
                                                        />
                                                        <Label className="form-label" style={{ paddingLeft: "10px"}}>Debit Receipt</Label>
                                                    </div>
                                              </div>
                                            
                              
                                                </Col>

                                              <div className="mb-3">
                                                <Label className="form-label">Card Image</Label>
                                                <Input
                                                  name="imageURL"
                                                  type="file"
                                                  onChange={uploadImage}
                                                />
                                              
                                              </div>

                                              
                                            </Col>
                                            </div>
                                          </Row>
                                          <Row>
                                              <div className="text-end mt-5">

                                                <Button
                                                   color="default"
                                                   className="font-16 btn-block btn btn-default mr-5"
                                                   style={{
                                                    border: "1px solid gray",
                                                    marginRight: "10px"
                                                  }}
                                                  onClick={toggle}
                                                >
                                                Cancel
                         
                                                </Button>

                                                <button
                                                  type="submit"
                                                  className="btn btn-default"
                                                  style={{
                                                    backgroundColor: "black",
                                                    color: "white"
                                                  }}
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



export default withRouter(GiftCardList);