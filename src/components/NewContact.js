import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class NewCard extends Component {
    state = {
        open: false,
        name: '',
        email: '',
        phone: ''
        };
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = async (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSubmit = async (event) => {
      event.preventDefault();
      this.props.newContact(this.state);
  };

    render() {
        return (
            <div>
                <Button style={styles.button} onClick={this.handleClickOpen}> 
                    New Contact
                </Button>
                <Dialog  {...this.props}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title">
                    <form onSubmit={this.handleSubmit}>

                        <DialogTitle id="form-dialog-title">{this.state.name}</DialogTitle>
                        <DialogContent>
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
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} >
                                Cancel
                            </Button>
                            <Button type="submit" onClick={this.handleClose} >
                                Save
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        )
    }
};

const styles = {
    button: {
        width: "100%",
    },
};

export default NewCard;