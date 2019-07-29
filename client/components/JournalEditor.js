import React, { Component } from 'react'
import MdSave from '@material-ui/icons/Save'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import API from '../utils/API'
import ContactPopup from './ContactPopup'
import { modules, formats } from '../config/quillConfig'

let ReactQuill = null
class JournalEditor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      journal: '',
      title: '',
      loaded: false,
      index: undefined
    }

    this.handleChangeEditor = this.handleChangeEditor.bind(this)
    this.handleChangeTitle = this.handleChangeTitle.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.attachQuillRefs = this.attachQuillRefs.bind(this)

    this.reactQuillRef = null // ReactQuill component
    this.quill = null // Quill Helper
  }

  handleChangeEditor (value) {
    const journal = value
    let index
    const selection = this.quill.getSelection()
    if (selection) index = selection.index
    this.setState({ journal, index })
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

  attachQuillRefs () {
    if (typeof this.reactQuillRef.getEditor !== 'function') return
    this.quill = this.reactQuillRef.getEditor()
  }

  componentDidMount () {
    if (typeof window !== 'undefined') {
      ReactQuill = require('react-quill')
      this.setState({
        loaded: true
      }, () => {
        this.attachQuillRefs()
      })
    }
  }

  componentDidUpdate () {
    if (typeof window !== 'undefined') {
      this.attachQuillRefs()
    }
  }

  render () {
    let view = 'Loading'

    if (this.state.loaded) {
      view = <>
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
          {ReactQuill ? <ReactQuill
            ref={element => { this.reactQuillRef = element }}
            modules={modules}
            formats={formats}
            value={this.state.journal}
            onChange={this.handleChangeEditor}
          >
            {/* <div
            className='journal-editor' /> */}
          </ReactQuill> : ''}
          <Row className='align-items-center'>
            {/* <div className='bottom-bar'> */}
            <Col sm={11} xs={11}>
              <ContactPopup
                quill={this.quill}
                index={this.state.index}
              />
            </Col>
            <Col sm={1} xs={1} className='pl-0 align-self-center'>
              <button className='save-journal' onClick={this.handleSubmit}>
                <MdSave /> Save
              </button>
            </Col>
            {/* </div> */}
          </Row>
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
          .top-bar {
            min-height: 5vh;
            border: 1px solid #CCCCCC;
            border-bottom: none;
            padding: 0 16px;
          }
          .bottom-bar {
            min-height: 5vh;
            width: 100%;
            border: 1px solid #CCCCCC;
            border-top: none;
            padding: 0 16px;
          }
          .popup-placeholder {
            display: inline;
            height: 5vh;
          }
          .save-journal {
            float: right;
            display: inline;
            height: 5vh;
            color: #444;
            background: none;
            border: none;
          }
        `}</style>
      </>
    }

    return (<>{view}</>)
  }
}

export default JournalEditor
