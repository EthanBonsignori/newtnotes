import React, { Component } from 'react'
import Head from 'next/head'
import MyNavbar from './MyNavbar'
import PlusButton from '../components/PlusButton'
import * as actions from '../actions/userActions'

class Layout extends Component {
  async componentDidMount () {
    try {
      const response = await window.fetch('http://localhost:3001/auth/user', { method: 'GET' })
      if (response.ok) {
        const user = response.json()
        console.log(user)
      }
    } catch (error) {
      throw error
    }
  }

  render () {
    return (
      <div>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='utf-8' />
          <title>{this.props.title}</title>
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.6/quill.snow.css' />
        </Head>
        <MyNavbar />
        {this.props.children}
        <PlusButton />
      </div>
    )
  }
}

export default Layout
