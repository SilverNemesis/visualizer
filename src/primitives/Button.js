import React from 'react'
import { isArray } from 'util';

const stylesToClass = (styles) => {
    if (!isArray(styles)) {
        styles = styles.split(' ')
    }

    const primary = styles.includes('primary')
    const secondary = styles.includes('secondary')
    const success = styles.includes('success')
    const danger = styles.includes('danger')
    const warning = styles.includes('warning')
    const info = styles.includes('info')
    const light = styles.includes('light')
    const dark = styles.includes('dark')
    const link = styles.includes('link')
    const outline = styles.includes('outline')
    const large = styles.includes('large')
    const small = styles.includes('small')
    const block = styles.includes('block')

    const classes = ['btn']
    if (primary) outline ? classes.push('btn-outline-primary') : classes.push('btn-primary')
    else if (secondary) outline ? classes.push('btn-outline-secondary') : classes.push('btn-secondary')
    else if (success) outline ? classes.push('btn-outline-success') : classes.push('btn-success')
    else if (danger) outline ? classes.push('btn-outline-danger') : classes.push('btn-danger')
    else if (warning) outline ? classes.push('btn-outline-warning') : classes.push('btn-warning')
    else if (info) outline ? classes.push('btn-outline-info') : classes.push('btn-info')
    else if (light) outline ? classes.push('btn-outline-light') : classes.push('btn-light')
    else if (dark) outline ? classes.push('btn-outline-dark') : classes.push('btn-dark')
    else if (link) outline ? classes.push('btn-outline-link') : classes.push('btn-link')
    else outline ? classes.push('btn-outline-primary') : classes.push('btn-primary')
    if (large) classes.push('btn-lg')
    if (small) classes.push('btn-sm')
    if (block) classes.push('btn-block')

    return classes
}

const Button = ({ children, className, styles, ...attributes }) => {
    const classes = stylesToClass(styles)
    if (className) classes.push(className)
    return (<button className={classes.join(' ')} {...attributes}>{children}</button>)
}

export default Button