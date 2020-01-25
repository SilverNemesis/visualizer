import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import MazePage from './MazePage'

const renderer = new ShallowRenderer();

it('renders correctly', () => {
    renderer.render(<MazePage />)
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
});