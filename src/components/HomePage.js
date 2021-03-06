import React from 'react'

const HomePage = () => {
  const code = `<Section outer>
  <Section>
    <Navigation />
  </Section>
  <Section grow center>
    <Route exact path="/" component={Home} />
    <Route path="/sort" component={Sort} />
    <Route path="/maze" component={MazePage} />
  </Section>
</Section>`
  return (
    <pre style={{ color: 'white' }}><code>{code}</code></pre>
  )
}

export default HomePage