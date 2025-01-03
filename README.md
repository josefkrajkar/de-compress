# Compress

A modern web application for text file compression using the LZ77 algorithm. Built with React, TypeScript, and Vite.

## Features

- Simple and intuitive user interface
- Text file compression using LZ77 algorithm
- Instant file download of compressed results
- Modern React hooks and TypeScript implementation
- Responsive design that works on all devices

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
4. The compressed file will be automatically downloaded as `compressed.json`

## Project Structure

```
compress/
├── src/
│   ├── components/      # React components
│   ├── helpers/         # Utility functions
│   ├── styles/         # CSS styles
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── public/             # Static assets
└── package.json        # Project dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
