import React, { Component } from 'react'
import Router from 'next/router'
import moment from 'moment'
import isImageUrl from 'is-image-url'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faUser, faBirthdayCake } from '@fortawesome/free-solid-svg-icons'
import MdPortrait from '@material-ui/icons/Portrait'
import MdPhone from '@material-ui/icons/Phone'
import MdEmail from '@material-ui/icons/Email'
import MdHome from '@material-ui/icons/Home'
import MdWork from '@material-ui/icons/Work'
import MdPeople from '@material-ui/icons/People'
import MdNotes from '@material-ui/icons/Notes'
import contactStore from '../stores/contactStore'
import API from '../utils/API'
import * as actions from '../actions/contactActions'

class ContactInput extends Component {
  constructor (props) {
    super(props)
    this.initalState = {
      _id: '',
      // Image
      imageUrl: 'https://i.imgur.com/U2lpZIk.jpg',
      imageUrlPlaceholder: 'https://i.imgur.com/U2lpZIk.jpg',
      imageUrlInput: '',
      invalidImageUrl: false,
      // Name
      firstName: '',
      lastName: '',
      middleName: '',
      nickname: '',
      invalidName: false,
      // Prefix/Suffix
      prefix: '',
      suffix: '',
      addPrefix: false,
      addSuffix: false,
      // Contact info
      email: '',
      phone: '',
      // Websites
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      // Additional info
      address: '',
      work: '',
      relationship: '',
      birthday: undefined,
      notes: ''
    }

    this.state = this.initalState
    this.imageInput = React.createRef()
  }

  componentDidMount () {
    const contact = contactStore.getContact()
    if (!contact) return
    if (Object.entries(contact).length !== 0 && contact.constructor === Object) {
      const { _id, imageUrl, prefix, firstName, middleName, lastName, nickname, suffix, email, phone, facebook, twitter, instagram, linkedin, address, work, relationship, notes } = contact
      let birthday = contact.birthday
      if (birthday) birthday = moment(birthday).format('YYYY-MM-DD')
      if (prefix) this.setState({ addPrefix: true })
      if (suffix) this.setState({ addSuffix: true })
      this.imageInput.current.value = imageUrl
      this.setState({
        _id,
        imageUrl,
        prefix,
        firstName,
        middleName,
        lastName,
        nickname,
        suffix,
        email,
        phone,
        facebook,
        twitter,
        instagram,
        linkedin,
        address,
        work,
        relationship,
        birthday,
        notes
      })
    }
  }

  componentWillUnmount () {
    actions.contactInputUnmount()
  }

  checkImageUrl = () => {
    if (this.state.imageUrlInput === '') {
      return this.setState({ imageUrlInput: this.state.imageUrlPlaceholder })
    }
    if (isImageUrl(this.state.imageUrlInput)) {
      this.setState({
        invalidImageUrl: false,
        imageUrl: this.state.imageUrlInput
      })
    } else this.setState({ invalidImageUrl: true })
  }

  createFullName = () => {
    let name = this.state.firstName
    if (this.state.middleName) name += ` ${this.state.middleName}`
    if (this.state.lastName) name += ` ${this.state.lastName}`
    if (this.state.suffix) name += ` ${this.state.suffix}`
    return name
  }

  handleImageChange = (event) => {
    this.setState({ imageUrlInput: event.target.value })
  }

  handleClickPrefix = () => {
    this.setState({ addPrefix: true })
  }

  handleClickSuffix = () => {
    this.setState({ addSuffix: true })
  }

