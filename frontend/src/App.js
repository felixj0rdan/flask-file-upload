import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState, Link} from 'react';
import {uploadfile, listfiles} from './helper'

function App() {

  const [file1, setFile] = useState()
  const [files, setFiles] = useState([])
  const [v, setV] = useState(false)
  const selected = (e) => {
    setFile(e.target.files[0])
  }

  const upload = async (e) => {
    e.preventDefault()
    await uploadfile(file1)
  }

  useEffect(() => {
    listfiles()
    .then(data => {
      setFiles(data?.Files)
      console.log(data.Files);
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const view = async (e) => {
    e.preventDefault()
    // console.log(files)
    setV(!v)
  }

  return (
    <div className="App">
      <h1>File Upload</h1>
      <form onSubmit={upload} >
        <input type='file' onChange={selected}></input><br/><br/>
        <button >Submit</button>
      </form>
      <button onClick={view} >VIEW</button><br/>
      {
        v? files.map(file => <a href={file.fileURL} target='_blank' style={{textDecoration:"none"}}>{file.filename}<br/></a>) : (<div>Click to view.</div>)
      }
    </div>
  );
}

export default App;
