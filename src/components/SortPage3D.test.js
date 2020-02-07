import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import SortPage3D from './SortPage3D'

const renderer = new ShallowRenderer();

it('renders correctly', () => {
  renderer.render(<SortPage3D />)
  const tree = renderer.getRenderOutput()
  expect(tree).toMatchSnapshot()
});