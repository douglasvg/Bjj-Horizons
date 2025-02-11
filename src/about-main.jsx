import React from 'react';
    import { createRoot } from 'react-dom/client';
    import About from './components/About';
    import './index.css';

    document.title = "BJJ Horizons";

    const rootElement = document.getElementById('root');
    const root = createRoot(rootElement);
    root.render(<About />);
