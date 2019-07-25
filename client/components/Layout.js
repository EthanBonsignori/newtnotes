import React, { Component } from 'react'
import Head from 'next/head'
import MyNavbar from './MyNavbar'
import PlusButton from '../components/PlusButton'
import API from '../utils/API'
import * as actions from '../actions/userActions'

class Layout extends Component {
  async componentDidMount () {
    const user = await API.getUser()
    // console.log(user)
    // console.log(document.cookie)
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
