import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import moment from 'moment'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import MdCreate from '@material-ui/icons/Create'
import MdSearch from '@material-ui/icons/Search'
import Layout from '../components/Layout'
import JournalItem from '../components/JournalItem'
import API from '../utils/API'
import JournalDateHead from '../components/JournalDateHead'

class Journal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      journals: [],
      search: ''
    }

    this.handleChangeSearch = this.handleChangeSearch.bind(this)
  }

  async componentDidMount () {
    const journals = await API.getJournals()
    this.setState({ journals })
  }

  handleChangeSearch (event) {
    this.setState({ search: event.target.value.toLowerCase() })
  }

  editJournal (id) {
    Router.push({ pathname: '/newjournal', query: { id } })
  }

  async deleteJournal (id) {
    const res = await API.deleteJournal(id)
    if (res) {
      const newJournals = [...this.state.journals].filter(value => {
        return value._id !== res.id
      })

      return this.setState({ journals: newJournals })
    }
    // TODO: Display error on error
    console.error('Unable to delete journal')
    this.setState({ error: 'Unable to delete journal' })
  }

  render () {
    const { journals } = this.state

    let currentDate
    let journalDates = []
    let journalsView = []

    if (journals && journals.length) {
      for (const journal of journals) {
        journalDates.push(moment(journal.updatedAt).fromNow())
        if (journal.title.toLowerCase().includes(this.state.search)) {
          const date = moment(journal.updatedAt).fromNow()
          if (date !== currentDate) {
            currentDate = date
            journalsView.push(<JournalDateHead key={date} date={date} />)
          }
          journalsView.push(
            <JournalItem
              key={journal._id}
              journal={journal}
              editJournal={() => this.editJournal(journal._id)}
              deleteJournal={() => this.deleteJournal(journal._id)}
            />
          )
        }
      }
    }

    return (
      <Layout title='Newtnotes | Journal'>
        {journals && journals.length
          ? <>
            <Row noGutters>
              <Col sm={10}>
                <InputGroup className='mb-3 form-inline'>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <MdSearch />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    type='text'
                    placeholder='Search Journals...'
                    value={this.state.search}
                    onChange={this.handleChangeSearch}
                  />
                </InputGroup>
              </Col>
              <Col sm={2}>
                <Link href='/newjournal'>
                  <Button variant='dark' className='float-right'>
                    <MdCreate /> Create Journal
                  </Button>
                </Link>
              </Col>
            </Row>

            { journalsView }
          </> : <div className='text-center mt-5'>
            <p className='display-3'>Uh oh! No journals found.</p>
            <p className='lead' style={{ fontSize: '3rem' }}>Try creating one below.</p>
            <Link href='/newjournal'>
              <Button variant='dark' className='mt-3'>
                <MdCreate /> Create Journal
              </Button>
            </Link>
          </div>
        }
      </Layout>
    )
  }
}

export default Journal
