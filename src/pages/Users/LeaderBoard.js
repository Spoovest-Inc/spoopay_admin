import React, { useEffect, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import NumberFormat from 'react-number-format';
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
import TasksDropdown from "components/Common/TasksDropdown";
import SuccessModals from "components/Common/successModal";


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




const TasksList = props => {


  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const [modal, setModal] = useState(false);
  const [board, setBoards] = useState([])
  const [leaders, setLeaders] = useState([])
  const [users, setUsers] = useState([])

  const [messageTitle, setMessageTitle] = useState("")
  const [messageDetails, setMessageDetails] = useState("")
  const [messageType, setMessageType] = useState("")
  const [successModal, setSuccessModal] = useState(false);

  // Form data 
  const [formData, setFormData] = useState({ position: "", type: "", amount: "", name: "", user_id: ""})


  





  const submitForm = () => {
      setLoading(true);
      const payload = {
        position: formData.position,
        type: formData.type,
        amount: formData.amount,
        name: formData.name,
        user_id: formData.user_id,
        board
      }

       axiosApi.post(`${API_URL}/api/v1/admin/leaderboard/create`, payload).then(() => {
        setLoading(false);
        toggle();
        loadTasks()
        setMessageType("Success")
        setMessageTitle("Leader Added")
        setMessageDetails("You have succesfully added a Flipex user to the leader board.")
        setSuccessModal(true);
       }).catch((error) => {
        console.log(error.response.data.message)
        setMessageType("Error")
        setMessageTitle("Leader creation failed")
        setMessageDetails(error.response.data.message)
        setSuccessModal(true);
        setLoading(false);
        toggle();
       })
  }

 
  
   


const loadTasks = () => {
  axiosApi.get(`${API_URL}/api/v1/admin/leaderboard/all`).then((res) => {
      setLeaders(res.data)
  }).catch(() => {
      
  })
}

const loadUserBoard = () => {
     let transaction_type = formData.type
    axiosApi.get(`https://v2-staging.flipexapp.com/api/v2/leaderboard?transaction_type=${transaction_type}`).then((res) => {
        setBoards(res.data.data)
    })
}

const loadUsers = () => {
    axiosApi.get(`${API_URL}/api/v1/users/all`).then((res) => {
        setUsers(res.data)
    }).catch(() => {
        
    })
}

const selectTransactionType = (e) => {
     setFormData({...formData, type: e.target.value})
     loadUserBoard()
}






  

  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: leaders?.length, // replace later with size(blogs),
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
    onClick: { hello: () => { console.log("Hello")} }
  };

  const pushToArray = () => {
    console.log(transaction.id)
  }


  useEffect(() => {

    if (leaders && !leaders.length) {
      loadTasks()
    }

    if(users && !users.length) {
        loadUsers()
    }
  }, []);

  const handleOptionSelect = (e) => {
    let newData = e.target.value.split(",")
    setFormData({...formData, user_id: newData[0], name: newData[1]})
  };






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


  const addNewCrypto = () => {
    toggle();
  }



  const filterTransactionByDate = (e) => {
    setLoading(true)
    axiosApi.get(`${API_URL}/api/v1/tasks/filter/date/${e.target.value}`).then((response) => {
      if(response.data.length > 0){
        setTasks(response.data)
       }else{
        setTasks([])
       }
     }).catch((errors) => {
         // return errors
         setLoading(false)
        
     })
  }

 





  const keyField = "id";


  const walletListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      // eslint-disable-next-line react/display-name
      formatter: range  => <>{range.id}</>,
    },
   
    

    {
      text: "Postion",
      dataField: "task_title",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, task) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {task.position} 
            </Link>
          </h5>
        
        </>
      ),
    },


    {
      text: "User Name",
      dataField: "name",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, task) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {task.name} 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      text: "Transaction",
      dataField: "type",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, task) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {task.type} 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      text: "Amount",
      dataField: "amount",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, task) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
            <NumberFormat
                  value={task.amount} 
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
      dataField: "createdAt",
      text: "Date created",
      sort: true,

       // eslint-disable-next-line react/display-name
       formatter: (cellContent, task) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {task.createdAt } 
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
          <title>Leader board | FlipEx Admin dashboard</title>
        </MetaTags>
        <Container fluid>
      
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField={keyField}
                    columns={walletListColumns}
                    data={leaders}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={leaders}
                          columns={walletListColumns}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col md="6">
                                   Leaderboard 
                                </Col>
                                <Col md="6">
                                <div className="text-sm-end">   
                                    <Form
                                          onSubmit={(e) => {
                                            e.preventDefault();
                                             
                                            return false;
                                          }}
                                        >
                                          <Row form>
                                            <Col xs={12}>
                                              <Row>
                                              
                                                <Col sm="6">
                                                  <div className="mb-3">
                                                  
                                                
                                                  </div>
                                                </Col>

                                              

                                              <Col md="6">
                                               { loggedInUser.data.role === 3 || loggedInUser.data.role === 4 || loggedInUser.data.role === 2 ? (
                                                <Button
                                                color="default"
                                                className="font-16 btn-block btn btn-default"
                                                onClick={addNewCrypto}
                                                style={{
                                                  border: "1px solid gray"
                                                }}
                                                >
                                                <i className="mdi mdi-plus-circle-outline me-1" />
                                                Add user to board 
                                                </Button>
                                            ) : null}
                                               </Col>

                                              </Row>

                                            
                                            </Col>
                                          </Row>
                                         
                                        </Form>
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
                                      <ModalHeader toggle={toggle} tag="h4">
                                       Add Leader
                                   
                                      </ModalHeader>
                                      <ModalBody>
                                        <hr />
                                        <Form
                                          onSubmit={(e) => {
                                            e.preventDefault();
                                              submitForm()
                                            return false;
                                          }}
                                        >
                                          <Row form>
                                          <div style={{ border: "1px solid #E5E5E5", borderRadius: "8px", marginTop: "20px"}} className="p-2">
                                            <Col xs={12}>
                                             
                                             
                                            <div className="mb-3">
                                                <Label className="form-label">Postion</Label>
                                                <Input
                                                  name="position"
                                                  type="text"
                                                  onChange={(e) => setFormData({...formData, position: e.target.value})}
                                                  value={formData.position || ""}
                                                 
                                                />
                                                
                                              </div>

                                              <div className="mb-3">
                                                <Label className="form-label">Amount</Label>
                                                <Input
                                                  name="amount"
                                                  type="text"
                                                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                                  value={formData.amount || ""}
                                                 
                                                />
                                                
                                              </div>

                                           
                                             
                                              <Row>
                                                <Col md={6}>
                                                <div className="mb-3">
                                                    <Label className="form-label">Transaction Type</Label>
                                                    <select className="form-control" name="type"  onChange={(e) => {selectTransactionType(e)}}>
                                                        <option value="" className=" ">Select transaction type</option>
                                                        <option value="GIFTCARD">Giftcard</option>
                                                        <option value="CRYPTO">Crypto</option>
                                                     </select>
                                                        </div>
                                                </Col>

                                                <Col md={6}>
                                                <div className="mb-3">
                                                    <Label className="form-label">Users</Label>
                                                    <select className="form-control"   onChange={(e) => {handleOptionSelect(e)} }>
                                                    {users?.map((user) => (
                                                        <>
                                                            <option value={[user.id, user.name]}>{user.name}</option>
                                                        </>
                                                    
                                                    ))}
                                                    </select>
                                                  </div>
                                                </Col>
                                              </Row>


                                             

                            
                                            </Col>
                                            </div>
                                          </Row>
                                          <Row>
                                            <Col>
                                              <div className="text-end mt-3">
                                                <button
                                                  type="submit"
                                                  className="btn btn-primary"
                                                >
                                                         Add User
                                                          { loading && (
                                                            <>
                                                            <Spinner
                                                              as="span"
                                                              animation="grow"
                                                              size="sm"
                                                              role="status"
                                                              aria-hidden="true"
                                                            />
                                                            Loading...
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

export default withRouter(TasksList);