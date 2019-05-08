import CommentList from './CommentList';
import React from 'react';
import renderer from 'react-test-renderer';

let comments = [];

beforeEach(() => {

    comments = [
        {name    : 'Pedro',
            message : "This is a good message",
            time    : new Date(2019, 2, 21, 12, 0, 0, 0).toLocaleString()},
        {name    : 'Pedro Vazquez',
            message : "This is a great message",
            time    : new Date(2019, 2, 21, 12, 0, 0, 0).toLocaleString()},
        {name    : 'Pedro Santiago',
            message : "This is a bad message",
            time    : new Date(2019, 2, 21, 12, 0, 0, 0).toLocaleString()},
        {name    : 'Pedro Rivera',
            message : "This is an awesome message",
            time    : new Date(2019, 2, 21, 12, 0, 0, 0).toLocaleString()}
    ];
});

it('renders correctly', () => {
    const tree = renderer.create(<CommentList comments={comments}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});