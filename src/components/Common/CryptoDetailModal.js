import PropTypes from 'prop-types'
import React from "react"
import { Col, Modal, ModalBody, Row, Table,  } from "reactstrap"

const CryptoDetailModal = ({ show, onCloseClick, cryptoDetail }) => {
  return (
    <Modal isOpen={show} toggle={onCloseClick} size="lg" centered={true}>
      <ModalBody className="py-3 px-5">
        <Row>
          <Col lg={12}>
          <div className="table-responsive">
                    <Table className="table-nowrap mb-0">
                      <tbody>
                        <tr>
                          <th scope="row">Currency Name</th>
                          <td>{cryptoDetail.currency_name}</td>
                        </tr>
                        <tr>
                          <th scope="row">Currency symbol</th>
                          <td>{cryptoDetail.currency_symbol}</td>
                        </tr>
                        <tr>
                          <th scope="row">USD rate</th>
                          <td>{cryptoDetail.usd_rate}</td>
                        </tr>
                        <tr>
                          <th scope="row">Naira rate</th>
                          <td>{cryptoDetail.ngn_rate}</td>
                        </tr>

                        <tr>
                          <th scope="row">Wallet Address</th>
                          <td>{cryptoDetail.wallet_address}</td>
                        </tr>

                        <tr>
                          <th scope="row">Image</th>
                          <img src={cryptoDetail.image_url} alt={cryptoDetail.currency_name} width="100%" height="200px" />
                        </tr>

                        {/* <tr>
                          <th scope="row">Wallet Balance</th>
                          <td>{userDetail.wa}</td>
                        </tr> */}
                      </tbody>
                    </Table>
                  </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="text-center mt-3">
            <i
                className="mdi mdi-close"
                style={{ fontSize: "2em", color: "green" }}
                onClick={onCloseClick}
              />
            
            </div>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  )
}

CryptoDetailModal.propTypes = {
  onCloseClick: PropTypes.func,
  cryptoDetail: PropTypes.any,
  show: PropTypes.any
}

export default CryptoDetailModal
