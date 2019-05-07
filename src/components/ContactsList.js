import React, { Component } from 'react';
import SingleContact from './SingleContact';
import styled from 'styled-components';
import NewContact from './NewContact';
import { Navbar } from 'react-bootstrap';

const Container = styled.div`
  display: flex;
  margin: 1rem;
  flex-direction: wrap;
  justify-content: center;
`;

const Grid = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: center;
`;

export class ContactsList extends Component {
  state = {
    contacts: []
  }

  getContacts = async () => {
    let data = this.loadContacts();
    let contacts = data.map(contact => <SingleContact key={contact._id}
      contact={contact}
      refresh={this.getContacts}
      updateContact={this.updateContact}
      newContact={this.newContact}
      deleteContact={this.deleteContact} />);
    this.setState({ contacts: contacts });
  };

  updateContact = async (contact) => {
    let contacts = this.loadContacts();
    let pos = contacts.findIndex(c => c._id === contact._id);
    contacts[pos] = contact;
    this.saveContacts(contacts);
    this.getContacts();
  }

  newContact = (contact) => {
    contact._id = Math.random() * (999999 - 100000) + 100000;
    let contacts = this.loadContacts();
    contacts.push(contact);
    this.saveContacts(contacts);
    this.getContacts();
  }

  deleteContact = (id) => {
    let contacts = this.loadContacts();
    let updatedContacts = contacts.filter(c => c._id !== id);
    this.saveContacts(updatedContacts);
    this.getContacts();
  }

  loadContacts = () => {
    var contacts = JSON.parse(localStorage.getItem("contactList"));
    if (contacts === null) {
      contacts = JSON.parse('[{"name":"Sample Contact","email":"sample@test.test","phone":"801-000-0000","_id":100}]');
    }
    return contacts;
  }

  saveContacts = (contactList) => {
    localStorage.setItem("contactList", JSON.stringify(contactList));
  }

  componentDidMount() {
    this.getContacts()
  };

  render() {
    return (
      <>
        <Navbar sticky="top" className="bg-light justify-content-between">
          <Navbar.Brand >My Contacts</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <NewContact newContact={this.newContact} />
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <Container>
          <Grid container>{this.state.contacts}</Grid>
        </Container>
      </>
    )
  }
}

export default ContactsList
