/* eslint-disable no-console */
import React, {useEffect, useState} from "react";
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import CommentList from "./CommentList";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";
import {withStyles} from '@material-ui/core/styles';


const styles = (theme) => ({
    paper : {
        position        : 'absolute',
        width           : theme.spacing.unit * 50,
        backgroundColor : theme.palette.background.paper,
        boxShadow       : theme.shadows[5],
        padding         : theme.spacing.unit * 4,
        outline         : 'none'
    },
    button : {
        fontSize : "small",
        margin   : theme.spacing.unit
    }
});


function CommentsDialog(props) {

    const {classes, comments, handleClose, id, open, onComment, auth} = props;
    const [message, setMessage] = useState('');
    const [commentsState, setComments] = useState(comments);
    const [name, setName] = useState("");

    useEffect(() => {
        if(auth !== undefined)
            setName(auth.first + " " + auth.last);
    }, [auth]);

    useEffect(() => {
        setComments(comments);
        // console.log(comments);
    }, [comments]);

    const time = new Date().toLocaleString();

    const addComment = () => {
        if(message.trim().length > 0)
            onComment({
                id,
                name,
                message,
                time
            });
        setMessage('');
    };

    const keyPress = (event) => {
        if (event.key === 'Enter') {
            if (event.shiftKey) {
                setMessage(message + '\n');
            } else {
                if(message.length > 0)
                    addComment();
            }
            event.preventDefault();
        }
    };
    
    const handleChange = (event) => setMessage(event.target.value);
    return (
        <Dialog
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
            scroll="paper">
            <DialogTitle>
                <Grid container
                    direction="row"
                    alignItems="center"
                    justify="space-between">
                Comments

                    <Button onClick={handleClose}
                        variant="contained"
                        color="primary"
                        className={classes.button}>
                        <CloseIcon/>
                    </Button>
                </Grid>

            </DialogTitle>
            <DialogContent>
                {commentsState.length > 0 &&
                <CommentList id={id} comments={commentsState} />}
                {commentsState.length === 0 &&
                <p>There are no comments.</p>}

            </DialogContent>
            <DialogActions id='actions'>
                <TextField
                    id="comment"
                    label="Comment"
                    multiline rowsMax="3"
                    fullWidth={true}
                    value={message}
                    onChange={handleChange}
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    placeholder="Write a comment..."
                    onKeyDown={keyPress} />
                <label htmlFor="comment">
                    <Button
                        id="post"
                        disabled={message.length === 0}
                        onClick={addComment}
                        variant="contained"
                        color="primary"
                        className={classes.button}>
                        Post
                    </Button>
                </label>
            </DialogActions>
        </Dialog>);
}

CommentsDialog.propTypes = {
    auth        : PropTypes.object,
    classes     : PropTypes.object.isRequired,
    comments    : PropTypes.array.isRequired,
    handleClose : PropTypes.func.isRequired,
    id          : PropTypes.number.isRequired,
    open        : PropTypes.bool.isRequired,
    onComment   : PropTypes.func.isRequired
};

export default withStyles(styles)(CommentsDialog);