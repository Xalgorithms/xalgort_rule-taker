import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

import withAuthentication from '../Auth/withAuthentication';
import Home from '../Home';
import Invoice from '../Invoice';
import * as routes from '../../constants/routes';

import './index.css';

const App = () => (
  <div>
    <Menu fixed='top'>
      <Container>
        <Menu.Item as={NavLink} active={true} to={routes.HOME} header>
          Xalgo Author
        </Menu.Item>
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
);

export default withAuthentication(App);
