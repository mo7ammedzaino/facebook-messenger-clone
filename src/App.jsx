import "./css/App.css";
import { useEffect, useState } from "react";
import { IconButton, FormControl, Input } from "@mui/material";
import { Send } from "@material-ui/icons";
import Message from "./components/Message";
import {
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { messagesCol } from "./firebase";
import FlipMove from "react-flip-move";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    onSnapshot(query(messagesCol, orderBy("timestamp")), (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMessages(docs);
    });

    getUsername();
  }, []);

  useEffect(() => {
    document
      .getElementById("messages-container")
      .scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getUsername = () => {
    const username = prompt("Please enter your name").trim();

    if (username) {
      setUsername(username);
    } else {
      getUsername();
    }
  };

  const handleSendMessage = async (e) => {
    try {
      e.preventDefault();

      const newMessage = {
        text: input,
        username,
        timestamp: serverTimestamp(),
      };

      await addDoc(messagesCol, newMessage);
    } catch (error) {
      // console.error("Error adding document: ", error);
    } finally {
      setInput("");
    }
  };

  return (
    <div className="app">
      <img className="app__logo" src="images/logo.png" alt="Messenger logo" />
      <h1>Welcome {username}</h1>
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            placeholder="Enter a message..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            disabled={!input || !username}
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSendMessage}
          >
            <Send />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove className="messages-container" id="messages-container">
        {messages.map((message) => (
          <Message key={message.id} message={message} username={username} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
