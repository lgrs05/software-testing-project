/* eslint-disable no-console,camelcase */
import React, {useEffect, useState} from "react";
import PhotoGallery from "../components/PhotoGallery";
import PropTypes from "prop-types";
import axios from "axios/index";


function SharedWithMeContainer({auth}) {

    const [photos, setPhotos] = useState([]);

    // const text = "You have to be a registered user to see this page";

    useEffect(() => {
        axios.get('/shared_with_me/get-shared')
            .then((response) => {
                setPhotos(response.data);
            })
            .catch((error) => {
                console.log(error);
                setPhotos([]);
            });
    }, []);

    const reload = () => {
        axios.get('/shared_with_me/get-shared')
            .then((response) => {
                setPhotos(response.data);
            })
            .catch((error) => {
                console.log(error);
                setPhotos([]);
            });
    };


    const addToHome = (photo, id) => {
        const homePhotos = JSON.parse(localStorage.getItem("photos"));
        const filter = homePhotos.filter((image) => image.lastKey === id);
        if(filter.length === 0) {

            const {src, width, height, caption} = photos
                .filter((image) => image.id === id)[0];
            const current = {
                key      : homePhotos.length,
                lastKey  : id,
                src      : src,
                width    : width,
                height   : height,
                caption  : caption.substr(caption.indexOf(" |")),
                comments : []
            };
            homePhotos.push(current);
            localStorage.setItem("photos", JSON.stringify(homePhotos));
            console.log(photo);
            console.log("shared_id: " + photo.shared_id);

            // const newShared = photos.concat([]);
            // newShared[id].is_added = true;
            // localStorage.setItem("shared", JSON.stringify(newShared));
            // setPhotos(newShared);

        }
        axios.post('/shared_with_me/add-to-home', {

            "photo_id"  : photo.id,
            "shared_id" : photo.shared_id

        })
            .then((response) => {
                console.log(response);
            });
        reload();
    };

    const addPhoto = (photo) => {
        photo.key = photos.length;
        const current = photos.concat([photo]);
        localStorage.setItem('photos', JSON.stringify(current));
        setPhotos(current);
    };


    return (<div>
        {auth !== undefined &&
            <PhotoGallery
                photos={photos}
                addPhoto={addPhoto}
                setPhotos={setPhotos}
                reload={reload}
                addToHome={addToHome}
            />}
    </div>);
}

SharedWithMeContainer.propTypes = {
    auth : PropTypes.object
};

export default SharedWithMeContainer;


