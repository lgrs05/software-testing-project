import '../About.css';
import About1 from "../circleabout1.png";
import About2 from "../circleabout2.png";
import About3 from "../circleabout5.png";
import Background from "../background4.jpg";
import PropTypes from 'prop-types';
import React from "react";
import {withStyles} from '@material-ui/core/styles';

const sectionStyle = {
    width           : "100%",
    height          : "650px",
    backgroundSize  : "auto",
    backgroundImage : "url(" +  Background  + ")"
};

const image1 = {
    width           : "100px",
    height          : "100px",
    backgroundImage : "url(" + About1 + ")"
};

const image2 = {
    width           : "100px",
    height          : "100px",
    backgroundImage : "url(" + About2 + ")"
};

const image3 = {
    width           : "100px",
    height          : "100px",
    backgroundImage : "url(" + About3 + ")"
};

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

function About(){
    return (<div className="About">
        <section style={ sectionStyle }>
        </section>
        <h1>About</h1>
        <h2>Start sharing moments with Slika Share today! On</h2>
        <h2>Slika Share you can upload and post photos, comment</h2>
        <h2>on friends photos and even share them.</h2>
        <div className={"about1"}>
            <img src={About1} alt={image1} />
            <span>Post Moments</span>
        </div>
        <div className={"about3"}>
            <img src={About3} alt={image3}  />
            <span>Share Moments</span>
        </div>
        <div className={"about2"}>
            <img src={About2} alt={image2}  />
            <span>Say something</span>
        </div>

    </div>
    );

}

About.propTypes = {
    classes : PropTypes.object.isRequired
};

export default withStyles(styles)(About);
