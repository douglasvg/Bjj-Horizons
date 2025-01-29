import React from 'react';
    import { createRoot } from 'react-dom/client';
    import Contact from './components/Contact';
    import './index.css';

    document.title = "BJJ Horizons";

    const rootElement = document.getElementById('root');
    const root = createRoot(rootElement);
    root.render(<Contact />);
