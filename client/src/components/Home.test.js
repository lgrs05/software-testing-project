import Comment from './Comment';
import React from 'react';
import renderer from 'react-test-renderer';


it('renders without crashing', () => {
    const tree = renderer.create(<Comment
        name="Luis Rivera"
        message="This is a comment"
        time={new Date(2019, 3, 21, 6, 0, 0).toLocaleString()} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
