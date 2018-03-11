import React, { Component } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import withAuthorization from '../Auth/withAuthorization';
import Invoices from '../Invoice/invoices';
import NewInvoice from '../Invoice/newInvoice';
import { Grid } from 'semantic-ui-react';

import './index.css';


class Home extends Component {
  render() {
    const { documents, firebase } = this.props;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column floated='right' width={2}>
            <NewInvoice firebase={ firebase }></NewInvoice>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Invoices invoices={ documents }></Invoices>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  firebaseConnect([
    { path: '/documents' }
  ]),
  connect(({ firebase: { data: { documents } } }) => ({
    documents
  }))
)(Home)
