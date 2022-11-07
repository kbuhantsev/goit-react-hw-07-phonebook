import React from 'react';
import ReactDOM from 'react-dom/client';
import ToggleColorMode from 'components/ToggleColorMode';
import './index.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { StyledEngineProvider } from '@mui/material/styles';
//
import { Provider } from 'react-redux';
//
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToggleColorMode />
        </PersistGate>
      </Provider>
    </StyledEngineProvider>
  </React.StrictMode>
);
