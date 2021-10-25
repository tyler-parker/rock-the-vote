import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom"
import './index.css';
import App from './App';
import { UserProvider } from './context/UserProvider.js';



ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
        <App />
    </UserProvider>
  </BrowserRouter>, document.getElementById('root')
);

