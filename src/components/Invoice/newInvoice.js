import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import TimezonePicker from 'react-timezone';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './newInvoice.css';


class NewInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      newInvoice: {
        title: '',
        date: moment(),
        tz: 'asia/yerevan',
        country: '',
        region: '',
      },
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateInvoice = this.updateInvoice.bind(this);
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleSubmit = () => {
    const { newInvoice } = this.state;
    const { firebase } = this.props;
    debugger
    // Resolve dates to ISO string
    let invoice = Object.assign(
      {},
      ...Object.keys(newInvoice).map(k => ({
        [k]: newInvoice[k] instanceof moment ? newInvoice[k].toISOString() : newInvoice[k]
      }))
    );

    firebase.push('/documents', invoice);
    this.handleClose();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.updateInvoice(name, value);
  }

  updateInvoice(name, value) {
    this.setState(Object.assign(this.state, {
      newInvoice: {
        ...this.state.newInvoice,
        [name]: value,
      }
    }));
  }

  render() {
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
          <Header as='h3' dividing>Envelope</Header>

          <Form.Input name="title" label='Title' placeholder='' onChange={this.handleInputChange} />

          <Form.Input name="email" label='Email' placeholder='xalgorithms@email.com' onChange={this.handleInputChange} />

          <Form.Group unstackable widths={5}>
            <Form.Field
              label='Timezone'
              control={ TimezonePicker }
              defaultValue={ this.state.newInvoice.tz }
              value={ this.state.newInvoice.tz }
              onChange={ t => this.updateInvoice("tz", t) }
              inputProps={{
                placeholder: 'Select Timezone...',
                name: 'tz',
              }}
            />

            <Form.Field
              name="date"
              label='Date'
              control={ DatePicker }
              onChange={ d => this.updateInvoice("date", d) }
              selected={ this.state.newInvoice.date }
            />
          </Form.Group>

          <Form.Group unstackable widths={5}>
            <Form.Field
              label='Country'
              name='country'
              valueType='short'
              control={ CountryDropdown }
              value={ this.state.newInvoice.country }
              onChange={ c => this.updateInvoice('country', c) }
            />

            <Form.Field
              label='Region'
              name="region"
              countryValueType='short'
              disableWhenEmpty={ true }
              control={RegionDropdown}
              country={ this.state.newInvoice.country }
              value={ this.state.newInvoice.region }
              onChange={ r => this.updateInvoice('region', r) }
            />
          </Form.Group>

          <Button color='green' inverted type='submit' floated='right'>
            <Icon name='checkmark' /> Submit
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  }
}

export default NewInvoice;
