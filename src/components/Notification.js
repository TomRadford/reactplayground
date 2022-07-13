import { Alert } from 'react-bootstrap'

const Notification = ( { message } ) => {

  if (message === null) {
    return null
  }

  return (
    <div className="container">
      <Alert variant='primary'>{message}</Alert>
    </div>
  )
}


export default Notification