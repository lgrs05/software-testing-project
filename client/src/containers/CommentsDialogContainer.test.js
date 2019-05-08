import * as Enzyme from "enzyme/build/index";
import Adapter from 'enzyme-adapter-react-16'
import CommentsDialogContainer from "./CommentsDialogContainer";
import React from 'react';

Enzyme.configure({adapter : new Adapter()});


const s = "this is a captionthis is a captionthis is a captionthis"+
    " is a caption this is a captionthis is a captionthis is a "+
    "captionthis is a captionthis is a caption this is a caption"+
    "this is a captionthis is a captionthis is a captionthis is "+
    "a caption111111111111111 | Uploaded by lgrs on 03/21/2018.";

const comments = [
    {
        name    : "Luis Rivera",
        message : "this is a comment",
        time    : new Date(2019, 2, 1, 6, 25, 0).toLocaleString()
    },
    {
        name    : "Luis Rivera",
        message : "this is a comment",
        time    : new Date(2019, 2, 8, 6, 25, 0).toLocaleString()
    },
    {
        name    : "Luis Rivera",
        message : "this is a comment",
        time    : new Date(2019, 2, 9, 6, 25, 0).toLocaleString()
    },
    {
        name    : "Luis Rivera",
        message : "this is a comment",
        time    : new Date(2019, 2, 10, 6, 25, 0).toLocaleString()
    },
    {
        name    : "Luis Rivera",
        message : "this is a comment",
        time    : new Date(2019, 2, 11, 6, 25, 0).toLocaleString()
    }
];
const photos = [
    {
        src      : "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
        width    : 4,
        height   : 3,
        caption  : s.concat(""),
        comments : [
            {
                name    : "Luis Rivera",
                message : "this is a comment",
                time    : new Date(2019, 2, 1, 6, 25, 0).toLocaleString()
            },
            {
                name    : "Luis Rivera",
                message : "this is a comment",
                time    : new Date(2019, 2, 8, 6, 25, 0).toLocaleString()
            }
        ]


    },
    {
        src      : "https://source.unsplash.com/Dm-qxdynoEc/800x799",
        width    : 1,
        height   : 1,
        caption  : s.concat(""),
        comments : comments.slice(0, 3)

    },
    {
        src      : "https://source.unsplash.com/qDkso9nvCg0/600x799",
        width    : 3,
        height   : 4,
        caption  : s.concat(""),
        comments : comments.slice(0, 2)
    },
    {
        src      : "https://source.unsplash.com/iecJiKe_RNg/600x799",
        width    : 3,
        height   : 4,
        caption  : s.concat(""),
        comments : comments.slice(0, 3)
    },
    {
        src      : "https://source.unsplash.com/epcsn8Ed8kY/600x799",
        width    : 3,
        height   : 4,
        caption  : s.concat(""),
        comments : comments.slice(0, 3)
    },
    {
        src      : "https://source.unsplash.com/NQSWvyVRIJk/800x599",
        width    : 4,
        height   : 3,
        caption  : s.concat(""),
        comments : comments.slice(0, 2)
    },
    {
        src      : "https://source.unsplash.com/zh7GEuORbUw/600x799",
        width    : 3,
        height   : 4,
        caption  : s.concat(""),
        comments : comments.slice(0, 2)
    },
    {
        src      : "https://source.unsplash.com/PpOHJezOalU/800x599",
        width    : 4,
        height   : 3,
        caption  : s.concat(""),
        comments : comments.slice(0, 2)
    },
    {
        src      : "https://source.unsplash.com/I1ASdgphUH4/800x599",
        width    : 4,
        height   : 3,
        caption  : s.concat(""),
        comments : comments.slice(0, 2)
    },
    {
        src      : "https://source.unsplash.com/XiDA78wAZVw/600x799",
        width    : 3,
        height   : 4,
        caption  : s.concat(""),
        comments : comments.slice(0, 2)
    },
    {
        src      : "https://source.unsplash.com/x8xJpClTvR0/800x599",
        width    : 4,
        height   : 3,
        caption  : s.concat(""),
        comments : comments.slice(0, 2)
    },
    {
        src      : "https://source.unsplash.com/qGQNmBE7mYw/800x599",
        width    : 4,
        height   : 3,
        caption  : s.concat(""),
        comments : comments.slice(0, 2)
    },
    {
        src      : "https://source.unsplash.com/NuO6iTBkHxE/800x599",
        width    : 4,
        height   : 3,
        caption  : s.concat(""),
        comments : comments.slice(0, 2)
    },
    {
        src     : "https://source.unsplash.com/pF1ug8ysTtY/600x400",
        width   : 4,
        height  : 3,
        caption : "this is a caption.this is a caption.this is a caption"+
        ".this is a caption. this is a caption.this is a caption.this is "+
        "a caption.this is a caption.this is a caption. this is a caption"+
        ".this is a caption.this is a caption.this is a caption.",
        comments : comments.slice(0, 2)
    },
    {
        src      : "https://source.unsplash.com/A-fubu9QJxE/800x533",
        width    : 4,
        height   : 3,
        caption  : s.concat(""),
        comments : comments.slice(0, 2)
    },
    {
        src      : "https://source.unsplash.com/5P91SF0zNsI/740x494",
        width    : 4,
        height   : 3,
        caption  : s.concat(""),
        comments : comments.slice(0, 2)
    }
];
let closeDialog;
let wrapper;
let open;


beforeEach(() => {
    localStorage.setItem('photos', JSON.stringify(photos));
    open = true;
    closeDialog = jest.fn(() => {
        open = false;
    });

    wrapper = Enzyme.mount(
        <CommentsDialogContainer
            id={0}
            open={open}
            handleClose={closeDialog}
        />
    );
    wrapper.update();
});

//describe('CommentsDialogContainer', () => {
it('fetches comments', () => {
    // const children = wrapper.find(CommentsDialogContainer)
    //     .render().find('ul').children();
    // expect(children).toHaveLength(
    //     JSON.parse(localStorage.getItem('photos'))[0].comments.length
    // );
});

it('posts comment', () => {
    // wrapper.update();
    // const children = wrapper.find(CommentsDialogContainer)
    //     .render().find('ul').children();
    // expect(children).toHaveLength(
    //     JSON.parse(localStorage.getItem('photos'))[0].comments.length
    //
});
//});

