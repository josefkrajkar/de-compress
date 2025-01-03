import { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <header>
        <h1>De/Compress</h1>
      </header>

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

      <footer>
        <p>
          Made with{' '}
          <a href="https://vitejs.dev/">
            <code>vite</code>
          </a>{' '}
          and{' '}
          <a href="https://reactjs.org/">
            <code>react</code>
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
