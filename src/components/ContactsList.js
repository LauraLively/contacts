import React, { Component } from 'react';
import SingleContact from './SingleContact';
import styled from 'styled-components';
import NewContact from './NewContact';
import { Navbar, Nav } from 'react-bootstrap';


const styles = {
  ContactsList: {
    padding: '5px',
    margin: '5px',
  },
  header: {
    display: 'flex',
    alignItems: 'center'
  }
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  max-width: 100vw;
  margin: 1rem;
  align-content: flex-start;
  flex-flow: row wrap;
`;

export class ContactsList extends Component {
  state = {
    contacts: []
  }

  getContacts = async () => {
    let data = this.loadContacts();
    let contacts = data.map(contact =>
      <SingleContact key={contact._id}
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
    contact._id = Math.floor(Math.random() * Math.floor(100000));
    let contacts = this.loadContacts();
    contacts.push(contact);
    this.saveContacts(contacts);
    this.getContacts();
  }

  deleteContact = (id) => {
    let contacts = this.loadContacts();
    let updatedContacts = contacts.filter(c => c._id !== id);
    console.log('delete', updatedContacts)
    this.saveContacts(updatedContacts);
    this.getContacts();
  }

  loadContacts = () => {
    return JSON.parse(localStorage.getItem("contactList"));
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
        <div>
          <Navbar sticky="top" style={styles.header} bg="light" expand="lg">
            <Navbar.Brand>Contacts</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
             <Navbar.Collapse className="justify-content-end">
              <Nav >
                <NewContact newContact={this.newContact} />
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
          <Container>
              {this.state.contacts}
          </Container>
      </>
    )
  }
}

export default ContactsList
