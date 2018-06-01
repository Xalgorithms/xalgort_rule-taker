// Copyright 2018 Hayk Pilosyan <hayk.pilos@gmail.com>
// Copyright 2018 Don Kelly <karfai@gmail.com>

// This file is part of Lichen, a functional component of an
// Internet of Rules (IoR).

// ACKNOWLEDGEMENTS
// Funds: Xalgorithms Foundation
// Collaborators: Don Kelly, Joseph Potvin and Bill Olders.

// Licensed under the Apache License, Version 2.0 (the "License"); you
// may not use this file except in compliance with the License. You may
// obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
// implied. See the License for the specific language governing
// permissions and limitations under the License.

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
