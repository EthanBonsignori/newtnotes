import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const DeleteJournalModal = props => {
  return (
    <Modal show={props.modal} onHide={props.toggleModal} centered>
      <Modal.Header closeButton>
        <span className='lead'>Confirm Deletion</span>
      </Modal.Header>
      <Modal.Body>
        <div className='text-center'>
          <h3>Permanently delete Journal?</h3>
          <Button style={{ margin: '1rem' }}variant='danger' onClick={props.deleteJournal}>Delete</Button>
          <Button style={{ margin: '1rem' }}variant='secondary' onClick={props.toggleModal}>Cancel</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default DeleteJournalModal
