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

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';

import withAuthorization from '../Auth/withAuthorization';
import Invoices from '../Invoice/invoices';
import NewInvoice from '../Invoice/newInvoice';

import './index.css';


class Home extends Component {
  render() {
    const { invoices, auth } = this.props;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column floated='right' width={2}>
            <NewInvoice auth={ auth }></NewInvoice>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Invoices invoicePaths={ invoices }></Invoices>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const authCondition = (authUser) => !!authUser;

function mapStateToProps(state) {
  const { firebase: { auth }} = state;
  const { firestore: { data: { users = {} } }} = state;

  const user = users[auth.uid];
  const invoices = user ? user.invoices || [] :  null;

  return { invoices, auth };
}

export default compose(
  withAuthorization(authCondition),
  firestoreConnect((props) => {
    const { auth={} } = props;

    return [
      { collection: 'users', doc: auth.uid },
    ]
  }),
  connect(mapStateToProps),
)(Home);
