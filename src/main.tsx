import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './theme/index.css';
import { worker } from './_mock';
import './locales/i18n';
import 'virtual:svg-icons-register';
import packageJson from '../package.json';
import { StartOptions } from 'msw/browser';

const { MODE } = import.meta.env;
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
let options: StartOptions = { onUnhandledRequest: 'bypass' };
if (MODE == 'product') {
    options.serviceWorker = { url: `${packageJson.homepage}/mockServiceWorker.js` };
}
worker.start(options);