import React, { useEffect, useState, useRef } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";
import "./ChatContainer.css";
import { useParams } from "react-router-dom";

// Imported Icons =======>
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdInsertEmoticon, MdAttachFile } from "react-icons/md";
import { RiSendPlaneFill } from "react-icons/ri";

// Imported Emojis ======>
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

// Imported Firebase ====>
import db from "../../firebase";
import firebase from "firebase";




function ChatContainer({currentUser}) {
  // variable called message and a function called setMessage.
  // The initial value of message is an empty string ('').
  // get to Message from input
  const [message, setMessage] = useState("");

  // Emoji appear in input Message
  const [openEmojiBox, setOpenEmojiBox] = useState(false);

  const { emailID } = useParams();
  // console.log('emailID >>> ' , emailID);

  const [chatUser, setChatUser] = useState({});

  const chatBox = useRef(null);

  // get to all Message
  const [chatMessages, setChatMessages] = useState([]);


  useEffect(() => {
    const getUser = async () => {
      const data = await db
        .collection("user1")
        .doc(emailID)
        .onSnapshot((snapshot) => {
          setChatUser(snapshot.data());
        });
    };

    const getMessages = async () => {
      const data = await db
        .collection("chats")
        .doc(emailID)
        .collection("messages")
        .orderBy("timeStamp", "asc")
        .onSnapshot((snapshot) => {
          let messages = snapshot.docs.map((doc) => doc.data());

          let newMessage = messages.filter(
            (message) =>
              message.senderEmail === (currentUser.email || emailID) ||
              message.receiverEmail === (currentUser.email || emailID)
          );

          setChatMessages(newMessage);
        });
    };
    getUser();
    getMessages();
  }, [emailID]);

  // console.log('messages >>> ', chatMessages);

  useEffect(() => {
    // console.log('chatBox >>> ',chatBox);
    chatBox.current.addEventListener('DOMNodeInserted', (event) => {
      const {currentTarget: target} = event;
      target.scroll({ top: target.scrollHeight, behavior: "smooth"});
    });
  }, [chatMessages]);




  const send = (e) => {
    e.preventDefault()

    if (emailID) {
      let payload = {
        text: message,
        senderEmail: currentUser.email,
        receiverEmail: emailID,
        timeStamp: firebase.firestore.Timestamp.now(),
      };
      // console.log('payload >>> ',payload);

      // sender
      db.collection("chats")
        .doc(currentUser.email)
        .collection("messages")
        .add(payload);

      // reciever
      db.collection("chats").doc(emailID).collection("messages").add(payload);

      // add user to sender
      db.collection("Friendlist")
        .doc(currentUser.email)
        .collection("list")
        .doc(emailID)
        .set({
          email: chatUser.email,
          fullname: chatUser.fullname,
          photoURL: chatUser.photoURL,
          lastMessage: message,
        });

      db.collection("Friendlist")
        .doc(emailID)
        .collection("list")
        .doc(currentUser.email)
        .set({
          email: currentUser.email,
          fullname: currentUser.fullname,
          photoURL: currentUser.photoURL,
          lastMessage: message,
        });

      setMessage("");
    }
  };


  return (
    <div className="chat-container">
      {/* User info */}
      <div className="chat-container-header">
        <div className="chat-user-info">
          <div className="chat-user-img">
            <img src={chatUser?.photoURL} alt="chat-user-img" />
          </div>
          <p>{chatUser?.fullname}</p>
        </div>

        <div className="class-container-header-btn">
          <BiDotsVerticalRounded className="iconReact" />
        </div>
      </div>

      {/* Chatdisplay-container */}
      <div className="chat-display-container" ref={chatBox}>
        {
          chatMessages.map((message) => (
            <ChatMessage
              message = {message.text}
              time = {message.timeStamp}
              sender = {message.senderEmail}
            />
          ))
        }
      </div>

      {/* chatinput */}
      <div className="chat-input">
        {/* btn */}
        {openEmojiBox && (
          <Picker
            data={data}
            onEmojiSelect={(emoji) => setMessage(message + emoji.native)}
          />
        )}

        <div className="chat-input-btn">
          <MdInsertEmoticon
            className="iconReact"
            onClick={() => setOpenEmojiBox(!openEmojiBox)}
          />
          <MdAttachFile className="iconReact" />
        </div>

        {/* input */}
        <form onSubmit={send}>
          <input
            type="text"
            placeholder="Type a Message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </form>

        {/* send btn */}
        <div className="chat-input-send-btn" onClick={send}>
          <RiSendPlaneFill className="iconReact" />
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
