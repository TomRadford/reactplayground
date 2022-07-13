import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const LoginForm = ({ createLogin }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const addLogin = event => {
    event.preventDefault()
    const userObject = { username, password }
    createLogin(userObject)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Login</h2>

      <Form onSubmit={addLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="Username"
            id="username"
            value={username}
            onChange={({ target }) => {
              setUsername(target.value)
            }}
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="Password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant='primary' type='submit'>login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm