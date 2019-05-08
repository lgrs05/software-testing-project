import * as Enzyme from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import AddPhotoDialog from "./AddPhotoDialog";
import React from 'react';

Enzyme.configure({adapter : new Adapter()});

let closeDialog;
let openDialog;
let open = true;
let wrapper;
let addPhoto;

beforeEach(() => {
    closeDialog = jest.fn(() => {
        open = false;
    });

    addPhoto = jest.fn();

    openDialog = () => {
        open = true
    };
    wrapper = Enzyme.mount(
        <AddPhotoDialog
            addOpen={open}
            onClose={closeDialog}
            addPhoto={addPhoto}/>
    );
});

afterEach(() => {
    wrapper = null;
});

describe("Testing AddPhotoDialog", () => {

    it('can open and close dialog', () => {
        const photoDialog = wrapper.find(AddPhotoDialog);
        wrapper.find("Dialog").props().onClose();
        expect(closeDialog).toHaveBeenCalled();
        openDialog();
        wrapper.update();
        expect(photoDialog
            .findWhere((node) => node.prop("id") === "upload" && node.type() === "button"))
            .toHaveLength(1);
    });

});


