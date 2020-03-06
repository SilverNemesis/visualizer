import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import TreePage from './TreePage'

const renderer = new ShallowRenderer();

it('renders correctly', () => {
  renderer.render(<TreePage />)
  const tree = renderer.getRenderOutput()
  expect(tree).toMatchSnapshot()
});