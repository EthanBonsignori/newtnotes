import React, { Component } from 'react'
import Link from 'next/link'

class MyNavbar extends Component {
  render () {
    return (
      <nav>
        <Link href='/'><a>Newtnotes</a></Link>
        <Link href='/journal'><a>Journal</a></Link>
        <Link href='/contacts'><a>Contacts</a></Link>
        <div className='auth-buttons'>
          <Link href='/auth'><a>Login</a></Link>
        </div>
        <style jsx>{`
          nav {
            background-color: #222;
            padding: 1rem;
          }
          nav a {
            margin: 0 1rem;
            text-decoration: none;
            color: white
          }

          .auth-buttons {
            float: right;
          }
        `}</style>
      </nav>
    )
  }
}

export default MyNavbar
