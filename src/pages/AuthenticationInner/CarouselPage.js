import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Col } from "reactstrap"


const CarouselPage = () => {
  return (
    <React.Fragment>
      <Col xl={6}>
        <div className="auth-full-bg pt-lg-5 p-4">
          <div className="w-100">
            <div className="d-flex h-100 flex-column">
              <h1 style={{ padding: "30px", color: "orange"}}>Spoopay</h1>
             {/* <img src="https://edgeequitys.s3.amazonaws.com/spoopay_logo.png" alt="logo" width={100} />
            <img src="https://edgeequitys.s3.amazonaws.com/new_dashboard.png" alt="logo" width="100%" style={{ marginTop: '200px', borderRadius: "10px"}} /> */}
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  )
}
export default CarouselPage
