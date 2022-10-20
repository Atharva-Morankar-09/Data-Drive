import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NavbarComponent() {

    return (
        <Navbar bg='info'  expand="xs">
            <Navbar.Brand as={Link} to='/' className="mx-4">
                Data Drive
            </Navbar.Brand>
            <Nav >
                <Nav.Link as={Link} to="/user" className='mx-4'> 
                    Account
                </Nav.Link>
            </Nav>
        </Navbar>
    )
}
