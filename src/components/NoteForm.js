import { useState } from 'react'

const NoteForm = ( { createNote } ) => {
  const [newNote, setNewNote] = useState('new note...')

  const handleFirstClick = () => { if (newNote === 'new note...') setNewNote('') }

  const addNote = event => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      // important: Math.random() > 0.5
      important: false
    }
    createNote(noteObject)

    setNewNote('')
  }

  return (
    <div className='formDiv'>
      <h2>Create a new note</h2>
      <form onSubmit={addNote} >
        <input
          id='new-note'
          onFocus={handleFirstClick}
          value={newNote}
          onChange={({ target }) => setNewNote(target.value)}
        />
        <button id='submit-note' type='submit'>Add</button>
      </form>
    </div>
  )
}

export default NoteForm