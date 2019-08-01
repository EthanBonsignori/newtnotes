import React, { Component } from 'react'
import moment from 'moment'
import Button from 'react-bootstrap/Button'
import MdCreate from '@material-ui/icons/Create'
import MdDelete from '@material-ui/icons/Delete'
import DeleteJournalModal from './DeleteJournalModal'

class JournalItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modal: false
    }

    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal () {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render () {
    const { title, contactLinks, updatedAt, createdAt } = this.props.journal
    return (
      <div className='journal'>
        <div className='journal-wrapper'>
          <div className='title'>
            <span className='display-4'>{title}</span>
          </div>
          <div className='info'>
            <div className='info-block'>
              <span>{moment.utc(createdAt).format('D/MM/YYYY')}</span>
              <span> Updated</span>
            </div>
            <div className='info-block'>
              <span>{moment.utc(updatedAt).format('D/MM/YYYY')}</span>
              <span> Created</span>
            </div>
            <div className='info-block'>
              <span>{contactLinks.length}</span>
              <span> Contact&nbsp;Links</span>
            </div>
          </div>
          <div className='edit'>
            <Button variant='success' onClick={this.props.editJournal}><MdCreate /></Button>
          </div>
          <div className='delete'>
            <Button variant='danger'onClick={this.toggleModal}><MdDelete /></Button>
          </div>
        </div>
        <DeleteJournalModal
          modal={this.state.modal}
          toggleModal={this.toggleModal}
          deleteJournal={this.props.deleteJournal}
        />
        <style jsx>{`
          .journal {
            color: #fff;
            position: relative;
            margin: 0.5rem;
            background-color: #444;
            border-radius: 4px;
            padding: 0.75rem;
            overflow: hidden;
          }
          .journal:hover {
            background-color: #333;
          }
          .journal:active {
            background-color: #222;
          }
          .journal-wrapper {
            height: 100%;
            width: 100%;
            min-height: 67px;
          }
          .title {
            display: inline-block;
            max-width: 750px;
            height: 59px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .display-4 {
            font-size: 2.8rem;
            margin-right: 10px;
          }
          .info {
            position: absolute;
            bottom: 10px;
            display: inline-block;
          }
          .info-block {
            display: inline-block;
            width: 90px;
            height: 60px;
            text-align: center;
            margin-top: 10px;
            margin-left: 10px;
          }
          .info-block > span {
            font-size: 0.85rem;
          }
          .info-block > span:nth-child(1) {
            font-weight: bold;
          }
          .edit {
            position: absolute;
            right: 66px;
            bottom: 8px;
          }
          .edit-button {
            height: 49.77px !important;
            width: 34.5px !important;
          }
          .delete {
            position: absolute;
            right: 8px;
            bottom: 8px;
          }
        `}</style>
      </div>
    )
  }
}

export default JournalItem
