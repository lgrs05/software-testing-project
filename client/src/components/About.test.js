import About from './About'
import Comment from './Comment';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

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

it('About renders correctly', () => {
    const tree = renderer.create(<About />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
