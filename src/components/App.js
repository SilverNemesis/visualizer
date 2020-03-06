import React from 'react'
import { Route } from 'react-router-dom'
import Navigation from './Navigation'
import { Section } from '../primitives'
import HomePage from './HomePage'
import SortPage from './SortPage'
import MazePage from './MazePage'
import TreePage from './TreePage'

const App = () => {
  return (
    <Section outer>
      <Section>
        <Navigation />
      </Section>
      <Section grow center>
        <Route exact path="/" component={HomePage} />
        <Route path="/sort" component={SortPage} />
        <Route path="/maze" component={MazePage} />
        <Route path="/tree" component={TreePage} />
      </Section>
    </Section>
  );
}

export default App
