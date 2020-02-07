import React from 'react'
import { Route } from 'react-router-dom'
import Navigation from './Navigation'
import { Section } from '../primitives'
import HomePage from './HomePage'
import SortPage from './SortPage'
import MazePage from './MazePage'
import SortPage3D from './SortPage3D'
import MazePage3D from './MazePage3D'

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
        <Route path="/sort3d" component={SortPage3D} />
        <Route path="/maze3d" component={MazePage3D} />
      </Section>
    </Section>
  );
}

export default App
