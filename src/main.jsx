import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import { AppProvider } from './context/AppContext.jsx';
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

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
