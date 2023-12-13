import { useEffect, useState } from "react";
import styles from "../styles/Chat.module.css";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";
import {
  PaperAirplaneIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/solid";

const Chat = ({ room, setRoom }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageRef = collection(db, "messages");

  const formatTime = (timestamp) => {
    return timestamp ? timestamp.toDate().toLocaleString() : "";
  };

  useEffect(() => {
    const queryMessages = query(
      messageRef,
      where("room", "==", room),
      orderBy("timeCreated")
    );
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(messageRef, {
      text: newMessage,
      timeCreated: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
  };

  return (
    <div className={styles["chat-app"]}>
      <div className={styles["header-section"]}>
        <button onClick={() => setRoom(null)}>
          <ArrowUturnLeftIcon width={24} height={24} />
        </button>
        <h1 className={styles.header}>Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div className={styles.messages}>
        {messages.map((message) => (
          <div className={styles.message} key={message.id}>
            <div className={styles["message-info"]}>
              <p className={styles.user}>{message.user}</p>
              <p className={styles.time}>{formatTime(message.timeCreated)}</p>
            </div>
            <p className={styles["message-text"]}>{message.text}</p>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSubmit}
        className={styles["new-message-form"]}
        action=""
      >
        <input
          className={styles["new-message-input"]}
          placeholder="Type your message here"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className={styles["send-button"]}>
          <PaperAirplaneIcon width={24} height={20} />
        </button>
      </form>
    </div>
  );
};

export default Chat;
