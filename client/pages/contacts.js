import React, { Component } from 'react'
import Link from 'next/link'
import Button from 'react-bootstrap/Button'
import MdPerson from '@material-ui/icons/person'
import Layout from '../components/Layout'
import API from '../utils/API'
import groupContacts from '../utils/groupContacts'

class Contacts extends Component {
  constructor (props) {
    super(props)

    this.state = {
      contacts: [],
      groupedContacts: {}
    }
  }

  async componentDidMount () {
    const contacts = await API.getContacts()
    this.setState({ contacts })
    const groupedContacts = groupContacts(this.state.contacts)
    console.log(groupContacts)
    this.setState({ groupedContacts })
  }

  render () {
    return (
      <Layout title='Newtnotes | Contacts'>
        {this.state.contacts
          ? <div>
            {console.log(this.state.contacts)}
            {this.state.contacts.map((contact, i) => (
              <div key={contact._id} style={{ border: '1px solid black', marginTop: '-1px' }}>
                <p>{contact.name}</p>
                <p>{contact.nickname || ''}</p>
                <p>{contact.phone}</p>
                <p>{contact.email}</p>
              </div>
            ))}
          </div>
          : <div className='text-center mt-5'>
            <p className='display-3'>Uh oh! No contacts found.</p>
            <p className='lead' style={{ fontSize: '3rem' }}>Try creating one below.</p>
            <Link href='/newcontact'>
              <Button variant='dark' className='mt-3'>
                <MdPerson /> Create Contact
              </Button>
            </Link>
          </div>
        }
      </Layout>
    )
  }
}

export default Contacts