  handleChange = (event) => {
    const { value, name } = event.target
    this.setState({ [name] : value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    if (this.state.invalidImageUrl) this.setState({ imageUrl: imageUrlPlaceholder })
    if (this.state.firstName === '') return this.setState({ invalidName: true })
    const name = this.createFullName()
    const { _id, imageUrl, firstName, middleName, lastName, nickname, prefix, suffix, email, phone, facebook, twitter, instagram, linkedin, address, work, relationship, birthday, notes } = this.state
    const contact = {
      _id,
      name,
      prefix,
      imageUrl,
      firstName,
      middleName,
      lastName,
      suffix,
      nickname,
      email,
      phone,
      facebook,
      twitter,
      instagram,
      linkedin,
      address,
      work,
      relationship,
      birthday,
      notes
    }
    if (this.state._id) API.putContact(contact)
    else {
      delete contact._id
      API.postContact(contact)
    }
    this.setState(() => this.initalState)
    this.setState({ imageUrl: 'https://i.imgur.com/U2lpZIk.jpg' })
    Router.push('/contacts')
  }

  render () {
    return (
      <Form onSubmit={this.handleSubmit}>
        <section className='section-border'>
          <span className='section-title lead'>Picture</span>
          <div className='mb-3 center-flex'>
            <div className='contact-pic-wrapper'>
            {this.state.invalidImageUrl
              ? <span className='invalid-image'>Invalid Image URL</span>
              : null
            }
            <img className='contact-pic' src={this.state.imageUrl} alt='invalid image url or failed to load' />
            </div>
          </div>
          <Form.Row>
            <Form.Group as={Col}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text><MdPortrait /></InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type='text'
                  onBlur={this.checkImageUrl}
                  onChange={this.handleImageChange}
                  ref={this.imageInput}
                  placeholder='Image URL*' />
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <div className='section-helper'>
            <span className='text-muted'><sup>*</sup>Must be a direct image URL</span>
          </div>
        </section>

        <section className='section-border'>
          <span className='section-title lead'>Name</span>
          {this.state.invalidName
            ? <span className='name-warning'>First name is required</span>
            : null
          }
          <Form.Row>
            <Form.Group as={Col}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faUser} style={{ margin: '0 3px' }} />
                  </InputGroup.Text>
                  {!this.state.addPrefix
                    ? <Button variant='outline-secondary' onClick={this.handleClickPrefix}>Add Prefix</Button>
                    : <Form.Control
                      type='text'
                      name='prefix'
                      placeholder='Prefix'
                      value={this.state.prefix}
                      onChange={this.handleChange} />
                  }
                </InputGroup.Prepend>
                <Form.Control
                  type='text'
                  name='firstName'
                  placeholder='First name'
                  value={this.state.firstName}
                  onChange={this.handleChange} />
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col}>
              <InputGroup>
                <Form.Control
                  type='text'
                  name='lastName'
                  placeholder='Last name'
                  value={this.state.lastName}
                  onChange={this.handleChange} />
                <InputGroup.Append>
                  {!this.state.addSuffix
                    ? <Button variant='outline-secondary' onClick={this.handleClickSuffix}>Add Suffix</Button>
                    : <Form.Control
                      type='text'
                      name='suffix'
                      placeholder='Suffix'
                      value={this.state.suffix}
                      onChange={this.handleChange} />
                  }
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <div className='section-sub'>Optional Info</div>
          <Form.Group>
            <Form.Control
              type='text'
              name='middleName'
              placeholder='Middle name'
              value={this.state.middleName}
              onChange={this.handleChange} />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type='text'
              name='nickname'
              placeholder='Nickname'
              value={this.state.nickname}
              onChange={this.handleChange} />
          </Form.Group>
        </section>

        <section className='section-border'>
          <span className='section-title lead'>Contact Info</span>
          <Form.Row>
            <Form.Group as={Col}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text><MdEmail /></InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type='email'
                  name='email'
                  placeholder='Email address'
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text><MdPhone /></InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type='phone'
                  name='phone'
                  placeholder='Phone number'
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <div className='section-sub'>Websites</div>
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faFacebook} size='lg' />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type='url'
                name='facebook'
                placeholder='Facebook'
                value={this.state.facebook}
                onChange={this.handleChange}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faTwitter} size='lg' />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type='url'
                name='twitter'
                placeholder='Twitter'
                value={this.state.twitter}
                onChange={this.handleChange}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faInstagram} size='lg' />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type='url'
                name='instagram'
                placeholder='Instagram'
                value={this.state.instagram}
                onChange={this.handleChange}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text><FontAwesomeIcon icon={faLinkedin} size='lg' /></InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type='url'
                name='linkedin'
                placeholder='LinkedIn'
                value={this.state.linkedin}
                onChange={this.handleChange}
              />
            </InputGroup>
          </Form.Group>
        </section>

        <section className='section-border'>
          <span className='section-title lead'>Additional Info</span>
          <Form.Row>
            <Form.Group as={Col}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text><MdHome /></InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type='text'
                  name='address'
                  placeholder='Address'
                  value={this.state.address}
                  onChange={this.handleChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text><MdWork /></InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type='text'
                  name='work'
                  placeholder='Work'
                  value={this.state.work}
                  onChange={this.handleChange}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text><MdPeople /></InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type='text'
                  name='relationship'
                  placeholder='Relationship'
                  value={this.state.relationship}
                  onChange={this.handleChange}
                />
              </InputGroup>
            </Form.Group>
            <Form.Group as={Col}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faBirthdayCake} size='lg' style={{ margin: '0 2.5px' }} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type='date'
                  name='birthday'
                  placeholder='Birthday'
                  value={this.state.birthday}
                  onChange={this.handleChange}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text><MdNotes /></InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control as='textarea'
                name='notes'
                placeholder='Notes'
                value={this.state.notes}
                onChange={this.handleChange}
              />
            </InputGroup>
          </Form.Group>
        </section>

        <section className='section-border'>
          <span className='section-title lead'>Submit</span>
          <Button block variant='primary' onClick={this.handleSubmit}>Save Contact</Button>
        </section>

        <style jsx>{`
            .contact-pic-wrapper {
              width: 300px;
              height: 300px;
            }
            .invalid-image {
              color: red;
              font-size: 2rem;
              position: absolute;
              left: 50%;
              transform: translate(-50%, 0);
              top: 40%;
            }
            .section-helper {
              text-align: right;
              font-size: 0.9rem;
            }
            .section-sub {
              margin-top: 1.5rem;
              margin-bottom: 1rem;
              text-align: center;
              color: #6C757D;
              font-size: 0.9rem;
            }
            .name-warning {
              position: absolute;
              top: 0;
              color: red;
            }
          `}</style>
      </Form>
    )
  }
}

export default ContactInput
