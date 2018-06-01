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
import { Segment, Header, List, Table } from 'semantic-ui-react';

import * as actions from '../../actions';

function mapStateToProps(state) {
  const { invoices } = state;

  return { invoices };
}

function mapDispatchToProps(dispatch) {
  return {
    getInvoice: (path) => {
      dispatch(actions.getInvoice(path));
    },
  };
}

const enhance = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
);

const Invoice = ({ invoice, id }) => {
  if (!invoice) {
    return null;
  }

  const { envelope = {}, items = [] } = invoice;

  return <Segment>
    <Header size='medium'>Invoice #{id}</Header>
    <List>
      <List.Item>
        <List.Header>Buyer Address</List.Header>
        { envelope.parties.customer.name }
        <br />
        { envelope.parties.customer.address.street[0] } {envelope.parties.customer.address.number},
        { envelope.parties.customer.address.code }, { envelope.parties.customer.address.city },
        { envelope.parties.customer.address.country.code.value }
      </List.Item>
      <List.Item>
        <List.Header>Seller Address</List.Header>
        { envelope.parties.supplier.name }
        <br />
        { envelope.parties.supplier.address.street[0] } {envelope.parties.supplier.address.number},
        { envelope.parties.supplier.address.code }, { envelope.parties.supplier.address.city },
        { envelope.parties.supplier.address.country.code.value }
      </List.Item>
      <List.Item>
        <List.Header>Issue Date</List.Header>
        { moment(envelope.issued).format('l') }
      </List.Item>
    </List>

    <Table color='green'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Quantity</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {
          items.map((it, index) =>
            <Table.Row key={index}>
              <Table.Cell>{ it.id.value }</Table.Cell>
              <Table.Cell>{ it.pricing.price.value } { it.pricing.price.currency_code }</Table.Cell>
              <Table.Cell>{ it.pricing.quantity.value } { it.pricing.quantity.unit }</Table.Cell>
            </Table.Row>
          )
        }
      </Table.Body>
    </Table>
  </Segment>
};

class InvoiceHOC extends Component {
  componentDidMount(nextProps) {
    const { getInvoice, invoices, match: { params: { id }} } = this.props;
    const path = `/documents/${id}`;

    if (!invoices[id]) {
      getInvoice(path);
    }
  }

  render() {
    const { invoices, match: { params: { id }} } = this.props;
    return <Invoice invoice={ invoices[id] } id={id}></Invoice>;
  }
}

export default enhance(InvoiceHOC);