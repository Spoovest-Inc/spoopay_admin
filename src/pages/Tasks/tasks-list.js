import React, { useEffect, useState, useRef } from "react";
import MetaTags from "react-meta-tags";

import axios from "axios";
import { toast } from 'react-toastify';
import { withRouter, Link } from "react-router-dom";
import CryptoDetailModal from "../../components/Common/CryptoDetailModal"
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
  const [image, setImage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [taskDetailModal, setTaskDetailModal] = useState(false);
  const [taskDetail, setTaskDetail] = useState([])
  const [tasks, setTasks] = useState([])
  const [id, setId] = useState("");

  const [messageTitle, setMessageTitle] = useState("")
  const [messageDetails, setMessageDetails] = useState("")
  const [messageType, setMessageType] = useState("")
  const [successModal, setSuccessModal] = useState(false);

  // Form data 
  const [formData, setFormData] = useState({ title: "", transaction_type: "", task_image: "", start_date:"", end_date:"", reward_amount:"",amount_range_from:"", amount_range_to: ""})

  const taskDataAndAirtimeImageUrl = [
     {
      imageUrl: '',
      producct_name: 'MTN'
     },

     {
      imageUrl: '',
      producct_name: 'AIRTEL'
     },

     {
      imageUrl: '',
      producct_name: 'GLO'
     },

     {
      imageUrl: '',
      producct_name: '9Mobile'
     },


     {
      imageUrl: '',
      producct_name: 'MTN'
     }
  ]


  const taskGiftcardImageUrl = [
    {
     imageUrl: 'https://flipex-files.nyc3.digitaloceanspaces.com/giftcards%2F2022-05-23T19%3A47%3A01.352ZAMAZON.1%205.png',
     producct_name: 'Amazon'
    },

    {
     imageUrl: 'https://flipex-files.nyc3.digitaloceanspaces.com/giftcards%2F2022-05-24T09%3A29%3A25.576ZGOOGLE%20PLAY.fw2.png',
     producct_name: 'Google play'
    },

    {
     imageUrl: 'https://flipex-files.nyc3.digitaloceanspaces.com/giftcards%2F2022-05-27T05%3A45%3A33.904ZVANILLA.fw2.png',
     producct_name: 'Vanilla'
    },

    {
     imageUrl: 'https://flipex-files.nyc3.digitaloceanspaces.com/giftcards%2F2022-05-26T14%3A07%3A20.152ZVISA.fw2.png',
     producct_name: 'Visa'
    },


    {
     imageUrl: 'https://flipex-files.nyc3.digitaloceanspaces.com/giftcards%2F2022-05-27T13%3A24%3A35.783ZEBAY.fw2.png',
     producct_name: 'Ebay'
    }
 ]

 const taskCryptoImageUrl = [
  {
   imageUrl: 'https://flipex-files.nyc3.digitaloceanspaces.com/crypto_images%2F2022-11-14T14%3A11%3A10.882Zbtc.png',
   producct_name: 'BTC'
  },

  {
   imageUrl: 'https://flipex-files.nyc3.digitaloceanspaces.com/crypto_images%2F2022-11-14T14%3A37%3A00.954ZEthereum-Logo.wine.png',
   producct_name: 'ETH'
  },

  {
   imageUrl: 'https://flipex-files.nyc3.digitaloceanspaces.com/crypto_images%2F2022-11-14T14%3A37%3A54.237Zlitecoin-ltc-logo.png',
   producct_name: 'LTC'
  },

  {
   imageUrl: 'https://flipex-files.nyc3.digitaloceanspaces.com/crypto_images%2F2022-11-14T14%3A37%3A34.829Zusd-coin-usdc-logo.png',
   producct_name: 'USDT'
  },


  {
   imageUrl: 'https://flipex-files.nyc3.digitaloceanspaces.com/crypto_images%2F2022-11-14T14%3A37%3A34.829Zusd-coin-usdc-logo.png',
   producct_name: 'USDCOIN'
  }
]

const taskElectricityImageUrl = [
  {
   imageUrl: '',
   producct_name: 'BEDC'
  },

  {
   imageUrl: '',
   producct_name: 'EKEDC'
  },
]

const taskCableImageUrl = [
  {
   imageUrl: '',
   producct_name: 'DSTV'
  },

  {
   imageUrl: '',
   producct_name: 'GOTV'
  },

  {
    imageUrl: '',
    producct_name: 'STARTIME'
   },
]





  const submitForm = () => {
   
    if(isEdit){
      setLoading(true);
        const payload = {
              id: id,
              ngn_rate: naira_rate,
              range_from: rangeFrom,
              range_to: rangeTo,
              default_rate: defaultRate
        }

      axiosApi.put(`${API_URL}/` + 'api/v1/tasks/update-task', payload).then(() => {
       setLoading(false);
       toggle();
       loadCrypto()
       toast("Task updated")
      }).catch((error) => {
        toast("oops something went wrong", error)
     
       setLoading(false);
       toggle();
      })
    }else{
      setLoading(true);
      const payload = {
        title: formData.title,
        transaction_type: formData.transaction_type,
        task_image: formData.task_image,
        start_date: formData.start_date,
        end_date: formData.end_date,
        reward_amount: formData.reward_amount,
        amount_range_from: formData.amount_range_from,
        amount_range_to: formData.amount_range_to
  }

       axiosApi.post(`${API_URL}/` + 'api/v1/tasks/add-task', payload).then(() => {
        setLoading(false);
        toggle();
        loadTasks()
        setMessageType("Success")
        setMessageTitle("Task Added")
        setMessageDetails("You have succesfully added a Flipex reward task.")
        setSuccessModal(true);
       }).catch((error) => {
        setMessageType("Error")
        setMessageTitle("Task creation failed")
        setMessageDetails("oops, something went wrong", error.response.data.message)
        setSuccessModal(true);
        setLoading(false);
        toggle();
       })
    }
  }

 
  
   


const loadTasks = () => {
  axiosApi.get(`${API_URL}/api/v1/tasks/all-tasks`).then((res) => {
      setTasks(res.data.data)
  }).catch(() => {
      
  })
}






  

  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: tasks.length, // replace later with size(blogs),
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
    if (tasks && !tasks.length) {
      loadTasks()
      setIsEdit(false);
    }
  }, []);


  useEffect(() => {
    setTasks(tasks);
    setIsEdit(false);
  }, []);



  const toggle = () => {
    setModal(!modal);
  };

  const handleEditRange = (range) => {
      setId(range.id);
      setNairaRate(range.ngn_rate); 
      setRangeTo(range.range_to)
      setRangeFrom(range.range_from)
      setDefaultRate(range.default_rate);
  
      console.log(rangeFrom);
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


  const addNewCrypto = () => {
    setIsEdit(false);
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
      text: "Task title",
      dataField: "task_title",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, task) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {task.title} 
            </Link>
          </h5>
        
        </>
      ),
    },


    {
      text: "Transaction Type",
      dataField: "transaction_type",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, task) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {task.transaction_type} 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      text: "Task State",
      dataField: "state",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, task) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {task.state} 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      text: "Reward Amount",
      dataField: "reward_amount",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, task) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
            <NumberFormat
                  value={task.reward_amount} 
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

  
  
   
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, task) => (
        <TasksDropdown task={task} menuType={task.id} loadTasks={loadTasks} />
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
          <title>Reward Tasks | FlipEx Admin dashboard</title>
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
                    data={tasks}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={tasks}
                          columns={walletListColumns}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col md="6">
                                  RECENT TASKS
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
                                                  <Input
                                                    name="start_date"
                                                    label="Select Date"
                                                    type="date"
                                                    onChange={(e) => filterTransactionByDate(e)}
                                                  />
                                                
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
                                                Add new task 
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
                                        {!!isEdit ? "Edit rate" : "Add rate"}
                                   
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
                                                <Label className="form-label">Title</Label>
                                                <Input
                                                  name="title"
                                                  type="text"
                                                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                                                  value={formData.title || ""}
                                                 
                                                />
                                                
                                              </div>

                                              <div className="mb-3">
                                              <Label className="form-label">Transaction Type</Label>
                                              <select className="form-control" name="transaction_type"  onChange={(e) => setFormData({...formData, transaction_type: e.target.value})}>
                                                   <option value="" className=" ">Select transaction type</option>
                                                   <option value="CABLE">Cable</option>
                                                   <option value="ELECTRICITY">Electricity</option>
                                                   <option value="AIRTIME">Airtime</option>
                                                   <option value="DATA">Data</option>
                                                   <option value="GIFTCARD">Giftcard</option>
                                                   <option value="CRYPTO">Crypto</option>
                                                 </select>
                                                </div>
                  
                                             
                                              <Row>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Label className="form-label">Amount from($)</Label>
                                                        <Input
                                                        name="amount_range_from"
                                                        label="Amount From"
                                                        type="number"
                                                        value={formData.amount_range_from || ""}
                                                        onChange={(e) => setFormData({...formData, amount_range_from: e.target.value})}
                                  
                                                        />
                                                    </div>
                                                </Col>

                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Label className="form-label">Amount to($)</Label>
                                                        <Input
                                                        name="amount_range_to"
                                                        label="Amount To"
                                                        type="number"
                                                        value={formData.amount_range_to || ""}
                                                        onChange={(e) => setFormData({...formData, amount_range_to: e.target.value})}
                                                        
                                                       />
                                                    </div>
                                                </Col>
                                              </Row>


                                              <Row>
                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Label className="form-label">Task starts from</Label>
                                                        <Input
                                                        name="start_date"
                                                    
                                                        type="date"
                                                        value={formData.start_date || ""}
                                                        onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                                  
                                                        />
                                                    </div>
                                                </Col>

                                                <Col md={6}>
                                                    <div className="mb-3">
                                                        <Label className="form-label">Task ends on</Label>
                                                        <Input
                                                        name="end_date"
                                                      
                                                        type="date"
                                                        value={formData.end_date || ""}
                                                        onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                                                        
                                                       />
                                                    </div>
                                                </Col>
                                              </Row>

                                               <Row>
                                                   <Col md={6}>
                                                   <div className="mb-3">
                                                        <Label className="form-label">Reward Amount(&#8358;)</Label>
                                                        <Input
                                                        name="reward_amount"
                                                        label="Reward amount"
                                                        type="number"
                                                        value={formData.reward_amount || ""}
                                                        onChange={(e) => setFormData({...formData, reward_amount: e.target.value})}
    
                                                        />
                                                      
                                                      </div>
                                                   </Col>

                                                   <Col md={6}>
                                                    {formData.transaction_type != "" && (
                                                      <div className="mb-3">
                                                      <Label className="form-label">Task Image</Label>
                                                      <select className="form-control" name="task_image" onChange={(e) => setFormData({...formData, task_image: e.target.value})}>
                                                      <option value="" className=" ">Select Image</option>
                                                        { formData.transaction_type === "CRYPTO" ? (
                                                             <>
                                                              { taskCryptoImageUrl.map((item) => (
                                                                   <>
                                                                   <option value={item.imageUrl} className=" ">{item.producct_name}</option>
                                                                   </>
                                                                   
                                                              ))}
                                                             </>
                                                           
                                                          )  :  formData.transaction_type === "AIRTIME" || formData.transaction_type === "DATA" ? (
                                                            <>
                                                              { taskDataAndAirtimeImageUrl.map((item) => (
                                                                   <>
                                                                   <option value={item.imageUrl} className=" ">{item.producct_name}</option>
                                                                   </>
                                                                   
                                                              ))}
                                                             </>

                                                          )  
                                                          :  formData.transaction_type === "ELECTRICITY" ? (
                                                            <>
                                                            { taskElectricityImageUrl.map((item) => (
                                                                 <>
                                                                 <option value={item.imageUrl} className=" ">{item.producct_name}</option>
                                                                 </>
                                                                 
                                                            ))}
                                                           </>
                                                          )

                                                          :  formData.transaction_type === "CABLE" ? (
                                                            <>
                                                            { taskCableImageUrl.map((item) => (
                                                                 <>
                                                                 <option value={item.imageUrl} className=" ">{item.producct_name}</option>
                                                                 </>
                                                                 
                                                            ))}
                                                           </>
                                                          )
                                                          
                                                          : formData.transaction_type === "GIFTCARD" ? (
                                                            <>
                                                            { taskGiftcardImageUrl.map((item) => (
                                                                 <>
                                                                 <option value={item.imageUrl} className=" ">{item.producct_name}</option>
                                                                 </>
                                                                 
                                                            ))}
                                                           </>
                                                          ): null }
                                                    
                                                    
                                                    </select>
                                                     
                                                  </div>
                                                    )}
                                                   
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
                                                      { !loading &&  !!isEdit ? "Update Task" : "Add Task" }
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