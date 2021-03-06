import React, { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import NotePage from './components/NotePage'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'
import {
  Container,
  TableBody,
  TableContainer,
  Table,
  Paper,
  AppBar,
  Button,
  Toolbar,
  IconButton
} from '@mui/material'
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useMatch,
} from 'react-router-dom'
import { ButtonSC, InputSC } from './components/StyledComponents'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16,
  }
  const d = new Date()
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki{' '}
        {d.getFullYear()}
      </em>
    </div>
  )
}

//custom hook
const useCounter = () => {
  const [value, setValue] = useState(0)
  const increase = () => {
    setValue(value + 1)
  }
  const decrease = () => {
    setValue(value - 1)
  }
  const zero = () => {
    setValue(0)
  }
  return {
    value,
    increase,
    decrease,
    zero,
  }
}

const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    value,
    onChange,
    type,
  }
}

const App = () => {
  const [notes, setNotes] = useState([])

  const [showAll, setShowAll] = useState(true)
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const noteFormRef = useRef()

  useEffect(() => {
    console.log('effect')
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNotappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  console.log('render', notes.length, 'notes')

  const createLogin = async (userObject) => {
    try {
      // console.log(await loginService.getAllUsers())
      const user = await loginService.login(userObject)
      noteService.setToken(user.token)
      window.localStorage.setItem('loggedNotappUser', JSON.stringify(user))
      setUser(user)
      setMessage(`Welcome ${user.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      // console.log(exception)
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const createNote = (noteObject) => {
    noteFormRef.current.toggleVisibility()
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote))
    })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find((note) => note.id === id)
    console.log(note)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch(() => {
        setMessage(`Note: ${note.content} was already deleted from the server`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const match = useMatch('/note/:id')
  const note = match ? notes.find((note) => note.id === match.params.id) : null
  const noteForm = () => (
    <Togglable buttonLabel="Add a note" ref={noteFormRef}>
      <NoteForm createNote={createNote} />
    </Togglable>
  )

  const Notes = () => (
    <div>
      <h1>Notes</h1>
      {user !== null && noteForm()}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {notesToShow.map((note) => (
              <Note
                key={note.id}
                note={note}
                toggleImportance={() => toggleImportanceOf(note.id)}
                user={user}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )

  const Login = () => (
    <div>
      <Togglable buttonLabel="login">
        <LoginForm createLogin={createLogin} />
      </Togglable>
    </div>
  )

  // const padding = { padding: '5px' }

  const HomePage = () => {
    const navigate = useNavigate()
    const counter = useCounter()
    const name = useField('text')
    const born = useField('date')
    const height = useField('number')
    return (
      <div>
        <h3>Welcome to the note app!</h3>
        <div>
          <div>{counter.value}</div>
          <ButtonSC onClick={() => counter.increase()}>plus</ButtonSC>
          <ButtonSC onClick={() => counter.decrease()}>minus</ButtonSC>
          <ButtonSC onClick={() => counter.zero()}>zero</ButtonSC>
        </div>

        <form>
          Name:
          <InputSC {...name}></InputSC>
          Born:
          <InputSC {...born}></InputSC>
          Height:
          <InputSC {...height}></InputSC>
        </form>

        <button onClick={() => navigate('/notes')}>Go to notes!</button>
      </div>
    )
  }

  return (
    <Container>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/notes">
            Notes
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
          {user ? (
            <em>{user.name} is logged in!</em>
          ) : (
            <Button color="inherit" component={Link} to="/login">login</Button>
          )}
        </Toolbar>
      </AppBar>

      <Notification message={message} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes" element={<Notes />} />
        <Route
          path="/users"
          element={
            user ? (
              <div>user list to go here</div>
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <Login />}
        />
        <Route path="/note/:id" element={<NotePage note={note} />} />
      </Routes>

      <Footer />
    </Container>
  )
}

export default App
