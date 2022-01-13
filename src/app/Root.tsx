import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../state/store';
import App from './App';

export function Root() {
  return (
    <React.StrictMode>
      <Provider store={store}>
      <App />
      </Provider>
      </React.StrictMode>
  )
}