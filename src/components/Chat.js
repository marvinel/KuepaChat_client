import { useState, useEffect, useRef } from "react";

import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imgMod from "../assets/insignia.png";

const socket = io("http://localhost:4000");

const Chat = () => {
    const chatRef = useRef(null)
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({});

  const [storedMessages, setstoredMessages] = useState([]);
  const [firstTime, setFirstTime] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem("sessionToken");

    if (!user) {
      navigate("/login");
    } else {
      console.log(typeof user);
      getinfo(user);
    }
  }, [navigate]);

  useEffect(() => {
    const receivedMessage = (message) => {
      setMessages([...messages, message]);
    };

    socket.on("message", receivedMessage);

    return () => {
      socket.off("message", receivedMessage);
    };
  }, [messages]);

  if (!firstTime) {
    console.log("entro aca");
    axios
      .get("http://localhost:4000/api/messages")
      .then((res) => {
        setstoredMessages(res.data.message);
      })
      .catch((err) => console.log(err));

    setFirstTime(true);
  }

  const getinfo = (token) => {
    console.log("este es el token que va a mandar: ", token);
    axios
      .get("http://localhost:4000/api/getuser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data.user);
      })
      .catch((error) => console.log(error));
  };


  const handlerSubmit = (e) => {
    e.preventDefault();
    // if (nickname !== "") {
    console.log(user);
    socket.emit("message", message, user.username, user.userType);
    const newMessage = {
      body: message,
      from: "Yo",
      type: user.userType
    };
    setMessages([...messages, newMessage]);
    chatRef.current?.scrollIntoView({behavior: "smooth"});
    setMessage("");

    //Peticion HTTP por POST para guardar el mensaje

    axios.post("http://localhost:4000/api/save", {
      message,
      from: user.username,
    });
    //  } else {
    //   alert("Para enviar mensaje tiene que establecer nickname");
    //   }
  };

 

  return (


      <div className="App container d-flex">
        <div className="flex-grow-1 mt-3 me-3">
          <div className="card">
            <div className="card-body ">
            <div class="ratio ratio-16x9">
            <iframe
              src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
              title="YouTube video"
              allowfullscreen
            ></iframe>
          </div>
            </div>
          </div>
        </div>
        <div>
          <div className="card mt-3 mb-3 " id="content-chat" >
            <div className="card-body ">
              {storedMessages.map((message, index) => (
                <div
                  key={index}
                  className={`d-flex p-3 ${
                    message.from === user.username
                      ? "justify-content-end"
                      : "justify-content-start"
                  }`}
                >
                  <div
                    className={`card mb-3 border-1 ${
                      message.from === user.username
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
              <small className="text-center text-muted">
                ...mensajes guardados...
              </small>
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
                    className={`card mb-3 border-1 text-muted ${
                      message.from === "Yo"
                        ? "bg-success bg-opacity-25 "
                        : "bg-light "
                    }`}
                  >
                    <div className="card-body text-muted">
                      {message.type === 'moderador' && <img src={imgMod} alt="icono de moderador" width={25} />}
                      <small>
                        <strong> {message.from}:</strong> {message.body}
                      </small>
                    </div>
                  </div>
                </div>
              ))}

   
            </div>
            <div ref={chatRef}/>
          </div>
         

          <div className="card">
            <div className="card-body">
              <h5 className="text-center">CHAT</h5>

              <form onSubmit={handlerSubmit}>
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Mensaje..."
                    id="message"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    name='mensaje'
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
        </div>
      </div>
    
  );
};

export default Chat;