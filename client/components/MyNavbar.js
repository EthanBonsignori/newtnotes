import React, { Component } from 'react'
import Link from 'next/link'

class MyNavbar extends Component {
  render () {
    return (
      <nav>
        <Link href='/'><a>Newtnotes</a></Link>
        <Link href='/journal'><a>Journal</a></Link>
        <Link href='/contacts'><a>Contacts</a></Link>

      </nav>
    )
  }
}

export default MyNavbar
