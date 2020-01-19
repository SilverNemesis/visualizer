import React from 'react'

const Col = ({ children, className, col, ...attributes }) => {
    const classes = [col ? (Array.isArray(col) ? (col.reduce((x) => (x ? (x += ' col-' + col) : (x = 'col-' + col)), undefined)) : ('col-' + col)) : ('col')]
    if (className) classes.push(className)
    return (<div className={classes.join(' ')} {...attributes}>{children}</div>)
}

export default Col