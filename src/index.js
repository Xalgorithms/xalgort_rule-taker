import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';

import App from './components/App';
import Login from './components/Login';
import registerServiceWorker from './registerServiceWorker';
import { configureStore } from './store';
import * as routes from './constants/routes';

import './index.css';
import 'semantic-ui-css/semantic.min.css';

const store = configureStore();

ReactDOM.render(
  (
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path={routes.SIGN_IN} component={ Login } />
          <Route path={routes.HOME} component={ App } />
        </Switch>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root'),
);
registerServiceWorker();
