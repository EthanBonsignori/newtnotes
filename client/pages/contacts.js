import React, { Component } from 'react'
import Link from 'next/link'
import Button from 'react-bootstrap/Button'
import MdPerson from '@material-ui/icons/person'
import Layout from '../components/Layout'
import ContactLetterHead from '../components/ContactLetterHead'
import Contact from '../components/Contact'
import API from '../utils/API'

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
    // const groupedContacts = await groupContacts(this.state.contacts)
    // this.setState({ groupedContacts })
  }

  render () {
    let currentLetter = ''
    const contactsView = []
    const contacts = this.state.contacts
    for (const contact in contacts) {
      const letter = contacts[contact].name[0].toUpperCase()
      if (letter !== currentLetter) {
        currentLetter = letter
        contactsView.push(<ContactLetterHead key={letter} letter={letter} />)
      }
      contactsView.push(<Contact contact={contacts[contact]} />)
    }
    return (
      <Layout title='Newtnotes | Contacts'>
        {this.state.contacts
          ? <div>{ contactsView }</div>
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
