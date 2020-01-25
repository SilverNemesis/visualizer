import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import SortPage from './SortPage'

const renderer = new ShallowRenderer();

it('renders correctly', () => {
    renderer.render(<SortPage />)
    const tree = renderer.getRenderOutput()
    expect(tree).toMatchSnapshot()
});