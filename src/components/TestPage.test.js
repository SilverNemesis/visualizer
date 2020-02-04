import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import TestPage from './TestPage'

const renderer = new ShallowRenderer();

it('renders correctly', () => {
  renderer.render(<TestPage />)
  const tree = renderer.getRenderOutput()
  expect(tree).toMatchSnapshot()
});