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


const API_URL = "http://localhost:5000";
const LIVE_URL = "https://staging.flipexapp.com"

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
import DeleteModal from "components/Common/DeleteModal";

import {
   getGiftCards as onGetGiftCards,
   addGiftCard as onAddCard,
   updateGiftCard as onUpdateCard,
   deleteCard as onDeleteCard,
} from "store/giftcard/actions";
import { isEmpty, size, map } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";

const GiftCardList = props => {
  const history = useHistory()

  const dispatch = useDispatch();
  const [giftcardList, setGiftcardList] = useState("");
  const [giftcard, setGiftCard] = useState("");
  const [giftcardImage, setGiftCardImage] = useState("");

  const [postData, setPostData] = useState( { cardName: '', cardType: '', image: '' });
  const [loading, setLoading] = useState(false);



 

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

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (giftcard) => {
    setGiftCard(giftcard.id);
    setDeleteModal(true);
  };

  const handleDeleteCard = () => {
    dispatch(onDeleteCard(giftcard));
    console.log(giftcard)
    onPaginationPageChange(1);
    setDeleteModal(false);
  };

  const handleEditClick = arg => {
    const giftcard = arg;
    setGiftCard({
      id: giftcard.id,
      cardName: giftcard.cardName,
      cardType: giftcard.cardType,
     
    });
    setIsEdit(true);

    toggle();
  };

  const handleAddClick = ()  => {
    setGiftcardList("");
    setIsEdit(false);
    toggle();
  };


  const uploadImage = (e) => {
    setPostData({ ...postData, image: e.target.files[0] });
  }


   // validation
   const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      name: '',
      country: '',
      phone_number: '',
      email: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please users name"),
      phone_number: Yup.string().required("Please enter phone number"),
      country: Yup.string().required("Please enter country"),
      email: Yup.string().required("Please Enter Your Email"),


    }),
    onSubmit: (values) => {
      console.log(admin_name);
      if (isEdit) {
        const updateUser = {
          id: contact.id,
          name: values.name,
          country: values.country,
          phone_number: values.phone_number,
          email: values.email,
          admin_name: admin_name,
          admin_email: loggedInUser.data.email,
          admin_phone: loggedInUser.data.phone_number,
        };

        // update user
        dispatch(onUpdateUser(updateUser));
        validation.resetForm();
        setIsEdit(false);
      } else {
        const newUser = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          name: values["name"],
          country: values["country"],
          email: values["email"],
          phone_number: values["phone_number"],
          admin_name: loggedInUser.data.name,
          admin_email: loggedInUser.data.email,
          admin_phone: loggedInUser.data.phone_number,
        };
        // save new user
        dispatch(onAddNewUser(newUser));
      }
      toggle();
    },
  });




  const handleSubmit = async (e) => {
    if(isEdit){
        const updateCard  = {
           cardName: postData.cardName,
           cardType: postData.cardType,
           imageURL: image
        }

        dispatch(onUpdateCard(updateCard));
    }else{
      setLoading(true);
      const formData = new FormData();
          formData.append("cardName", postData.cardName);
          formData.append("cardType", postData.cardType);
          formData.append("imageURL", postData.image);
          await axiosApi.post(`${API_URL}/` + 'api/v1/giftcards/create', formData).then((res) => {
            // show success toast alert
            toast("Card uploaded successfully")
            // reload state
            history.push('/giftcards');
           
          }).catch((errors) => {
              // return errors
              toast("oops, something went wrong, try again later")
          })
    }
       
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
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, giftcard) => (
        <div className="d-flex gap-3">
          <Link className="text-success" to="#">
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => handleEditClick(giftcard)}
            ></i>
          </Link>

          <Link className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => onClickDelete(giftcard)}
            ></i>
          </Link>
         
           <Link className="text-danger" to={`/giftcards/categories/${giftcard.id}`}>
               <i
                 className="mdi mdi-eye font-size-18"
                 id="deletetooltip"
               ></i>
             </Link>

         
        
          
          
         
        </div>
      ),
    },
  ];




 
  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteCard}
        onCloseClick={() => setDeleteModal(false)}
      />

      <div className="page-content">
        <MetaTags>
          <title>Sell GiftCards | FlipEX dashboard</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Sell" breadcrumbItem="GiftCards selling requests" />
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
                                        {!!isEdit ? "Edit Card" : "Add Card"}
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
                                            <Col xs={12}>
                                              <div className="mb-3">
                                                <Label className="form-label">Card name</Label>
                                                <Input
                                                  name="cardName"
                                                  type="text"
                                                  onChange={(e) => setPostData({...postData, cardName: e.target.value }) }
                                                  value={ postData.cardName}
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <Label className="form-label">Card type</Label>
                                                <Input
                                                  name="cardType"
                                                  label="cardType"
                                                  type="text"
                                                  onChange={(e) => setPostData({ ...postData, cardType: e.target.value })}
                                                  value={postData.cardType}
                                                 
                                                />
                                              
                                              </div>

                                              <div className="mb-3">
                                                <Label className="form-label">Image</Label>
                                                <Input
                                                  name="imageURL"
                                                  type="file"
                                                  onChange={uploadImage}
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