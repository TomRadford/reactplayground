import { Link } from 'react-router-dom'

const Note = ({ note, toggleImportance, user }) => {
  const label = note.important
    ? 'make not important'
    : 'make important'

  const makeImportant = () => {
    if (user)
      return (<button onClick={toggleImportance}>{label}</button>)
  }
  return (
    <tr>
      <td><Link to={`/note/${note.id}`}>{note.content}</Link> </td>
      <td>{note.user.name}</td>
      <td>{makeImportant()}</td>
    </tr>
  )
}

export default Note