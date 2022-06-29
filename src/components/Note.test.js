import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import  userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', async () => {
  const note = {
    content: 'Does not work anymore :(',
    important: true
  }

  //   const { container } = render(<Note note={note} />)
  render(<Note note={note}/>)
  const element = await screen.findByText('Does not work anymore :(')
  expect(element).toBeDefined()

  const secondElement = screen.queryByText('do not want to see this')
  expect(secondElement).toBeNull()
  //   const div = container.querySelector('.note')
//   expect(div).toHaveTextContent(
//     'Component testing is done with react-testing-library'
//   )
})

test('clicking the button calls the event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = jest.fn()
  const mockUser = { username: 'test' }

  render (
    <Note note={note} toggleImportance={mockHandler} user={mockUser}/>
  )

  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})