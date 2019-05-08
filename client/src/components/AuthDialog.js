/* eslint-disable no-console */
import React, {useEffect, useState} from 'react';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';

function AuthDialog(props){
    const {onClose, authOpen, login, history, isRegister, register, setAuth} = props;
    const [validLogin, setValidLogin] = useState(true);
    const [validRegister, setValidRegister] = useState(true);
    const [registerError, setRegisterError] = useState('');
    const [authState, setAuthState] = useState({
        email    : "",
        username : "",
        password : "",
        first    : "",
        last     : "",
        id       : 0
    });

    const text = isRegister? "Register\t" : "Login\t";

    useEffect(() => {
        setValidRegister(true);
        setRegisterError('');
        setValidLogin(true);
        setAuthState({
            email    : "",
            username : "",
            password : "",
            first    : "",
            last     : "",
            id       : 0
        })
    }, [authOpen]);


    const submitLogin = () => {
        if(isRegister){
            register(authState).then((response) => {
                console.log('register');
                setAuthState(response.data);
                setAuth(response.data);
                console.log(response);
                onClose();
                history.push("/home");
            }).catch((error) => {
                setRegisterError(error.response.data);
                setValidRegister(false);
                console.log(error.response.data);
            });
        }else{

            const {email, password} = authState;
            const first = "Gabriel";
            const last = "Rivera";
            setAuthState({
                email,
                password,
                first,
                last
            });
            // login({
            //     email,
            //     password
            // });
            login(authState).then((response) => {
                console.log("ready");
                setAuthState(response.data);
                setAuth(response.data);
                console.log(response);
                onClose();
                history.push("/home");
            }).catch((error) => {
                setValidLogin(false);
                console.log(error);
            });
        }


    };


    const handleEmailChange = (event) => setAuthState({
        email    : event.target.value,
        password : authState.password,
        first    : authState.first,
        last     : authState.last,
        username : authState.username
    });

    const handleUsernameChange = (event) => setAuthState({
        email    : authState.email,
        password : authState.password,
        first    : authState.first,
        last     : authState.last,
        username : event.target.value
    });

    const handlePasswordChange = (event) => setAuthState({
        email    : authState.email,
        password : event.target.value,
        first    : authState.first,
        last     : authState.last,
        username : authState.username
    });

    const handleFirstNameChange = (event) => setAuthState({
        email    : authState.email,
        password : authState.password,
        first    : event.target.value,
        last     : authState.last,
        username : authState.username
    });

    const handleLastNameChange = (event) => setAuthState({
        email    : authState.email,
        password : authState.password,
        first    : authState.first,
        last     : event.target.value,
        username : authState.username
    });

    return <Dialog open={authOpen}
        onClose={onClose}>
        <DialogTitle>
            <Grid container
                direction="row"
                alignItems="center"
                justify="space-between">
                {text}
                {!validLogin && " Email or password incorrect."}
                {!validRegister && registerError}
                <Button onClick={onClose}
                    variant="contained"
                    color="primary"
                    style={{fontSize : "small"}}>
                    <CloseIcon/>
                </Button>
            </Grid>
        </DialogTitle>
        <DialogContent>


            <ValidatorForm onSubmit={submitLogin}>
                <Grid  container
                    direction="column"
                    alignItems="center"
                    justify="center">
                    {isRegister && <TextValidator
                        id="first"
                        label="First Name"
                        type="text"
                        fullWidth
                        value={authState.first}
                        onChange={handleFirstNameChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="First Name"
                        validators={['required', 'matchRegexp:\\w+', 'maxStringLength:50']}
                        errorMessages={[
                            'This field is required',
                            'Name is not valid',
                            'First name should have 50 characters or less '
                        ]}
                        hidden={isRegister}
                    />}
                    {isRegister && <TextValidator
                        id="last"
                        label="Last Name"
                        type="text"
                        fullWidth
                        value={authState.last}
                        onChange={handleLastNameChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Last Name"
                        validators={['required', 'matchRegexp:\\w+', 'maxStringLength:50']}
                        errorMessages={[
                            'This field is required',
                            'Name is not valid',
                            'Last name should have 50 characters or less '
                        ]}
                    />}

                    {isRegister && <TextValidator
                        id="user"
                        label="Username"
                        type="text"
                        fullWidth
                        value={authState.username}
                        onChange={handleUsernameChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="Userame"
                        validators={['required', 'matchRegexp:\\w+', 'maxStringLength:50']}
                        errorMessages={[
                            'This field is required',
                            'Username should have 50 characters or less '
                        ]}
                    />}

                    <TextValidator
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={authState.email}
                        onChange={handleEmailChange}
                        margin="normal"
                        variant="outlined"
                        placeholder="example@email.com"
                        validators={['required', 'isEmail']}
                        errorMessages={['This field is required', 'Email is not valid']}
                    />

                    <TextValidator
                        id="pswd"
                        label="Password"
                        type="password"
                        fullWidth
                        value={authState.password}
                        onChange={handlePasswordChange}
                        margin="normal"
                        variant="outlined"
                        validators={['required', 'minStringLength:8', 'maxStringLength:255']}
                        errorMessages={[
                            'This field is required',
                            'Password should have at least 8 characters',
                            'Password should have less than 255 characters'
                        ]}
                    />
                    <Button
                        id="submit"
                        variant="contained"
                        color="primary"
                        style={{fontSize : "small"}}
                        type="submit">
                        {text}
                    </Button>
                </Grid>
            </ValidatorForm>


        </DialogContent>
        <DialogActions>


        </DialogActions>
    </Dialog>
}

AuthDialog.propTypes = {
    onClose    : PropTypes.func.isRequired,
    authOpen   : PropTypes.bool.isRequired,
    login      : PropTypes.func.isRequired,
    history    : PropTypes.object.isRequired,
    isRegister : PropTypes.bool,
    register   : PropTypes.func.isRequired,
    setAuth    : PropTypes.func.isRequired
};

export default withRouter(AuthDialog);