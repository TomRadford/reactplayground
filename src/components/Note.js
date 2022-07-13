import { Link } from 'react-router-dom'
import { TableRow, TableCell } from '@mui/material'

const Note = ({ note, toggleImportance, user }) => {
  const label = note.important
    ? 'make not important'
    : 'make important'

  const makeImportant = () => {
    if (user)
      return (<button onClick={toggleImportance}>{label}</button>)
  }
  return (
    <TableRow>
      <TableCell><Link to={`/note/${note.id}`}>{note.content}</Link> </TableCell>
      <TableCell>{note.user.name}</TableCell>
      <TableCell>{makeImportant()}</TableCell>
    </TableRow>
  )
}

export default Note