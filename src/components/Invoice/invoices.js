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

import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Button, Segment, List } from 'semantic-ui-react';

import * as actions from '../../actions';
import * as routes from '../../constants/routes';
import * as topics from '../../constants/topics';

import './invoices.css';


const Invoices = ({ invoices, history, scheduleInvoice, subscribe }) => {
  const emptyList = (
    <Segment textAlign='center' raised padded>
      No invoices available
    </Segment>
  );

  const isScheduled = (id) => {
    return Object.keys(localStorage).reduce((acc, k) => {
      return acc || localStorage[k] === id;
    }, false);
  };

  const getColor = (topic) => {
    if (topic === topics.DOCUMENTS) {
      return 'circle yellow';
    }

    if (topic === topics.EFFECTIVE) {
      return 'circle red';
    }

    if (topic === topics.APPLICABLE) {
      return 'circle green';
    }

    return 'circle red';
  };

  const invoiceList = (
    <List divided verticalAlign='middle'>
      {
        Object.keys(invoices).map((id) =>{
          return (
            <List.Item key={ id }>
              {
                isScheduled(id) ? <List.Content floated='left'>
                  <div className={getColor(invoices[id].topic)}></div>
                </List.Content> : null
              }
              <List.Content floated='right'>
                <Button inverted color='blue' onClick={ () => { history.push(`${routes.INVOICE}/${id}`) }}>View</Button>
              </List.Content>
              {
                isScheduled(id) ? null : <List.Content floated='right'>
                  <Button inverted color='blue' onClick={ () => { scheduleInvoice(id, invoices[id]) } }>Schedule</Button>
                </List.Content>
              }
              <List.Content>
                <List.Header as='a' onClick={ () => { history.push(`${routes.INVOICE}/${id}`) }}>
                  { invoices[id].envelope.parties.customer.name } { invoices[id].envelope.parties.supplier.name }, { invoices[id].envelope.parties.supplier.address.city},
                  { invoices[id].envelope.parties.supplier.address.country.code.value }
                </List.Header>
                <List.Description>{ moment(invoices[id].envelope.issued).format('l') }</List.Description>
              </List.Content>
            </List.Item>
          )
        })
      }
    </List>
  );

  return !Object.keys(invoices).length ? emptyList : invoiceList;
}

function mapStateToProps(state) {
  const { invoices } = state;

  return { invoices };
}

function mapDispatchToProps(dispatch) {
  return {
    getInvoices: (paths = []) => {
      return paths.forEach((p) => {
        dispatch(actions.getInvoice(p.url))
      });
    },
    scheduleInvoice: (id, payload) => dispatch(actions.scheduleInvoice(id, payload)),
    subscribe: () => dispatch(actions.subscribeToTopics()),
    disconnect: () => dispatch(actions.disconnect()),
  };
}

class InvoicesHOC extends Component {
  componentDidMount() {
    const { subscribe, disconnect } = this.props;

    subscribe();

    window.addEventListener("beforeunload", disconnect)
  }

  componentWillUnmount() {
    const { disconnect } = this.props;

    disconnect();

    window.removeEventListener("beforeunload", disconnect)
  }

  componentWillReceiveProps(nextProps) {
    const { getInvoices, invoicePaths } = nextProps;

    if (invoicePaths.length > Object.keys(this.props.invoices).length) {
      getInvoices(invoicePaths);
    }
  }

  render() {
    return <Invoices {...this.props}></Invoices>;
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(InvoicesHOC);
