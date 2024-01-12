import React, { useState } from "react"
import MetaTags from 'react-meta-tags';
import { Row, Col, Label, Form, FormFeedback, Input, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ToastContainer, toast } from 'react-toastify';
import * as Yup from "yup";
import { useFormik } from "formik";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import axios from "axios";
import Development from "../../components/Common/Development";



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

const EmailBasicTemplte = () => {
  const [emailBody, setEmailBody] = useState('');
  const [loading, setLoading] = React.useState(false)
  const [image, setImage] = useState("")


  const handleUpload = (e) => {
    setImage(e.target.files[0])   
  }



   // validation
   const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email_subject: '',
      title:   '',
      body: '',
      imageURL: '',
    },
    validationSchema: Yup.object({
      email_subject: Yup.string().required("Please enter the email_subject"),
      title: Yup.string().required("Please enter the title"),
    }),
    onSubmit: async(values) => {
      setLoading(true);
           const formData = new FormData();
           formData.append("email_subject", values["email_subject"]);
           formData.append("title", values["title"]);
           formData.append("body", emailBody);
           formData.append("imageURL", image);
           console.log(image)
           await axiosApi.post(`${API_URL}/` + 'api/v1/ads/send-marketing-email', formData).then((res) => {
            // show success toast alert
            console.log(res)
            toast("Email sent successfully")    
            setLoading(false);     
          }).catch((errors) => {
              // return errors
              toast("oops, something went wrong, try again later")
              setLoading(false);  
          })
      
      toggle();
    },
  });
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>FlipEx | Send marketing emails today!</title>
        </MetaTags>
        <div className="container-fluid">
   
         
        <Row className="justify-content-center">
           <Col md={4}>
             <Development />
           </Col>
         </Row>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EmailBasicTemplte;
