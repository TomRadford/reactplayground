import { Alert } from '@mui/material'

const Notification = ( { message } ) => {

  if (message === null) {
    return null
  }

  return (
    <Alert severity='info'>{message}</Alert>
  )
}


export default Notification