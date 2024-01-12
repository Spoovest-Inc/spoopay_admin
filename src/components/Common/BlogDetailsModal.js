import PropTypes from 'prop-types'
import React from "react"
import { Col, Modal, ModalBody,ModalHeader, Row } from "reactstrap"

const BlogDetails = ({ show, onCloseClick, blogDetail }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} size="lg" centered={true}>
      <ModalHeader toggle={onCloseClick} tag="h4" style={{ paddingLeft: "40px"}} >
        Blog Details
      </ModalHeader>
      <ModalBody className="py-3 px-5">
        <Row>
          <Col lg={12}>
            <div className="text-center">
              <div>
                  <img src={blogDetail.imageURL} alt={blogDetail.title} width="100%" height="200px" />
              </div>

              <div style={{ border: "1px solid #E5E5E5", borderRadius: "8px", marginTop: "20px"}} className="p-2">
              <h1>{blogDetail.title}</h1> <br />  
              <p>{blogDetail.body}</p> <hr />
               <h6>Slugs</h6>
              <p>{blogDetail.slug}</p>
              </div>
              
            
               
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

BlogDetails.propTypes = {
  onCloseClick: PropTypes.func,
  blogDetail: PropTypes.any,
  show: PropTypes.any
}

export default BlogDetails
