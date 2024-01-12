import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
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
  Form,
} from "reactstrap"

import * as Yup from "yup";
import { useFormik } from "formik";

import axios from "axios";
import DeleteModal from "components/Common/DeleteModal";
import TaskDetailModal from "components/Common/TaskDetail";
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



const TasksDropdown = ({task, menuType, loadTasks}) => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState("");
    const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [taskDetailModal, setTaskDetailModal] = useState(false);
    const [taskDetail, setTaskDetail] = useState([])
    const [tasks, setTasks] = useState([])
    const [id, setId] = useState("");
    const [deleteModal, setDeleteModal] = useState(false);
    const [messageTitle, setMessageTitle] = useState("")
    const [messageDetails, setMessageDetails] = useState("")
    const [messageType, setMessageType] = useState("")
    const [deleteDetails, setDeleteDetails] = useState("")
    const [deleteTitle, setDeleteTitle] = useState("")
    const [btMessage, setBtMessage] = useState("")
    const [successModal, setSuccessModal] = useState(false);
    const [isMenu, setIsMenu] = useState("")

 const handleTaskDetails = (task) => {
    setTaskDetail(task)
    setTaskDetailModal(true)
    }

    const deleteTask = (task) => {
        setId(task.id);
        setDeleteTitle("Delete Task");
        setDeleteDetails("You’re about to delete a reward task, if this is a mistake, kindly click cancel.")
        setBtMessage("Delete Task")
        setDeleteModal(true);
     }
   
   
     const handleDeleteTask = () => {
       setLoading(true)
        axiosApi.delete(`${API_URL}/api/v1/tasks/delete-task/${id}`).then(() => {
         loadTasks()
         setMessageType("Success")
         setMessageTitle("Task Deleted")
         setMessageDetails("You have succesfully deleted a Flipex reward task.")
         setDeleteModal(false);
         setSuccessModal(true);
         setLoading(false)
      
   
        }).catch((error) => {
        setLoading(false)
        setMessageType("Error")
        setMessageTitle("Task deletion failed")
        setMessageDetails("oops, something went wrong", error.response.data.message)
        setDeleteModal(false);
        setSuccessModal(true);
        })
     };
   
     const handleDeactivate = (task) => {
       setLoading(true)
       axiosApi.put(`${API_URL}/api/v1/tasks/deactivate-task/${task.id}`).then(() => {
        loadTasks()
        setMessageType("Success")
        setMessageTitle("Task De-activated")
        setMessageDetails("You have succesfully de-activated a Flipex reward task.")
        setSuccessModal(true);
        setLoading(false)
   
       }).catch((error) => {
         setLoading(false)
         setMessageType("Error")
        setMessageTitle("Task de-activation failed")
        setMessageDetails("oops, something went wrong", error.response.data.message)
        setSuccessModal(true);
       })
      setDeleteModal(false);
     }
   
     const handleActivate = (task) => {
       setLoading(true)
       axiosApi.put(`${API_URL}/api/v1/tasks/activate-task/${task.id}`).then(() => {
        loadTasks()
        setMessageType("Success")
        setMessageTitle("Task activated")
        setMessageDetails("You have succesfully de-activated a Flipex reward task.")
        setSuccessModal(true);
        setLoading(false)
   
       }).catch((error) => {
         setLoading(false)
         setMessageType("Error")
        setMessageTitle("Task Activation failed")
        setMessageDetails("oops, something went wrong", error.response.data.message)
        setSuccessModal(true);
       })
      setDeleteModal(false);
     }
  return (
    <React.Fragment>


     <TaskDetailModal
        show={taskDetailModal}
        taskDetail={taskDetail}
        onCloseClick={() => setTaskDetailModal(false)}
      /> 

      <SuccessModals 
         title={messageTitle} 
         details={messageDetails}
         show={successModal} 
         messageType={messageType}
         onCloseClick={() => setSuccessModal(false)}
         />

      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteTask}
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
        className="d-inline-block"
      >
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
                  <div className="d-flex gap-3">
                    <div className="text-default"   onClick={() => handleTaskDetails(task)} >
                     View Details
                  </div>
                  </div>
                  </DropdownItem>

                  <DropdownItem>
                  { loggedInUser.data.role === 3 || loggedInUser.data.role === 4 ? (
                        <>
                            { task.state == "ACTIVE" ? (
                            <>
                            <div className="text-danger" to="#">
                            <span onClick={() => handleDeactivate(task)}>De-activate</span>
                            
                            </div>
                            </>
                            ) : task.state == "INACTIVE" ? 
                            (
                            <>
                            <div className="text-success" to="#">
                            <span onClick={() => handleActivate(task)}>Activate</span>
                            </div>
                            </>
                            ): null}
                        </>
                            
                        ): null}
                  </DropdownItem>

                  <DropdownItem>
                    { loggedInUser.data.role === 4 ? (
                        <div className="text-danger" onClick={() => deleteTask(task)}>
                            Delete Task
                        </div>
                    ) : null}
                 </DropdownItem>
                </DropdownMenu>
           </Dropdown>
    </React.Fragment>
  )
}

TasksDropdown.propTypes = {
  menuType: PropTypes.any,
  task: PropTypes.any,
  loadTasks: PropTypes.any
}




export default TasksDropdown;