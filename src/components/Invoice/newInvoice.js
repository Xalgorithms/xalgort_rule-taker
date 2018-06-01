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
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { Button, Header, Icon, Modal, Form, Grid } from 'semantic-ui-react';

import * as actions from '../../actions';

import 'react-datepicker/dist/react-datepicker.css';
import "react-table/react-table.css";
import './newInvoice.css';


class NewInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      invoice: {
        envelope: {
          buyer_name: '',
          buyer_street: '',
          buyer_building: '',
          buyer_country: '',
          buyer_region: '',
          buyer_postal_code: '',
          seller_name: '',
          seller_street: '',
          seller_building: '',
          seller_country: '',
          seller_region: '',
          seller_postal_code: '',
          issue_date: moment(),
          start_date: moment(),
          end_date: moment(),
        },
        items: [{description: 'Some description', price: 3000, quantity: 2}],
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateEnvelope = this.updateEnvelope.bind(this);
    this.renderEditable = this.renderEditable.bind(this);
    this.renderEditableNumber = this.renderEditableNumber.bind(this);
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleSubmit = () => {
    const { invoice } = this.state;
    const { auth: { uid }, addInvoice } = this.props;

    const envelope = Object.assign({}, ...Object.keys(invoice.envelope).map(k => ({
      [k]: invoice.envelope[k] instanceof moment ? invoice.envelope[k].toISOString() : invoice.envelope[k]
    })))

    // Resolve dates to ISO string
    let newInvoice = Object.assign(
      invoice,
      { envelope },
    );

    addInvoice(newInvoice, uid);
    this.handleClose();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.updateEnvelope(name, value);
  }

  updateEnvelope(name, value) {
    this.setState(Object.assign(this.state, {
      invoice: {
        ...this.state.invoice,
        envelope: {
          ...this.state.invoice.envelope,
          [name]: value,
        }
      }
    }));
  }

  renderEditable(cellInfo) {
    return (
      <div
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const items = [...this.state.invoice.items];
          items[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ invoice: { items } });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.invoice.items[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  renderEditableNumber(cellInfo) {
    return (
      <input
        type="number"
        name="quantity"
        min="1"
        onBlur={e => {
          const items = [...this.state.invoice.items];
          items[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ invoice: { items } });
        }}
      />
    );
  }

  render() {
    const { envelope, items } = this.state.invoice;

    return <Modal
      trigger={<Button onClick={this.handleOpen} inverted color='green'>Create Invoice</Button>}
      closeOnDimmerClick={false}
      closeIcon={ true }
      open={this.state.modalOpen}
      basic
      size='fullscreen'
      onClose={this.handleClose}
    >
      <Header icon='browser' content='Invoice form' />
      <Modal.Content>
        <Form onSubmit={this.handleSubmit}>
          <Grid columns='2' divided>
            <Grid.Row>
              <Grid.Column>
                <Header as='h3' dividing>Buyer</Header>
                <Form.Input name="buyer_name" label='' placeholder='Company name' onChange={this.handleInputChange} />
                <Form.Group unstackable widths={5}>
                  <Form.Input name="buyer_street" label='' placeholder='Street name' onChange={this.handleInputChange} />
                  <Form.Input name="buyer_building" label='' placeholder='Building N' onChange={this.handleInputChange} />
                  <Form.Input name="buyer_postal_code" label='' placeholder='Postal code' onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group unstackable widths={5}>
                  <Form.Field
                    label=''
                    name='buyer_country'
                    valueType='short'
                    control={ CountryDropdown }
                    value={ envelope.buyer_country }
                    classes="selector"
                    onChange={ c => this.updateEnvelope('buyer_country', c) }
                  />

                  <Form.Field
                    label=''
                    name="buyer_region"
                    countryValueType='short'
                    disableWhenEmpty={ true }
                    control={ RegionDropdown }
                    country={ envelope.buyer_country }
                    value={ envelope.buyer_region }
                    classes="selector"
                    onChange={ r => this.updateEnvelope('buyer_region', r) }
                  />
                </Form.Group>

                <Header as='h3' dividing>Seller</Header>
                <Form.Input name="seller_name" label='' placeholder='Company name' onChange={this.handleInputChange} />
                <Form.Group unstackable widths={5}>
                  <Form.Input name="seller_street" label='' placeholder='Street name' onChange={this.handleInputChange} />
                  <Form.Input name="seller_building" label='' placeholder='Building N' onChange={this.handleInputChange} />
                  <Form.Input name="seller_postal_code" label='' placeholder='Postal code' onChange={this.handleInputChange} />
                </Form.Group>
                <Form.Group unstackable widths={5}>
                  <Form.Field
                    label=''
                    name='seller_country'
                    valueType='short'
                    control={ CountryDropdown }
                    value={ envelope.seller_country }
                    classes="selector"
                    onChange={ c => this.updateEnvelope('seller_country', c) }
                  />

                  <Form.Field
                    label=''
                    name="seller_region"
                    countryValueType='short'
                    disableWhenEmpty={ true }
                    control={RegionDropdown}
                    country={ envelope.seller_country }
                    value={ envelope.seller_region }
                    classes="selector"
                    onChange={ r => this.updateEnvelope('seller_region', r) }
                  />
                </Form.Group>
              </Grid.Column>
              <Grid.Column>
                <Header as='h3' dividing>Invoice details</Header>
                <Form.Field
                  name="issue_date"
                  label='Issue Date'
                  control={ DatePicker }
                  onChange={ d => this.updateEnvelope("issue_date", d) }
                  selected={ envelope.issue_date }
                />

                <Form.Group unstackable widths={5}>
                  <Form.Field
                    name="start_date"
                    label='Start Date'
                    control={ DatePicker }
                    onChange={ d => this.updateEnvelope("start_date", d) }
                    selected={ envelope.start_date }
                  />

                  <Form.Field
                    name="end_date"
                    label='Date'
                    control={ DatePicker }
                    onChange={ d => this.updateEnvelope("end_date", d) }
                    selected={ envelope.end_date }
                  />
                </Form.Group>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header as='h3' dividing>Items</Header>
                <ReactTable
                  showPagination={false}
                  style={{width: '100%'}}
                  data={items}
                  columns={[
                    {
                      Header: "Description",
                      accessor: "description",
                      Cell: this.renderEditable
                    },
                    {
                      Header: "Price",
                      accessor: "price",
                      Cell: this.renderEditable
                    },
                    {
                      Header: "Quantity",
                      accessor: "quantity",
                      Cell: this.renderEditableNumber
                    }
                  ]}
                  defaultPageSize={1}
                  className="-striped -highlight"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Button color='green' inverted type='submit' floated='right'>
            <Icon name='checkmark' /> Submit
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addInvoice: (invoice, uid) => dispatch(actions.addInvoice(invoice, uid))
  }
}

export default connect(null, mapDispatchToProps)(NewInvoice);
