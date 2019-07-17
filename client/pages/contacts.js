import React, { Component } from 'react'
import Layout from '../components/Layout'

class Contacts extends Component {
  constructor (props) {
    super(props)

    this.state = { contacts: [] }
  }

  async componentWillMount () {
    const rawResponse = await window.fetch('http://localhost:3001/contact', { method: 'GET' })
    const contacts = await rawResponse.json()
    this.setState({ contacts })
  }

  render () {
    return (
      <Layout title='Newtnotes | Contacts'>
        <div>
          <h1>Contacts</h1>
          {this.state.contacts.map((contact, i) => (
            <div key={i} style={{ border: '1px solid black' }}>
              <p>{contact.name}</p>
              <p>{contact.nickname || ''}</p>
              <p>{contact.phone}</p>
              <p>{contact.email}</p>
            </div>
          ))}
        </div>
      </Layout>
    )
  }
}

export default Contacts
