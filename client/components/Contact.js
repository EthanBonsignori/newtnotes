import React, { Component } from 'react'

class Contact extends Component {
  render () {
    return (
      <div className='contact' key={this.props.contact._id}>
        <div className='profile-pic'>
          <img src={this.props.contact.profilePicture} alt='profile-pic' />}
        </div>
        <div className='text-center'>
          <p className='lead'>{this.props.contact.name}</p>
        </div>

        <style jsx>{`
          .contact {
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

          .profile-pic {
            display: inline;
          }
          
          div .profile-pic > img {
            width: 60px;
            height: 60px;
            border-radius: 50px;
            border: 1px solid #CFD0D2;
          }

          div .text-center {
            display: inline;
            color: #fff;
          }

          div .lead {
            margin-left: 10px;
            display: inline;
          }
        `}</style>
      </div>
    )
  }
}

export default Contact
