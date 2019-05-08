import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";

function CaptionDialog(props){
    const {onClose, captionOpen, updateCaption, initialCaption} = props;
    const [caption, setCaption] = useState('');

    const changeCaption = () => {
        if(caption !== initialCaption && caption.trim().length > 0) {
            updateCaption(caption);
        }
        setCaption('');
    };

    const keyPress = (event) => {
        if (event.key === 'Enter') {
            if (event.shiftKey) {
                setCaption(caption + '\n');
            } else {
                if(caption.length > 0)
                    changeCaption();
            }
            event.preventDefault();
        }
    };

    const handleChange = (event) => setCaption(event.target.value);


    return <Dialog open={captionOpen}
        onClose={onClose}>
        <DialogTitle>
            <Grid container
                direction="row"
                alignItems="center"
                justify="space-between">
                Edit Caption
                <Button onClick={onClose}
                    variant="contained"
                    color="primary"
                    style={{fontSize : "small"}}>
                    <CloseIcon/>
                </Button>
            </Grid>
        </DialogTitle>
        <DialogContent>
            {initialCaption}
        </DialogContent>
        <DialogActions>
            <TextField
                id="caption"
                label="Caption"
                multiline rowsMax="3"
                fullWidth={true}
                value={caption}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                placeholder="Write a caption..."
                onKeyDown={keyPress} />
            <label htmlFor="caption">
                <Button
                    id="captionButton"
                    disabled={caption.trim().length === 0 && caption.trim().length < 256}
                    onClick={changeCaption}
                    variant="contained"
                    color="primary"
                    style={{fontSize : "small"}}>
                        Edit
                </Button>
            </label>
        </DialogActions>
    </Dialog>
}

CaptionDialog.propTypes = {
    onClose        : PropTypes.func.isRequired,
    captionOpen    : PropTypes.bool.isRequired,
    initialCaption : PropTypes.string.isRequired,
    updateCaption  : PropTypes.func.isRequired
};

export default CaptionDialog;