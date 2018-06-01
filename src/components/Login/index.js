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

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import GoogleButton from 'react-google-button';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Grid } from 'semantic-ui-react';

import * as routes from '../../constants/routes';
import './index.css';

class Login extends Component {
  onAuth = () => {
    const {
      history,
      firebase,
    } = this.props;

    firebase.login({ provider: 'google', type: 'popup' })
      .then(() => {
        history.push(routes.HOME);
      })
      .catch(error => {
        console.log("ERR", error);
      });
  }

  render() {
    return (
      <div className="signin">
        <Grid columns={1} verticalAlign="middle" centered={true}>
          <GoogleButton onClick={this.onAuth}>
            Login With Google
          </GoogleButton>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
}

export default compose(
  firebaseConnect(),
  connect(({ firebase: { auth } }) => ({ auth })),
)(Login)
