import { useState } from 'react';

// Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Styles
import './App.css';

function App() {
  const [file, setFile] = useState<File | null>(null);

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
          <button disabled={!file} className={!file ? 'disabled' : ''}>
            Process and download
          </button>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
