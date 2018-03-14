import moment from 'moment';
import React from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { Button, Segment, List } from 'semantic-ui-react';

import * as routes from '../../constants/routes';


const Invoices = ({ invoices, history }) => {
  if (!isLoaded(invoices)) {
    return (
      <div className="ui segment">
        <p></p>
        <div className="ui active dimmer">
          <div className="ui loader"></div>
        </div>
      </div>
    )
  }

  const emptyList = (
    <Segment textAlign='center' raised padded>
      No invoices available
    </Segment>
  );
  const invoiceList = (
    <List divided verticalAlign='middle'>
      {
        Object.keys(invoices || {}).map((id) =>
          <List.Item key={ id }>
            <List.Content floated='right'>
              <Button inverted color='blue' onClick={  () => { history.push(`${routes.INVOICE}/${id}`) }}>View</Button>
            </List.Content>
            <List.Content>
              <List.Header as='a' onClick={  () => { history.push(`${routes.INVOICE}/${id}`) }}>
                { invoices[id].envelope.buyer_name }
                { invoices[id].envelope.buyer_address }, { invoices[id].envelope.buyer_region}, { invoices[id].envelope.buyer_country }
              </List.Header>
              <List.Description>{ moment(invoices[id].envelope.issue_date).format('l') }</List.Description>
            </List.Content>
          </List.Item>
        )
      }
    </List>
  );

  return isEmpty(invoices) ? emptyList : invoiceList;
}

export default withRouter(Invoices);
