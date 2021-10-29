import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const endpoint = 'http://localhost:8080/api/file/avatar';

function App() {
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState();

  const upload = async () => {
    try {
      const data = new FormData();
      data.append('avatar', file);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      const res = await axios.post(`${endpoint}`, data, config);

      const fileIdFullPath = res.data.fileNameInServer;
      setFileId(`${fileIdFullPath}`.replace('images/', ''));
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className='App'>
      <h1>Upload file</h1>

      <form action='#'>
        <input
          type='file'
          onChange={(e) => {
            e.preventDefault();
            setFile(e.target.files[0]);
          }}
        />
        <button onClick={upload}>submit</button>
      </form>

      {!!fileId && <img src={`${endpoint}/${fileId}`} alt='' />}
    </div>
  );
}

export default App;
