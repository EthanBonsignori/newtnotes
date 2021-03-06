import React, { Component } from 'react'
import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import MyNavbar from './MyNavbar'
import PlusButton from './PlusButton'

// TODO: Auth!
// import API from '../utils/API'
// import * as actions from '../actions/userActions'

class Layout extends Component {
  async componentDidMount () {
    // const user = await API.getUser()
    // console.log(user)
  }

  render () {
    return (
      <>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta charSet='utf-8' />
          <title>{this.props.title}</title>
          <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
          <link rel='stylesheet' href='/static/styles.css' />
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/quill/1.3.6/quill.snow.css' />
          <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' />
        </Head>
        <MyNavbar />
        <Container>
          <div className='mt-5'>
            {this.props.children}
          </div>
        </Container>
        {this.props.floatingButton ? <PlusButton /> : null}
      </>
    )
  }
}

export default Layout
