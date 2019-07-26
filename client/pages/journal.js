import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Layout from '../components/Layout'
import API from '../utils/API'

class Journal extends Component {
  constructor (props) {
    super(props)
    this.state = { journals: [] }
  }

  async componentDidMount () {
    const journals = await API.getJournals()
    this.setState({ journals })
  }

  render () {
    return (
      <Layout title='Newtnotes | Journal'>
        <h1>Journal</h1>
        {this.state.journal
          ? <div className='ql-editor'>
            <ul>
              {this.state.journals.map(journal => (
                <li key={journal._id} style={{ border: '1px solid black' }}>
                  {ReactHtmlParser(journal.journal)}
                </li>
              )
              )}
            </ul>
          </div>
          : <h2>No Journals found</h2>
        }
        <style jsx>{`
          ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }

          ul li {
            border: 1px solid #444;
            margin-top: -1px;
            padding: 12px;
          }
        `}</style>
      </Layout>
    )
  }
}

export default Journal
