import React, { useState } from "react"
import './App.css';
import Router from "./Router";

import axios from "axios";

import {UserContext} from "../context/Context";
import { BACKEND } from "../CONST";

function App() {
    const [user, setUser] = useState({});

    const token=sessionStorage.getItem('Token');
    axios.defaults.baseURL = BACKEND.DATA_SERVER_BASE_URL;
    if (token){
      axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    }

    return (
    <UserContext.Provider value={[user, setUser]}>
      <div className="App">
        <Router/>
      </div>
    </UserContext.Provider>
  );
}

export default App;
