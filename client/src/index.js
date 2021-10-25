import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom"
import './index.css';
import App from './App';
import { UserProvider } from './context/UserProvider.js';
import { CommentProvider } from './context/CommentProvider.js';



ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <CommentProvider>
        <App />
      </CommentProvider>
    </UserProvider>
  </BrowserRouter>, document.getElementById('root')
);

