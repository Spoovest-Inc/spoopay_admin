import React, { useEffect, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import { CKEditor, LinkImage } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { withRouter, Link, useHistory } from "react-router-dom";
// import  newsImage from "../../assets/images/email-temps/image.png"
// import tempOneImage from "../../assets/images/email-temps/header.jpeg"
import tempOneImage from "../../assets/images/flip-logo.png"
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



//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import ReportCard from "components/Common/ReportCard";
import SuccessModals from "components/Common/successModal";
import CsvDownloadButton from "components/Common/CsvDownload";

import { isEmpty, size, map, values } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";

//apply base url for axios
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

const Email = props => {
  const history = useHistory()
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const [subject, setSubject] = useState('');
  const [greetings, setGreetings] = useState('');
  const [body, setBody] = useState("")
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const [subscribers, setSubscribers] = useState([])
  const [emailType, setEmailType] = useState('')
  const [emailTemp, setEmailTemp] = useState("")
  const [emails, setEmails] = useState([])
  const [footerImage, setFooterImage] = useState("")
  const [headerImage, setHeaderImage] = useState("")
  const [broadcastType, setBroadcastType] = useState("")
  const [footerLink, setFooterLink] = useState("")

  const [messageTitle, setMessageTitle] = useState("")
  const [messageDetails, setMessageDetails] = useState("")
  const [messageType, setMessageType] = useState("")
  const [successModal, setSuccessModal] = useState(false);


  const  sendEmail = async() => {
      setLoading(true);

      const formData = new FormData();
      formData.append("subject", subject);
      formData.append("greetings", greetings);
      formData.append("emailType", emailType );
      formData.append("body", body);
      formData.append("imageURL", image);
      formData.append("headerImage", headerImage);
      formData.append("footerImage", footerImage);
      formData.append("emails", emails);
      formData.append("footerLink", footerLink);
      formData.append("broadcastType", broadcastType);

      if(emailType === "newsletter" && emailTemp === "template_one"){
       await axiosApi.post(`${API_URL}/` + 'api/v1/admin/send-image-newsletter', formData).then((res) => {
          setLoading(false);     
          setMessageType("Success")
          setMessageTitle("Newsletter Sent Successfully");
          setMessageDetails("You have succesfully added sent a newsletter to everyone on Flipex.")
          setSuccessModal(true);  
       }).catch((errors) => {
          setMessageType("Error")
          setMessageTitle("Newsletter Sending failed");
          setMessageDetails(errors.response.data.message)
          setSuccessModal(true);
          setLoading(false);
       })
      }
      else if(emailType === "newsletter" && emailTemp === "template_two"){
          await axiosApi.post(`${API_URL}/` + 'api/v1/admin/send-newsletter-with-image', formData).then((res) => {
            setLoading(false);     
            setMessageType("Success")
            setMessageTitle("Newsletter Sent Successfully");
            setMessageDetails("You have succesfully added sent a newsletter to everyone on Flipex.")
            setSuccessModal(true);  
           
          }).catch((errors) => {
            setMessageType("Error")
            setMessageTitle("Admin added failed");
            setMessageDetails(errors.response.data.message)
            setSuccessModal(true);
            setLoading(false);
          })
      }
       else if(emailType === "newsletter" && emailTemp === "template_three"){
        await axiosApi.post(`${API_URL}/` + 'api/v1/admin/send-headerfooter-newsletter', formData).then((res) => {
          setLoading(false);     
          setMessageType("Success")
          setMessageTitle("Newsletter Sent Successfully");
          setMessageDetails("You have succesfully added sent a newsletter to everyone on Flipex.")
          setSuccessModal(true);     
        }).catch((errors) => {
          setMessageType("Error")
          setMessageTitle("Admin added failed");
          setMessageDetails(errors.response.data.message)
          setSuccessModal(true);
          setLoading(false); 
        })
      }

      else if(emailType === "promotions")
       {
       await axiosApi.post(`${API_URL}/` + 'api/v1/admin/send-promotional-emails', formData).then((res) => {
          setLoading(false);     
          setMessageType("Success")
          setMessageTitle("Promotional Mail Sent Successfully");
          setMessageDetails("You have succesfully added sent a promotional email to everyone on Flipex.")
          setSuccessModal(true);  
       }).catch((errors) => {
          setMessageType("Error")
          setMessageTitle("Admin added failed");
          setMessageDetails(errors.response.data.message)
          setSuccessModal(true);
          setLoading(false);
       })
       }else{
        return null
       }
     
 toggle();

    }
   








  const [totalBlogs, setTotalBlogs] = useState("");
  const [publishedBlogs, setPublishedBlogs] = useState("");
  const [pendingBlogs, setPendingBlogs] = useState("");


  const loadSubscribers = () => {
    axiosApi.get(`${API_URL}/` + 'api/v1/admin/email-subscribers').then((res) => {
        setSubscribers(res.data.data)
    })
  }

  useEffect(() => {
    // dispatch(onGetReports())
      axiosApi.get(`${API_URL}/` + 'api/v1/reports/blog-reports').then((res) => {
        setTotalBlogs(res.data.totalBlogs); 
        setPublishedBlogs(res.data.publishedPosts)
        setPendingBlogs(res.data.pendingPosts);
    }).catch((errors) => {
       
    })

    loadSubscribers()
  
}, [ ]);


  
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);



  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: subscribers.length, // replace later with size(blogs),
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
    if (subscribers && !subscribers.length) {
       loadSubscribers()
      setIsEdit(false);
    }
  }, [ ]);


  useEffect(() => {
    setSubscribers(subscribers);
    setIsEdit(false);
  }, [subscribers]);

  useEffect(() => {
    if (!isEmpty(subscribers) && !!isEdit) {
      setSubscribers(subscribers);
      setIsEdit(false);
    }
  }, [subscribers]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleEmailClicks = arg => {

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



 

const handleUpload = (e) => {
  setImage(e.target.files[0])    
}

 



  const keyField = "id";


  const blogListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      // eslint-disable-next-line react/display-name
      formatter: subscriber => <>{subscriber.id}</>,
    },
   
    

    {
      text: "Email",
      dataField: "email",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, subscriber) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {subscriber.email} 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      text: "Fullname",
      dataField: "fullname",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, subscriber) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {subscriber.fullname} 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      dataField: "Service",
      text: "service",
      sort: true,

       // eslint-disable-next-line react/display-name
       formatter: (cellContent, subscriber) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {subscriber.service_subscribed } 
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
       formatter: (cellContent, subscriber) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {subscriber.createdAt } 
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
          <title>Emailing service | FlipEx Admin dashboard</title>
        </MetaTags>
        <Container fluid>

          <Row>

            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField={keyField}
                    columns={blogListColumns}
                    data={subscribers}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={subscribers}
                          columns={blogListColumns}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col sm="4">
                                    <h4>Subscribers</h4>
                                </Col>
                                <Col sm="8">
                                  <div className="text-sm-end">

                                  <CsvDownloadButton data={subscribers} filename="emails.csv">
                                  <Button
                                      color="default"
                                      className="font-16 btn-block btn btn-default"
                                      style={{ border: "1px solid gray", marginRight: "5px"}}
                                      >
                                        Export Data
                                      <i className="mdi mdi-download" style={{ marginLeft: "2px"}} />
                                      
                                      </Button>
                                  </CsvDownloadButton>

                                   
                                   
                                      <Button
                                      color="default"
                                      className="font-16 btn-block btn btn-default"
                                      onClick={handleEmailClicks}
                                      style={{ border: "1px solid gray"}}
                                      >
                                        Compose message
                                      <i className="mdi mdi-message-outline" style={{ marginLeft: "2px"}} />
                                      
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

                                    <Modal isOpen={modal} toggle={toggle} size="md">
                                      <ModalHeader toggle={toggle} tag="h4">
                                        Compose Message
                                      </ModalHeader>
                                      <ModalBody>
                                        <Form
                                          onSubmit={(e) => {
                                            e.preventDefault();
                                           sendEmail()
                                            return false;
                                          }}
                                          encType='multipart/form-data'
                                      
                                        >
                                          <Row form>
                                             
                                           {emailType === "newsletter" ? (

                                           <>
                                             <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
                                             <h6>Please select newsletter email template to use</h6>
                                               <Row>
                                                <Col md="4" className="mb-3"  onClick={(e) => setEmailTemp("template_one")} style={emailTemp === "template_one" ? { border: "2px solid green", borderRadius: "5px"} : null }>
                                                <h6 style={{ color: "green", textAlign: "center"}}>Only image newsletter</h6>
                                                <img src={tempOneImage} alt="" width={200}  />
                                                </Col>
                                                <Col md="4" className="mb-3" onClick={(e) => setEmailTemp("template_two")} style={emailTemp === "template_two" ? { border: "2px solid green", borderRadius: "5px"} : null }>
                                                <h6 style={{ color: "green", textAlign: "center"}}>Header image and content newsletter</h6>
                                                    <img src={tempOneImage} alt="" width={200}  />
                                                </Col>
                                                <Col md="4" className="mb-3" onClick={(e) => setEmailTemp("template_three")} style={emailTemp === "template_three" ? { border: "2px solid green", borderRadius: "5px"} : null }>
                                                <h6 style={{ color: "green", textAlign: "center"}}>Header, Content & Footer image newsletter</h6>
                                                <img src={tempOneImage} alt="" width={200}  />
                                                </Col>
                                            </Row>
                                            </div>

                                           </>
                                           ) : emailType === "promotions" ? (
                                           <>
                                             <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
                                             <h6>Please select promotional email template to use</h6>
                                             <Row>
                                                <Col md="4" className="mb-3"  onClick={(e) => setEmailTemp("template_four")} style={emailTemp === "template_four" ? { border: "2px solid green", borderRadius: "5px"} : null }>
                                                <h6 style={{ color: "green", textAlign: "center"}}>No image promotion</h6>
                                                <img src={tempOneImage} alt="" width={200}  />
                                                </Col>
                                            </Row>
                                              </div>
                                           </>
                                           ) : null}
                                              <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
                                              <Col>
                                                <Row>
                                                   <Col md="6">
                                                       <div className="mb-3">
                                                          <Label className="form-label">Email Type</Label>
                                                             <select  className="form-control" name="email_type"
                                                                onChange={(e) => setEmailType(e.target.value)}
                                                             >
                                                              <option>Select Email Type</option>
                                                              <option value="promotions">Promotion</option>
                                                              <option value="newsletter">Newsletter</option>
                                                            </select>
                                                        </div>
                                                   </Col>

                                                    <Col md="6">
                                                       <div className="mb-3">
                                                          <Label className="form-label">Test or Live Email</Label>
                                                             <select  className="form-control" name="email_type"
                                                                onChange={(e) => setBroadcastType(e.target.value)}
                                                             >
                                                              <option>Select one</option>
                                                              <option value="test">Test mail</option>
                                                              <option value="live">Live mail</option>
                                                              <option value="Live Test">Live Test</option>
                                                            </select>
                                                        </div>
                                                   </Col>
                                                </Row>
                                              </Col>
                                              </div>

                                          
                                             
                                            
                                              <div style={{ border: "2px solid #E5E5E5", borderRadius: "8px"}} className='p-3 mt-3'>
                                            <Col xs={12}>
                                              { emailTemp === "template_three" || emailTemp === "template_one" || emailTemp === "template_two" || emailTemp === "template_four" ? (
                                              <>
                                                <div className="mb-3">
                                                  <Label className="form-label">Email Subject</Label>
                                                  <Input
                                                    name="subject"
                                                    type="text"
                                                    onChange={(e) => setSubject(e.target.value)}
                                                  />
                                                </div>
                                              </>
                                              ) : null}

                                          { emailTemp === "template_one"  ? (
                                              <>
                                                <div className="mb-3">
                                                  <Label className="form-label">Email Link</Label>
                                                  <Input
                                                    name="footerLink"
                                                    type="text"
                                                    onChange={(e) => setFooterLink(e.target.value)}
                                                  />
                                                </div>
                                              </>
                                              ) : null}


                                              { emailTemp === "template_three" || emailTemp === "template_one" || emailTemp === "template_two" || emailTemp === "template_four" ? (
                                              <>
                                              </>) : null}

                                              { emailTemp === "template_three"  || emailTemp === "template_two" || emailTemp === "template_four" ? (
                                              <>
                                                <div className="mb-3">
                                                <Label className="form-label">Greetings</Label>
                                                <Input
                                                  name="greetings"
                                                  type="text"
                                                  onChange={(e) => setGreetings(e.target.value)}
                                                  />
                                              </div>
                                              </>) : null}

                                              { emailTemp === "template_two" || emailTemp === "template_one" ? (
                                              <>
                                                <div className="mb-3">
                                                <Label className="form-label">Image</Label>
                                                <Input
                                                   type="file"
                                                   name='imageURL'
                                                   onChange={handleUpload}
                                                  
                                                />
                                               
                                              </div>
                                              </>) : null}


                                            

                                              { emailTemp === "template_three" ||  emailTemp === "template_two" || emailTemp === "template_four" ? (
                                              <>
                                                  <div className="mb-3">
                                                <Label className="form-label">Email Content</Label>

                                                <CKEditor
                                                  editor={ ClassicEditor }
                                                 
                                                  data={body || ""}
                                                  onReady={ editor => {
                                                      // You can store the "editor" and use when it is needed.
                                                      console.log( 'Editor is ready to use!', editor );
                                                  } }
                                                  onChange={ ( event, editor ) => {
                                                      const data = editor.getData();
                                                      setBody(data)
                                                  } }

                                                  value={body || ""}

                                                 
                                                  onBlur={ ( event, editor ) => {
                                                      console.log( 'Blur.', editor );
                                                  } }
                                                  onFocus={ ( event, editor ) => {
                                                      console.log( 'Focus.', editor );
                                                  } }
                                              />
                                                
                                              </div>
                                              </>) : null}

                                              { emailTemp === "template_three" ? (
                                              <>
                                                <div className="mb-3">
                                                <Label className="form-label">Header Image</Label>
                                                <Input
                                                   type="file"
                                                   name='headerImage'
                                                   onChange={(e) => setHeaderImage(e.target.files[0])}
                                                  
                                                />
                                               
                                              </div>

                                              <div className="mb-3">
                                                <Label className="form-label">Footer Image</Label>
                                                <Input
                                                   type="file"
                                                   name='footerImage'
                                                   onChange={(e) => setFooterImage(e.target.files[0])}
                                                  
                                                />
                                               
                                              </div>
                                              </>) : null}

                                                { broadcastType === "test" || broadcastType === "Live Test" ? (
                                              <>
                                                <div className="mb-3">
                                                  <Label className="form-label">Enter test emails seperated with commas</Label>
                                                  <Input
                                                    name="emails"
                                                    type="text"
                                                    onChange={(e) => setEmails(e.target.value)}
                                                  />
                                                </div>
                                              </>
                                              ) : null}
                                              

                                            

                                              
                                            
                                             
                                            

                                          
                                            </Col>
                                            </div>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <div className="text-end mt-5">
                                                <button
                                                  type="submit"
                                                  className="btn btn-primary"
                                                >
                                                    { !loading && 'Send Mail'}
                                                          { loading && (
                                                            <>
                                                            <Spinner
                                                              as="span"
                                                              animation="grow"
                                                              size="sm"
                                                              role="status"
                                                              aria-hidden="true"
                                                            />
                                                            Sending mail...
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

export default withRouter(Email);