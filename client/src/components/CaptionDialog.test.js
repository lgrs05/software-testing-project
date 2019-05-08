import * as Enzyme from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import CaptionDialog from "./CaptionDialog";
import React from 'react';
import {act} from 'react-dom/test-utils';

Enzyme.configure({adapter : new Adapter()});

let caption = "this is a caption";


let closeDialog;
let openDialog;
let open = true;
let wrapper;
let updateCaption;

beforeEach(() => {
    closeDialog = jest.fn(() => {
        open = false;
    });
    updateCaption = jest.fn((newCaption) => {
        caption = newCaption;
    });
    openDialog = () => {
        open = true
    };
    wrapper = Enzyme.mount(
        <CaptionDialog
            captionOpen={open}
            initialCaption={caption}
            onClose={closeDialog}
            updateCaption={updateCaption}/>
    );
});

afterEach(() => {
    wrapper = null;
});

describe("Testing CommentsDialog", () => {

    it('can render caption', () => {
        const cDialog = wrapper.find(CaptionDialog);
        wrapper.find("Dialog").props().onClose();
        expect(closeDialog).toHaveBeenCalled();
        openDialog();
        wrapper.update();

        expect(cDialog.prop("initialCaption")).toBe(caption);
    });

    it("can edit caption", () => {
        const e = {target : {value : 'test'}};
        act(() => {
            wrapper.find('TextField').props().onChange(e);
        });
        wrapper.update();
        expect(wrapper.find('TextField').prop("value")).toBe("test");
        wrapper.findWhere((n) =>  n.prop("id") === "captionButton" && n.type() === "button").simulate('click');
        expect(caption).toBe("test");
    });


});


