import { useState } from 'react'

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

      <form onSubmit={addLogin}>
        <div>
          username
          <input
            type="text"
            name="Username"
            id="username"
            value={username}
            onChange={({ target }) => {
              setUsername(target.value)
              setTimeout(() => {
                console.log(username)
              },1000)
            }}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="Password"
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm