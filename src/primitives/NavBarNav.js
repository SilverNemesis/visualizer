import React from 'react'

const NavBarNav = ({ children, className, ...attributes }) => {
    const classes = ['navbar-nav']
    if (className) classes.push(className)
    return (<div className={classes.join(' ')} {...attributes}>{children}</div>)
}

export default NavBarNav