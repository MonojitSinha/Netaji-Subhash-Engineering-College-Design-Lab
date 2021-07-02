import React, { useState } from "react";
import axios from "axios";

const Form = () => {

  const [Msg, setMsg] = useState({
    email: "",
    msg:'',
    name:''
  });

  const [Data, setData] = useState({
    name: "",
  });

  const inputChanged = (event) => {
    const { name, value } = event.target;
    setData({ ...Data, [name]: value });
  };

  const sendData = (event) => {
    event.preventDefault();
    console.log(Data);
    axios
      .post("http://localhost:5000/form", Data)
      .then((response) => {
        console.log("Response from server: ", response.data);
        setMsg({email:response.data.email, msg: response.data.msg, name:response.data.name})
      })
      .catch((err) => {
        console.error("ERROR: ", err);
      });
    setData({
      name: "",
    });
  };

  return (
    <>
      <h1>Send Email</h1>
      <form onSubmit={sendData}>
        <label>Email:</label>
        <input
          type="text"
          value={Data.name}
          name="name"
          onChange={inputChanged}
        ></input>
        
        <br />
        <button>Send</button>
      </form>
      <div hidden={Msg.email === ''} >{Msg.msg} to ({Msg.name}) {Msg.email}</div>
    </>
  );
};

export default Form;
