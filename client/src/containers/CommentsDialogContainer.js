/* eslint-disable no-console */
import React, {useEffect, useState} from "react";
import CommentsDialog from "../components/CommentsDialog";
import PropTypes from 'prop-types';
import axios from "axios/index";


function CommentsDialogContainer({id, open, handleClose, setPhotos, auth, currentPhotoId}) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get('/comments/get-comments/' + currentPhotoId.owned_photo_id)
            .then((response) => {
                if (response.status === 200)
                    setComments(response.data);
                //console.log(response);
            })
            .catch((error) => {
                //console.log(error);
                setComments([]);
            });
        // const comments = fetchComments();
        // setComments(comments);
    }, [open]);

    // const fetchComments = () => {
    //     const v = JSON.parse(localStorage.getItem('photos'))
    //     return v[id].comments;
    // };
    const addComment = (comment) => {
        axios.post('/comments/post', comment)
            .then((response) => {
                setComments(response.data);
            });
        // const photos = JSON.parse(localStorage.getItem('photos'));
        // photos[id].comments.push(comment);
        // localStorage.setItem('photos', JSON.stringify(photos));
        // setPhotos(photos);
        // setComments(fetchComments());
    };

    return <CommentsDialog
        comments={comments}
        state={comments}
        id={currentPhotoId.owned_photo_id}
        open={open}
        handleClose={handleClose}
        onComment={addComment}
        auth={auth}
    >
    </CommentsDialog>;
}

CommentsDialogContainer.propTypes = {
    auth           : PropTypes.object,
    handleClose    : PropTypes.func.isRequired,
    id             : PropTypes.number.isRequired,
    open           : PropTypes.bool.isRequired,
    setPhotos      : PropTypes.func.isRequired,
    currentPhotoId : PropTypes.object
};

export default CommentsDialogContainer;


