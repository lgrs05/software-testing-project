/* eslint-disable no-console */
import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import axios from "axios";


function ShareDialog(props){
    const {onClose, shareOpen, photoId} = props;
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('Write a username to share with.');

    const sharePhoto = () => {
        if(username !== photoId && username.trim().length > 0) {
            axios.post('/home/share-photo', {
                "photo_id" : photoId,
                "username" : username
            }).then((response) => {
                setMessage(response.data);
                console.log(response);
            }).catch((error) => {
                setMessage(error.data);
            });
        }
        setUsername('');
    };

    useEffect(() => {
        if(!shareOpen)
            setMessage('Write a username to share with.');
    }, [shareOpen]);

    const keyPress = (event) => {
        if (event.key === 'Enter') {
            if (event.shiftKey) {
                //hv
            } else {
                if(username.length > 0)
                    sharePhoto();
            }
            event.preventDefault();
        }
    };

    const handleChange = (event) => setUsername(event.target.value);


    return <Dialog open={shareOpen}
        onClose={onClose}>
        <DialogTitle>
            <Grid container
                direction="row"
                alignItems="center"
                justify="space-between">
                Share Photo
                <Button onClick={onClose}
                    variant="contained"
                    color="primary"
                    style={{fontSize : "small"}}>
                    <CloseIcon/>
                </Button>
            </Grid>
        </DialogTitle>
        <DialogContent>
            {message}
        </DialogContent>
        <DialogActions>
            <TextField
                id="username"
                label="Username"
                fullWidth={true}
                value={username}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                placeholder="Write a username..."
                onKeyDown={keyPress} />
            <label htmlFor="caption">
                <Button
                    id="usernameButton"
                    disabled={username.trim().length === 0 && username.trim().length < 256}
                    onClick={sharePhoto}
                    variant="contained"
                    color="primary"
                    style={{fontSize : "small"}}>
                        Share
                </Button>
            </label>
        </DialogActions>
    </Dialog>
}

ShareDialog.propTypes = {
    onClose   : PropTypes.func.isRequired,
    shareOpen : PropTypes.bool.isRequired,
    photoId   : PropTypes.number.isRequired
};

export default ShareDialog;