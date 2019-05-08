import '../App.css';
import React, {useEffect, useState} from 'react';
import {Route, BrowserRouter as Router, Switch}  from "react-router-dom";
import About from './About';
import AppToolbar from "./AppToolbar";
import HomeContainer from '../containers/HomeContainer';
import SharedWithMeContainer from '../containers/SharedWithMeContainer';
import axios from "axios";

// import SharedWithMeContainer from "../containers/SharedWithMeContainer";
import {withStyles} from "@material-ui/core/styles/index";


const styles = (theme) => ({
    paper : {
        position        : 'absolute',
        width           : theme.spacing.unit * 50,
        backgroundColor : theme.palette.background.paper,
        boxShadow       : theme.shadows[5],
        padding         : theme.spacing.unit * 4,
        outline         : 'none'
    },
    toolbarButton : {
        marginLeft  : -12,
        marginRight : 20
    },
    button : {
        margin : theme.spacing.unit
    }
});

function App() {
    const [newPhoto, setNewPhoto] = useState(undefined);
    const [auth, setAuth] =  useState(undefined);
    const [reloadSearch, setReloadSearch] = useState('');

    useEffect(() => {
        axios.get('/auth/is-logged-in')
            .then((response) => {
                setAuth(response.data);

            })
            .catch((error) => {

            });

    }, []);

    // const addPhoto = (photo) => {
    //     setNewPhoto(photo);
    // };

    return (<Router className="App">
        <AppToolbar  addPhoto={setNewPhoto} auth={auth} setAuth={setAuth} setReloadSearch={setReloadSearch} />
        <Switch>
            <Route path="/home"
                render={() => (
                    <HomeContainer
                        setNewPhoto={setNewPhoto}
                        newPhoto={newPhoto}
                        auth={auth}
                        reloadSearch={reloadSearch}/>)}/>
            <Route path="/shared-with-me" render={() => (<SharedWithMeContainer auth={auth}/>)}/>
            <Route path="/about" component={About}/>
            <Route component={About}/>
        </Switch>
    </Router>
    );
}

export default withStyles(styles)(App);