import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
import MetaTags from "react-meta-tags";
import { ToastContainer, toast } from 'react-toastify';
import NumberFormat from 'react-number-format';
import Receipt from "../../assets/images/FlipEx/rec.svg"
import GiftcardIndicator from "../../assets/images/FlipEx/g_rec.svg"
import cryptondicator from "../../assets/images/FlipEx/c_rec.svg"
import ProgressBar from "@ramonak/react-progress-bar";
import TotalWallet from "../../assets/images/FlipEx/wallet.svg"
import TotalWithdrawal from "../../assets/images/FlipEx/t_wallet.svg"
import PayBills from "../../assets/images/FlipEx/payments.svg"
import 'moment-timezone';
import moment from 'moment-timezone';


import { isEmpty, size, map, values } from "lodash";
import Knob from "../AllCharts/knob/knob"

import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";

import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";

import { withRouter, Link, useHistory } from "react-router-dom";
import LogDetails from "../../../src/components/Common/LogDetails"


import Line from "../../components/Common/LineChart"
import DonutChart from "../../components/Common/DonutChart"
import DashboardReport from "../../components/Common/DashboardReport"
const API_URL = process.env.REACT_APP_BASE_URL


const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.request.use((req) => {
  if(localStorage.getItem('profile')){
      req.headers.Authorization = `Bearer ${ JSON.parse(localStorage.getItem('profile')).token}`,
      req.headers.Accept = 'application/json'
  }
  return req;
});



//i18n
import { withTranslation } from "react-i18next";

//redux
import { useSelector, useDispatch } from "react-redux";


