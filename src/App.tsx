import { useState } from 'react';

// Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Utils
import { compressWithDynamicTables } from './utils/compressFunctions';

// Styles
import './App.css';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [stats, setStats] = useState<{ original: number; compressed: number } | null>(null);

  function processFile() {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result;
      if (typeof text !== 'string') return;

      // Compress
      const compressed = compressWithDynamicTables(text);

      // Calculate compressed size (tree + content)
      const treeSize = compressed.huffmanTree.length;
      const contentSize = compressed.compressedContent.length;
      const totalCompressedSize = treeSize + contentSize;

      // Update stats
      setStats({
        original: compressed.originalSize,
        compressed: totalCompressedSize,
      });

      // Create binary blob with header
      const header = new Uint8Array(8);
      // Store tree size in first 4 bytes
      new DataView(header.buffer).setUint32(0, treeSize, true);
      // Store original size in next 4 bytes
      new DataView(header.buffer).setUint32(4, compressed.originalSize, true);

      // Combine all parts
      const treeArray = new Uint8Array(compressed.huffmanTree);
      const contentArray = compressed.compressedContent;

      const finalBlob = new Blob([header, treeArray, contentArray], {
        type: 'application/octet-stream',
      });
      const url = URL.createObjectURL(finalBlob);

      // Download
      const link = document.getElementById('download-link') as HTMLAnchorElement;
      link.href = url;
      link.download = file.name + '.compressed';
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
            onChange={e => {
              setFile(e.target.files?.[0] || null);
              setStats(null);
            }}
          />
          <button onClick={() => document.querySelector('input')?.click()}>Upload</button>
          <button onClick={processFile} disabled={!file} className={!file ? 'disabled' : ''}>
            Process and download
          </button>
          {stats && (
            <div className="stats">
              <p>Original size: {stats.original} bytes</p>
              <p>Compressed size: {stats.compressed} bytes</p>
              <p>Compression ratio: {((stats.compressed / stats.original) * 100).toFixed(1)}%</p>
            </div>
          )}
          <a id="download-link" className="hidden" href={''} download={'compressed'}>
            Download
          </a>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
