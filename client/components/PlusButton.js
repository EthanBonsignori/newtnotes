import React, { Component } from 'react'
import Router from 'next/router'
import { FloatingMenu, MainButton, ChildButton } from 'react-floating-button-menu'
import MdAdd from '@material-ui/icons/Add'
import MdClose from '@material-ui/icons/Clear'
import MdPerson from '@material-ui/icons/Person'
import MdCreate from '@material-ui/icons/Create'

class PlusButton extends Component {
  constructor (props) {
    super(props)
    this.state = { isOpen: false }
  }

  render () {
    const bgStyle = { background: 'linear-gradient(45deg, rgb(254, 107, 139) 30%, rgb(255, 142, 83) 90%)' }

    return (
      <div className='floating-menu-container'>
        <FloatingMenu
          slideSpeed={500}
          direction='up'
          spacing={20}
          isOpen={this.state.isOpen}
        >
          <MainButton
            style={bgStyle}
            iconResting={<MdAdd style={{ fontSize: 20, color: 'white' }} />}
            iconActive={<MdClose style={{ fontSize: 20, color: 'white' }} />}
            backgroundColor='white'
            onClick={() => this.setState({ isOpen: !this.state.isOpen })}
            size={56}
          />
          <ChildButton
            icon={<MdCreate style={{ fontSize: 20, color: 'white' }} />}
            background='linear-gradient(45deg, rgb(254, 107, 139) 30%, rgb(255, 142, 83) 90%)'
            size={40}
            onClick={() => Router.push('/newjournal')}
          />
          <ChildButton
            style={bgStyle}
            icon={<MdPerson style={{ fontSize: 20, color: 'white' }} />}
            background='linear-gradient(45deg, rgb(254, 107, 139) 30%, rgb(255, 142, 83) 90%)'
            size={40}
            onClick={() => Router.push('/newcontact')}
          />
        </FloatingMenu>

        <style jsx>{`
          .floating-menu-container {
            position: fixed;
            bottom: 60px;
            right: 60px;
        `}</style>
      </div>
    )
  }
}

export default PlusButton
