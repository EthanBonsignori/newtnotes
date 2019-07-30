import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import moment from 'moment'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Modal from 'react-bootstrap/Modal'
import MdCreate from '@material-ui/icons/Create'
import MdPerson from '@material-ui/icons/Person'
import MdSearch from '@material-ui/icons/Search'
import MdEmail from '@material-ui/icons/Email'
import MdPhone from '@material-ui/icons/Phone'
import MdHome from '@material-ui/icons/Home'
import MdWork from '@material-ui/icons/Work'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import Layout from '../components/Layout'
import ContactLetterHead from '../components/ContactLetterHead'
import Contact from '../components/Contact'
import API from '../utils/API'
import * as actions from '../actions/contactActions'

class Contacts extends Component {
  constructor (props) {
    super(props)

    this.state = {
      contacts: [],
      search: '',
      contact: undefined,
      modal: false
    }

    this.handleChangeSearch = this.handleChangeSearch.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
    this.editContact = this.editContact.bind(this)
  }

  async componentDidMount () {
    const contacts = await API.getContacts()
    this.setState({ contacts })
  }

  handleChangeSearch (event) {
    this.setState({ search: event.target.value.toLowerCase() })
  }

  async toggleModal (contact) {
    this.setState(prevState => ({
      modal: !prevState.modal,
      contact
    }))
    actions.contactModalOpen(contact)
  }

  editContact () {
    Router.push('/newcontact')
  }

  daysUntilBirthday (date) {
    const birthdate = date
    const today = moment().format('YYYY-MM-DD')
    const years = moment().diff(birthdate, 'years')
    const adjustToday = birthdate.substring(5) === today.substring(5) ? 0 : 1
    const nextBirthday = moment(birthdate).add(years + adjustToday, 'years')
    const daysUntilBirthday = nextBirthday.diff(today, 'days')
    if (daysUntilBirthday === 0) return <span style={{ color: 'green', float: 'right' }}>{' '}Happy Birthday!</span>
    else return <span className='text-muted' style={{ float: 'right' }}>{' '}{daysUntilBirthday} days from now</span>
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
        contactsView.push(<Contact key={contact._id} contact={contact} toggleModal={this.toggleModal.bind(this)} />)
      }
    }
    contactNames = contactNames.join(' ')
    return (
      <Layout title='Newtnotes | Contacts'>
        {this.state.contacts.length
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
        {this.state.contact
          ? <Modal
            show={this.state.modal}
            onHide={this.toggleModal}
            size='lg'
            centered
          >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              <div className='center-flex'>
                <div className='contact-pic-wrapper'>
                  <img className='contact-pic' src={this.state.contact.imageUrl} alt='contact-pic' />
                </div>
              </div>
              <div className='text-center'>
                <span className='lead name'>{this.state.contact.name}</span>
                {this.state.contact.nickname ? <p className='lead'>"{this.state.contact.nickname}"</p> : null}
              </div>
              <Row>
                <Col sm={6}>
                  <section className='section-border mb-2 mt-2' style={{ minHeight: '184px' }}>
                    <span className='section-title lead'>Social Networks</span>
                    <ul style={{ listStyle: 'none', textAlign: 'left' }}>
                      {this.state.contact.facebook
                        ? <li><FontAwesomeIcon icon={faFacebook} size='lg' />
                          <a href={this.state.contact.facebook} target='_blank'>
                            {' '}{this.state.contact.facebook.split('.com/')[1]}
                          </a>
                        </li> : null}
                      {this.state.contact.twitter
                        ? <li><FontAwesomeIcon icon={faTwitter} size='lg' />
                          <a href={this.state.contact.twitter} target='_blank'>
                            {' '}{this.state.contact.twitter.split('.com/')[1]}
                          </a>
                        </li> : null}
                      {this.state.contact.instagram
                        ? <li><FontAwesomeIcon icon={faInstagram} size='lg' />
                          <a href={this.state.contact.instagram} target='_blank'>
                            {' '}{this.state.contact.instagram.split('.com/')[1]}
                          </a>
                        </li> : null}
                      {this.state.contact.linkedin
                        ? <li><FontAwesomeIcon icon={faLinkedin} size='lg' />
                          <a href={this.state.contact.linkedin} target='_blank'>
                            {' '}{this.state.contact.linkedin.split('.com/')[1]}
                          </a>
                        </li> : null}
                    </ul>
                  </section>
                </Col>
                <Col sm={6}>
                  <section className='section-border mb-2 mt-2' style={{ minHeight: '184px' }}>
                    <span className='section-title lead'>Contact</span>
                    <ul style={{ listStyle: 'none' }}>
                      {this.state.contact.email ? <li><MdEmail /> {this.state.contact.email}</li> : null}
                      {this.state.contact.phone ? <li><MdPhone /> {this.state.contact.phone}</li> : null}
                      {this.state.contact.address ? <li><MdHome /> {this.state.contact.address}</li> : null}
                      {this.state.contact.work ? <li><MdWork /> {this.state.contact.work}</li> : null}
                    </ul>
                  </section>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <section className='section-border mb-2 mt-3'>
                    <span className='section-title lead'>Journal Links</span>
                    {this.state.contact.journalLinks.length
                      ? <div>{this.state.contact.journalLinks.map(journal => (
                        <span>each journal</span>
                      ))}
                      </div>
                      : <div className='text-center'>
                        <Button variant='primary' onClick={() => Router.push('/newjournal')}>
                          <MdCreate /> Create Journal
                        </Button>
                      </div>}
                  </section>
                </Col>
              </Row>
              <Row>
                <Col sm={12}>
                  <section className='section-border mb-2 mt-3'>
                    <span className='section-title lead'>Notes</span>
                    {this.state.contact.notes}
                  </section>
                </Col>
              </Row>
              {this.state.contact.relationship || this.state.contact.birthday
                ? <Row>
                  {this.state.contact.relationship
                    ? <Col sm={6}>
                      <section className='section-border mb-2 mt-3'>
                        <span className='section-title lead'>Relationship</span>
                        {this.state.contact.relationship}
                      </section>
                    </Col>
                    : null}
                  {this.state.contact.birthday
                    ? <Col sm={6}>
                      <section className='section-border mb-2 mt-3'>
                        <span className='section-title lead'>Birthday</span>
                        {moment.utc(this.state.contact.birthday).format('MMMM D, YYYY')}
                        {' '}{this.daysUntilBirthday(this.state.contact.birthday)}
                      </section>
                    </Col>
                    : null}
                </Row>
                : null}
            </Modal.Body>
            <Modal.Footer>
              <Button variant='success' onClick={this.editContact}>Edit</Button>
              <Button variant='secondary' onClick={this.toggleModal}>Close</Button>
            </Modal.Footer>
          </Modal>
          : null}
        <style jsx>{`
          .center-flex {
            display: flex;
            justify-content: center;
          }
          .contact-pic-wrapper {
            border: none;
            text-align: center;
            width: 150px;
            height: 150px;
          }
          .name {
            font-size: 2rem;
          }
        `}</style>
      </Layout>
    )
  }
}

export default Contacts
