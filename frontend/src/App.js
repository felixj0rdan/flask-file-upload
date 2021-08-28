import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import {uploadfile} from './helper'

function App() {

  const [file1, setFile] = useState()

  const selected = (e) => {
    setFile(e.target.files[0])
  }

  const upload = async (e) => {
    e.preventDefault()
    // console.log(file1);
    // if (e.target.files)
      // console.log(true)

    await uploadfile(file1)
    // // .then()
  }
  return (
    <div className="App">
      <h1>File Upload</h1>
      <form onSubmit={upload} >
        <input type='file' onChange={selected}></input><br/><br/>
        <button >Submit</button>
      </form>
    </div>
  );
}

export default App;
