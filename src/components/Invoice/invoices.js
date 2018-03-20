import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Button, Segment, List } from 'semantic-ui-react';

import * as actions from '../../actions';
import * as routes from '../../constants/routes';


const Invoices = ({ invoices = [], history }) => {
  if (!invoices.length) {
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
        invoices.map((invoice, i) =>
          <List.Item key={ i }>
            <List.Content floated='right'>
              <Button inverted color='blue' onClick={  () => { history.push(`${routes.INVOICE}/${i}`) }}>View</Button>
            </List.Content>
            <List.Content>
              <List.Header as='a' onClick={  () => { history.push(`${routes.INVOICE}/${i}`) }}>
                { invoice.envelope.parties.customer.name }
                { invoice.envelope.parties.supplier.name }, { invoice.envelope.parties.supplier.address.city},
                { invoice.envelope.parties.supplier.address.country.code.value }
              </List.Header>
              <List.Description>{ moment(invoice.envelope.issued).format('l') }</List.Description>
            </List.Content>
          </List.Item>
        )
      }
    </List>
  );

  return !invoices.length ? emptyList : invoiceList;
}

function mapStateToProps(state) {
  const { invoice: {invoices} } = state;

  return { invoices };
}

function mapDispatchToProps(dispatch) {
  return {
    getInvoices: (paths = []) => {
      return paths.forEach((p) => {
        dispatch(actions.getInvoice(p))
      });
    },
  };
}

class InvoicesHOC extends Component {
  componentWillReceiveProps(nextProps) {
    const { getInvoices, invoicePaths } = nextProps;

    if (invoicePaths.length > this.props.invoices.length) {
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
