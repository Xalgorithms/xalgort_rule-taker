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

  return { invoices: user && user.invoices, auth };
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
