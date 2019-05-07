import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import DeleteIcon from '@material-ui/icons/Delete';

const Form = styled.form`
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  color: grey;
  margin: 20px;
`;

export default class DeleteModal extends React.Component {
  state = {
    open: false,
    name: this.props.contact.name,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDelete =  () => {
    this.props.deleteContact(this.props.contact._id);

  };

  render() {
    return (
      <>
        <DeleteIcon onClick={this.handleClickOpen} />
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.state.name}</DialogTitle>
          <DialogContent>
            <Form onSubmit={this.handleDelete}>
              <h5>Are you sure you want to delete this Contact?</h5>
              <Button type="submit" onClick={this.handleClose}>Delete</Button>
            </Form>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}