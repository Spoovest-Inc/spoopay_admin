import React, { useEffect, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import { withRouter, Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import NumberFormat from 'react-number-format';
import { ToastContainer, toast } from 'react-toastify';
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

import {
  onGetCardCategories,
  updateGiftCardCategory as onUpdateCardCategory,
  // deleteUser as onDeleteUser,
  
} from "store/giftcard/actions";
import { isEmpty, size, map } from "lodash";

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

const GiftCardList = props => {
  const {id} = useParams()
  const [giftCardId, setGiftCardId] = useState("");
  const dispatch = useDispatch();
  const [categoryList, setCategoryList] = useState("");
  const [cardCategories, setCardCategories] = useState("");
  const [giftcard, setGiftCard] = useState("");
  const [rateID, setRateID] = useState("");
  const [loading, setLoading] = useState(false)
  const [image, setImage] = useState("")

  const [country, setCountry] = useState("")
  const [giftcardName, setGiftCardName] = useState("")
  const [giftcardNumber, setGiftCardNumber] = useState("")
  const [giftcardImageUrl, setGiftCardImageUrl] = useState("")
  const [range_from, setRangeFrom] = useState("")
  const [range_to, setRangeTo] = useState("")
  const [category_type, setCategoryType] = useState("")
  const [cardValue, setCardValue] = useState("")
  const [rate, setRate] = useState("")
  const [card_number, setCardNumber] = useState("")
  const [giftcards, setGiftCards] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const [acceptableTypes, setAcceptableTypes] = useState([])


  const [deleteDetails, setDeleteDetails] = useState("")
  const [deleteTitle, setDeleteTitle] = useState("")
  const [btMessage, setBtMessage] = useState("")

  const [messageTitle, setMessageTitle] = useState("")
  const [messageDetails, setMessageDetails] = useState("")
  const [messageType, setMessageType] = useState("")
  const [successModal, setSuccessModal] = useState(false);
  const history = useHistory()






  const loadCategories = () => {
      axiosApi.get(`${API_URL}/api/v1/giftcards/subcategory-rates/${id}`).then((res) => {
         if(res.status === 200){
          setCardCategories(res.data)
          setGiftCardName(res.data.cardName)
          setGiftCardNumber(res.data.cardNumber)
          setGiftCardId(res.data.giftcard_id)
         }else{
          setCardCategories(res.data.getRates)
          setGiftCardName(res.data.cardName)
          setGiftCardNumber(res.data.cardNumber)
          setGiftCardId(res.data.giftcard_id)
         }
         loadCardDetails(res.data.giftcard_id)
      }).catch(() => {
          
      })
  }

  const loadCardDetails = (id) => {
    axiosApi.get(`${API_URL}/api/v1/giftcards/card-details/${id}`).then((res) => {
      setGiftCardName(res.data.giftCard.cardName)
      setGiftCardImageUrl(res.data.giftCard.imageUrl)
      let acceptable_types = res.data.giftCard.acceptable_types
      let newTypes = acceptable_types.split(",")
      console.log(newTypes)
      setAcceptableTypes(newTypes)
    }).catch(() => {
      
    })
}


const loadCards = () => {
  axiosApi.get(`${API_URL}/api/v1/giftcards/all`).then((res) => {
    setGiftCards(res.data)
  }).catch(() => {
    
  })
}

  
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: cardCategories?.length, // replace later with size(users),
    custom: true,
  };
  const defaultSorted = [
    {
      dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ];




    // validation
    const validation = useFormik({
      // enableReinitialize : use this flag when initial values needs to be changed
      enableReinitialize: true,
  
      initialValues: {
        category_name: (giftcard && giftcard.categoryName) || '',
        category_type: (giftcard && giftcard.category_type) || '',
        country: (giftcard && giftcard.country) || '',
        rate: (giftcard && giftcard.rate) || '',
        range: (giftcard && giftcard.range) || '',
        imageURL: (giftcard && giftcard.imageURL) || '',
      },
      validationSchema: Yup.object({
       

      
      
      }),
      onSubmit: async(values) => {
        setLoading(true);
        if (isEdit) {
          const updateCategory = {
            id: giftcard.id,
            categoryName: values.category_name,
            category_type: values.category_type,
            country: values.country,
            rate: rate,
            range: values.range,
            giftcard_id: giftCardId,
            imageURL: giftcard.imageURL,
            card_number: giftcardNumber
          };
  
          await axiosApi.put(`${API_URL}/` + 'api/v1/giftcards/update_category', updateCategory).then((res) => {
            // show success toast alert
            setMessageType("Success")
            setMessageTitle("Rate Updated")
            setMessageDetails("You have succesfully updated a Flipex giftcard rate.")
            setLoading(false);   
            loadCategories()    
          }).catch((errors) => {
              // return errors
              setMessageType("Error")
              setMessageTitle("Rate updating failed")
              setMessageDetails("oops, something went wrong", errors.response.data.message)
              setSuccessModal(true)
              setLoading(false);  
          })
  
          validation.resetForm();
          setIsEdit(false);
        } else {
          const newRate = {
            category_type: category_type,
            country: country,
            rate: rate,
            range_from: range_from,
            range_to: range_to,
            giftcard_id: giftCardId,
            hasRange: checked,
            cardValue: cardValue,
            card_number: giftcardNumber
          
          };
        
             await axiosApi.post(`${API_URL}/` + 'api/v1/giftcards/card_category/create', newRate).then((res) => {
              // show success toast alert
              setMessageType("Success")
              setMessageTitle("Rate Creation")
              setMessageDetails("You have succesfully added a Flipex giftcard rate.") 
              setLoading(false);  
              loadCategories()  
            }).catch((errors) => {
                // return errors
                setMessageType("Error")
                setMessageTitle("Rate creation failed")
                setMessageDetails("oops, something went wrong", errors.response.data.message)
                setSuccessModal(true)
                setLoading(false);  
            })
        }
        toggle();
      },
    });

  const selectRow = {
    mode: "checkbox",
  };

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
      text: " Image",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, giftcard) => (
        <>
          {!giftcard.imageURL ? (
            <div className="avatar-xs">
              <span className="avatar-title rounded-circle">
                {giftcard.category_name.charAt(0)}
              </span>
            </div>
          ) : (
            <div>
              <img
                className="rounded-circle avatar-xs"
                src={giftcard.imageURL}
                alt={giftcard.category_name.charAt()}
              />
            </div>
          )}
        </>
      ),
    },

   
    

    {
      text: "Name",
      dataField: "categoryName",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, giftcard) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {giftcard.category_name} 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      text: "Type",
      dataField: "categoryType",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, giftcard) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {giftcard.category_type} 
            </Link>
          </h5>
        
        </>
      ),
    },


    {
      text: "Country",
      dataField: "country",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, giftcard) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {giftcard.country } 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
        text: "Card Number",
        dataField: "card_number",
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
      text: "Range",
      dataField: "range",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, giftcard) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {giftcard.dedomination_title } 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      text: "Rate",
      dataField: "rate",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, giftcard) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
            <NumberFormat
                  value={giftcard.rate} 
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
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, giftcard) => (
        <div className="d-flex gap-3">
          { loggedInUser.data.role === 3 || loggedInUser.data.role === 2 || loggedInUser.data.role === 4 ?(
            <Link className="text-primary" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => handleUserClick(giftcard)}
            ></i>
          </Link>

          ): null}
          
          { loggedInUser.data.role === 4 || loggedInUser.data.role === 2 || loggedInUser.data.role === 3 ? (
          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => onClickDelete(giftcard.id)}
            ></i>
          </Link> 
             ): null}
         
        
        </div>
      ),
    },
  ];


  useEffect(() => {
       loadCategories()
       loadCards()
      setIsEdit(false);
  }, []);


  const toggle = () => {
    setModal(!modal);
  };

 

  const uploadImage = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("id", giftcard.id);
    formData.append("imageURL", countryImage);

    await axiosApi.post(`${API_URL}/` + 'api/v1/giftcards/upload-images', formData).then((res) => {
     // show success toast alert
     toast("Card country image upload successfully")    
     setLoading(false);  
     window.location.reload(false);     
     forceUpdate();
   }).catch((errors) => {
       // return errors
       toast("oops, something went wrong, try again later", errors.messages)
       setLoading(false);  
   })
  }

  const handleUserClick = arg => {
    const giftcard = arg;

    setGiftCard({
      id: giftcard.id,
      categoryName: giftcard.categoryName,
      category_type: giftcard.category_type,
      country: giftcard.country,
      rate: giftcard.rate,
      range: giftcard.range
     
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

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);

  const [imageModal, setImageModal] = useState(false);
  const [checked, setChecked] = useState(false);



  const onClickDelete = (giftcard) => {
    setRateID(giftcard);
    setDeleteTitle(`Delete ${giftcardName} Rate`);
    setDeleteDetails("You’re about to delete rate from the admin, if this is a mistake, kindly click cancel.")
    setBtMessage("Delete card rate")
    setDeleteModal(true);
  };

  const handleDeleteUser = () => {
   axiosApi.delete(`${API_URL}/api/v1/giftcards/card-category/${rateID}`).then(() => {
    setMessageType("Success")
    setMessageTitle("Rate Deleted")
    setMessageDetails("You have succesfully deleted a Flipex giftcard rate.")
    setDeleteModal(false);
    setSuccessModal(true)
     loadCategories()
    onPaginationPageChange(1);
   }).catch((error) => {
    onPaginationPageChange(1);
    setDeleteModal(false);
    setDeleteModal(false);
    setMessageType("Error")
    setMessageTitle("Rate deletion failed")
    setMessageDetails("oops, something went wrong", error.response.data.message)
    setSuccessModal(true)
   })
  
  };

  const handleUserClicks = () => {
    setCategoryList("");
    setIsEdit(false);
    toggle();
  };

  const keyField = "id";

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
                onDeleteClick={handleDeleteUser}
                onCloseClick={() => setDeleteModal(false)}
                deleteTitle={deleteTitle}
                deleteDetails={deleteDetails}
                btMessage={btMessage}
                loading={loading}
              />
     

                                  <Modal isOpen={imageModal} toggle={toggle}>
                                      <ModalHeader toggle={toggle} tag="h4">
                                         Upload country image
                                      </ModalHeader>
                                      <ModalBody>
                                        <hr />
                                        <Form
                                          onSubmit={(e) => {
                                            e.preventDefault();
                                              uploadImage();
                                            return false;
                                          }}
                                        >
                                          <Row form>
                                            <Col xs={12}>
                                              <div className="mb-3">
                                                <Label className="form-label">Image country</Label>
                                                <Input
                                                   type="file"
                                                   name='imageURL'
                                                   onChange={(e) => setCountryImage(e.target.files[0])}
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
      <div className="page-content">
        <MetaTags>
          <title>{giftcardName} | FlipEX dashboard</title>
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
                    data={cardCategories?.length > 0 ? cardCategories : ""}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={cardCategories}
                          columns={giftcardListColumn}
                          bootstrap4
                          
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col md="4">
                                <h3>Rates for {giftcardName}-{giftcardNumber}</h3>
                                </Col>
                                <Col sm="8">
                               
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
                                    <Link
                                      color="default"
                                      className="font-16 btn-block btn btn-default"
                                      to="/subcategories"
                                      style={{
                                        border: "1px solid gray",
                                        marginRight: "20px"
                                      }}
                                    >
                                      <i className="mdi mdi-back-outline me-1" />
                                      Go back
                                    </Link>
                                    {loggedInUser.data.role == 3 || loggedInUser.data.role == 2  || loggedInUser.data.role == 4 ? (
                                         <Button
                                         style={{ backgroundColor: "black", color: "black" }}
                                         className="btn"
                                         onClick={handleUserClicks}
                                       >
                                         <i className="mdi mdi-plus-circle-outline me-1" />
                                         Add rate
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
                                      <ModalHeader toggle={toggle} tag="h4" >
                                        {!!isEdit ? `Change rate for ${giftcardName}-${giftcardNumber}` : `Add rate for ${giftcardName}-${giftcardNumber}`}
                                       
                                      </ModalHeader>
                                      <ModalBody>
                                        <hr />
                                        <Form
                                          onSubmit={(e) => {
                                            e.preventDefault();
                                            validation.handleSubmit();
                                            return false;
                                          }}
                                        >
                                          <Row form>
                                          <div style={{ border: "1px solid #E5E5E5", borderRadius: "8px", marginTop: "20px"}} className="p-2">
                                            <Row>
                                               <Col md="6">
                                               {!isEdit && ( 
                                                 <div className="mb-3">
                                                <Label className="form-label">Category type</Label>
                                                   <select className="form-control" name="category_type" onChange={(e) => setCategoryType(e.target.value)}>
                                                   <option value="" className=" ">Select type</option>
                                                   {acceptableTypes.map((a_type) => (
                                                    <>
                                                      <option value={a_type}>{a_type}</option>
                                                    </>
                                                   ))}
                                                    
                        
                                                   </select>
                                                  </div>
                                              )}
                                               </Col>

                                               <Col md="6">
                                               {!isEdit && (
                                                  <div className="mb-3">
                                                    <Label className="form-label">Country(Currency)</Label>
                                                   <select className="form-control" name="country" onChange={(e) => setCountry(e.target.value)}>
                                                   <option value="" className=" ">Select country(Currency)</option>
                                                     <option value="US" className="">US</option>
                                                     <option value="GBP">GBP</option>
                                                     <option value="CAD">CAD</option>
                                                     <option value="AUD">AUD</option>
                                                     <option value="EUR">EUR</option>
                                                   </select>
                                                  </div>
                                              )}
                                               </Col>

                                               <Col md="12">
                                            
                                                  <div className="mb-3">
                                                    <Label className="form-label">Card Number</Label>
                                                    <Input
                                                        name="card_number"
                                                        label="Card Number"
                                                        type="text"
                                                        value={giftcardNumber}
                                                        onChange={(e) => setCardNumber(e.target.value)}
                                                        disabled
                                                        />
                                                  </div>
                                            
                                               </Col>
                                            </Row>
                                            <Col xs={12}>

                                            <Col md={6}>
                                                    <div className="mb-3">
                                                        <Label className="form-label">Card has Range</Label>
                                                        <Input
                                                        type="checkbox"
                                                        onChange={(e) => setChecked(!checked)}
                                                        style={{ marginLeft: 10}}
                                                        />
                                                    </div>
                                                </Col>


                                                {!checked ? (
                                                <>

                                                </>) : 
                                                (<>
                                                   <Row>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Label className="form-label">Range from($)</Label>
                                                        <Input
                                                        name="range_from"
                                                        label="Range from"
                                                        type="text"
                                                        value={range_from}
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
                                                        value={range_to}
                                                        onChange={(e) => setRangeTo(e.target.value)}
                                                        
                                                       />
                                                    </div>
                                                </Col>
                                              </Row>
                                                </>)}
                                              
                                           
                                            

                                            
                                                <Row>
                                                  <Col md="6">
                                                      <div className="mb-3">
                                                        <Label className="form-label">Rate(&#8358;)</Label>
                                                        <Input
                                                          name="rate"
                                                          label="Rate"
                                                          type="text"
                                                          onChange={(e) => setRate(e.target.value)}
                                                       
                                                          value={rate || ""}
                                                         
                                                        />
                                                      
                                                  </div>
                                                  </Col>
                                                  <Col md="6">
                                                  {!checked ? (
                                                  <>

                                                    <div className="mb-3">
                                                        <Label className="form-label">Card Value($)</Label>
                                                        <Input
                                                          name="card_value"
                                                          label="Card Value"
                                                          type="text"
                                                          onChange={(e) => setCardValue(e.target.value)}
                                                          value={cardValue || ""}
                                                        
                                                        />
                                                        
                                                  </div>
                                                  </>) : (
                                                  <>
                                                      {/* <div className="mb-3">
                                                        <Label className="form-label">Card Value($)</Label>
                                                        <Input
                                                          name="value"
                                                          label="Value"
                                                          type="text"
                                                          onChange={validation.handleChange}
                                                          value={validation.values.rate || ""}
                                                        
                                                        />
                                                        
                                                  </div> */}
                                                  </>)}
                                                 </Col>
                                                </Row>
                                             

                                             
                                              
                                             

                                            


                                              

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
                                                   { !loading && 'Save rate'}
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

export default withRouter(GiftCardList);