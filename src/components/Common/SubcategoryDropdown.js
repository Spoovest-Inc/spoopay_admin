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

const SubcategoryDropdown = ({ menuType, giftcard, loadCardSubcategories, loadCards}) => {
    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [cards, setCards] = useState([]);
  
    const [giftCardId, setGiftCardId] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [loading, setLoading] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
    const [messageTitle, setMessageTitle] = useState("")
    const [messageDetails, setMessageDetails] = useState("")
    const [messageType, setMessageType] = useState("")
    const [successModal, setSuccessModal] = useState(false);
    const [deleteDetails, setDeleteDetails] = useState("")
    const [deleteTitle, setDeleteTitle] = useState("")
    const [btMessage, setBtMessage] = useState("")
    const [isMenu, setIsMenu] = useState("");

      //delete card
    const [deleteModal, setDeleteModal] = useState(false);
    const dispatch = useDispatch();


    const onClickDelete = (giftcard) => {
        setDeleteTitle(`Delete ${giftcard.card_name + " " + giftcard.card_number}`);
        setDeleteDetails("You’re about to delete a card from the admin, if this is a mistake, kindly click cancel.")
        setBtMessage("Delete Card")
        setDeleteModal(true);
      };

      
    
      const handleDeleteCard = async() => {
         setLoading(true);
         await axiosApi.delete(`${API_URL}` + '/api/v1/giftcards/delete-subcategory/' + giftcard).then(() => {
            setMessageType("Success")
            setMessageTitle("Card Deleted")
            setMessageDetails("You have succesfully deleted a Flipex card.")
            setDeleteModal(false);
            setSuccessModal(true);
            setLoading(false);
            loadCardSubcategories()
        }).catch((error) => {
            setMessageType("Error")
            setMessageTitle("Card deletion failed")
            setMessageDetails("oops, something went wrong", error.response.data.message)
            setDeleteModal(false);
            setSuccessModal(true);
        })
      };


      const activateCard = async(id) => {
        await axiosApi.put(`${API_URL}/api/v1/giftcards/subcategory/activate/${id}`).then((res) => {
          // show success toast alert
          setMessageType("Success")
          setMessageTitle("Card Activated")
          setMessageDetails("You have succesfully activated a Flipex card.")
          setSuccessModal(true);
          loadCardSubcategories()
          setLoading(false);
        }).catch((res) => {
            setMessageType("Error")
            setMessageTitle("Card activation failed")
            setMessageDetails("oops, something went wrong", res.response.data.message)
            setSuccessModal(true);
            setLoading(false);
        })
      }
    
      const deActivateCard = async(id) => {
        await axiosApi.put(`${API_URL}/api/v1/giftcards/subcategory/deactivate/${id}`).then((res) => {
          // show success toast alert
          setMessageType("Success")
          setMessageTitle("Card De-activated")
          setMessageDetails("You have succesfully de-activated a Flipex card.")
          setSuccessModal(true);
          loadCardSubcategories()
          setLoading(false);
        }).catch((res) => {
            setMessageType("Error")
            setMessageTitle("Card de-activation failed")
            setMessageDetails("oops, something went wrong", res.response.data.message)
            setSuccessModal(true);
            setLoading(false);
        })
      }

      const toggle = () => {
        setModal(!modal);
      };

      const handleEditClick = arg => {
        const giftcard = arg;
        setIsEdit(true);
    
        toggle();
      };
    

      const handleSubmit = async (e) => {
            const updateCard  = {
              giftCardId,
              cardNumber
            }
            dispatch(onUpdateCard(updateCard));
    
          toggle();
      }
    

  
  


// import all functions here

  




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
                    <Link className="text-success" to={`/giftcards/sub-categories/${giftcard.id}`}>
                        View details
                  </Link>
                  </DropdownItem>


                  <DropdownItem>
                  { loggedInUser.data.role === 3 || loggedInUser.data.role === 2 || loggedInUser.data.role === 4 ? (
                    <div   onClick={() => handleEditClick(giftcard)}>
                        Edit Card
                    </div>

                ): null}
                  </DropdownItem>

                  <DropdownItem>
                  { loggedInUser.data.role === 4 || loggedInUser.data.role === 3 ? (
                   <div className="text-primary"  onClick={() => onClickDelete(giftcard)}>
                    Delete Card
                  </div>
                   ) : null}
         
                  </DropdownItem>

                  <DropdownItem>
                  {loggedInUser.data.role == 3 || loggedInUser.data.role == 2  || loggedInUser.data.role == 4 ?  (
                    <>
                     <div className={giftcard.status === "ACTIVE" ? "text-danger" : giftcard.status === "NOTACTIVE" ? "text-success" : "text-success"}>
                        {giftcard.status === "ACTIVE" ? (<> <span onClick={() => deActivateCard(giftcard.id)}>De-activate</span></>) : giftcard.status === "NOTACTIVE" ? (<> <span onClick={() => activateCard(giftcard.id)}>Activate</span></>) : (<> <span onClick={() => activateCard(giftcard.id)}>Activate</span></>) }
                    </div>
                    </>
                    ) : null}
                  </DropdownItem>



                
                
                </DropdownMenu>
           </Dropdown>
           <>

           {/* modal 3 */}
             <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle} tag="h4">
                        Edit {giftcard.card_name + " " + giftcard.card_number}
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

                                 
           </>
    </React.Fragment>
  )
}

SubcategoryDropdown.propTypes = {
    giftcard: PropTypes.any,
    menuType: PropTypes.any,
    loadCards: PropTypes.any,
    loadCardSubcategories: PropTypes.any
}




export default SubcategoryDropdown;