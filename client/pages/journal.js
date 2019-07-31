import React, { Component } from 'react'
import ReactHtmlParser from 'react-html-parser'
import Link from 'next/link'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import MdCreate from '@material-ui/icons/Create'
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
        {this.state.journals.length
          ? <Tab.Container id='journal-tabs' defaultActiveKey='#journal1'>
            <Row>
              <Col sm={4}>
                <ListGroup>
                  {this.state.journals.map((journal, i) => (
                    <ListGroup.Item action key={journal._id} href={`#journal${i}`}>
                      Journal {i}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  {this.state.journals.map((journal, i) => (
                    <Tab.Pane key={journal._id} eventKey={`#journal${i}`}>
                      <div className='ql-editor'>
                        <div>
                          {ReactHtmlParser(journal.journal)}
                        </div>
                      </div>
                    </Tab.Pane>
                  )
                  )}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
          : <div className='text-center mt-5'>
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
