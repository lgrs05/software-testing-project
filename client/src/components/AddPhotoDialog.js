/* eslint-disable no-console */
import React, {useState} from 'react';
// import AddIcon from '@material-ui/icons/Add';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';

import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';

//import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


function AddPhotoDialog({addOpen, onClose, addPhoto, auth}){
    const [newPhoto, setNewPhoto] = useState(undefined);
    const [caption, setCaption] = useState("");

    const fileOnChange = (event) => {
        setNewPhoto(event.target.files[0]);
    };

    const closeDialog = () => {
        setCaption("");
        setNewPhoto(undefined);
        onClose();
    };

    const captionOnChange = (event) => {
        setCaption(event.target.value);
    };

    const addNewPhoto = () => {
        const photo = {
            src     : newPhoto,
            caption : caption
        };
        addPhoto(photo);
        closeDialog();
    };

    return (
        <Dialog open={addOpen}
            onClose={closeDialog}>
            <DialogTitle>
                <Grid container
                    direction="row"
                    alignItems="center"
                    justify="space-between">
                    Add Photo
                    <Button onClick={closeDialog}
                        variant="contained"
                        color="primary"
                        style={{fontSize : "small"}}>
                        <CloseIcon/>
                    </Button>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <ValidatorForm autoComplete="off" onSubmit={addNewPhoto}>
                    <Grid container
                        direction="column"
                        alignItems="flex-start"
                        justify="center">
                        <Grid>

                            <Typography inline variant="subtitle1">
                        Select Photo
                            </Typography>
                        </Grid>
                        <input
                            accept="image/*"
                            type='file'
                            onChange={fileOnChange}
                            id="add" />
                        <TextValidator
                            required
                            label="Caption"
                            onChange={captionOnChange}
                            margin="normal"
                            id="caption"
                            type="text"
                            fullWidth
                            value={caption}
                            variant="outlined"
                            validators={['required', 'maxStringLength:255']}
                            errorMessages={[
                                'This field is required',
                                'Caption should have less than 255 characters'
                            ]}
                        />
                    </Grid>
                </ValidatorForm>
            </DialogContent>
            <DialogActions>
                <Button
                    id="upload"
                    disabled={caption.length === 0 || newPhoto === undefined}
                    variant="contained"
                    color="secondary" onClick={addNewPhoto}>Upload</Button>
            </DialogActions>
        </Dialog>
    );
}

AddPhotoDialog.propTypes = {
    addOpen  : PropTypes.bool.isRequired,
    auth     : PropTypes.object,
    onClose  : PropTypes.func.isRequired,
    addPhoto : PropTypes.func.isRequired
};

export default AddPhotoDialog;