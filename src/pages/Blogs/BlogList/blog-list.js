import React, { useEffect, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { withRouter, Link, useHistory } from "react-router-dom";
import BlogDetailsModal from "../../../components/Common/BlogDetailsModal"
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
import DeleteModal from "components/Common/DeleteModal";
import ReportCard from "components/Common/ReportCard";
import SuccessModals from "components/Common/successModal";

import {
  getBlogs as onGetBlogs,
  addNewBlog as onAddNewBlog,
  updateBlog as onUpdateBlog,
  deleteBlog as onDeletingBlog,
  unpublishBlog as onUnpublishingBlog
} from "store/blogs/actions";
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


import TotalPost from "../../../assets/images/FlipEx/allPost.svg"
import PublishedPost from "../../../assets/images/FlipEx/pPost.svg"
import DraftPost from "../../../assets/images/FlipEx/dPost.svg"
const BlogList = props => {
  const history = useHistory()
  const dispatch = useDispatch();
  const [blog, setBlog] = useState([]);
  const [image, setImage] = useState('');
  const [blogBody, setBlogBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
  const [allPostIsActive, setisAllPostsActive] = useState(true)
  const [draftPostActive, setdraftPostActive] = useState(false)
  const [publishedBlogsActive, setpublishedActive] = useState(false)
  const [thumbnailURL, setThumbnailURL] = useState('')

  const [messageTitle, setMessageTitle] = useState("")
  const [messageDetails, setMessageDetails] = useState("")
  const [messageType, setMessageType] = useState("")
  const [deleteDetails, setDeleteDetails] = useState("")
  const [deleteTitle, setDeleteTitle] = useState("")
  const [btMessage, setBtMessage] = useState("")
  const [successModal, setSuccessModal] = useState(false);

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      title: (blog && blog.title) || '',
      keywords: (blog && blog.keywords) || '',
      body: (blog && blog.body) || '',
      imageURL: (blog && blog.imageURL) || '',
      category: (blog && blog.category) || '',
      blogStatus: (blog && blog.blogStatus) || ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please enter the title"),
      keywords: Yup.string().required("Please enter the keywords"),
      category: Yup.string().required("Please select blog category"),
      blogStatus: Yup.string().required("Please set status")
    
    
    }),
    onSubmit: async(values) => {
      setLoading(true);
      if (isEdit) {
        const updateBlog = {
          id: blog.id,
          title: values.title,
          keywords: values.keywords,
          body: blogBody,
          category: values.category,
          imageURL: blog.imageURL,
        };

        await axiosApi.post(`${API_URL}/` + '/api/v1/blog/update', updateBlog).then((res) => {
          setMessageType("Success")
          setMessageTitle("Blog updated")
          setMessageDetails("You have just updated a blog content for Flipex users.")
          setSuccessModal(true);
          setLoading(false);   
          dispatch(onGetBlogs()); 
          toggle(); 
        }).catch((errors) => {
            setMessageType("Error")
            setMessageTitle("Post update failed")
            setMessageDetails("oops, something went wrong", errors.response.data.message)
            setLoading(false);  
            toggle();
        })


        validation.resetForm();
        setIsEdit(false);
      } else {
           const formData = new FormData();
           formData.append("title", values["title"]);
           formData.append("keywords", values["keywords"]);
           formData.append("body", blogBody);
           formData.append("imageURL", image);
           formData.append("category", values["category"]);
           formData.append("blogStatus", values["blogStatus"])
        
           await axiosApi.post(`${API_URL}/` + 'api/v1/blog/create', formData).then((res) => {
            setMessageType("Success")
            setMessageTitle("Blog post created")
            setMessageDetails("You have just posted a blog content for Flipex users.")
              // upload thumbnail
              uploadThumbnail(res.data.id)
              dispatch(onGetBlogs());
            setSuccessModal(true);
            setLoading(false);    
            toggle(); 
          
          }).catch((errors) => {
              setMessageType("Error")
              setMessageTitle("Post blog failed")
              setMessageDetails("oops, something went wrong", errors.response.data.message)
              setLoading(false);  
              toggle();
          })
      }

    },
  });

  const uploadThumbnail = async (id) => {
    const formData = new FormData();
    formData.append("thumbnailURL", thumbnailURL);
   await axiosApi.put(`${API_URL}/api/v1/blog/uploadImage/${id}`, formData).then((res) => {
     console.log("thumbnail uploaded successfully")
   })
  }






  const { blogs } = useSelector(state => ({
    blogs: state.blogs.blogs
  }));

  const [totalBlogs, setTotalBlogs] = useState("");
  const [publishedBlogs, setPublishedBlogs] = useState("");
  const [pendingBlogs, setPendingBlogs] = useState("");


  useEffect(() => {
    // dispatch(onGetReports())
      axiosApi.get(`${API_URL}/` + 'api/v1/reports/blog-reports').then((res) => {
        setTotalBlogs(res.data.totalBlogs); 
        setPublishedBlogs(res.data.publishedPosts)
        setPendingBlogs(res.data.pendingPosts);
    }).catch((errors) => {
        // return errors
     
    })
  
}, [ ]);


  
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [blogModal, setBlogModal] = useState(false);
  const [blogDetail, setBlogDetail] = useState("");
  

  const { SearchBar } = Search;
  const sizePerPage = 10;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: blogs.length, // replace later with size(blogs),
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
    if (blogs && !blogs.length) {
      dispatch(onGetBlogs());
      setIsEdit(false);
    }
  }, [ ]);


  useEffect(() => {
    setBlog(blogs);
    setIsEdit(false);
  }, [blogs]);

  useEffect(() => {
    if (!isEmpty(blogs) && !!isEdit) {
      setBlog(blogs);
      setIsEdit(false);
    }
  }, [blogs]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleblogClick = arg => {
    const blog = arg;
      setBlogBody(blog.body);
    setBlog({
      id: blog.id,
      title: blog.title,
      keywords: blog.keywords,
      status: blog.status,
      category: blog.category,
      imageURL: image,
    });
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

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (blog) => {
    setBlog(blog.id);
    setDeleteTitle(`Delete ${blog.title}`);
    setDeleteDetails("You’re about to delete a blog post,if these was a mistake, kindly click cancel.")
    setBtMessage("Delete Blog")
    setDeleteModal(true);
  };

  const handleDeleteBlog = async() => {
  
    await axiosApi.delete(`${API_URL}/api/v1/blog/delete`,  { headers: { blog}}).then((res) => {
      setDeleteModal(false);
      setMessageType("Success")
      setMessageTitle("Blog deleted")
      setMessageDetails("You have deleted a blog post.")
      setSuccessModal(true);
      dispatch(onGetBlogs());
    }).catch((errors) => {
        setDeleteModal(false);
        setMessageType("Error")
        setMessageTitle("Post deletion failed")
        setMessageDetails("oops, something went wrong", errors.response.data.message)
        setLoading(false);  
    })
  };

const handleUpload = (e) => {
  setImage(e.target.files[0])    
}

const handleThumbnailUpload = (e) => {
 setThumbnailURL(e.target.files[0])
}

const unPublishBlog = (blog) => {
   dispatch(onUnpublishingBlog(blog.id));
}
  


  const handleblogClicks = () => {
    setBlog("");
    setIsEdit(false);
    toggle();
  };

  const blogDetails = (blog) => {
    setBlogDetail(blog)
    setBlogModal(true)
  }

  const filterByAllPost = () => {
    setpublishedActive(false)
    setdraftPostActive(false)
    setisAllPostsActive(true)
  }

  const filterByDraft = () => {
    setpublishedActive(false)
    setisAllPostsActive(false)
    setdraftPostActive(true)
  }

  const filterByPub = () => {
    setisAllPostsActive(false)
    setdraftPostActive(false)
    setpublishedActive(true)
  }

  const keyField = "id";


  const blogListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      // eslint-disable-next-line react/display-name
      formatter: blog => <>{blog.id}</>,
    },
    {
      dataField: "img",
      text: "#",
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, blog) => (
        <>
          {!blog.imageURL ? (
            <div className="avatar-xs">
              <span className="avatar-title rounded-circle">
                {blog.imageURL}
              </span>
            </div>
          ) : (
            <div>
              <img
                className="rounded-circle avatar-xs"
                 src={blog.imageURL}
                alt=""
              />
            </div>
          )}
        </>
      ),
    },
    

    {
      text: "Title",
      dataField: "title",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, blog) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {blog.title} 
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
       formatter: (cellContent, blog) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {blog.createdAt } 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      dataField: "Status",
      text: "status",
      sort: true,

       // eslint-disable-next-line react/display-name
       formatter: (cellContent, blog) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {blog.status } 
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
      formatter: (cellContent, blog) => (
        <div className="d-flex gap-3">
             <div className="text-primary" onClick={() => blogDetails(blog)}>
            <i
              className="mdi mdi-eye font-size-18"
            ></i>
          </div>

          { loggedInUser.data.role === 1 ||  loggedInUser.data.role === 2 || loggedInUser.data.role === 3 ||  loggedInUser.data.role === 4 ?  (
            <div className="text-success" >
            <i
              className="mdi mdi-pencil font-size-18"
              id="edittooltip"
              onClick={() => handleblogClick(blog)}
            ></i>
            </div>
           ): null}

          { loggedInUser.data.role === 1 ||  loggedInUser.data.role === 2 || loggedInUser.data.role === 3 ||  loggedInUser.data.role === 4 ?  (
          <div className="text-danger" to="#">
            <i
              className="mdi mdi-delete font-size-18"
              id="deletetooltip"
              onClick={() => onClickDelete(blog)}
            ></i>
          </div>
          ): null}
    
             
    
          
        </div>
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

      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteBlog}
        onCloseClick={() => setDeleteModal(false)}
        deleteTitle={deleteTitle}
        deleteDetails={deleteDetails}
        btMessage={btMessage}
        loading={loading}
      />

      <BlogDetailsModal
        show={blogModal}
        blogDetail={blogDetail}
        onCloseClick={() => setBlogModal(false)}
      />


      <div className="page-content">
        <MetaTags>
          <title>Blogs managemeny | FlipEx Admin dashboard</title>
        </MetaTags>
        <Container fluid>
         
          <Row>
            <Col lg={12}>
                <Row>
                <ReportCard reportTitle={"ToTAL POST"} reportDes={totalBlogs}  icon={TotalPost} />
                 <ReportCard reportTitle={"PUBLISHED POST"} reportDes={publishedBlogs} icon={PublishedPost}  />
                 <ReportCard reportTitle={"DRAFT POST"} reportDes={publishedBlogs} icon={DraftPost}  />
                </Row>
            </Col>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField={keyField}
                    columns={blogListColumns}
                    data={blogs}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={blogs}
                          columns={blogListColumns}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col sm="4" className="pt-2">
                                  <span onClick={filterByAllPost} style={ allPostIsActive ? { fontWeight: "bolder", borderBottom: "2px solid black"} : null}>ALL POST</span>
                                  <span onClick={filterByPub} style={ publishedBlogsActive ? { fontWeight: "bolder", borderBottom: "2px solid black", paddingLeft: "20px"} : {paddingLeft: "20px"}}>PUBBLISHED POST</span>
                                  <span onClick={filterByDraft} style={draftPostActive ? {fontWeight: "bolder", borderBottom: "2px solid black", paddingLeft: "20px"} : {  paddingLeft: "20px"}}>DRAFTS</span>
                                </Col>
                                <Col sm="8">
                                  <div className="text-sm-end">
                                    <Row>
                                      <Col md="6">
                                      <div className="search-box ms-2 mb-2 d-inline-block">
                                        <div className="position-relative">
                                          <SearchBar {...toolkitProps.searchProps} />
                                          <i className="bx bx-search-alt search-icon" />
                                        </div>
                                      </div>
                                      </Col>
                                      <Col md="6">
                                        { loggedInUser.data.role === 1 ||  loggedInUser.data.role === 2 || loggedInUser.data.role === 3 ||  loggedInUser.data.role === 4 ?  (
                                        <Button
                                        color="default"
                                        className="font-16 btn-block btn btn-default"
                                        onClick={handleblogClicks}
                                        style={{
                                          border: "1px solid gray"
                                        }}
                                        >
                                        <i className="mdi mdi-plus me-1" />
                                        Create new post
                                        </Button>
                                      ) : null}
                                      </Col>
                                    </Row>
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
                                        {!!isEdit ? "Edit blog" : "Add blog"}
                                      </ModalHeader>
                                      <ModalBody>
                                        <Form
                                          onSubmit={(e) => {
                                            e.preventDefault();
                                            validation.handleSubmit();
                                            return false;
                                          }}
                                          encType='multipart/form-data'
                                      
                                        >
                                          <Row form>
                                          <div style={{ border: "1px solid #E5E5E5", borderRadius: "8px", marginTop: "20px"}} className="p-2">
                                            <Col xs={12}>
                                              <div className="mb-3">
                                                <Label className="form-label">Title</Label>
                                                <Input
                                                  name="title"
                                                  type="text"
                                                  onChange={validation.handleChange}
                                                  onBlur={validation.handleBlur}
                                                  value={validation.values.title || ""}
                                                  invalid={
                                                    validation.touched.title && validation.errors.title ? true : false
                                                  }
                                                />
                                                {validation.touched.title && validation.errors.title ? (
                                                  <FormFeedback type="invalid">{validation.errors.title}</FormFeedback>
                                                ) : null}
                                              </div>

                                              <Row>
                                                <Col md="6">
                                                    <div className="mb-3">
                                                    <Label className="form-label">Category</Label>
                                                    <select className="form-control" name="category" onChange={validation.handleChange}>
                                                        <option value="" className=" ">Select blog category</option>
                                                        <option value="general" className="">General</option>
                                                        <option value="giftcard">Giftcard</option>
                                                        <option value="crypto">Crypto</option>
                                                        <option value="finance">Finance</option>
                                                      </select>
                                                    {validation.touched.category && validation.errors.category ? (
                                                      <FormFeedback type="invalid">{validation.errors.category}</FormFeedback>
                                                    ) : null}
                                                  </div>
                                                </Col>

                                                <Col md="6">
                                                    <div className="mb-3">
                                                    <Label className="form-label">Blog Status</Label>
                                                    <select className="form-control" name="blogStatus" onChange={validation.handleChange}>
                                                        <option value="" className=" ">Select blog status</option>
                                                        <option value="PUBlISHED" className="">Publish Blog</option>
                                                        <option value="DRAFT">Save as draft</option>
                                                      </select>
                                                    {validation.touched.blogStatus && validation.errors.blogStatus ? (
                                                      <FormFeedback type="invalid">{validation.errors.blogStatus}</FormFeedback>
                                                    ) : null}
                                                  </div>
                                                </Col>
                                              </Row>

                                              <div className="mb-3">
                                                <Label className="form-label">Image</Label>
                                                <Input
                                                   type="file"
                                                   name='imageURL'
                                                   onChange={handleUpload}
                                                  
                                                />

                                              </div>

                                              <div className="mb-3">
                                                <Label className="form-label">Thumbnail</Label>
                                                <Input
                                                   type="file"
                                                   name='thumbnailURL'
                                                   onChange={handleThumbnailUpload}
                                                  
                                                />

                                              </div>
                                              <div className="mb-3">
                                                <Label className="form-label">Keywords</Label>
                                                <Input
                                                  name="keywords"
                                                  label="Keywords"
                                                  type="text"
                                                  onChange={validation.handleChange}
                                                  onBlur={validation.handleBlur}
                                                  value={validation.values.keywords || ""}
                                                  invalid={
                                                    validation.touched.keywords && validation.errors.keywords && validation.errors.keywords ? true : false
                                                  }
                                                />
                                                {validation.touched.keywords && validation.errors.keywords ? (
                                                  <FormFeedback type="invalid">{validation.errors.keywords}</FormFeedback>
                                                ) : null}
                                              </div>
                                            

                                              <div className="mb-3">
                                                <Label className="form-label">Body</Label>

                                                <CKEditor
                                                  editor={ ClassicEditor }
                                                  data={blogBody || ""}
                                                  onReady={ editor => {
                                                      // You can store the "editor" and use when it is needed.
                                                      console.log( 'Editor is ready to use!', editor );
                                                  } }
                                                  onChange={ ( event, editor ) => {
                                                      const data = editor.getData();
                                                      setBlogBody(data)
                                                  } }

                                                  value={blogBody || ""}

                                                 
                                                  onBlur={ ( event, editor ) => {
                                                      console.log( 'Blur.', editor );
                                                  } }
                                                  onFocus={ ( event, editor ) => {
                                                      console.log( 'Focus.', editor );
                                                  } }
                                              />
                                                
                                              </div>
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

export default withRouter(BlogList);