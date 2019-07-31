import React, { Component } from 'react'
import Link from 'next/link'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

class MyNavbar extends Component {
  render () {
    return (
      <>
        <Navbar bg='dark' variant='dark'>
          <Navbar.Brand href=''>
            <img
              alt=''
              src='/static/favicon.ico'
              width='30'
              height='30'
              className='d-inline-block align-top'
            />
            {' Newtnotes'}
          </Navbar.Brand>
          <Nav>
            <Nav.Item>
              <Link href='/journal' passHref>
                <Nav.Link>Journal</Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href='/contacts' passHref>
                <Nav.Link>Contacts</Nav.Link>
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar>
      </>
    )
  }
}

export default MyNavbar
