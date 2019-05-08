import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from 'prop-types';
import React from "react";
import Typography from "@material-ui/core/Typography";

const avatarSrc = "https://source.unsplash.com/2ShvY8Lf6l0/800x599";

function Comment({name, message, time}) {
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={name} src= {avatarSrc} />
            </ListItemAvatar>
            <ListItemText
                primary={name}
                secondary={
                    <React.Fragment>
                        <Typography component="span" inline color="textPrimary">
                            {message}
                        </Typography>
                        <br />{time}
                    </React.Fragment>
                }
            />
        </ListItem>
    );
}


Comment.propTypes = {
    name    : PropTypes.string.isRequired,
    message : PropTypes.string.isRequired,
    time    : PropTypes.string.isRequired
};


export default (Comment);