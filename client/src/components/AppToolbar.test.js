import * as Enzyme from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import AppToolbar from './AppToolbar';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import InputBase from '@material-ui/core/InputBase';
import React from 'react';
import {MemoryRouter as Router} from 'react-router-dom';

Enzyme.configure({adapter : new Adapter()});

let wrapper;

let auth;
let setAuth;


beforeEach(() => {
    setAuth = (newAuth) => {
        auth = newAuth;
    };

});

afterEach(() => {

});


describe("AppToolbar", () => {

    it('can render unregistered user toolbar', () => {
        wrapper = Enzyme.mount(
            <Router>
                <AppToolbar auth={undefined} setAuth={setAuth} addPhoto={jest.fn()} setReloadSearch={jest.fn()} />
            </Router>
        );
        expect(wrapper.find(AppToolbar).find(Button)).toHaveLength(3);
    });


    it('can render registered user toolbar', () => {
        auth = {
            email    : "email@example.com",
            password : "12345678",
            first    : "Foo",
            last     : "Bar"
        };
        wrapper = Enzyme.mount(
            <Router initialEntries={["/home"]}>
                <AppToolbar auth={auth} setAuth={setAuth} addPhoto={jest.fn()} setReloadSearch={jest.fn()} />
            </Router>
        );

        const toolbar = wrapper.find(AppToolbar);
        // toolbar.props().location.pathname = "/home";
        expect(toolbar.find(Button)).toHaveLength(4);
        // expect(toolbar.find(InputBase)).toHaveLength(1);
        expect(toolbar.find(Fab)).toHaveLength(1);

    });

    // it('can render registered user toolbar', () => {
    //     const swtch = container.querySelector('input');
    //     act(() => {
    //         swtch.click();
    //     });
    //     expect(document.getElementsByTagName("button").length).toBe(3);
    // });
});