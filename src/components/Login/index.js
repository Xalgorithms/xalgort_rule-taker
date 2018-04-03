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
