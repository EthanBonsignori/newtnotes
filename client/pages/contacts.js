import React, { Component } from 'react'
import Layout from '../components/Layout'
import API from '../utils/API'

class Contacts extends Component {
  constructor (props) {
    super(props)

    this.state = { contacts: [] }
  }

  async componentDidMount () {
    const contacts = await API.getContacts()
    this.setState({ contacts })
  }

  render () {
    return (
      <Layout title='Newtnotes | Contacts'>
        <div>
          <h1>Contacts</h1>
          {this.state.contacts.map((contact, i) => (
            <div key={i} style={{ border: '1px solid black', marginTop: '-1px' }}>
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
