
//css import
import './index.css'

// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
//Library import
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import store from './Redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>
   <BrowserRouter>
    <App />
  <Toaster/>
 </BrowserRouter>
</Provider>  
 
)
