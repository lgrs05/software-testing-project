/* eslint-disable no-console */
import React, {useEffect, useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import AddPhotoDialog from "./AddPhotoDialog";
import AppBar from '@material-ui/core/AppBar';
import AuthDialog from './AuthDialog';
import Autosuggest from 'react-autosuggest';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Grid from "@material-ui/core/Grid";

import InputBase from '@material-ui/core/InputBase';
import {Link}  from "react-router-dom";

import MenuItem from "@material-ui/core/MenuItem";
import Paper from '@material-ui/core/Paper';

import PropTypes from 'prop-types'
import Search from './Search';
import SearchIcon from '@material-ui/icons/Search';

import Toolbar from '@material-ui/core/Toolbar';
import axios from 'axios';
import deburr from 'lodash/deburr';
import {fade} from '@material-ui/core/styles/colorManipulator';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import {withRouter} from 'react-router';
import {withStyles} from "@material-ui/core/styles/index";


const styles = (theme) => ({
    button : {
        margin : theme.spacing.unit
    },
    root : {
        width : '100%'
    },
    grow : {
        flexGrow : 1
    },
    menuButton : {
        marginLeft  : -12,
        marginRight : 20
    },
    title : {
        display                      : 'none',
        [theme.breakpoints.up('sm')] : {
            display : 'block'
        }
    },
    search : {
        position        : 'relative',
        borderRadius    : theme.shape.borderRadius,
        backgroundColor : fade(theme.palette.common.white, 0.15),
        '&:hover'       : {
            backgroundColor : fade(theme.palette.common.white, 0.25)
        },
        marginLeft                   : 0,
        width                        : '100%',
        [theme.breakpoints.up('sm')] : {
            marginLeft : theme.spacing.unit,
            width      : 'auto'
        }
    },
    searchIcon : {
        width          : theme.spacing.unit * 9,
        height         : '100%',
        position       : 'absolute',
        pointerEvents  : 'none',
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center'
    },
    inputRoot : {
        color : 'inherit',
        width : '100%'
    },
    inputInput : {
        paddingTop                   : theme.spacing.unit,
        paddingRight                 : theme.spacing.unit,
        paddingBottom                : theme.spacing.unit,
        paddingLeft                  : theme.spacing.unit * 10,
        transition                   : theme.transitions.create('width'),
        width                        : '100%',
        [theme.breakpoints.up('sm')] : {
            width     : 120,
            '&:focus' : {
                width : 200
            }
        }
    },
    container : {
        position : 'relative'
    },
    suggestionsContainerOpen : {
        position  : 'absolute',
        zIndex    : 1,
        marginTop : theme.spacing.unit,
        left      : 0,
        right     : 0
    },
    suggestion : {
        display : 'block'
    },
    suggestionsList : {
        margin        : 0,
        padding       : 0,
        listStyleType : 'none'
    },
    divider : {
        height : theme.spacing.unit * 2
    }
});


function AppToolbar(props) {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const {classes, addPhoto, location, auth, setAuth, setReloadSearch} = props;
    const [isRegisteredUser, setIsRegisteredUser] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [open, setOpen] = useState({
        add  : false,
        auth : false
    });
    const [isRegister, setIsRegister] = useState(false);

    const getSuggestions = (value) => {
        const inputValue = deburr(value.trim()).toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;
        let results = [];
        axios.get('home/search-user/'+value).then((response) => {
            results = response.data;
            console.log(response);
        });

        return inputLength === 0
            ? []
            : results.filter((suggestion) => {
                const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

                if (keep) {
                    count += 1;
                }

                return keep;
            });
    };

    const getSuggestionValue = (suggestion) => suggestion.label;

    const renderSuggestion = (suggestion, {query, isHighlighted}) => {
        const matches = match(suggestion.label, query);
        const parts = parse(suggestion.label, matches);

        return (
            <Link style={anchorStyle} to={'/'+suggestion.label}>
                <MenuItem selected={isHighlighted} component="div">
                    <div>
                        {parts.map((part, index) =>
                            part.highlight ? (
                                <span key={String(index)} style={{fontWeight : 500}}>
                                    {part.text}
                                </span>
                            ) : (
                                <strong key={String(index)} style={{fontWeight : 300}}>
                                    {part.text}
                                </strong>
                            ),)}
                    </div>
                </MenuItem>
            </Link>
        );
    };
    const onChangeSearch = (event, {newValue}) => {
        setValue(newValue);
        setReloadSearch(newValue);

    };

    const renderInputComponent = (inputProps) => {
        const {classes, inputRef = () => {}, ref, ...other} = inputProps;

        return (
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    value={value}
                    classes={{
                        root  : classes.inputRoot,
                        input : classes.inputInput
                    }}
                    inputprops={{
                        inputRef : (node) => {
                            ref(node);
                            inputRef(node);
                        },
                        classes : {
                            input : classes.input
                        }
                    }}
                    {...other}
                />
            </div>
        );
    };

    const handleSuggestionsFetchRequested = ({value}) => {
        setSuggestions(getSuggestions(value));
    };

    const handleSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const autosuggestProps = {
        renderInputComponent,
        suggestions                 : suggestions,
        onSuggestionsFetchRequested : handleSuggestionsFetchRequested,
        onSuggestionsClearRequested : handleSuggestionsClearRequested,
        getSuggestionValue,
        renderSuggestion
    };

    const auto =
        <Autosuggest
            {...autosuggestProps}
            inputProps={{
                classes,
                placeholder : 'Search a country (start with a)',
                value       : value,
                onChange    : onChangeSearch
            }}

            theme={{
                container                : classes.container,
                suggestionsContainerOpen : classes.suggestionsContainerOpen,
                suggestionsList          : classes.suggestionsList,
                suggestion               : classes.suggestion
            }}
            renderSuggestionsContainer={(options) => (
                <Paper {...options.containerProps} square>
                    {options.children}
                </Paper>
            )}
        />;


    const anchorStyle = {textDecoration : 'none'};

    useEffect(() => {
        setIsRegisteredUser(auth !== undefined);
    }, [auth]);

    const onCloseAddPhoto = () => {
        setAddOpen(false);
        setOpen({add  : false,
            auth : open.auth});
    };

    const openAddPhoto = () => {
        setAddOpen(true);
        setOpen({add  : true,
            auth : open.auth});
    };

    const onCloseAuth = () => {
        setOpen({add  : open.add,
            auth : false});
    };


    const openLogin = () => {
        setIsRegister(false);
        setOpen({add  : open.add,
            auth : true});
    };

    const openRegister = () => {
        setIsRegister(true);
        setOpen({add  : open.add,
            auth : true});
    };

    const login = (authUsr) => axios.post('/auth/login', {

        "email"    : authUsr.email,
        "password" : authUsr.password

    });

    const register = (authUsr) => axios.post('/auth/register', {
        "email"    : authUsr.email,
        "username" : authUsr.username,
        "first"    : authUsr.first,
        "last"     : authUsr.last,
        "password" : authUsr.password
    });

    const logout = () => {
        axios.get('/auth/logout').then((response) => {
            console.log(response);
        }).then((error) => {
            console.log(error);
        });
        setAuth(undefined);
    };

    // const searchBar =
    //     <div className={classes.search}>
    //         <div className={classes.searchIcon}>
    //             <SearchIcon />
    //         </div>
    //         <InputBase
    //             placeholder="Search…"
    //             value={value}
    //             classes={{
    //                 root  : classes.inputRoot,
    //                 input : classes.inputInput
    //             }}
    //             onChange={onChangeBar}
    //         />
    //     </div>;


    // const searchBar =
    //     <Autosuggest
    //         suggestions={suggestions}
    //         onSuggestionsFetchRequested={onSuggestionsFetchRequested}
    //         onSuggestionsClearRequested={onSuggestionsClearRequested}
    //         getSuggestionValue={getSuggestionValue}
    //         renderSuggestion={renderSuggestion}
    //         inputProps={inputProps}
    //     />;

    const homeButton =
        <Link style={anchorStyle}  to="/home">
            <Button variant="contained"
                color="secondary"
                className={classes.button}>
                Home
            </Button>
        </Link>;

    const sharedWithMeButton =
        <Link style={anchorStyle} to="/shared-with-me" >
            <Button variant="contained"
                color="secondary"
                className={classes.button}>
                Shared With Me
            </Button>
        </Link>;

    const aboutButton =
        <Link style={anchorStyle} to="/about" >
            <Button variant="contained"
                color="secondary"
                className={classes.button}>
                About
            </Button>
        </Link>;

    const addPhotoButton =
        <Fab variant="round"
            color="secondary"
            component="span"
            className={classes.button}
            size="small"
            onClick={openAddPhoto}>
            <AddIcon/>
        </Fab>;

    const loginButton =
        <Button variant="contained"
            color="secondary"
            className={classes.button}
            onClick={openLogin}>
            Login
        </Button>;

    const registerButton =
        <Button variant="contained"
            color="secondary"
            className={classes.button}
            onClick={openRegister}>
            Register
        </Button>;

    const logoutButton =
        <Link style={anchorStyle} to="/">
            <Button variant="contained"
                color="secondary"
                className={classes.button}
                onClick={logout}>
                Log Out
            </Button>
        </Link>;
    auto;

    return (<div>
        <AppBar className={classes.root} position="static">
            <Toolbar>
                <Grid container
                    direction="row"
                    alignItems="center"
                    justify="space-between">

                    {isRegisteredUser &&
                        homeButton}

                    {isRegisteredUser &&
                        sharedWithMeButton}

                    {!isRegisteredUser &&
                        aboutButton}

                    {isRegisteredUser &&
                        ((location.pathname === '/home') && addPhotoButton)}


                    <div className={classes.grow}/>

                    {isRegisteredUser &&
                        ((location.pathname === '/home') && <Search setReloadSearch={setReloadSearch}/>)}

                    {!isRegisteredUser &&
                        loginButton}

                    {!isRegisteredUser &&
                        registerButton}

                    {isRegisteredUser &&
                        aboutButton}

                    {isRegisteredUser &&
                        logoutButton}

                </Grid>
            </Toolbar>
        </AppBar>
        <AddPhotoDialog addOpen={addOpen} onClose={onCloseAddPhoto} addPhoto={addPhoto} auth={auth}/>
        <AuthDialog
            onClose={onCloseAuth}
            authOpen={open.auth}
            login={login}
            register={register}
            isRegister={isRegister}
            setAuth={setAuth}/>
    </div>
    );
}

AppToolbar.propTypes = {
    classes         : PropTypes.object.isRequired,
    addPhoto        : PropTypes.func.isRequired,
    location        : PropTypes.object,
    auth            : PropTypes.object,
    setAuth         : PropTypes.func.isRequired,
    setReloadSearch : PropTypes.func.isRequired
};

export default withStyles(styles)(withRouter(AppToolbar));


