import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
import { Segment, Header, List } from 'semantic-ui-react';

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

const Invoice = ({invoice = {}}) => {
  return <Segment>
    <Header size='medium'>{ invoice.title }</Header>
    <List>
      <List.Item>
        <List.Header>Email</List.Header>
        {invoice.email}
      </List.Item>
      <List.Item>
        <List.Header>Timezone</List.Header>
        { invoice.tz }
      </List.Item>
      <List.Item>
        <List.Header>Date</List.Header>
        { invoice.date }
      </List.Item>
      <List.Item>
        <List.Header>Country</List.Header>
        { invoice.country }
      </List.Item>
      <List.Item>
        <List.Header>Region</List.Header>
        { invoice.region }
      </List.Item>
    </List>
  </Segment>
}

export default enhance(Invoice)