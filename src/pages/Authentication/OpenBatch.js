import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import MetaTags from "react-meta-tags";
import PropTypes from "prop-types"
import { map, isEmpty } from "lodash"

import {
  Container,
  Row,
  Col,
  Card,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardBody,
  Button,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
import { getAdmins as onGetAdmins, closeAdminBatch as onCloseBatch,  } from "../../store/admin/actions"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const OpenBatch = () => {
    const dispatch = useDispatch();

    
    const { admins } = useSelector(state => ({
      admins: state.admin.admins
    }))

    const [adminList, setAdminList] = useState([])

    useEffect(() => {
      setAdminList(admins.admins)
    }, [admins,dispatch])
  
    useEffect(() => {
          dispatch(onGetAdmins())
    }, [dispatch])

    
  const openBatch = (admin) => {
    // dispatch close batch with user id
 
    
  }



  const closeBatch = (admin) => {
    dispatch(onCloseBatch(admin))
  }
  

  const [isMenu, setIsMenu] = useState(false);

  const toggleMenu = () => {
    setIsMenu(!isMenu);
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Admins | Open batches</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs  title="Crypto" breadcrumbItem="Admins" />

          <Row className="justify-content-center">
            <Col xl="8">
              <Card>
                <CardBody>
                  <div className="table-responsive">
                    <Table className="table table-nowrap align-middle mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Date Created</th>
                          <th scope="col">First Name</th>
                          <th scope="col">Last Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Batch Status</th>
                          <th scope="col" colSpan="2">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                      
           
                     { adminList?.map((admin) => (
                          <tr key={admin.id}>
                          
                            <td>
                              <div className="text-muted">{admin.createdAt}</div>
                            </td>
                            <td>
                              <h5 className="font-size-14 mb-1">
                                {admin.first_name}
                              </h5>
                            </td>
                            <td>
                              <h5 className="font-size-14 mb-1">
                                {admin.last_name}
                              </h5>
                            </td>
                            <td>
                              <h5 className="font-size-14 mb-1">
                                {admin.email}
                              </h5>
                             
                            </td>
                            <td>
                              <h5 className="font-size-14 mb-1">
                                {admin.batch_status}
                              </h5>
                            </td>
                            <td style={{ width: "120px" }}>
                              { admin.batch_status === "open" ? (
                                <Button className="btn btn-danger" onClick={() => { closeBatch(admin.id)}}>
                                  Close batch
                                </Button>
                              ) : (
                                <Button className="btn btn-success" onClick={() => { openBatch(admin.id)}}>
                                Open batch
                              </Button>
                              )
                              }

                              
                            
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};



export default OpenBatch;
