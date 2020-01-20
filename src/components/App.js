import React from 'react'
import { Route } from 'react-router-dom'
import Navigation from './Navigation'
import { Section } from '../primitives'
import Home from './Home'
import Sort from './Sort'
import Maze from './Maze'

const App = () => {
  return (
    <Section outer>
      <Section>
        <Navigation />
      </Section>
      <Section grow center>
        <Route exact path="/" component={Home} />
        <Route path="/sort" component={Sort} />
        <Route path="/maze" component={Maze} />
      </Section>
    </Section>
  );
}

export default App
