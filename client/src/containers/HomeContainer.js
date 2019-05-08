/* eslint-disable no-console */
import React, {useEffect, useState} from "react";
import PhotoGallery from "../components/PhotoGallery";
import PropTypes from 'prop-types';
import axios from "axios";


function HomeContainer({newPhoto, setNewPhoto, auth, reloadSearch}){
    // const  fetchPhotos = () => {
    //     axios.post('/auth/login', {
    //
    //         "email"    : "lgrs05@gmail.com",
    //         "password" : "123456789"
    //
    //     }).then((response) => {
    //         console.log(response);
    //     })
    //         .then((error) => {
    //             console.log(error);
    //         });
    // };
    //JSON.parse(localStorage.getItem('photos'));
    // fetchPhotos();
    const [photos, setPhotos] = useState([]);

    useEffect( () => {
        axios.get('/home/search-by-caption/'+reloadSearch)
            .then((response) => {
                setPhotos([]);
                setPhotos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [reloadSearch]);

    useEffect(  () => {
        if(auth !== undefined) {
            axios.get('/home/get-owned-photos')
                .then((response) => {
                    setPhotos(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        //setPhotos(JSON.parse(localStorage.getItem('photos')));
    }, []);

    useEffect(  () => {
        if(auth !== undefined) {
            axios.get('/home/get-owned-photos')
                .then((response) => {
                    setPhotos(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        //setPhotos(JSON.parse(localStorage.getItem('photos')));
    }, [auth]);

    useEffect(() => {
        if(newPhoto !== undefined)
            addPhoto(newPhoto);
    }, [newPhoto]);

    const reload = () => {
        axios.get('/home/search-by-caption/'+reloadSearch)
            .then((response) => {
                setPhotos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const updateCaption = (photoId, newCaption) => {
        axios.post('/caption/change-text', {
            "id"      : photoId,
            "newtext" : newCaption
        }).then((response) => {
            reload();
        });
        // const index = photos[photoId].caption.indexOf(" |");
        // const uploaded = photos[photoId].caption
        //     .substr(index);
        // const current = photos.concat([]);
        // current[photoId].caption = newCaption.concat(uploaded);
        // localStorage.setItem('photos', JSON.stringify(current));
        // setPhotos(current);
    };

    const deletePhoto = (photoId) => {
        // const photoToDelete = photos.filter( (photo) => photo.key === photoId);
        // if(photoToDelete.lastKey > -1) {
        //     let sharedPhotos = JSON.parse(localStorage.getItem('shared'));
        //     const shared = sharedPhotos.filter((image) => image.key === photoToDelete.lastKey);
        //     shared[0].isAdded = false;
        //     sharedPhotos = sharedPhotos.filter((image) => image.key !== photoToDelete.lastKey);
        //     sharedPhotos.push(shared[0]);
        //     localStorage.setItem('shared', JSON.stringify(sharedPhotos));
        // }
        axios.post('home/delete-photo',
            {
                "id" : photoId
            })
            .then((response) => {
                console.log(response);
            });
        // const current = photos.filter( (photo) => photo.key !== photoId);
        // localStorage.setItem('photos', JSON.stringify(current));
        //setPhotos(current);
        reload();
    };

    const addPhoto = (photo) => {
        const data = new FormData();
        data.append('src', photo.src);
        data.set('caption', photo.caption);
        axios.post('/home/add-photo', data)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
        // photo.key = photos.length;
        // const current = photos.concat([photo]);
        // localStorage.setItem('photos', JSON.stringify(current));
        reload();
        setNewPhoto(undefined);
    };


    return (<div>
        {auth !== undefined &&
        <PhotoGallery
            photos={photos}
            updateCaption={updateCaption}
            deletePhoto={deletePhoto}
            addPhoto={addPhoto}
            setPhotos={setPhotos}
            reload={reload}
            auth={auth}
            isHome
        />}
    </div>);
}

HomeContainer.propTypes = {
    newPhoto     : PropTypes.object,
    setNewPhoto  : PropTypes.func,
    auth         : PropTypes.object,
    reloadSearch : PropTypes.string
};


export default HomeContainer;


