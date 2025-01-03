import { useState } from 'react';

// Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Utils
import { lz77Compress } from './helpers/compressFunctions';

// Styles
import './App.css';

function App() {
  const [file, setFile] = useState<File | null>(null);

  function processFile() {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      if (typeof text !== 'string') return;

      // Compress
      const compressed = lz77Compress(text);
      const compressedString = JSON.stringify(compressed);

      // Create downloadable blob
      const blob = new Blob([compressedString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      // Download
      const link = document.getElementById('download-link') as HTMLAnchorElement;
      link.href = url;
      link.click();
    };

    reader.readAsText(file);
  }

  return (
    <>
      <Header />

      <main>
        <div className="wrapper">
          <p>
            {file
              ? 'Click on button below to process and download the result'
              : 'Upload a file to process and download the result'}
          </p>
          <input
            className="hidden"
            type="file"
            onChange={e => setFile(e.target.files?.[0] || null)}
          />
          <button onClick={() => document.querySelector('input')?.click()}>Upload</button>
          <button onClick={processFile} disabled={!file} className={!file ? 'disabled' : ''}>
            Process and download
          </button>
          {file && (
            <a id="download-link" className="hidden" href={''} download={'compressed.json'}>
              Download
            </a>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
