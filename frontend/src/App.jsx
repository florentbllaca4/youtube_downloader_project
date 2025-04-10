import React, { useState } from 'react';
import axios from 'axios';

const api = process.env.REACT_APP_API_URL || "http://localhost:5000";

const App = () => {
  const [url, setUrl] = useState('');
  const [format, setFormat] = useState('mp4');
  const [downloadLink, setDownloadLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleDownload = async () => {
    setLoading(true);
    setErrorMsg('');
    setDownloadLink('');

    try {
      const response = await axios.post(`${api}/download`, {
        url,
        format
      }, { responseType: 'blob' });

      const blob = new Blob([response.data], { type: 'application/octet-stream' });
      const downloadUrl = window.URL.createObjectURL(blob);
      setDownloadLink(downloadUrl);
    } catch (error) {
      console.error(error);
      setErrorMsg('❌ Ka ndodhur një gabim gjatë shkarkimit. Kontrollo linkun ose provo sërish.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', textAlign: 'center', padding: 20 }}>
      <h1>📥 Shkarkues YouTube</h1>
      <input
        type="text"
        placeholder="Vendos URL-në e videos..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <select
        value={format}
        onChange={(e) => setFormat(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      >
        <option value="mp4">MP4</option>
        <option value="mp4 (h264)">MP4 (H264)</option>
        <option value="mp3">MP3</option>
      </select>
      <button
        onClick={handleDownload}
        disabled={loading || !url}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: loading ? '#ccc' : '#007BFF',
          color: 'white',
          border: 'none',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Duke shkarkuar...' : 'Shkarko'}
      </button>

      {errorMsg && (
        <p style={{ color: 'red', marginTop: '10px' }}>{errorMsg}</p>
      )}

      {downloadLink && (
        <a
          href={downloadLink}
          download
          style={{
            display: 'block',
            marginTop: '15px',
            color: '#28a745',
            fontWeight: 'bold'
          }}
        >
          ✅ Kliko këtu për të shkarkuar
        </a>
      )}
    </div>
  );
};

export default App;
