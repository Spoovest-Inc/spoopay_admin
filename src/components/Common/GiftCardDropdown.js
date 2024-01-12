import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import { withRouter, Link, useHistory } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner,
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
  FormGroup,
  Form,
} from "reactstrap"

import * as Yup from "yup";
import { useFormik } from "formik";

import axios from "axios";
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

// import all components here
import SuccessModals from "./successModal";
import DeleteModal from "components/Common/DeleteModal";
import { useSelector, useDispatch } from "react-redux";

import {
    getGiftCards as onGetGiftCards,
    addGiftCard as onAddCard,
    updateGiftCard as onUpdateCard,
    deleteCard as onDeleteCard,
 } from "store/giftcard/actions";

const GiftCardDropdown = ({ menuType, giftcard, loadCards}) => {
    const history = useHistory()
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
    const [categoryTypes, setCategoryTypes] = useState([]);
    const [checked, setChecked] = useState(false);
    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [postData, setPostData] = useState( { cardName: '', image: '' });
    const [messageTitle, setMessageTitle] = useState("")
    const [messageDetails, setMessageDetails] = useState("")
    const [messageType, setMessageType] = useState("")
    const [successModal, setSuccessModal] = useState(false);
    const [deleteDetails, setDeleteDetails] = useState("")
    const [deleteTitle, setDeleteTitle] = useState("")
    const [btMessage, setBtMessage] = useState("")
    const [isMenu, setIsMenu] = useState("");


// import all functions here


const uploadImage = (e) => {
    setPostData({ ...postData, image: e.target.files[0] });
  }

  
  const toggle = () => {
    setModal(!modal);
  };

  const onClickDelete = (giftcard) => {
    setDeleteTitle(`Delete ${giftcard.cardName}`);
    setDeleteDetails("You’re about to delete a card from the admin, if this is a mistake, kindly click cancel.")
    setBtMessage("Delete Card")
    setDeleteModal(true);
  };

  const handleDeleteCard = async() => {
    setLoading(true);
    await axiosApi.delete(`${API_URL}` + '/api/v1/giftcards/delete/' + giftcard.id).then(() => {
      setMessageType("Success")
      setMessageTitle("Card Deleted")
      setMessageDetails("You have succesfully deleted a Flipex card.")
      setDeleteModal(false);
      setSuccessModal(true);
     dispatch(onGetGiftCards());
   }).catch((error) => {
      setMessageType("Error")
      setMessageTitle("Card deletion failed")
      setMessageDetails("oops, something went wrong", error.response.data.message)
      setDeleteModal(false);
      setSuccessModal(true);
   })
 };


 const handleEditClick = arg => {
    const giftcard = arg;
    setIsEdit(true);

    toggle();
  };

  const handleSubmit = async (e) => {
  
        const updateCard  = {
           cardName: postData.cardName,
           cardType: postData.cardType,
           imageURL: image,
           terms_and_conditions: postData.terms_and_conditions
        }
        dispatch(onUpdateCard(updateCard));
       
      toggle();
  }


  const activateCard = async(id) => {
    setLoading(true);
    await axiosApi.put(`${API_URL}/api/v1/giftcards/activate/${id}`).then((res) => {
      // show success toast alert
      setMessageType("Success")
      setMessageTitle("Card Acivated")
      setMessageDetails("You have succesfully activated a Flipex card.")
      setSuccessModal(true);
      dispatch(onGetGiftCards());
      setLoading(false);
    }).catch((res) => {
      setMessageType("Error")
      setMessageTitle("Card activation failed")
      setMessageDetails("oops, something went wrong", error.response.data.message)
      setSuccessModal(true);
      setLoading(false);
    })
  }

  const deActivateCard = async(id) => {
    await axiosApi.put(`${API_URL}/api/v1/giftcards/deactivate/${id}`).then((res) => {
      setMessageType("Success")
      setMessageTitle("Card Deactivation")
      setMessageDetails("You have succesfully de-activated a Flipex card.")
      setSuccessModal(true);
      dispatch(onGetGiftCards());
      setLoading(false);
      dispatch(onGetGiftCards());
      setLoading(false);
    }).catch((res) => {
      setMessageType("Error")
      setMessageTitle("Card de-activation failed")
      setMessageDetails("oops, something went wrong", error.response.data.message)
      setSuccessModal(true);
      setLoading(false);
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
        onDeleteClick={handleDeleteCard}
        onCloseClick={() => setDeleteModal(false)}
        deleteTitle={deleteTitle}
        deleteDetails={deleteDetails}
        btMessage={btMessage}
        loading={loading}
      />


       <Dropdown
        isOpen={isMenu}
         onClick={() => setIsMenu(menuType)}
          toggle={() => setIsMenu("")}
           className="d-inline-block" >
                <DropdownToggle
                  className="font-8 btn-block btn btn-default"
                  id="page-header-user-dropdown"
                  tag="button"
                  style={{
                    border: "1px solid inherit",
                    borderRadius: "100px",
                    width: "40px",
                    height: "40px"
                  }}

                >
                  <i className="mdi mdi-dots-vertical me-3" />
            

                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem>
                        <Link className="text-default" to={`/giftcards/categories/${giftcard.id}`}>
                          View card
                       </Link>
                  </DropdownItem>

                  <DropdownItem>
                    {loggedInUser.data.role == 3 || loggedInUser.data.role == 2  || loggedInUser.data.role == 4 ? (
                    <>
                    <div className="text-default"   onClick={() => handleEditClick(giftcard.id)}>
                          Edit Card
                        </div>
                    </>) : null}
                  </DropdownItem>



                  <DropdownItem>
                  {loggedInUser.data.role == 3 || loggedInUser.data.role == 2  || loggedInUser.data.role == 4 ? (
                   <div className="text-danger"   onClick={() => onClickDelete(giftcard)}>
                     Delete Card
                 </div>
                 ) : null}
                  </DropdownItem>


                  <DropdownItem>
                  {loggedInUser.data.role == 3 || loggedInUser.data.role == 2  || loggedInUser.data.role == 4 ?  (
                    <>
                     <div className={giftcard.status === "ACTIVE" ? "text-danger" : giftcard.status === "NOTACTIVE" ? "text-success" : null}>
                     {giftcard.status === "ACTIVE" ? (
                     <> 
                      <div onClick={() => deActivateCard(giftcard.id)}>
                        {loading ? (
                        <>
                           <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                            de-activating...
                        </>
                        ) : (
                        <>
                            De-acivate
                        </>
                        )}
                      </div>
                      </>) : giftcard.status === "NOTACTIVE" ? (
                      <> 
                       <div onClick={() => activateCard(giftcard.id)}>Activate
                       {loading ? (
                        <>
                           <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                            activating...
                        </>
                        ) : (
                        <>
                         Activate
                        </>
                        )}
                       </div>
                       </>) : null }
                     </div>
                     </>
                   ) : null}
                  </DropdownItem>
                 
                
                </DropdownMenu>
           </Dropdown>
           <>

         
        

           {/* modal 3 */}

                                 <Modal isOpen={modal} toggle={toggle} size="lg" style={{ borderRadius: "20px"}}>
                                      <ModalHeader toggle={toggle} tag="h4" >
                                          Edit Card
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
                                                            Updating...
                                                            </>
                                                          ) 
                                                          }
                         
                                                </button>
                                              </div>
                                          
                                          </Row>
                                        </Form>
                                      </ModalBody>
                                    </Modal>
           </>
    </React.Fragment>
  )
}

GiftCardDropdown.propTypes = {
    giftcard: PropTypes.any,
    menuType: PropTypes.any,
    loadCards: PropTypes.any
}




export default GiftCardDropdown;