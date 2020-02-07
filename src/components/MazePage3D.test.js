import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import MazePage3D from './MazePage3D'

const renderer = new ShallowRenderer();

it('renders correctly', () => {
  renderer.render(<MazePage3D />)
  const tree = renderer.getRenderOutput()
  expect(tree).toMatchSnapshot()
});