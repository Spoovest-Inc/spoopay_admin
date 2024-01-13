import PropTypes from "prop-types";
import React, { useEffect, useRef,  useState } from "react";
import Iconfiy from 'pages/Utility/Iconfiy'

// //Import Scrollbar
import SimpleBar from "simplebar-react";


// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

// Icons
import dashboardIcon from "assets/images/FlipEx/dashboard.svg"
import noticeIcon from "assets/images/FlipEx/notice.svg"
import userIcon from "assets/images/FlipEx/user.svg"
import giftcardIcon from "assets/images/FlipEx/giftcard.svg"
import logIcon from "assets/images/FlipEx/logs.svg"
import taskIcon from "assets/images/FlipEx/tasks.svg"
import staffIcon from "assets/images/FlipEx/staffs.svg"
import adIcon from "assets/images/FlipEx/ads.svg"
import blogIcon from "assets/images/FlipEx/blogs.svg"
import transIcon from "assets/images/FlipEx/transactions.svg"
import newsletterIcon from "assets/images/FlipEx/newsletter.svg"
import ratesIcon from "assets/images/FlipEx/rates.svg"
import xmass from "assets/images/FlipEx/xmass.jpg"

//i18n
import { withTranslation } from "react-i18next";

const SidebarContent = props => {
  const [userDetails, setUserDetails] = useState("")


  const ref = useRef();
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu("#side-menu");
      let matchingMenuItem = null;
      const ul = document.getElementById("side-menu");
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname]);

  useEffect(() => {
    ref.current.recalculate();
  });

  useEffect(() => {
      if(localStorage.getItem("profile")){
        const obj = JSON.parse(localStorage.getItem("profile"))
        setUserDetails(obj)
      }
  }, [])

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
           <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            {userDetails?.data?.role === 1 ? (
              <>
                 <li>
                  <Link to="/blogs">
                    <img src={blogIcon} alt="" width="20px" style={{ marginBottom: "3px" }} />
                    <span style={{ paddingLeft: "5px"}}>{props.t("Blogs")}</span>
                  </Link>
                 </li>

                 <li>
              <Link to="/ad-manager" className="">
              <i className="bx bx-briefcase-alt-2"></i>
                <span>{props.t("Ads manager")}</span>
              </Link>
            </li>
              </>
            ) : (
              <>
             
            <li>
              <Link to="/dashboard" className="">
                <i className="bx bxs-grid-alt"></i>
                <span style={{ marginLeft: "5px"}}>{props.t("Dashboards")}</span>
              </Link>
            </li>

          

            {/* <li>
              <Link to="/ad-manager" className="">
                 <img src={adIcon} alt="" width="20px" style={{ marginBottom: "2px" }}/>
                <span style={{ paddingLeft: "2px"}}>{props.t("Ads manager")}</span>
              </Link>
            </li> */}

            <li>
              <Link to="/admin">
                <i className="bx bx-user"></i>
                <span style={{ paddingLeft: "5px"}}>{props.t("Admins")}</span>
              </Link>
            </li>

            <li>
              <Link to="/users">
              <i className="bx bx-user-plus"></i>
                <span style={{ paddingLeft: "5px"}}>{props.t("Users")}</span>
              </Link>
            </li>

            {/* <li>
              <Link to="/blogs">
              <i className='bx bxs-book-content'></i>
                <span >{props.t("Blogs")}</span>
              </Link>
            </li> */}


            

     

            <li>
              <Link to="/transactions">
              <i className="bx bx-history"></i>
                <span style={{ paddingLeft: "5px"}}>{props.t("Transactions")}</span>
              </Link>
            </li>


            <li>
              <Link to="/" className="has-arrow">
             
              <Iconfiy icon="material-symbols:savings-outline"/>
              <span style={{ paddingLeft: "15px"}}>{props.t("Savings")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                  <li>
                  <Link to="/spoowealth" className=" ">
                    <span>{props.t("Spoowealth")}</span>
                  </Link>
                </li>

                {/* <li>
                  <Link to="/spooflex" className=" ">
                    <span>{props.t("Spooflex")}</span>
                  </Link>
                </li> */}
              </ul>
            </li>

          
            {/* <li>
              <Link to="/" className="has-arrow">
              <i className="bx bx-bold"></i>
                <span>{props.t("Crypto")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                  <li>
                  <Link to="/rates" className=" ">
                    <span>{props.t("Crypto Rates")}</span>
                  </Link>
                </li>

                <li>
                  <Link to="/wallets" className=" ">
                    <span>{props.t("User Wallets")}</span>
                  </Link>
                </li>
              </ul>
            </li> */}



            {/* <li>
              <Link to="/tasks-list">
              <i className="bx bxs-file"></i>
                <span>{props.t("Daily Tasks")}</span>
              </Link>
            </li>
 */}



            <li>
              <Link to="/admin-logs">
              <i className='bx bxs-notepad'></i>
                <span>{props.t("Admin Logs")}</span>
              </Link>
            </li>

            {/* <li>
              <Link to="/send-mail">
              <i className='bx bxs-news'></i>
                <span>{props.t("Newsletter")}</span>
              </Link>
            </li>

            <li>
              <Link to="/staff-profiles">
                <i className="bx bxs-user-badge"></i>
                <span>{props.t("Staff profiles")}</span>
              </Link>
            </li>

            <li>
              <Link to="/chat">
               <i className="bx bx-chat"></i>
                <span>{props.t("Chat")}</span>
              </Link>
            </li> */}


        

          

            {/* <li>
              <Link to="/notifications" className="">
              <i className="bx bxs-info-circle"></i>
                <span>{props.t("Notice board")}</span>
              </Link>
            </li>

            <li>
              <Link to="/leaderboard">
              <i className="bx bxs-file"></i>
                <span>{props.t("LeaderBoard")}</span>
              </Link>
            </li> */}



            {/* <li>
              <Link to="/" className="has-arrow">
                <i className="bx bxs-widget"></i>
                <span >{props.t("More")}</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                  <li>
                  <Link to="/service-providers" className=" ">
                    <span>{props.t("Service Providers")}</span>
                  </Link>
                </li>

                <li>
                  <Link to="/special-codes" className=" ">
                    <span>{props.t("Special Codes")}</span>
                  </Link>
                </li>
              </ul>
            </li> */}



            {/* <img src={xmass} width={200} height={100}  alt=""/> */}

           </>
            ) }
           
          </ul>
        
        </div>
        
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
