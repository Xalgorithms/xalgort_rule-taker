import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Button, Segment, List } from 'semantic-ui-react';

import * as actions from '../../actions';
import * as routes from '../../constants/routes';


const Invoices = ({ invoices, history, scheduleInvoice, subscribe }) => {
  const emptyList = (
    <Segment textAlign='center' raised padded>
      No invoices available
    </Segment>
  );

  const invoiceList = (
    <List divided verticalAlign='middle'>
      {
        Object.keys(invoices).map((id) =>
          <List.Item key={ id }>
            <List.Content floated='right'>
              <Button inverted color='blue' onClick={ () => { history.push(`${routes.INVOICE}/${id}`) }}>View</Button>
            </List.Content>
            <List.Content floated='right'>
              <Button inverted color='blue' onClick={ () => { scheduleInvoice(id, invoices[id]) } }>Schedule</Button>
            </List.Content>
            <List.Content floated='right'>
              <Button inverted color='blue'>Subscribe</Button>
            </List.Content>
            <List.Content>
              <List.Header as='a' onClick={  () => { history.push(`${routes.INVOICE}/${id}`) }}>
                { invoices[id].envelope.parties.customer.name } { invoices[id].envelope.parties.supplier.name }, { invoices[id].envelope.parties.supplier.address.city},
                { invoices[id].envelope.parties.supplier.address.country.code.value }
              </List.Header>
              <List.Description>{ moment(invoices[id].envelope.issued).format('l') }</List.Description>
            </List.Content>
          </List.Item>
        )
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
