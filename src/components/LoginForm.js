import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const LoginForm = ({ createLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const addLogin = (event) => {
    event.preventDefault()
    const userObject = { username, password }
    createLogin(userObject)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={addLogin}>
        <div>
          <TextField
            label="Username"
            id="username"
            value={username}
            onChange={({ target }) => {
              setUsername(target.value)
            }}
          />
        </div>
        <div>
          <TextField label="password"
            name="Password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <Button variant="primary" type="submit">
            login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
