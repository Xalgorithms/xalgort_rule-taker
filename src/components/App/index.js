import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { NavLink, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Container, Menu } from 'semantic-ui-react';

import withAuthentication from '../Auth/withAuthentication';
import Home from '../Home';
import Invoice from '../Invoice';
import * as routes from '../../constants/routes';

import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    window.localStorage.clear();
    this.props.history.push({
      pathname: routes.SIGN_IN
    });
  }

  render() {
    return (
      <div>
        <Menu fixed='top'>
          <Container>
            <Menu.Item as={NavLink} active={true} to={routes.HOME} header>
              Xalgo Author
            </Menu.Item>

            <Menu.Menu position='right'>
              <Menu.Item name='logout' onClick={this.handleLogout} />
            </Menu.Menu>
          </Container>
        </Menu>

        <Container style={{ marginTop: '4em' }}>
          <Switch>
            <Route path={routes.HOME} component={ Home } exact />
            <Route path={`${routes.INVOICE}/:id`} component={ Invoice } />
            <Redirect to={routes.HOME} />
          </Switch>
        </Container>
      </div>
    )
  }
}

export default compose(
  withAuthentication,
  withRouter
)(App);
