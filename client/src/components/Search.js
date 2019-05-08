/* eslint-disable no-console */
import React, {useState} from "react";
import Autosuggest from 'react-autosuggest';
import InputBase from '@material-ui/core/InputBase';
import {Link}  from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types'
import SearchIcon from '@material-ui/icons/Search';
import axios from "axios/index";
import {fade} from '@material-ui/core/styles/colorManipulator';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
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

function Search({classes, setReloadSearch}){
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const anchorStyle = {textDecoration : 'none'};

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
        // setSuggestions(getSuggestions(value));
        axios.get('home/search-user/'+value).then((response) => {
            //setSuggestions(response.data);
            console.log(response);
        });
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
                placeholder : 'Search a photo',
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

    return auto;
}

Search.propTypes = {
    classes         : PropTypes.object.isRequired,
    setReloadSearch : PropTypes.func.isRequired
};

export default withStyles(styles)(Search);