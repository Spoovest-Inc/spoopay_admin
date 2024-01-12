import React, { useEffect, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { withRouter, Link, useHistory } from "react-router-dom";
import Picker from 'emoji-picker-react';
import SuccessModals from "../../components/Common/successModal";
import NoticeDetails from "../../../src/components/Common/NoticeDetails"
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
  Textarea,
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

import ReportCard from "components/Common/ReportCard"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";


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


import { isEmpty, size, map, values } from "lodash";




const LogsList = ()  => {
  const [notices, setNotices]  = useState([])
  const [modal, setModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [noticeData, setNoticeData] = useState({ title: '', content: '', salutation: '' });
  const [personalized_title, setPersonalizedTitle] = useState(false)
  const [personalized_content, setPersonalizedContent] = useState(false)
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState("");
  const [image, setImage] = useState("No image")
  const [hasImage, setHasImage] = useState(false);

  const [messageTitle, setMessageTitle] = useState("")
  const [messageDetails, setMessageDetails] = useState("")
  const [messageType, setMessageType] = useState("")
  const [successModal, setSuccessModal] = useState(false);


  const handleUpload = (e) => {
    setHasImage(true)
    setImage(e.target.files[0])    
  }


  const [id, setId] = useState("");
  

  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: notices.length, // replace later with size(blogs),
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

  const loadData = async () => {
      axiosApi.get(`${API_URL}/api/v1/admin/all-notice`).then((res) => {
        setNotices(res.data.data)
      }).catch((error) => {
      })
  }


  useEffect(() => {
       loadData();
      setIsEdit(false);
    
  }, []);


  useEffect(() => {
    setNotices(notices);
    setIsEdit(false);
  }, [notices]);

  useEffect(() => {
    if (!isEmpty(notices) && !!isEdit) {
      setLogs(notices);
      setIsEdit(false);
    }
  }, [notices]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleEditClick = arg => {
    const notice = arg;
    setId({
      id: notice.id,
    });
    setIsEdit(true);
    toggle();
  };

  const handleAddClick = ()  => {
    setIsEdit(false);
    toggle();
  };

  const handleSubmit = async (e) => {
    if(isEdit){
       // send backend request
       setLoading(true);
       const formData = new FormData();
           formData.append("title", noticeData.title);
           formData.append("content", noticeData.content + chosenEmoji.emoji);
           formData.append('imageURL', image)
           formData.append("id", id);
        
           await axiosApi.post(`${API_URL}/` + 'api/v1/admin/update-notice', formData).then((res) => {
             // show success toast alert
             toast("Notification uploaded successfully")
              loadData()
              setLoading(false);
           }).catch((error) => {
               // return errors
               toast("oops, something went wrong, try again later", error.message)
               setLoading(false);
           })
       
    }else{
      setLoading(true);
      if(!hasImage){
        const data = {
           title: noticeData.title,
           content: noticeData.content,
           personalized_title: personalized_title,
           personalized_content: personalized_content,
           salutation: noticeData.salutation,
        }
        

    await axiosApi.post(`${API_URL}/` + 'api/v1/admin/create-notice', data).then((res) => {
      // show success toast alert
      setMessageType("Success")
      setMessageTitle("Broadcast Sent Successfully");
      setMessageDetails("You have succesfully sent a broadcast notice to everyone on Flipex.")
      setSuccessModal(true);
       loadData()
       setPersonalizedContent(false)
       setPersonalizedTitle(false)
       setLoading(false);
    }).catch((error) => {
      setMessageType("Error")
      setMessageTitle("Broadcast Failed");
      setMessageDetails(error.response.data.message)
      setSuccessModal(true);
        setLoading(false);
    })
      }else{
       const formData = new FormData();
       formData.append('title', noticeData.title)
       formData.append('content', noticeData.content)
       formData.append('imageURL', image),
       formData.append('personalized_title', personalized_title),
       formData.append('personalized_content', personalized_content)
       formData.append('salutation', noticeData.salutation)
    await axiosApi.post(`${API_URL}/` + 'api/v1/admin/create-notice-image', formData).then((res) => {
      // show success toast alert
       toast("Notification uploaded successfully")
       loadData()
       setPersonalizedContent(false)
       setPersonalizedTitle(false)
       setLoading(false);
    }).catch((error) => {
        // return errors
        toast("oops, something went wrong, try again later", error.message)
        setLoading(false);
    })
      }


       
    }
       
      toggle();
  }

    const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const deleteNotice = (id) => {
     axiosApi.delete(`${API_URL}/api/admin/delete-notice/${id}`).then(() => {
       toast("Notice has been deleted");
      loadData();
     }).catch((error) => {
       toast("oops, something went wrong, try again later")
     })
  }

  

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







  const keyField = "id";


  const logListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      // eslint-disable-next-line react/display-name
      formatter: notice => <>{notice.id}</>,
    },
   
    
      {
        text: "Title",
        dataField: "title",
        sort: true,
        // eslint-disable-next-line react/display-name
        formatter: (cellContent, notice) => (
          <>
            <h5 className="font-size-14 mb-1">
              <Link to="#" className="text-dark">
                {notice.title} 
              </Link>
            </h5>
          
          </>
        ),
      },

      {
        text: "Notice",
        dataField: "notice",
        sort: true,
        // eslint-disable-next-line react/display-name
        formatter: (cellContent, notice) => (
          <>
            <h5 className="font-size-14 mb-1">
              <Link to="#" className="text-dark">
                {notice.content} 
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
       formatter: (cellContent, notice) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {notice.createdAt } 
            </Link>
          </h5>
        
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
          <title>Notication management | FlipEx Admin dashboard</title>
        </MetaTags>
        <Container fluid>
         
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField={keyField}
                    columns={logListColumns}
                    data={notices}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={notices}
                          columns={logListColumns}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col sm="4">
                                 <h5>General Notices</h5>
                                </Col>
                                <Col sm="8">
                                  <div className="text-sm-end">
                                    <Button
                                      color="default"
                                      className="font-16 btn-block btn btn-default"
                                      onClick={handleAddClick}
                                      style={{
                                        border: "1px solid gray"
                                      }}
                                    >
                                      <i className="mdi mdi-plus me-1" />
                                      New Broadcast notice
                                    </Button>
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

                                    <Modal isOpen={modal} toggle={toggle} size="lg">
                                      <ModalHeader toggle={toggle} tag="h4">
                                        {!!isEdit ? "Edit notice" : "Send a Broadcast Notice"}
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
                                            <hr />
                                            <Col xs={12}>
                                              
                                            <div style={{ border: "1px solid #E5E5E5", borderRadius: "8px", marginTop: "20px"}} className="p-2">
                                           
                                            <div className="mb-3">
                                                <Label className="form-label">Personalized Title</Label>
                                                   <Input
                                                        type="checkbox"
                                                        onChange={(e) => setPersonalizedTitle(!personalized_title)}
                                                        style={{ marginLeft: 10}}
                                                        />

                                                <Label className="form-label pl-2" style={{ paddingLeft: "10px"}}>Personalized Content</Label>
                                                   <Input
                                                        type="checkbox"
                                                        onChange={(e) => setPersonalizedContent(!personalized_content)}
                                                        style={{ marginLeft: 10}}
                                                        />
                                              </div>

                                              <div className="mb-3">
                                                <Label className="form-label">Salutation</Label>
                                                <Input
                                                  name="salutation"
                                                  type="text"
                                                  onChange={(e) => setNoticeData({...noticeData, salutation: e.target.value }) }
                                                  value={ noticeData.salutation}
                                                />
                                              </div>

                                              <div className="mb-3">
                                                <Label className="form-label">Title</Label>
                                                <Input
                                                  name="title"
                                                  type="textarea"
                                                  onChange={(e) => setNoticeData({...noticeData, title: e.target.value }) }
                                                  value={ noticeData.title}
                                                />
                                              </div>
                                              <div className="mb-3">
                                                <Label className="form-label">Content</Label>

                                                <Input
                                                  name="content"
                                                  type="textarea"
                                                  onChange={(e) => setNoticeData({...noticeData, content: e.target.value }) }
                                                  value={ noticeData.content}
                                                />



                                                
                                             
                                                

                                              {/* {chosenEmoji ? (
                                                  <span>You chose: {chosenEmoji.emoji}</span>
                                                ) : (
                                                  <span>No emoji Chosen</span>
                                                )}

                                                  <Picker onEmojiClick={onEmojiClick} /> */}
                                              
                                              </div>

                                                   
                                              <div className="mb-3">
                                                <Label className="form-label">Notification image(Optional)</Label>
                                                <Input
                                                   type="file"
                                                   name='imageURL'
                                                   onChange={handleUpload}
                                                  
                                                />
                                               
                                              </div>

                                           </div>
                                            </Col>
                                          </Row>
                                         
                                          <div style={{ border: "1px solid #E5E5E5", borderRadius: "8px", marginTop: "20px"}} className="p-2">
                                            <h6>Preview Notice</h6>
                                            <h3 style={{ paddingTop: "10px"}}>{ personalized_title ? (<>{noticeData.salutation} Ubong, {noticeData.title}</>) : (<>{noticeData.title}</>)}</h3>
                                            <p>{personalized_content ? (<>Ubong, {noticeData.content} </>) : (<>{noticeData.content}</>)}</p>
                                          </div>
                                          <Row>
                                            <Col>
                                              <div className="text-end" style={{ marginTop: "20px"}}>
                                              <button
                                                  className="btn btn-default"
                                                  style={{ border: '1px solid gray', marginRight: "10px"}}
                                                  onClick={toggle}
                                                >
                                                   
                                                    Cancel
                         
                                                </button>

                                                <button
                                                  type="submit"
                                                  className="btn btn-primary"
                                                >
                                                     { !loading && 'Send'}
                                                          { loading && (
                                                            <>
                                                            <Spinner
                                                              as="span"
                                                              animation="grow"
                                                              size="sm"
                                                              role="status"
                                                              aria-hidden="true"
                                                            />
                                                            Sending...
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

export default withRouter(LogsList);