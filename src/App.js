import "./App.css";

import { useState, useEffect } from "react";

import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000");

function App() {
  const [nickname, setNickname] = useState("");
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [messages, setMessages] = useState([]);

  const [storedMessages, setstoredMessages] = useState([]);
  const [firstTime, setFirstTime] = useState(false);

  useEffect(() => {
    const receivedMessage = (message) => {
      setMessages([message, ...messages]);
    };

    socket.on("message", receivedMessage);

    return () => {
      socket.off("message", receivedMessage);
    };
  }, [messages]);

  if (!firstTime) {
    console.log("entro aca")
    axios.get("http://localhost:4000/api/messages")
    .then((res) => {
      setstoredMessages(res.data.message);
    })
    .catch(err=> console.log(err));

    setFirstTime(true);
  }

  const nicknameSubmit = (e) => {
    e.preventDefault();
    setNickname(nickname);
    setDisabled(true);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (nickname !== "") {
      socket.emit("message", message, nickname);
      const newMessage = {
        body: message,
        from: "Yo",
      };
      setMessages([newMessage, ...messages]);
      setMessage("");

      //Peticion HTTP por POST para guardar el mensaje

      axios.post("http://localhost:4000/api/save", {
        message,
        from: nickname,
      });
    } else {
      alert("Para enviar mensaje tiene que establecer nickname");
    }
  };
  return (
    <div className="App">
      <div className="container mt-3">
        <div className="card">
          <div className="card-body">
            <h5 className="text-center">CHAT</h5>
            <form onSubmit={nicknameSubmit}>
              <div className="d-flex mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nickname..."
                  id="nickname"
                  onChange={(e) => setNickname(e.target.value)}
                  disabled={disabled}
                />
                <button
                  className="btn btn-success mx-3"
                  type="submit"
                  id="btn-nickname"
                >
                  Establecer
                </button>
              </div>
            </form>

            <form onSubmit={handlerSubmit}>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mensaje..."
                  id="message"
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                />
                <button
                  className="btn btn-success mx-3"
                  type="submit"
                  id="btn-message"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="card mt-3 mb-3" id="content-chat">
          <div className="card-body">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`d-flex p-3 ${
                  message.from === "Yo"
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div
                  className={`card mb-3 border-1 ${
                    message.from === "Yo"
                      ? "bg-success bg-opacity-25 "
                      : "bg-light "
                  }`}
                >
                  <div className="card-body">
                    <small>
                      {message.from}: {message.body}
                    </small>
                  </div>
                </div>
              </div>
            ))}

<small className="text-center text-muted">...mensajes guardados...</small>
        {storedMessages.map((message, index) => (
              <div
                key={index}
                className={`d-flex p-3 ${
                  message.from === nickname
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div
                  className={`card mb-3 border-1 ${
                    message.from === nickname
                      ? "bg-success bg-opacity-25 "
                      : "bg-light "
                  }`}
                >
                  <div className="card-body">
                    <small>
                      {message.from}: {message.message}
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
        
      </div>
    </div>
  );
}

export default App;
