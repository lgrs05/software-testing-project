import * as Enzyme from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import AuthDialog from "./AuthDialog";
import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";

Enzyme.configure({adapter : new Adapter()});

let closeDialog;
let openDialog;
let open = true;
let wrapper;
let login;

beforeEach(() => {
    closeDialog = jest.fn(() => {
        open = false;
    });

    login = jest.fn();

    openDialog = () => {
        open = true
    };

});

afterEach(() => {
    wrapper = null;
});

describe("Testing AuthDialog", () => {

    it('can open and close register dialog', () => {
        wrapper = Enzyme.mount(
            <Router>
                <AuthDialog
                    authOpen={open}
                    onClose={closeDialog}
                    login={login}
                    isRegister
                    setAuth={jest.fn()}
                    register={jest.fn()}
                />
            </Router>
        );
        wrapper.find("Dialog").props().onClose();
        expect(closeDialog).toHaveBeenCalled();
        openDialog();
        wrapper.update();
        expect(wrapper.findWhere((node) => node.prop("id") === "submit" && node.type() === "button")
            .children().first().props().children)
            .toBe("Register");
    });

    it('can open and close login dialog', () => {
        wrapper = Enzyme.mount(
            <Router>
                <AuthDialog
                    authOpen={open}
                    onClose={closeDialog}
                    login={login}
                    setAuth={jest.fn()}
                    register={jest.fn()}
                />
            </Router>
        );
        wrapper.find("Dialog").props().onClose();
        expect(closeDialog).toHaveBeenCalled();
        openDialog();
        wrapper.update();
        expect(wrapper.findWhere((node) => node.prop("id") === "submit" && node.type() === "button")
            .children().first().props().children)
            .toBe("Login");
    });

});


