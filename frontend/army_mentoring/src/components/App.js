import React, { useState } from "react"
import './App.css';
import Router from "./Router";

import axios from "axios";

import {UserContext} from "../context/Context";
import { BACKEND } from "../CONST";

function App() {
    const [user, setUser] = useState({});

    axios.defaults.baseURL = BACKEND.DATA_SERVER_BASE_URL;
    axios.defaults.headers.common['Authorization'] = `Token ${sessionStorage.getItem('Token')}`;

    return (
    <UserContext.Provider value={[user, setUser]}>
      <div className="App">
        <Router/>
      </div>
    </UserContext.Provider>
  );
}

export default App;
