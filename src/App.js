import React, { useEffect } from "react";
import Form from "./components/Form";
import List from "./components/List";
import { useState } from "react";

import "./App.css";
import axios from "axios";

const App = () => {
  const [list , setList] = useState([])
  const [states , setStates] = useState([])
  const fetchData =async ()=>{
    const res = await axios.get(`http://127.0.0.1:8000/address/`).then((res)=>{
    setList(res.data)
  })
   const res2 = await axios.get(`http://127.0.0.1:8000/address/states/`).then((res)=>{
    setStates(res.data)
  })
  
  }
  useEffect(  ()=>{
   
    fetchData()
     
  },[])
  console.log(list)
  return (
    <div className='App'>
      <h1>YDS - Task</h1>

      <Form states={states} fetchData={fetchData}/>

      <div className='divider' />
      <List list={list} states={states} />
    </div>
  );
};

export default App;
