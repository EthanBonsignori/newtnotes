import React, { Component } from 'react'
import Link from 'next/link'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import MdPerson from '@material-ui/icons/person'
import MdSearch from '@material-ui/icons/search'
import Layout from '../components/Layout'
import ContactLetterHead from '../components/ContactLetterHead'
import Contact from '../components/Contact'
import API from '../utils/API'

class Contacts extends Component {
  constructor (props) {
    super(props)

    this.state = {
      contacts: [],
      search: ''
    }

    this.handleChangeSearch = this.handleChangeSearch.bind(this)
  }

  async componentDidMount () {
    const contacts = await API.getContacts()
    this.setState({ contacts })
  }

  handleChangeSearch (event) {
    this.setState({ search: event.target.value.toLowerCase() })
  }

  render () {
    let currentLetter = ''
    let contactNames = []
    const contactsView = []
    const contacts = this.state.contacts
    for (const i in contacts) {
      const contact = contacts[i]
      contactNames.push(contact.name)
      if (contact.name.toLowerCase().includes(this.state.search)) {
        const letter = contact.name[0].toUpperCase()
        if (letter !== currentLetter) {
          currentLetter = letter
          contactsView.push(<ContactLetterHead key={letter} letter={letter} />)
        }
        contactsView.push(<Contact key={contact._id} contact={contact} />)
      }
    }
    contactNames = contactNames.join(' ')
    return (
      <Layout title='Newtnotes | Contacts'>
        {this.state.contacts
          ? <div>
            <InputGroup className='mb-3'>
              <InputGroup.Prepend>
                <InputGroup.Text id='inputGroup-sizing-default'>
                  <MdSearch />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                type='text'
                placeholder='Search Contacts...'
                value={this.state.MdSearch}
                onChange={this.handleChangeSearch}
              />
            </InputGroup>
            { contactsView }
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
