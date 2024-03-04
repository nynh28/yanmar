
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import AppRoute from './AppRoute'
import serviceWorker from './serviceWorker';

import createStore from './Redux'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { HashRouter } from 'react-router-dom';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Prompt', 'Poppins:300,400,500,600,700','sans-serif']
  }
});

const { store, persistor } = createStore();
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter>
        <App />
        {/* <AppRoute /> */}
      </HashRouter>
    </PersistGate>
  </Provider>, document.getElementById('root'));
serviceWorker();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

