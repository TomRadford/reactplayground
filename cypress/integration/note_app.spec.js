describe('Note app', function() {
  beforeEach(function() {
    cy.request('POST','http://localhost:3000/api/testing/reset')
    const user = {
      username: 'tom',
      password: '1234',
      name: 'Tom Radford'
    }
    cy.request('POST', 'http://localhost:3000/api/users', user)
    cy.visit('http://localhost:3000/')
  })

  it('login fails with incorrect password', function() {
    cy.contains('login').click()
    cy.get('#username').type('tom')
    cy.get('#password').type('325')
    cy.get('#login-button').click()
    cy.get('.error').should('contain','Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'Tom Radford logged in!')
  })

  it('front page can be opened',  function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })
  it('login form can be opened', function() {
    cy.contains('login').click()
  })
  it('user can login', function() {
    cy.contains('login').click()
    cy.get('#username').type('tom')
    cy.get('#password').type('1234')
    cy.get('#login-button').click()

    cy.contains('Tom Radford logged in!')
  })
  describe('when logged in', function() {
    beforeEach(function(){
      cy.login({ username: 'tom', password: '1234' })
    })

    it('a new note can be created', function() {
      cy.contains('Add a note').click()
      cy.get('input').type('This is a new test note by cypress')
      cy.get('#submit-note').click()
      cy.contains('This is a new test note by cypress')
    })
    describe('and several notes exists', function() {
      beforeEach(function() {
        cy.createNote({
          content: 'first note',
          important: false
        })
        cy.createNote({
          content: 'second note',
          important: false
        })
        cy.createNote({
          content: 'third note',
          important: false
        })
      })
      it('it can be made important', function() {
        cy.contains('second note').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
      it('then eg', function() {
        cy.get('button').then( buttons => {
          console.log(`no buttons = ${buttons.length}`)
          cy.wrap(buttons[0]).click()
        })
      })
    })
  })

})