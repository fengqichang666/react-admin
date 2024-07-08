import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './theme/index.css';
import { worker } from './_mock';
import './locales/i18n';
import 'virtual:svg-icons-register';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
worker.start({ onUnhandledRequest: 'bypass' });