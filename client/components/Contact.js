import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'

class Contact extends Component {
  toggleModal = () => {
    this.props.toggleModal(this.props.contact)
  }

  render () {
    const { prefix, name, _id, imageUrl, facebook, twitter, instagram, linkedin, journalLinks } = this.props.contact
    let fullName
    if (prefix) fullName = `${prefix} ${name}`
    else fullName = name
    return (
      <div className='contact' key={_id} onClick={this.toggleModal}>
        <div className='contact-pic-wrapper'>
          <img className='contact-pic' src={imageUrl} alt='contact-pic' />
        </div>
        <div className='text-center'>
          <span className='lead'>{fullName}</span>
        </div>
        <div className='extra-info'>
          <span>Linked Journals: {journalLinks.length}</span>
        </div>
        <div className='social-links'>
          {facebook
            ? <a href={facebook} target='_blank'>
              <FontAwesomeIcon icon={faFacebook} size='lg' />
            </a>
            : null}
          {twitter
            ? <a href={twitter} target='_blank'>
              <FontAwesomeIcon icon={faTwitter} size='lg' />
            </a>
            : null}
          {instagram
            ? <a href={instagram} target='_blank'>
              <FontAwesomeIcon icon={faInstagram} size='lg' />
            </a>
            : null}
          {linkedin
            ? <a href={linkedin} target='_blank'>
              <FontAwesomeIcon icon={faLinkedin} size='lg' />
            </a>
            : null}
        </div>
        <style jsx>{`
          .contact {
            position: relative;
            margin: 0.5rem;
            background-color: #444;
            border-radius: 4px;
            padding: 0.75rem;
          }
          .contact:hover {
            background-color: #333;
          }
          .contact:active {
            background-color: #222;
          }
          .contact-pic-wrapper {
            display: inline-block;
            border: none;
            width: 60px;
            height: 60px;
          }
          div .text-center {
            display: inline;
            color: #fff;
          }
          div .lead {
            margin-left: 10px;
            display: inline;
          }
          .extra-info {
            position: absolute;
            bottom: 0;
            left: 82px;
          }
          .extra-info > span {
            color: #D3D3D3;
          }
          .social-links {
            position: absolute;
            bottom: 4px;
            right: 10px;
          }
          .social-links > a {
            margin-left: 0.5rem;
            color: #D3D3D3;
            text-decoration: none;
          }
          .social-links > a:hover {
            color: #b2b2b2;
          }
          .social-links > a:active {
            color: #7f7f7f
          }
          .social-links > a::after {
            content: ' ';
          }
        `}</style>
      </div>
    )
  }
}

export default Contact
