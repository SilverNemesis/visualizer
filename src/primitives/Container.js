import React from 'react'

const Container = ({ children, className, fluid, ...attributes }) => {
    const classes = [fluid ? 'container-fluid' : 'container']
    if (className) classes.push(className)
    return (<div className={classes.join(' ')} {...attributes}>{children}</div>)
}

export default Container