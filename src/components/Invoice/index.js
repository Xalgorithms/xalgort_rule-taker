import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Segment, Header, List, Table } from 'semantic-ui-react';

const enhance = compose(
  firebaseConnect((props) => {
    return [
      { path: `documents/${props.match.params.id}` },
    ]
  }),
  connect(({ firebase }, props) => {
    const docs = firebase.data.documents || {};
    return {
      invoice: docs[props.match.params.id],
    }
  })
)

const Invoice = ({invoice = {}, match}) => {
  const { envelope = {}, items = [] } = invoice;

  return <Segment>
    <Header size='medium'>Invoice #{match.params.id}</Header>
    <List>
      <List.Item>
        <List.Header>Buyer Address</List.Header>
        { envelope.buyer_address }, { envelope.buyer_region }, { envelope.buyer_country }
      </List.Item>
      <List.Item>
        <List.Header>Seller Address</List.Header>
        { envelope.seller_address }, { envelope.seller_region }, { envelope.seller_country }
      </List.Item>
      <List.Item>
        <List.Header>Issue Date</List.Header>
        { envelope.issue_date }
      </List.Item>
      <List.Item>
        <List.Header>Invoice period</List.Header>
        { envelope.start_date } - { envelope.end_date }
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
              <Table.Cell>{ it.description }</Table.Cell>
              <Table.Cell>{ it.price }</Table.Cell>
              <Table.Cell>{ it.quantity }</Table.Cell>
            </Table.Row>
          )
        }
      </Table.Body>
    </Table>
  </Segment>
}

export default enhance(Invoice)