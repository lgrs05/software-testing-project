import Comment from './Comment';
import React from 'react';
import renderer from 'react-test-renderer';

let comm = {};

beforeEach(() => {
    comm = {
        name    : 'Pedro',
        message : "This is a good message",
        time    : new Date(2019, 2, 21, 12, 0, 0, 0).toLocaleString()
    };
});

it('renders correctly', () => {
    const tree = renderer.create(<Comment
        name={comm.name}
        message={comm.message}
        time={comm.time} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
