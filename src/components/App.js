import React from 'react'
import { Route } from 'react-router-dom'
import Navigation from './Navigation'
import { Section } from '../primitives'
import HomePage from './HomePage'
import SortPage from './SortPage'
import MazePage from './MazePage'

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
      </Section>
    </Section>
  );
}

export default App
