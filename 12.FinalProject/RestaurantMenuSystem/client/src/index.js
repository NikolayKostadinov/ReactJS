import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';

// add bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

// add custom bootstrap theme
import './assets/css/style.css';

import './index.css';
import App from './App';
import ErrorBoundary from "./components/error/ErrorBoundary.js";

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ErrorBoundary>
            <App/>
        </ErrorBoundary>
    </BrowserRouter>
);

reportWebVitals();
