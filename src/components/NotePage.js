const NotePage = ({ note }) => {
  if (note) {
    return (
      <div>
        <h2>{note.content}</h2>
        <div>by: {note.user.name}</div>
        <div><strong>{note.important ? 'important' : ''}</strong></div>
      </div>
    )
  }
}

export default NotePage



// import { useParams } from 'react-router-dom'

// const NotePage = ({ notes }) => {
//   const id = useParams().id
//   const note = notes.find(n => n.id === id)
//   if (note) {
//     return (
//       <span>{note.content}</span>
//     )
//   }
// }

// export default NotePage