import React from 'react'
import { Route } from 'react-router-dom'
import Navigation from './Navigation'
import { Section } from '../primitives'
import Home from './Home'
import Sort from './Sort'

const App = () => {
  return (
    <Section outer>
      <Section>
        <Navigation />
      </Section>
      <Section grow center>
        <Route exact path="/" component={Home} />
        <Route path="/sort" component={Sort} />
      </Section>
    </Section>
  );
}

export default App
