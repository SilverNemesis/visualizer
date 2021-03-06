import React from 'react'

const Section = ({ children, className, none, grow, outer, inner, center, ...attributes }) => {
    const classes = []
    if (!none) {
        classes.push('section')
        if (outer) classes.push('section-outer')
        else if (inner) classes.push('section-inner')
        else if (grow) classes.push('section-grow')
        if (center) classes.push('section-center')
    }
    if (className) classes.push(className)
    return (
        <div className={classes.join(' ')} {...attributes}>
            {children}
        </div>
    )
}

export default Section