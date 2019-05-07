import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import EditIcon from '@material-ui/icons/Edit';

export class UpdateContact extends Component {
  state = {
    open: false,
    name: this.props.contact.name,
    email: this.props.contact.email,
    phone: this.props.contact.phone,
    _id: this.props.contact._id
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.updateContact(this.state);
  }

  render() {
    return (
      <>
        <EditIcon onClick={this.handleClickOpen} />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.props.contact.name}</DialogTitle>
          <DialogContent>
            <Form onSubmit={this.handleSubmit}>
              <TextField
                autoFocus
                type='text'
                name="name"
                placeholder='Name...'
                value={this.state.name}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                fullWidth
              />
              <TextField
                type='tel'
                name="phone"
                placeholder='Phone...'
                value={this.state.phone}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                fullWidth
              />
              <TextField
                type='email'
                name="email"
                placeholder='Email...'
                value={this.state.email}
                onChange={this.handleChange}
                margin="normal"
                variant="outlined"
                fullWidth
              />
              <Button type="submit" onClick={this.handleClose} refresh={this.props.refresh}>Submit</Button>
              <Button onClick={this.handleClose} >Cancel</Button>
            </Form>
          </DialogContent>
        </Dialog>
      </>
    )
  }
}

export default UpdateContact

const Form = styled.form`
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  color: grey;
  margin: 20px;
`;