import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import { AppProvider } from './context/AppContext.jsx';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>    
    <Provider store={store}>
      <PrimeReactProvider>
      <AppProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </AppProvider>
      </PrimeReactProvider>
    </Provider>
  </React.StrictMode>
);
