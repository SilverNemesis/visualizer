import React from 'react'

const NavBarToggler = ({ children, expanded, ...props }) => {
    return (
        <React.Fragment>
            <button className="navbar-toggler" type="button" aria-expanded={expanded} aria-label="Toggle navigation" {...props}>
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={'collapse navbar-collapse' + (expanded ? ' show' : '')}>
                {children}
            </div>
        </React.Fragment>
    )
}

export default NavBarToggler