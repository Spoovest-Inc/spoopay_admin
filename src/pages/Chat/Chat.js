import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { isEmpty, map } from "lodash";
import moment from "moment";
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap";
import classnames from "classnames";

import firebase from 'firebase/compat/app'
import { collection, getDoc, getDocs,  doc, query} from "firebase/firestore"; 


//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";
import images from "assets/images";


const firebaseConfig = {
  apiKey: "AIzaSyB-XYZYtlxQDdQL_wjlrLh8zYvDaaCHUT4",
  authDomain: "flipx-1c632.firebaseapp.com",
  databaseURL: "https://flipx-1c632-default-rtdb.firebaseio.com",
  projectId: "flipx-1c632",
  storageBucket: "flipx-1c632.appspot.com",
  messagingSenderId: "532065542231",
  appId: "1:532065542231:web:5f40f3f139e9559f58c312",
  measurementId: "G-M6D35111GZ"
 }


firebase.initializeApp(firebaseConfig);

//redux
import { useSelector, useDispatch } from "react-redux";

const Chat = props => {
  const dispatch = useDispatch();


  const [messages, setMessages] = useState([])

  const [groups, setGroups] = useState("")
  const [contacts, setContacts] = useState("")
 

  const [messageBox, setMessageBox] = useState(null);
  // const Chat_Box_Username2 = "Henry Wells"
  const [currentRoomId, setCurrentRoomId] = useState(1);
  const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("profile")))
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = useState({
    name: "",
    isActive: true,
  });

  const [currentAdmin, setCurrentAdmin] = useState({
    name: loggedInUser.data.name,
    isActive: true,
  });
  const [menu1, setMenu1] = useState(false);
  const [search_Menu, setsearch_Menu] = useState(false);
  const [settings_Menu, setsettings_Menu] = useState(false);
  const [other_Menu, setother_Menu] = useState(false);
  const [activeTab, setactiveTab] = useState("1");
  const [Chat_Box_Username, setChat_Box_Username] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [Chat_Box_User_Status, setChat_Box_User_Status] = useState("online");
  const [curMessage, setcurMessage] = useState("");
  const db = firebase.firestore()
  const [user_id, setUserId] = useState("")

  const chats = [
    {
      "id": "acfcf6ab-956d-4856-bc3f-f894b58d46c3v",
      "uid": 1,
      "firstName": "John",
      "lastName": "Akpan",
      "user_id": "acfcf6ab-956d-4856-bc3f-f894b58d46c3v",
      "status": "active",
      "description": "We are here for you",
      "roomId": "acfcf6ab-956d-4856-bc3f-f894b58d46c3v",
      "image": "https://flipex-files.nyc3.digitaloceanspaces.com/giftcards%2F2022-05-23T19%3A47%3A01.352ZAMAZON.1%205.png"
    },

    {
      "id": "0629f53b-d628-4667-aad0-e36d4f598d19",
      "uid": 1,
      "image": "https://flipex-files.nyc3.digitaloceanspaces.com/giftcards%2F2022-05-27T13%3A24%3A35.783ZEBAY.fw2.png",
      "firstName": "Ubong",
      "lastName": "Eduok",
      "user_id": "0629f53b-d628-4667-aad0-e36d4f598d19",
      "status": "active",
      "roomId": "0629f53b-d628-4667-aad0-e36d4f598d19",
      "description": "Can you sell now?"
    },
  ]
 
  useEffect(() => {
    if (!isEmpty(messages)) scrollToBottom();
  }, [messages]);


  useEffect(async() => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }, [])

  // const toggleNotification = () => {
  //   setnotification_Menu(!notification_Menu)
  // }

  //Toggle Chat Box Menus
  const toggleSearch = () => {
    setsearch_Menu(!search_Menu);
  };

  const toggleSettings = () => {
    setsettings_Menu(!settings_Menu);
  };

  const toggleOther = () => {
    setother_Menu(!other_Menu);
  };

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab);
    }
  };

  const loadCurrentUserMessage = async (user_id) => {
    const chatDocument = db.collection("chat (dev)").doc(user_id);
    const messagesCollection = chatDocument.collection("messages");
     
    // const querySnapshot = await messagesCollection
    // .orderBy("timestamp", "desc")
    // .get();


    const querySnapshot = await messagesCollection.orderBy("timestamp", "desc").get();
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      const messages = []
      const message = doc.data();
      messages.push(message);
      setMessages(messages)
    });

  }

  //Use For Chat Box
  const userChatOpen = async (id, name, status, roomId) => {
    setChat_Box_Username(name);
    setCurrentRoomId(roomId);
    setCurrentUser(name)
    setUserId(roomId)
    // fetch chats by id
    const chatDocument = db.collection("chat (dev)").doc(roomId);
    const messagesCollection = chatDocument.collection("messages");
     
    // const querySnapshot = await messagesCollection
    // .orderBy("timestamp", "desc")
    // .get();


    const querySnapshot = await messagesCollection.orderBy("timestamp", "desc").get();
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
      const messages = []
      const message = doc.data();
      messages.push(message);
      console.log(message)
      setMessages(messages)
    });

  };

  const addMessage = async() => {
    const attachments = []
    const message = {
      text: curMessage,
      admin_id: loggedInUser.data.id ?? null,
      message_id: Math.floor(Math.random() * 100),
      user_id,
      attachments: attachments ?? [],
      timestamp:  new Date()
    };
    const userDocument = db.collection("chat (dev)").doc(user_id);
    const messagesCollection = userDocument.collection("messages");
    await messagesCollection.add(message);
    setcurMessage("");
    loadCurrentUserMessage(user_id)
  };

  const scrollToBottom = () => {
    if (messageBox) {
      messageBox.scrollTop = messageBox.scrollHeight + 1000;
    }
  };

  const onKeyPress = e => {
    const { key, value } = e;
    if (key === "Enter") {
      setcurMessage(value);
      addMessage(currentRoomId, currentUser.name);
    }
  };

  //serach recent user
  const searchUsers = () => {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search-user");
    filter = input.value.toUpperCase();
    ul = document.getElementById("recent-list");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  };

 

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Chat | Flipex Admin</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Admin Chat" breadcrumbItem="Chat" />

          <Row>
            <Col lg="12">
              <div className="d-lg-flex">
                <div className="chat-leftsidebar me-lg-4">
                  <div className="">
                    <div className="py-4 border-bottom">
                      <div className="d-flex">
                        <div className="align-self-center me-3">
                          <img
                            src={images.avatar1}
                            className="avatar-xs rounded-circle"
                            alt=""
                          />
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="font-size-15 mt-0 mb-1">
                            {currentAdmin.name}
                          </h5>
                          <p className="text-muted mb-0">
                            <i className="mdi mdi-circle text-success align-middle me-1" />
                            Active
                          </p>
                        </div>

                     
                      </div>
                    </div>

                    <div className="search-box chat-search-box py-4">
                      <div className="position-relative">
                        <Input
                          onKeyUp={searchUsers}
                          id="search-user"
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                        />
                        <i className="bx bx-search-alt search-icon" />
                      </div>
                    </div>

                    <div className="chat-leftsidebar-nav">
                     
                      <TabContent activeTab={activeTab} className="py-4">
                        <TabPane tabId="1">
                          <div>
                            <h5 className="font-size-14 mb-3">Recent</h5>
                            <ul className="list-unstyled chat-list" id="recent-list">
                              <PerfectScrollbar style={{ height: "410px" }}>
                                {map(chats, chat => (
                                  <li
                                    key={chat.id + chat.status}
                                    className={
                                      currentRoomId === chat.roomId
                                        ? "active"
                                        : ""
                                    }
                                  >
                                    <Link
                                      to="#"
                                      onClick={() => {
                                        userChatOpen(
                                          chat.id,
                                          chat.firstName + " " + chat.lastName,
                                          chat.status,
                                          chat.roomId
                                        );
                                      }}
                                    >
                                      <div className="d-flex">
                                        <div className="align-self-center me-3">
                                          <i
                                            className={
                                              chat.status === "online"
                                                ? "mdi mdi-circle text-success font-size-10"
                                                : chat.status === "intermediate"
                                                  ? "mdi mdi-circle text-warning font-size-10"
                                                  : "mdi mdi-circle font-size-10"
                                            }
                                          />
                                        </div>
                                        <div className="align-self-center me-3">
                                          <img
                                            src={chat.image}
                                            className="rounded-circle avatar-xs"
                                            alt=""
                                          />
                                        </div>

                                        <div className="flex-grow-1 overflow-hidden">
                                          <h5 className="text-truncate font-size-14 mb-1">
                                            {chat.firstName + " " + chat.lastName}
                                          </h5>
                                          <p className="text-truncate mb-0">
                                            {chat.description}
                                          </p>
                                        </div>
                                        <div className="font-size-11">
                                          {chat.time}
                                        </div>
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </PerfectScrollbar>
                            </ul>
                          </div>
                        </TabPane>

                      

                        <TabPane tabId="3">
                          <h5 className="font-size-14 mb-3">Contact</h5>

                          <div>
                            <PerfectScrollbar style={{ height: "410px" }}>
                              {contacts &&
                                contacts.map(contact => (
                                  <div
                                    key={"test_" + contact.category}
                                    className={
                                      contact.category === "A" ? "" : "mt-4"
                                    }
                                  >
                                    <div className="avatar-xs mb-3">
                                      <span className="avatar-title rounded-circle bg-primary bg-soft text-primary">
                                        {contact.category}
                                      </span>
                                    </div>

                                    <ul className="list-unstyled chat-list">
                                      {contact.child.map(array => (
                                        <li key={"test" + array.id}>
                                          <Link
                                            to="#"
                                            onClick={() => {
                                              userChatOpen(
                                                array.id,
                                                array.name,
                                                array.status,
                                                Math.floor(Math.random() * 100)
                                              );
                                            }}
                                          >
                                            <h5 className="font-size-14 mb-0">
                                              {array.name}
                                            </h5>
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                            </PerfectScrollbar>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                  </div>
                </div>
                <div className="w-100 user-chat">
                  <Card>
                    <div className="p-4 border-bottom ">
                      <Row>
                        <Col md="4" xs="9">
                          <h5 className="font-size-15 mb-1">
                            {Chat_Box_Username}
                          </h5>

                          <p className="text-muted mb-0">
                            <i
                              className={
                                Chat_Box_User_Status === "online"
                                  ? "mdi mdi-circle text-success align-middle me-1"
                                  : Chat_Box_User_Status === "intermediate"
                                    ? "mdi mdi-circle text-warning align-middle me-1"
                                    : "mdi mdi-circle align-middle me-1"
                              }
                            />
                            {Chat_Box_User_Status}
                          </p>
                        </Col>
                        <Col md="8" xs="3">
                          <ul className="list-inline user-chat-nav text-end mb-0">
                            <li className="list-inline-item d-none d-sm-inline-block">
                              <Dropdown
                                isOpen={search_Menu}
                                toggle={toggleSearch}
                              >
                                <DropdownToggle className="btn nav-btn" tag="i">
                                  <i className="bx bx-search-alt-2" />
                                </DropdownToggle>
                                <DropdownMenu
                                  className="dropdown-menu-md"
                                >
                                  <Form className="p-3">
                                    <FormGroup className="m-0">
                                      <InputGroup>
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="Search ..."
                                          aria-label="Recipient's username"
                                        />
                                        {/* <InputGroupAddon addonType="append"> */}
                                        <Button color="primary" type="submit">
                                          <i className="mdi mdi-magnify" />
                                        </Button>
                                        {/* </InputGroupAddon> */}
                                      </InputGroup>
                                    </FormGroup>
                                  </Form>
                                </DropdownMenu>
                              </Dropdown>
                            </li>
                          
                          
                          </ul>
                        </Col>
                      </Row>
                    </div>

                    <div>
                      <div className="chat-conversation p-3">
                        <ul className="list-unstyled">
                          <PerfectScrollbar
                            style={{ height: "470px" }}
                            containerRef={ref => setMessageBox(ref)}
                          >
                            <li>
                              <div className="chat-day-title">
                                <span className="title">Today</span>
                              </div>
                            </li>
                           
                          </PerfectScrollbar>
                        </ul>
                      </div>
                      <div className="p-3 chat-input-section">
                        <Row>
                          <Col>
                            <div className="position-relative">
                              <input
                                type="text"
                                value={curMessage}
                                onKeyPress={onKeyPress}
                                onChange={e => setcurMessage(e.target.value)}
                                className="form-control chat-input"
                                placeholder="Enter Message..."
                              />
                              <div className="chat-input-links">
                                <ul className="list-inline mb-0">
                                  <li className="list-inline-item">
                                    <Link to="#">
                                      <i
                                        className="mdi mdi-emoticon-happy-outline"
                                        id="Emojitooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="Emojitooltip"
                                      >
                                        Emojis
                                      </UncontrolledTooltip>
                                    </Link>
                                  </li>
                                  <li className="list-inline-item">
                                    <Link to="#">
                                      <i
                                        className="mdi mdi-file-image-outline"
                                        id="Imagetooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="Imagetooltip"
                                      >
                                        Images
                                      </UncontrolledTooltip>
                                    </Link>
                                  </li>
                                  <li className="list-inline-item">
                                    <Link to="#">
                                      <i
                                        className="mdi mdi-file-document-outline"
                                        id="Filetooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="Filetooltip"
                                      >
                                        Add Files
                                      </UncontrolledTooltip>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </Col>
                          <Col className="col-auto">
                            <Button
                              type="button"
                              color="primary"
                              onClick={() =>
                                addMessage(user_id)
                              }
                              className="btn btn-succcess btn-rounded chat-send w-md "
                            >
                              <span className="d-none d-sm-inline-block me-2">
                                Send
                              </span>{" "}
                              <i className="mdi mdi-send" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

Chat.propTypes = {
  chats: PropTypes.array,
  groups: PropTypes.array,
  contacts: PropTypes.array,
  messages: PropTypes.array,
  onGetChats: PropTypes.func,
  onGetGroups: PropTypes.func,
  onGetContacts: PropTypes.func,
  onGetMessages: PropTypes.func,
  onAddMessage: PropTypes.func,
};

export default Chat;
