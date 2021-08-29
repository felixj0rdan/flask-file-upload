import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState, Link} from 'react';
import {uploadfile, listfiles} from './helper'

function App() {

  const [file1, setFile] = useState()
  const [files, setFiles] = useState([])
  const [butt, setButt] = useState(false)
  const [v, setV] = useState(false)
  const selected = (e) => {
    if (e.target.files){
      setFile(e.target.files[0])
      setButt(true)
    }
  }

  const upload = async (e) => {
    // e.preventDefault()
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
      <h1>Upload File</h1>
      <form onSubmit={upload} >
        <input type='file' onChange={selected}></input><br/><br/>
        {
        butt? (<button >Upload<br/></button>)
        : (<button disabled >Upload<br/></button>)
      }
      </form>
      <h1>View Files</h1>
      <button onClick={view} >VIEW</button><br/>
      {
        v? files.map(file => <a href={file.fileURL} target='_blank' style={{textDecoration:"none"}}>{file.filename}<br/></a>) : (<div>Click to view.</div>)
      }
    </div>
  );
}

export default App;
