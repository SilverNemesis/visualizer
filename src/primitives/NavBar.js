import React from 'react'

const NavBar = ({ children, className, vertical, small, medium, large, extralarge, primary, secondary, success, danger, warning, info, light, dark, ...attributes }) => {
    const classes = ['navbar']
    if (!vertical) {
        if (small) classes.push('navbar-expand-sm')
        else if (medium) classes.push('navbar-expand-md')
        else if (large) classes.push('navbar-expand-lg')
        else if (extralarge) classes.push('navbar-expand-xl')
        else classes.push('navbar-expand-sm')
    }
    if (primary) classes.push('navbar-primary')
    else if (secondary) classes.push('navbar-secondary')
    else if (success) classes.push('navbar-success')
    else if (danger) classes.push('navbar-danger')
    else if (warning) classes.push('navbar-warning')
    else if (info) classes.push('navbar-info')
    else if (light) classes.push('navbar-light')
    else if (dark) classes.push('navbar-dark')
    if (light) classes.push('bg-light')
    else if (dark) classes.push('bg-dark')
    else classes.push('bg-light')
    if (className) classes.push(className)
    return (<nav className={classes.join(' ')} {...attributes}>{children}</nav>)
}

export default NavBar