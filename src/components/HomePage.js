import React from 'react'

const HomePage = () => {
  const code = `<Section outer>
  <Section>
    <Navigation />
  </Section>
  <Section grow center>
    <Route exact path="/" component={Home} />
    <Route path="/sort" component={Sort} />
  </Section>
</Section>`
  return (
    <pre style={{ color: 'black' }}><code>{code}</code></pre>
  )
}

export default HomePage