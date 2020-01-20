import React from 'react'
import { NavBar, NavBarToggler, NavBarNav } from '../primitives'
import { Link } from 'react-router-dom'

class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false
        }
        this.onClickExpand = this.onClickExpand.bind(this)
    }

    onClickExpand() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {
        return (
            <NavBar large dark>
                <Link to="/" className="navbar-brand"><h1>Visualizer</h1></Link>
                <NavBarToggler expanded={this.state.expanded} onClick={this.onClickExpand}>
                    <NavBarNav>
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/sort" className="nav-link">Sort</Link>
                        <Link to="/maze" className="nav-link">Maze</Link>
                    </NavBarNav>
                </NavBarToggler>
            </NavBar>
        )
    }
}

export default Navigation