const Dashboard = props => {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState(JSON.parse(localStorage.getItem("profile")))
  const [totalUsers, setTotalUsers] = useState("")
  const [totalWithdrawals, setTotalWithdrawals] = useState("")
  const [totalWalletBalance, setTotalWalletBalance] = useState("")

  const [totalAirtimeSells, setTotalAirtimeSells] = useState("")
  const [totalDataSells, setTotalDataSells] = useState("")
  const [totalCableSells, setTotalCableSells] = useState("")
  const [totalElectricitySells, setTotalElectricitySells] = useState("")

  const [totalGiftCardSells, setGiftCardSells] = useState("")
  const [totalCryptoSell, setTotalCryptoSell] = useState("")

  // Marketing report 
  const [facebookTraffic, setFacebookTraffic] = useState("")
  const [twitterTraffic, setTwitterTraffic] = useState("");
  const [googleTraffic, setGoogleTraffic] = useState("");
  const [instagramTraffic, setInstagramTraffic] = useState("")
  const [snapchatTraffic, setSnapchatTraffic] = useState("")
  const [tiktokTraffic, setTikTokTraffic] = useState("")
  const [googleAdsTraffic, setGoogleAdsTraffic] = useState("")
  const [friendsAndFamilyTraffic, setFriendsAndFamilyTraffic] = useState("")
  const [othersTraffic, setOthersTraffic] = useState("")
  const [chartData, setChartdata] = useState({
        day1: 0,
        day2: 0,
        day3: 0,
        day4: 0,
        day5: 0,
        day6: 0,
        day7: 0,
        day8: 0,
        day9: 0,
        day10:  0,
        day11:  0,
        day12:  0,
        day13:  0,
        day14:  0,
        day15:  0,
        day16:  0,
        day17:  0,
        day18:  0,
        day19:  0,
        day20:  0,
        day21:  0,
        day22:  0,
        day23:  0,
        day24:  0,
        day25:  0,
        day26:  0,
        day27:  0,
        day28:  0,
        day29:  0,
        day30:  0,
        day31:  0
  })

  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth()
  let currentDay = currentDate.getDay()
  let lastDay = 31
  


  const [year, setYear] = useState("2022")
  const [start_date, setStartDate] = useState(`${currentYear}-${currentMonth === 11 ? currentMonth + 1 : currentMonth}-${currentDay}`)
  const [end_date, setEndDate] = useState(`${currentYear}-${currentMonth === 11 ? currentMonth + 1 : currentMonth}-${lastDay}`)
  const [logs, setLogs] = useState([])

  const [totalTrafficUsers, setToTalTrafficUsers] = useState(facebookTraffic + twitterTraffic + googleTraffic + tiktokTraffic + googleAdsTraffic + othersTraffic)



function formatDate(date) {
  var d = new Date(date)
      day = '' + d.getDate()
  return day;
}

  



  const loadWalletBillReport = () => {
    axiosApi.get(`${API_URL}/` + 'api/v1/reports/wallet-bills-transaction-values').then((res) => {
      setTotalUsers(res.data.totalUsers); 
      setTotalWithdrawals(res.data.totalWithdrawals)
      setTotalWalletBalance(res.data.totalWalletBalance);
      setTotalElectricitySells(res.data.totalElectricitySells);
      setTotalCableSells(res.data.totalCableSells);
      setTotalDataSells(res.data.totalDataSells);
      setTotalAirtimeSells(res.data.totalAirtimeSells);
      setGiftCardSells(res.data.totalGiftCardSells);
      setTotalCryptoSell(res.data.totalCryptoSell);
  
  
  }).catch((errors) => {
     
  })
  } 


  const loadUserSignupReport = () => {
    axiosApi.get(`${API_URL}/api/v1/reports/users/${start_date}/${end_date}`).then((res) => {
       let reports = res.data.data.users.rows

       let dayOne =  reports.filter((item) => moment(item.createdAt).format("D") == 1)
       let dayTwo =  reports.filter((item) => moment(item.createdAt).format("D") == 2)
       let day3 =  reports.filter((item) => moment(item.createdAt).format("D") == 3)
       let day4 =  reports.filter((item) => moment(item.createdAt).format("D") == 4)
       let day5 =  reports.filter((item) => moment(item.createdAt).format("D") == 5)
       let day6 =  reports.filter((item) => moment(item.createdAt).format("D") == 6)
       let day7 =  reports.filter((item) => moment(item.createdAt).format("D") == 7)
       let day8 =  reports.filter((item) => moment(item.createdAt).format("D") == 8)
       let day9 =  reports.filter((item) => moment(item.createdAt).format("D") == 9)
       let day10 =  reports.filter((item) => moment(item.createdAt).format("D") == 10)
       let day11 =  reports.filter((item) => moment(item.createdAt).format("D") == 11)
       let day12 =  reports.filter((item) => moment(item.createdAt).format("D") == 7)
       let day13 =  reports.filter((item) => moment(item.createdAt).format("D") == 7)
       let day14 =  reports.filter((item) => moment(item.createdAt).format("D") == 7)
       let day15 =  reports.filter((item) => moment(item.createdAt).format("D") == 7)
       let day16 =  reports.filter((item) => moment(item.createdAt).format("D") == 7)
       let day17 =  reports.filter((item) => moment(item.createdAt).format("D") == 7)
       let day18 =  reports.filter((item) => moment(item.createdAt).format("D") == 7)
       let day19 =  reports.filter((item) => moment(item.createdAt).format("D") == 7)
       let day20 =  reports.filter((item) => moment(item.createdAt).format("D") == 7)
       let day21 =  reports.filter((item) => moment(item.createdAt).format("D") == 7)
       let day22 =  reports.filter((item) => moment(item.createdAt).format("D") == 7)
       let day23 =  reports.filter((item) => moment(item.createdAt).format("D") == 7)
       let day24 =  reports.filter((item) => moment(item.createdAt).format("D") == 7)
       let day25 =  reports.filter((item) => moment(item.createdAt).format("D") == 7)
       let day26 =  reports.filter((item) => moment(item.createdAt).format("D") == 7)
       let day27 =  reports.filter((item) => moment(item.createdAt).format("D") == 7)
       let day28 =  reports.filter((item) => moment(item.createdAt).format("D") == 28)
       let day29 =  reports.filter((item) => moment(item.createdAt).format("D") == 29)
       let day30 =  reports.filter((item) => moment(item.createdAt).format("D") == 30)
       let day31 =  reports.filter((item) => moment(item.createdAt).format("D") == 31)

     


      setChartdata({...chartData, 
        day1: dayOne.length,
        day2: dayTwo.length,
        day3: day3.length,
        day4: day4.length,
        day5: day5.length,
        day6: day6.length,
        day7: day7.length,
        day8: day8.length,
        day9: day9.length,
        day10: day10.length,
        day11: day11.length,
        day12: day12.length,
        day13: day13.length,
        day14: day14.length,
        day15: day15.length,
        day16: day16.length,
        day17: day17.length,
        day18: day18.length,
        day19: day19.length,
        day20: day20.length,
        day21: day21.length,
        day22: day22.length,
        day23: day23.length,
        day24: day24.length,
        day25: day25.length,
        day26: day26.length,
        day27: day27.length,
        day28: day28.length,
        day29: day29.length,
        day30: day30.length,
        day31: day31.length,
      }); 
  }).catch((errors) => {
     
  })
  } 

const loadMarketingChannelReport = () => {
  axiosApi.get(`${API_URL}/` + 'api/v1/reports/marketing-chanel-reports').then((res) => {
    setFacebookTraffic(res.data.facebookTraffic); 
    setTwitterTraffic(res.data.twitterTraffic)
    setGoogleTraffic(res.data.googleTraffic);
    setInstagramTraffic(res.data.instagramTraffic);
    setSnapchatTraffic(res.data.snapChatTraffic);
    setTikTokTraffic(res.data.tikTokTraffic);
    setGoogleAdsTraffic(res.data.gmailAdsTraffic);
    setFriendsAndFamilyTraffic(res.data.friendsAndFamilyTraffic);
    setOthersTraffic(res.data.otherTraffic);


}).catch((errors) => {
  
})
}

useEffect(() => {
   
  axiosApi.get(`${API_URL}/api/v1/admin/all-logs`).then((res) => {
  setLogs(res.data)
}).catch((error) => {

})

setIsEdit(false);

}, []);


  useEffect(() => {
    loadWalletBillReport()
    loadMarketingChannelReport()
    loadUserSignupReport()
  }, [ ]);






  
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [menu, setMenu] = useState(false)

  const [logDetail, setLogDetail] = useState([]);
  const [id, setId] = useState("");
  

  const { SearchBar } = Search;
  const sizePerPage = 2;
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: logs.length, // replace later with size(blogs),
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
   
        axiosApi.get(`${API_URL}/api/v1/admin/all-logs`).then((res) => {
        setLogs(res.data)
     }).catch((error) => {
     
     })

      setIsEdit(false);
    
  }, []);


  useEffect(() => {
    setLogs(logs);
    setIsEdit(false);
  }, [logs]);

  useEffect(() => {
    if (!isEmpty(logs) && !!isEdit) {
      setLogs(logs);
      setIsEdit(false);
    }
  }, [logs]);

  const toggle = () => {
    setModal(!modal);
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


const  filterTransactionByYear = (e) => {
   switch (e.target.value) {
    case "Jan":
      setStartDate("01-05-" + year)
      setEndDate("30-05-2022")
      loadUserSignupReport()
      break;
    case "Feb":
      setStartDate("01-02-" + year)
      setEndDate("28-02-" + year)
      loadUserSignupReport()
      break;
    case "March":
      setStartDate("01-03-" + year)
      setEndDate("31-03-" + year)
      loadUserSignupReport()
      break;
    case "April":
      setStartDate("01-04-" + year)
      setEndDate("30-04-" + year)
      loadUserSignupReport()
      break;
    case "May":
      setStartDate("01-05-" + year)
      setEndDate("31-05-" + year)
      loadUserSignupReport()
      break;
    case "June":
      setStartDate("01-06-" + year)
      setEndDate("30-06-" + year)
      loadUserSignupReport()
      break;
    case "July":
      setStartDate("01-07-" + year)
      setEndDate("31-07-" + year)
      loadUserSignupReport()
      break;
    case "August":
      setStartDate("01-08-" + year)
      setEndDate("31-08-" + year)
      loadUserSignupReport()
      break;
    case "September":
      setStartDate("01-09-" + year)
      setEndDate("30-09-" + year)
      loadUserSignupReport()
      break;
    case "October":
      setStartDate("01-10-" + year)
      setEndDate("31-10-" + year)
      loadUserSignupReport()
      break;
    case "November":
      setStartDate("01-11-" + year)
      setEndDate("30-11-" + year)
      loadUserSignupReport()
      break;
    case "December":
      setStartDate("01-12-" + year)
      setEndDate("31-12-" + year)
      loadUserSignupReport()
      break;
   
    default:
      setStartDate("01-12-" + year)
      setEndDate("31-12-" + year)
      loadUserSignupReport()
      break;
   }


}


  const logDetails = (log) => {
    setLogDetail(log)
    console.log(log);
    setModal(true)
  }

  const keyField = "id";


  const logListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      // eslint-disable-next-line react/display-name
      formatter: log => <>{log.id}</>,
    },
   
    

   

    {
        text: "Admin Name",
        dataField: "name",
        sort: true,
        // eslint-disable-next-line react/display-name
        formatter: (cellContent, log) => (
          <>
            <h5 className="font-size-14 mb-1">
              <Link to="#" className="text-dark">
                {log.adminName} 
              </Link>
            </h5>
          
          </>
        ),
      },

      {
        text: "Action Type",
        dataField: "action_type",
        sort: true,
        // eslint-disable-next-line react/display-name
        formatter: (cellContent, log) => (
          <>
            <h5 className="font-size-14 mb-1">
              <Link to="#" className="text-dark">
                {log.actionType} 
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
       formatter: (cellContent, log) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {log.createdAt } 
            </Link>
          </h5>
        
        </>
      ),
    },

    {
      dataField: "Admin Email",
      text: "adminEmail",
      sort: true,

       // eslint-disable-next-line react/display-name
       formatter: (cellContent, log) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {log.adminEmail } 
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
      formatter: (cellContent, log) => (
        <div className="d-flex gap-3"  onClick={() => logDetails(log)}>
             <div className="text-primary">
            <i
              className="mdi mdi-eye font-size-18"
            ></i>
          </div>
        </div>
      ),
    },
  ];


  const momthData = [
     "Jan",
     "Feb",
     "March",
     "April",
     "May",
     "June",
     "July",
     "August",
     "September",
     "October",
     "November",
     "December"
  ]








  return (
    <React.Fragment>
       <LogDetails
        show={modal}
        logDetail={logDetail}
        onCloseClick={() => setModal(false)}
      />
      <div className="page-content">
        <MetaTags>
          <title>Dashboard | FlipEx Dashboard</title>
        </MetaTags>
        <Container fluid>
          <Row>
            <Col md="12">
              <Row>
                <Col md="6">
                   <Row>
                    <Col md="12">
                     <Card>
                       <CardBody>
                        <CardTitle className="mb-4"> 
                        <div style={{ display: "flex", flexDirection: "row"}}>
                        <span>Total Users </span>
                          <span style={{ float: "right", marginLeft: "60%"}}>
                              <select className="form-control" name="type"  onChange={(e) => filterTransactionByYear(e)}>
                                 {momthData.map((m, i) => (
                                  <>
                                    <option value={m}>{m}</option>
                                  </>
                                 ))}
                              </select>
                          </span>
                        </div>
                        </CardTitle>
                        <div id="line-chart" className="e-chart">
                          <Line
                          day1={chartData.day1} 
                          day2={chartData.day2} 
                          day3={chartData.day3}
                          day4={chartData.day4}
                          day5={chartData.day5} 
                          day6={chartData.day6}
                          day7={chartData.day7}
                          day8={chartData.day8}
                          day9={chartData.day9}
                          day10={chartData.day10}
                          day11={chartData.day11}
                          day12={chartData.day12}
                          day13={chartData.day13}
                          day14={chartData.day14}
                          day15={chartData.day15}
                          day16={chartData.day16}
                          day17={chartData.day17}
                          day18={chartData.day18}
                          day19={chartData.day19}
                          day20={chartData.day20}
                          day21={chartData.day21}
                          day22={chartData.day22}
                          day23={chartData.day23}
                          day24={chartData.day24}
                          day25={chartData.day25}
                          day26={chartData.day26}
                          day27={chartData.day27}
                          day28={chartData.day28}
                          day29={chartData.day29}
                          day30={chartData.day30}
                          day31={chartData.day31}
                          />
                        </div>
                        <span style={{ fontWeight: "bold", fontSize: "30px"}}>
                           {totalUsers}
                        </span>
                       </CardBody>
                      </Card>
                    </Col>
                    <Col md="12">
                      <Row>
                      <Col md="6">
                      <Card>
                       <CardBody>
                        <CardTitle className="mb-4"> Total Withdrawals <span style={{float: "right"}}><img src={TotalWithdrawal} alt="" /></span> </CardTitle>
                       <span>
                       <span style={{ fontSize: "30px"}}>
                        <NumberFormat
                          value={totalWithdrawals}
                          className="foo"
                          displayType={'text'}
                          thousandSeparator={true}
                          renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                          /> 
                        </span>
                        <span style={{ float: "right", color: "#538D60"}}>+2.1%</span>
                       </span>
                       
                       </CardBody>
                      </Card>
                      </Col>
                      <Col md="6">
                      <Card>
                       <CardBody>
                        <CardTitle className="mb-4"> Total Wallet Balance <span style={{float: "right"}}><img src={TotalWallet} alt="" /></span> </CardTitle>
                        <span style={{ fontSize: "30px"}}>
                        <NumberFormat
                          value={totalWalletBalance}
                          className="foo"
                          displayType={'text'}
                          thousandSeparator={true}
                          renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                          /> 
                        </span>
                        <span style={{ float: "right", color: "#538D60"}}>+2.1%</span>
                       </CardBody>
                      </Card>
                      </Col>
                      </Row>
                    </Col>
                   </Row>
                </Col>

                <Col md="6">
                  <Row>
                    <Col md="6">
                      <Card>
                        <CardBody>
                        <h5>Transactions <span style={{ float: "right"}}><img src={Receipt} alt="" /></span></h5>
                            <div className="text-center pt-3" dir="ltr" style={{ marginTop: "53%"}}>
                            <DonutChart giftcard={totalGiftCardSells * 100 / (totalGiftCardSells + totalCryptoSell)} crypto={totalCryptoSell * 100 / (totalGiftCardSells + totalCryptoSell)} />
                            </div>
                        </CardBody>
                      </Card>
                         
                    </Col>

                    <Col md="6">
                      <Card>
                        <CardBody>
                          <h4>Top Traffic</h4>
                           <hr />
                           <div>
                            <span>Facebook</span> <span style={{ float: "right", fontWeight: "bold"}}>{ facebookTraffic}</span>
                            <ProgressBar completed = {facebookTraffic * 100 / (googleAdsTraffic + googleTraffic  + instagramTraffic + tiktokTraffic + twitterTraffic + othersTraffic + facebookTraffic)} bgColor = "#000000" animateOnRender = {true} isLabelVisible = {false} />
                           </div>

                           <div style={{ marginTop: "20px"}}>
                            <span>Gmails Ads</span> <span style={{ float: "right", fontWeight: "bold"}}>{googleAdsTraffic}</span>
                            <ProgressBar completed = {googleAdsTraffic * 100 / (googleAdsTraffic + googleTraffic  + instagramTraffic + tiktokTraffic + twitterTraffic + othersTraffic + facebookTraffic)} bgColor = "#F0BE42" animateOnRender = {true} isLabelVisible = {false} />
                           </div>

                           <div style={{ marginTop: "20px"}}>
                            <span>Google</span> <span style={{ float: "right", fontWeight: "bold"}}>{googleTraffic}</span>
                            <ProgressBar completed = {googleTraffic * 100 / (googleAdsTraffic + googleTraffic  + instagramTraffic + tiktokTraffic + twitterTraffic + othersTraffic + facebookTraffic)} bgColor = "#F09736" animateOnRender = {true} isLabelVisible = {false} />
                           </div>

                           <div style={{ marginTop: "20px"}}>
                            <span>Instagram</span> <span style={{ float: "right", fontWeight: "bold"}}>{instagramTraffic}</span>
                            <ProgressBar completed = {instagramTraffic * 100 / (googleAdsTraffic + googleTraffic  + instagramTraffic + tiktokTraffic + twitterTraffic + othersTraffic + facebookTraffic)} bgColor = "#EA33C3" animateOnRender = {true} isLabelVisible = {false} />
                           </div>

                           <div style={{ marginTop: "20px"}}>
                            <span>Twitter</span> <span style={{ float: "right", fontWeight: "bold"}}>{twitterTraffic}</span>
                            <ProgressBar className="progress-sm" completed = {twitterTraffic * 100 / (googleAdsTraffic + googleTraffic  + instagramTraffic + tiktokTraffic + twitterTraffic + othersTraffic + facebookTraffic)} bgColor = "#4A99E9" animateOnRender = {true} isLabelVisible = {false} />
                           </div>

                           <div style={{ marginTop: "20px"}}>
                            <span>Tiktok</span> <span style={{ float: "right", fontWeight: "bold"}}>{tiktokTraffic}</span>
                            <ProgressBar completed = {tiktokTraffic * 100 / (googleAdsTraffic + googleTraffic  + instagramTraffic + tiktokTraffic + twitterTraffic + othersTraffic + facebookTraffic)} bgColor = "#71E9E7" animateOnRender = {true} isLabelVisible = {false} />
                           </div>

                           <div style={{ marginTop: "20px"}}>
                            <span>Others</span> <span style={{ float: "right", fontWeight: "bold"}}>{othersTraffic}</span>
                            <ProgressBar completed = {othersTraffic * 100 / (googleAdsTraffic + googleTraffic  + instagramTraffic + tiktokTraffic + twitterTraffic + othersTraffic + facebookTraffic)} bgColor = "#717171" animateOnRender = {true} isLabelVisible = {false} />
                           </div>
                           
                        </CardBody>
                      </Card>


                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>

            <Col md="12">
              <Row>
                <Col md="3">
                <Card>
                        <CardBody>
                          <h4>Pay Bills <span style={{ float: "right"}}><img src={PayBills} alt="" /></span></h4>
                           <hr />
                           <div>
                            <span>Airtime</span>
                             <span style={{ float: "right", fontWeight: "bold"}}>                        
                             <NumberFormat
                              value={totalAirtimeSells}
                              className="foo"
                              displayType={'text'}
                              thousandSeparator={true}
                             renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                          /> </span>
                            <ProgressBar completed = {totalAirtimeSells  * 100 / (totalDataSells + totalCableSells + totalAirtimeSells)} bgColor = "#000000" animateOnRender = {true} isLabelVisible = {false} />
                           </div>

                           <div style={{ marginTop: "20px"}}>
                            <span>Cable</span> 
                            <span style={{ float: "right", fontWeight: "bold"}}>                        
                             <NumberFormat
                              value={totalCableSells}
                              className="foo"
                              displayType={'text'}
                              thousandSeparator={true}
                             renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                          /> </span>
                            <ProgressBar completed = {totalCableSells * 100 / (totalDataSells + totalCableSells + totalAirtimeSells)} bgColor = "#FFB2A8" animateOnRender = {true} isLabelVisible = {false} />
                           </div>

                           <div style={{ marginTop: "20px"}}>
                            <span>Data</span>
                            <span style={{ float: "right", fontWeight: "bold"}}>                        
                             <NumberFormat
                              value={totalDataSells}
                              className="foo"
                              displayType={'text'}
                              thousandSeparator={true}
                             renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                          /> </span>
                            <ProgressBar completed = {totalDataSells * 100 / (totalDataSells + totalCableSells + totalAirtimeSells)} bgColor = "#FFDD6C" animateOnRender = {true} isLabelVisible = {false} />
                           </div>

                           <div style={{ marginTop: "20px"}}>
                            <span>Electricity</span> 
                            <span style={{ float: "right", fontWeight: "bold"}}>                        
                             <NumberFormat
                              value={totalElectricitySells}
                              className="foo"
                              displayType={'text'}
                              thousandSeparator={true}
                             renderText={(value, props) => <div {...props}>&#8358;{value}</div>}
                          /> </span>
                            <ProgressBar completed = {totalElectricitySells * 100 / (totalDataSells + totalCableSells + totalAirtimeSells) } bgColor = "#717171" animateOnRender = {true} isLabelVisible = {false} />
                           </div>             
                        </CardBody>
                      </Card>
                </Col>
                <Col md="9">
                <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField={keyField}
                    columns={logListColumns}
                    data={logs}
                  >
                    {({ paginationProps, paginationTableProps }) => {
                      return (
                        <ToolkitProvider
                          keyField={keyField}
                          data={logs}
                          columns={logListColumns}
                          bootstrap4
                          search
                        >
                          {toolkitProps => (
                            <React.Fragment>
                              <Row className="mb-2">
                                <Col sm="4">
                                    <h5>Admins Logs</h5>
                                </Col>

                                <Col sm="8">
                                <div className="text-sm-end">
                                        <Dropdown
                                          isOpen={menu}
                                          toggle={() => setMenu(!menu)}
                                          className="d-inline-block"
                                        >
                                                  <DropdownToggle
                                                    className="font-16 btn-block btn btn-default"
                                                    id="page-header-user-dropdown"
                                                    tag="button"
                                                    style={{
                                                      border: "1px solid gray",
                                                      marginRight: "10px",
                                                    }}
 
                                                  >
                                                    <i className="mdi mdi-filter me-1" />
                                                    <span className="d-none d-xl-inline-block ms-2 me-1">Filter</span>

                                                  </DropdownToggle>
                                                  <DropdownMenu className="dropdown-menu-end">
                                                    <DropdownItem>
                                                    <span>Filter by date</span>
                                                    </DropdownItem>

                                                    <DropdownItem>
                                                    <span>Filter by role</span>
                                                    </DropdownItem>
                                                  
                                                  
                                                  
                                                    <div className="dropdown-divider"/>
                                                  
                                                  </DropdownMenu>
                                             </Dropdown>

                                
                                          <Button
                                          color="default"
                                          className="font-16 btn-block btn btn-default"
                                          onClick={null}
                                          style={{
                                            border: "1px solid gray"
                                          }}
                                        >
                                          <i className="mdi mdi-download me-1" />
                                          Export
                                        </Button>
                             

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
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  userDetails: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
