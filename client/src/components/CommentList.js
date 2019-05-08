import Comment from "./Comment";
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import React from 'react';
import {withStyles} from '@material-ui/core/styles';


const styles = (theme) => ({
    root : {
        width           : '100%',
        maxWidth        : 360,
        backgroundColor : theme.palette.background.paper
    }
});

function CommentList(props) {
    const {classes: {root}, comments} = props;
    const getKey = ({name, message, time}) => `${name} ${message} ${time}`;
    return (
        <List className={root}>
            {comments.map((comment) =>
                <Comment key={getKey(comment)} {...comment} />)}
        </List>
    );
}

CommentList.propTypes = {
    classes  : PropTypes.object.isRequired,
    comments : PropTypes.array.isRequired
};

export default withStyles(styles)(CommentList);