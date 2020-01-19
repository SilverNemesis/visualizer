import React from 'react'

const Row = ({ children, className, ...attributes }) => {
    const classes = ['row']
    if (className) classes.push(className)
    return (<div className={classes.join(' ')} {...attributes}>{children}</div>)
}

export default Row