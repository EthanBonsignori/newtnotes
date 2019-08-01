import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Layout from '../components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import MdPerson from '@material-ui/icons/Person'
import MdDone from '@material-ui/icons/Done'
import MdDoneAll from '@material-ui/icons/DoneAll'
import MdVpnKey from '@material-ui/icons/VpnKey'

const Index = () => (
  <Layout title='Newtnotes | Home' floatingButton={false}>
    <Row>
      <Col className='text-center'>
        <span className='display-1'>Welcome to Newtnotes</span>
      </Col>
    </Row>
    <Row className='divider-parent'>
      <div className='divider' />
      <Col sm={6} className='column'>
        <span className='display-4'>
          New User
        </span>
        <InputGroup className='mb-3 mt-5 pr-5 pl-5'>
          <InputGroup.Prepend>
            <InputGroup.Text><MdPerson /></InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl id='username' placeholder='Username' />
        </InputGroup>
        <InputGroup className='mb-3 pr-5 pl-5'>
          <InputGroup.Prepend>
            <InputGroup.Text><MdDone /></InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl placeholder='Password' />
        </InputGroup>
        <InputGroup className='mb-3 pr-5 pl-5'>
          <InputGroup.Prepend>
            <InputGroup.Text><MdDoneAll /></InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl placeholder='Confirm password' />
        </InputGroup>
        <div style={{ width: '100%' }}>
          <Button variant='success' className='mt-2'>Sign up</Button>
        </div>
        <div style={{ width: '100%' }} className='mt-5' />
        <Button variant='outline-success' className='mt-4 ml-3'>
          <FontAwesomeIcon icon={faGoogle} />
          {' '}Google Sign up
        </Button>
        <Button variant='outline-success' className='mt-4 ml-3'>
          <FontAwesomeIcon icon={faFacebookF} />
          {' '}Facebook Sign up
        </Button>
      </Col>
      <Col sm={6} className='column'>
        <span className='display-4'>
          Existing User
        </span>
        <InputGroup className='mb-3 mt-5 pr-5 pl-5'>
          <InputGroup.Prepend>
            <InputGroup.Text><MdPerson /></InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl id='username' placeholder='Username' />
        </InputGroup>
        <InputGroup className='mb-3 pr-5 pl-5'>
          <InputGroup.Prepend>
            <InputGroup.Text><MdVpnKey /></InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl placeholder='Password' />
        </InputGroup>
        <div style={{ width: '100%' }}>
          <Button variant='primary' className='mt-2'>Login</Button>
        </div>
        <div style={{ width: '100%' }} className='mt-5' />
        <Button variant='primary' className='mt-4 ml-3'>
          <FontAwesomeIcon icon={faGoogle} />
          {' '}Google Login
        </Button>
        <Button variant='primary' className='mt-4 ml-3'>
          <FontAwesomeIcon icon={faFacebookF} />
          {' '}Facebook Login
        </Button>
      </Col>
    </Row>
  </Layout>
)

export default Index
