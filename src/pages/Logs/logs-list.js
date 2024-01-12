import React, { useEffect, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { withRouter, Link, useHistory } from "react-router-dom";
import LogDetails from "../../../src/components/Common/LogDetails"
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
  Spinner,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
import ApproveModal from "components/Common/ApproveModal";

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
  const [logs, setLogs] = useState([])



  
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [menu, setMenu] = useState(false)

  const [logDetail, setLogDetail] = useState([]);
  const [id, setId] = useState("");
  

  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: logs.length, // replace later with size(blogs),
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
   
        axiosApi.get(`${API_URL}/api/v1/admin/all-logs`).then((res) => {
        setLogs(res.data)
     }).catch((error) => {
     })

      setIsEdit(false);
    
  }, []);


  useEffect(() => {
    setLogs(logs);
    setIsEdit(false);
  }, [logs]);

  useEffect(() => {
    if (!isEmpty(logs) && !!isEdit) {
      setLogs(logs);
      setIsEdit(false);
    }
  }, [logs]);

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





  const logDetails = (log) => {
    setLogDetail(log)
    console.log(log);
    setModal(true)
  }

  const keyField = "id";


  const logListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      // eslint-disable-next-line react/display-name
      formatter: log => <>{log.id}</>,
    },
   
    

   

    {
        text: "Admin Name",
        dataField: "name",
        sort: true,
        // eslint-disable-next-line react/display-name
        formatter: (cellContent, log) => (
          <>
            <h5 className="font-size-14 mb-1">
              <Link to="#" className="text-dark">
                {log.adminName} 
              </Link>
            </h5>
          
          </>
        ),
      },

      {
        text: "Action Type",
        dataField: "action_type",
        sort: true,
        // eslint-disable-next-line react/display-name
        formatter: (cellContent, log) => (
          <>
            <h5 className="font-size-14 mb-1">
              <Link to="#" className="text-dark">
                {log.actionType} 
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
       formatter: (cellContent, log) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {log.createdAt } 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      dataField: "Admin Email",
      text: "adminEmail",
      sort: true,

       // eslint-disable-next-line react/display-name
       formatter: (cellContent, log) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {log.adminEmail } 
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
      formatter: (cellContent, log) => (
        <div className="d-flex gap-3"  onClick={() => logDetails(log)}>
             <div className="text-primary">
            <i
              className="mdi mdi-eye font-size-18"
            ></i>
          </div>
        </div>
      ),
    },
  ];

 
  return (
    <React.Fragment>
      <LogDetails
        show={modal}
        logDetail={logDetail}
        onCloseClick={() => setModal(false)}
      />


      <div className="page-content">
        <MetaTags>
          <title>Log management | FlipEx Admin dashboard</title>
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
                    data={logs}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={logs}
                          columns={logListColumns}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col sm="4">
                                    <h5>Admins Logs</h5>
                                </Col>

                                <Col sm="8">
                                <div className="text-sm-end">
                                        <Dropdown
                                          isOpen={menu}
                                          toggle={() => setMenu(!menu)}
                                          className="d-inline-block"
                                        >
                                                  <DropdownToggle
                                                    className="font-16 btn-block btn btn-default"
                                                    id="page-header-user-dropdown"
                                                    tag="button"
                                                    style={{
                                                      border: "1px solid gray",
                                                      marginRight: "10px",
                                                    }}
 
                                                  >
                                                    <i className="mdi mdi-filter me-1" />
                                                    <span className="d-none d-xl-inline-block ms-2 me-1">Filter</span>

                                                  </DropdownToggle>
                                                  <DropdownMenu className="dropdown-menu-end">
                                                    <DropdownItem>
                                                    <span>Filter by date</span>
                                                    </DropdownItem>

                                                    <DropdownItem>
                                                    <span>Filter by role</span>
                                                    </DropdownItem>
                                                  
                                                  
                                                  
                                                    <div className="dropdown-divider"/>
                                                  
                                                  </DropdownMenu>
                                             </Dropdown>

                                
                                          <Button
                                          color="default"
                                          className="font-16 btn-block btn btn-default"
                                          onClick={null}
                                          style={{
                                            border: "1px solid gray"
                                          }}
                                        >
                                          <i className="mdi mdi-download me-1" />
                                          Export
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