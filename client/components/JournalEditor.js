import React, { Component, useRef } from 'react'
import dynamic from 'next/dynamic'
import MdSave from '@material-ui/icons/Save'
const ReactQuill = dynamic(import('react-quill'), { ssr: false})
import API from '../utils/API'
import ContactPopup from './ContactPopup'
import { modules, formats } from '../config/quillConfig'

class JournalEditor extends Component {
  constructor (props) {
    super(props)

    this.state = { 
      journal: '',
      title: ''
    }

    this.handleChangeEditor = this.handleChangeEditor.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeEditor (value) {
    const journal = value
    this.setState({ journal })
  }

  handleChangeTitle (event) {
    const title = event.target.value
    this.setState({ title })
  }


  async handleSubmit (event) {
    event.preventDefault()
    const journal = JSON.stringify(this.state)
    API.postJournal(journal)
  }

  render () {
    return typeof window !== 'undefined' && ReactQuill ? (
      <div>
        <ContactPopup />
        <div className='journal-wrapper'>
          <div className='top-bar'>
            <input
              className='input-title'
              type='text'
              placeholder='Title...'
              value={this.state.title}
              onChange={this.handleChangeTitle}
            />
          </div>
          <ReactQuill
            modules={modules}
            formats={formats}
          >
            <div
            value={this.state.journal}
            onChange={this.handleChangeEditor} 
            className='journal-editor' />
          </ReactQuill>
          <div className='bottom-bar'>
            <button className='save-journal' onClick={this.handleSubmit}>
              <MdSave /> Save
            </button>
          </div>
        </div>
        <style jsx>{`
          .input-title {
            border: none;
            outline: none;
            height: 5vh;
          }

          .journal-wrapper {
            height 78vh;
          }

          .journal-editor {
            height: 65vh !important;
          }

          .top-bar {
            min-height: 5vh;
            border: 1px solid #CCCCCC;
            border-bottom: none;
            padding: 0 16px;
          }
          
          .bottom-bar {
            min-height: 5vh;
            border: 1px solid #CCCCCC;
            border-top: none;
            padding: 0 16px;
          }
          .save-journal {
            float: right;
            height: 5vh;
            color: #444;
            background: none;
            border: none;
          }
        `}</style>

      </div>
    ) : <h1>Error loading journal editor</h1>
  }
}

export default JournalEditor
