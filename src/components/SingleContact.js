import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import UpdateContact from './UpdateContact';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CloseIcon from '@material-ui/icons/Close';
import DeleteContact from './DeleteContact';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';

const Container = styled.div`
  display: flex;
  margin: 1rem;
  flex-direction: wrap;
  `;

const UpdateButtons = styled.div`
  display: flex-grow;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  align-items: center;
`;

const MoreButton = styled.div`
  display: flex;
  justify-content: flex-end;
  z-index: 1;
  position: relative;
  
`;
const DialogTop = styled.div`
  display:flex;
  justify-content: space-around;
`;

const ContactDetails = styled.div`
  padding: 2rem;
`;



class SingleContact extends Component {
  state = {
    open: false,
    isUpdating: false,
    maxWidth: 'xl',
  }

  toggleUpdate = () => {
    this.setState({ isUpdating: !this.state.isUpdating })
  }

  moreButton = () => (
    <MoreButton>
      <Button onClick={this.toggleUpdate}><MoreHorizIcon /></Button>
    </MoreButton>

  );

  editDelete = () => (
    <UpdateButtons>
      <Button><UpdateContact contact={this.props.contact} refresh={this.props.refresh} closeUpdate={this.toggleUpdate} updateContact={this.props.updateContact} /></Button>
      <Button ><DeleteContact contact={this.props.contact} deleteContact={this.props.deleteContact} /></Button>
      <Button onClick={this.toggleUpdate}><CloseIcon /></Button>
    </UpdateButtons>
  );

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  buttons = () => (
    <div>
      <input type="button" value="Delete" onClick={this.handleDelete} />
      <input type="button" value="Update" onClick={this.toggleUpdate} />
    </div>
  )

  render() {
    const contact = this.props.contact
    return (
      <>
        <Container>
          <Grid item>
            <Card>
              <CardActionArea onClick={this.handleClickOpen}>
                <CardContent style={styles.cardWidth}>
                  <h5>{contact.name}</h5>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Container>
        <Dialog
          maxWidth={this.state.maxWidth}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby={contact.name}
        >
          <ContactDetails>
            <DialogContent>
              <h3>{contact.name}</h3>
              <h5>{contact.email}</h5>
              <h5>{contact.phone}</h5>
            </DialogContent>
            <DialogTop id={contact.name}>
              <MoreButton >
                {this.state.isUpdating ? <this.editDelete /> : <this.moreButton />}
              </MoreButton>
            </DialogTop>

          </ContactDetails>
        </Dialog>
      </>
    )
  }
}

const styles = {
  cardWidth: {
    width: '20vw'
  }
}

export default SingleContact
