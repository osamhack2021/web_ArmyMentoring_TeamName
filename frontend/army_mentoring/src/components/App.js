import React, { useState } from "react"
import './App.css';
import Router from "./Router";

import axios from "axios";
import {io} from "socket.io-client";

import { UserContext, SocketContext } from "../context/Context";
import { BACKEND } from "../CONST";


const socket=io(BACKEND.CHATTING_SERVER_BASE_URL);

function App() {
    const [user, setUser] = useState({});

    const token=sessionStorage.getItem('Token');
    axios.defaults.baseURL = BACKEND.DATA_SERVER_BASE_URL;
    if (token){
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    }

    return (
      <SocketContext.Provider value={socket}>
        <UserContext.Provider value={[user, setUser]}>
          <div className="App">
            <Router/>
          </div>
        </UserContext.Provider>
      </SocketContext.Provider>
  );
}

export default App;
