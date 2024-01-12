import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import SidebarContent from "./SidebarContent";

import { Link } from "react-router-dom";

import flipLogo from "../../assets/images/FlipEx/logo.png"
import icon from "../../assets/images/FlipEx/icon.png"

const Sidebar = props => {

  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={icon} alt="" height="22" />
            </span>
            <span className="logo-lg" style={{ color: "orange", fontWeight: "bolder"}}>
               Spoopay
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src="https://edgeequitys.s3.amazonaws.com/spoopay_logo.png" alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src="https://edgeequitys.s3.amazonaws.com/spoopay_logo.png" alt="" height="19" />
            </span>
          </Link>
        </div>
        <div data-simplebar className="h-100">
            <SidebarContent />
        </div>
        <div className="sidebar-background"></div>
      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

const mapStatetoProps = state => {
  return {
    layout: state.Layout,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Sidebar)));
