import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import HomePage from './HomePage'

const renderer = new ShallowRenderer();

it('renders correctly', () => {
    renderer.render(<HomePage />)
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
});