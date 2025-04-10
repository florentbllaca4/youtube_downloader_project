import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp4');
  const [downloadLink, setDownloadLink] = useState('');

  const handleDownload = async () => {
    try {
      const response = await axios.post('http://localhost:5000/download', {
        url,
        format
      }, { responseType: 'blob' });

      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      setDownloadLink(url);
    } catch (error) {
      alert('Ka ndodhur një gabim gjatë shkarkimit.');
    }
  };

  return (
    <div>
      <h1>Shkarkues YouTube</h1>
      <input
        type="text"
        placeholder="Vendos URL-në"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <select onChange={(e) => setFormat(e.target.value)}>
        <option value="mp4">MP4</option>
        <option value="mp4 (h264)">MP4 (H264)</option>
        <option value="mp3">MP3</option>
      </select>
      <button onClick={handleDownload}>Shkarko</button>
      {downloadLink && (
        <a href={downloadLink} download>
          Kliko këtu për të shkarkuar
        </a>
      )}
    </div>
  );
};

export default App;
