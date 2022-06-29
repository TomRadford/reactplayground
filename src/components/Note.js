import { Link } from 'react-router-dom'

const Note = ({ note, toggleImportance, user }) => {
  const label = note.important
    ? 'make not important'
    : 'make important'

  const makeImportant = () => {
    if (user)
      return ( <button onClick={toggleImportance}>{label}</button> )
  }
  return (
    <li className='note'>
      <span><Link to={`/note/${note.id}`}>{note.content}</Link> </span>
      {makeImportant()}
    </li>
  )
}

export default Note