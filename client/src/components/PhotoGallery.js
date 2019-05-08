/* eslint-disable no-console */
import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CaptionDialog from "./CaptionDialog";
import CommentsDialogContainer from "../containers/CommentsDialogContainer";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Gallery from "react-photo-gallery";
import Lightbox from 'react-images';
import PropTypes from 'prop-types';
import ShareDialog from './ShareDialog';
import {withStyles} from '@material-ui/core/styles';


const styles = (theme) => ({
    button : {
        fontSize : "small"
    }
});

function PhotoGallery(props) {
    const {
        auth,
        photos,
        updateCaption,
        deletePhoto,
        setPhotos,
        isHome,
        reload,
        addToHome
    } = props;
    const [currentImage, setCurrentImage] = useState(0);
    const [lightBoxOpen, setLightBoxOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [photosState, setPhotosState] = useState(photos);
    const [captionOpen, setCaptionOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);

    useEffect(() => {
        setPhotosState(photos);
        console.log("photos:");
        console.log(photos);
    }, [photos]);

    useEffect(() => {
        reload();
    }, [lightBoxOpen]);


    const columns = (containerWidth) => {
        let columns = 1;
        if (containerWidth >= 500) columns = 2;
        if (containerWidth >= 900) columns = 3;
        if (containerWidth >= 1500) columns = 4;
        return columns;
    };

    const gotoNext = () => {
        setCurrentImage(currentImage + 1);
        // setIsAdded(photosState[currentImage].isAdded);
    };

    const gotoPrev = () => {
        setCurrentImage(currentImage - 1);
        // setIsAdded(photosState[currentImage].isAdded);
    };

    const openLightBox = (event, obj) => {
        setCurrentImage(obj.index);
        // setIsAdded(photosState[currentImage].isAdded);
        setLightBoxOpen(true);
    };

    const closeLightBox = () => {
        setCurrentImage(0);
        setLightBoxOpen(false);
    };

    const openComments = () => {
        setLightBoxOpen(false);
        setOpen(true);
    };

    const closeComments = () => {
        setOpen(false);
        setLightBoxOpen(true);
    };

    const openCaption = () => {
        setLightBoxOpen(false);
        setCaptionOpen(true);
    };

    const onCloseCaption = () => {
        setCaptionOpen(false);
        setLightBoxOpen(true);
    };

    const openShare = () => {
        setLightBoxOpen(false);
        setShareOpen(true);
    };

    const onCloseShare = () => {
        setShareOpen(false);
        setLightBoxOpen(true);
    };

    const changeCaption = (newCaption) => {
        updateCaption(photosState[currentImage].owned_photo_id, newCaption);
    };

    const onCloseConfirm = () => {
        setConfirmDelete(false);
        setLightBoxOpen(true);
    };

    const openDeleteConfirm = () => {
        setLightBoxOpen(false);
        setConfirmDelete(true);
    };

    const deleted = () => {
        //const toDelete = currentImage;
        setCurrentImage(0);
        setConfirmDelete(false);
        deletePhoto(photosState[currentImage].id);
    };

    const addHomePhoto = () => {
        const current = photosState
            .filter((image) => image.id === photosState[currentImage].id);
        current.comments = [];
        current.caption = "";
        addToHome(photosState[currentImage], photosState[currentImage].id);
        closeLightBox();
    };

    const controlsStyle = {color : "white"};

    const editCaption =
        <Button onClick={openCaption}
            style={controlsStyle}>
            Edit Caption
        </Button>;

    const deletePhotoButton =
        <Button onClick={openDeleteConfirm}
            style={controlsStyle}>
            Delete
        </Button>;

    const commentsButton =
        <Button onClick={openComments}
            style={controlsStyle}>
            Comments
        </Button>;

    const addToHomeButton = (photosState[currentImage] !== undefined) &&
        photosState[currentImage].is_added < 0 &&
        <Button onClick={addHomePhoto}
            style={controlsStyle}>
            Add To Home
        </Button>;

    const share =
        <Button onClick={openShare}
            style={controlsStyle}>
            Share
        </Button>;

    const controls = () => {
        if(isHome){
            return [share, editCaption, deletePhotoButton, commentsButton];
        } else
            return [addToHomeButton, commentsButton];
    };

    if(photosState.length > 0)
        return (
            <div className="Home" >

                <Gallery crossorigin
                    photos={photosState}
                    columns={columns}
                    onClick={openLightBox} />

                <CommentsDialogContainer
                    currentPhotoId={photosState[currentImage]}
                    id={currentImage}
                    commentss={photosState[currentImage].comments}
                    open={open}
                    handleClose={closeComments}
                    setPhotos={setPhotos}
                    auth={auth}
                />

                <Lightbox crossorigin images={photosState}
                    onClose={closeLightBox}
                    customControls={controls()}
                    preventScroll={false}
                    onClickPrev={gotoPrev}
                    onClickImage={openComments}
                    onClickNext={gotoNext}
                    currentImage={currentImage}
                    isOpen={lightBoxOpen} />

                <CaptionDialog
                    onClose={onCloseCaption}
                    captionOpen={captionOpen}
                    initialCaption={photosState[currentImage].caption
                        .substr(0, photosState[currentImage].caption
                            .indexOf(" |"))}
                    updateCaption={changeCaption} />

                <Dialog  onClose={onCloseConfirm} open={confirmDelete} >
                    <DialogTitle> Delete Photo</DialogTitle>
                    <DialogContent>Delete this Photo?</DialogContent>
                    <DialogActions>
                        <Button onClick={deleted} >
                        Delete
                        </Button>
                        <Button onClick={onCloseConfirm}>
                        Cancel
                        </Button>
                    </DialogActions>
                </Dialog>

                <ShareDialog
                    onClose={onCloseShare}
                    shareOpen={shareOpen}
                    photoId={photosState[currentImage].owned_photo_id}

                />


            </div>
        );
    else
        return <div className="Home">
            No photos.
        </div>


}

PhotoGallery.propTypes = {
    auth          : PropTypes.object,
    photos        : PropTypes.array.isRequired,
    updateCaption : PropTypes.func.isRequired,
    deletePhoto   : PropTypes.func.isRequired,
    setPhotos     : PropTypes.func.isRequired,
    isHome        : PropTypes.bool.isRequired,
    addToHome     : PropTypes.func,
    reload        : PropTypes.func
};

export default withStyles(styles)(PhotoGallery);


