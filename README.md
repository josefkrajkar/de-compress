# Compress

A modern web application for efficient text file compression using a hybrid LZ77 and Huffman coding algorithm. Built with React, TypeScript, and Vite.

## Features

- Simple and intuitive user interface
- Advanced hybrid compression using LZ77 and Huffman coding
- Real-time compression statistics display
- Binary output format for maximum efficiency
- Instant file download of compressed results
- Modern React hooks and TypeScript implementation
- Responsive design that works on all devices

## Compression Algorithm

The application uses a two-stage compression approach:

1. **LZ77 Compression**

   - Sliding window size: 4096 bytes
   - Minimum match length: 3 bytes
   - Maximum match length: 255 bytes
   - Efficient token format for both matches and literals

2. **Huffman Coding**

   - Dynamic Huffman tree generation
   - Binary tree serialization
   - Efficient encoding of match lengths and offsets
   - Single Huffman tree for all symbols

3. **Binary Output Format**
   - 8-byte header containing:
     - Tree size (4 bytes)
     - Original file size (4 bytes)
   - Serialized Huffman tree
   - Compressed data stream

## Tech Stack

- React 18
- TypeScript
- Vite
- CSS Modules
- Husky (pre-commit hooks)
- Prettier (code formatting)
- ESLint (code linting)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- yarn or npm

### Installation

1. Clone the repository

```bash
git clone [your-repo-url]
cd compress
```

2. Install dependencies

```bash
yarn install
# or
npm install
```

3. Start the development server

```bash
yarn dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

## Development

### Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier
- `yarn check-format` - Check code formatting

### Pre-commit Hooks

The project uses Husky to run the following checks before each commit:

- Code formatting check
- Linting
- Type checking
- Build verification

## How to Use

1. Open the application in your web browser
2. Click the "Upload" button to select a text file
3. Once a file is selected, click "Process and download"
4. The compressed file will be automatically downloaded with a `.compressed` extension
5. View the compression statistics displayed on screen:
   - Original file size
   - Compressed size
   - Compression ratio

## Project Structure

```
compress/
├── src/
│   ├── components/     # React components
│   ├── utils/         # Compression algorithms and utilities
│   ├── styles/        # CSS styles
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
└── package.json       # Project dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
