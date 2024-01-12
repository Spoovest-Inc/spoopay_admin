import React from 'react';
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';


const AppLayout = (props) => {
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div id="layout-wrapper">
                <Header />
                <Sidebar />
                
                <div className="main-content">{props.children}</div>
                
                <Footer />
            </div>
      {/* {showRightSidebar ? <RightSidebar /> : null}   */}
        </>
    );
}

AppLayout.propTypes = {
    children: PropTypes.object,
}


export default withRouter(AppLayout);