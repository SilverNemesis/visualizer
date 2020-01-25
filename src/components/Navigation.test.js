import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import Navigation from './Navigation'

const renderer = new ShallowRenderer();

it('renders correctly', () => {
    renderer.render(<Navigation />)
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
});