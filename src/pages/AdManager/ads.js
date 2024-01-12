import React, { useEffect, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastContainer, toast } from 'react-toastify';
import { withRouter, Link, useHistory } from "react-router-dom";

import {
  Col,
  Container,
  Row,
  Button,
  Card,
  CardBody,
  Modal,
  Spinner,
  Input,
  Label,
  Form,
  ModalBody,
  ModalFooter,
  ModalHeader
  
} from "reactstrap";

import SuccessModals from "../../components/Common/successModal";

import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

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

import ReportCard from "components/Common/ReportCard"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";

import { isEmpty, size, map, values } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";



const AdManager = ()  => {
const [ads, setAds] = useState([])
const [image, setImage] = useState('');
const [target, setTarget] = useState('')
const [loading, setLoading] = useState(false);

const [messageTitle, setMessageTitle] = useState("")
const [messageDetails, setMessageDetails] = useState("")
const [messageType, setMessageType] = useState("")
const [successModal, setSuccessModal] = useState(false);

const loadAds = () => {
  axiosApi.get(`${API_URL}/api/v1/sliders/all-ads`).then((response) =>{
    setAds(response.data.data);
}).catch((error) => {
  console.error(error.message);
})
}

const deleteAd = (id) => {
  axiosApi.delete(`${API_URL}/api/v1/sliders/delete/${id}`).then((response) =>{
    loadAds()
    setMessageType("Success")
    setMessageTitle("Delete Success")
    setMessageDetails("You have succesfully deleted an ad on flipex admin.")
}).catch((error) => {
    setMessageType("Error")
    setMessageTitle("Ad Deletion Failed")
    setMessageDetails("oops, something went wrong", error.response.data.message)
})
}

useEffect(() => {
  if(ads && !ads.length){
    loadAds()
  }
}, [ads])

const [modal, setModal] = useState(false);


const addNewAdd = () => {
    setModal(true)
}

const toggle = () => {
  setModal(!modal);
};

const keyField = "id";

const uploadAdd = async () => {
  const formData = new FormData();
  formData.append("imageURL", image);
  formData.append("target", target);
  setLoading(true)
  const up = await axiosApi.post(`${API_URL}/api/v1/sliders/upload`, formData).then((res) => {
     loadAds()
     setLoading(false)
     setModal(false)
     setMessageType("Success")
     setMessageTitle("Upload Success")
     setMessageDetails("You have succesfully uploaded an ad to flipex admin.")
     setSuccessModal(true);
    toggle();
  }).catch((error) => {
    setMessageType("Error")
    setMessageTitle("Ad Upload Failed")
    setMessageDetails("oops, something went wrong", error.response.data.message)
     setLoading(false)
  })
}

const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: ads.length, // replace later with size(admins),
    custom: true,
  };
  const defaultSorted = [
    {
      dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
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
          <title>Ad manager | FlipEx Admin dashboard</title>
        </MetaTags>


        <Container fluid>
          <Row>

            <Col lg="12">
              <Card>
                <CardBody>
                 
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col sm="4">
                                    <h5>Ads Manager</h5>
                                </Col>
                                <Col sm="8">
                                
                                <div className="text-sm-end">

                                <Button
                                color="default"
                                className="font-16 btn-block btn btn-default"
                                onClick={addNewAdd}
                                style={{
                                  border: "1px solid gray"
                                }}
                              >
                                <i className="mdi mdi-plus me-1" />
                                Add new advert
                              </Button>
                                     
                                  
                                  </div>
                                </Col>


                       <Modal isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle} tag="h4">
                            Add a new advert
                        </ModalHeader>
                                      <ModalBody>
                                        <Form
                                          onSubmit={(e) => {
                                            e.preventDefault();
                                            uploadAdd()
                                            return false;
                                          }}
                                        >

                                          <Row form>
                                          <div style={{ border: "1px solid #E5E5E5", borderRadius: "8px", marginTop: "20px"}} className="p-2">
                                            <Col xs={12}>
                                              <div className="mb-3">
                                                <Label className="form-label">Image</Label>
                                                <Input
                                                  name="imageURL"
                                                  type="file"
                                                  onChange={(e) => setImage(e.target.files[0])}
                            
                                                />
                                              </div>


                                              <div className="mb-3">
                                                <Label className="form-label">Target</Label>
                                                  <select className="form-control" name="target" onChange={(e) => setTarget(e.target.value)}>
                                                    <option value="" className=" ">Select Device</option>
                                                    <option value="MOBILE" className=" ">Mobile</option>
                                                    <option value="WEB_MAINPAGE">Web mainpage</option>
                                                    <option value="WEB_SIDEBAR">Web sidebar</option>
                                                  </select>
                                              </div>
                                            </Col>
                                            </div>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <div className="text-end">
                                                <button
                                                  type="submit"
                                                  className="btn btn-primary save-user"
                                                >
                                                      { !loading &&  "Upload ad" }
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
                              </Row>
                              <Row>
                                <hr />
                                <Col xl="12">
                                  <div className="table-responsive">
                                    <Row>
                                  { ads.map((ad, index) => (
                                    <Col md="3" key={index}>
                                    <Card className="mini-stats-wid" style={{ width: "250px", height: "200px", marginTop: "20px"}} onClick={(e) => deleteAd(ad.id)}>
                                      <CardBody>
                                        <div className="">
                                          <h6>{ad.target}</h6>
                                          <div>
                                          <img src={ad.adImage} alt={ad.createdAt} style={{ width: '100%', height: '100%' }} />
                                          </div>
                                        </div>
                                      </CardBody>
                                    </Card>
                                  </Col>
                                   ))}
                                   </Row>
                                  </div>
                                </Col>
                              </Row>
                              
                            </React.Fragment>
                         
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
       
      </div>
    </React.Fragment>
  );
};

export default withRouter(AdManager);