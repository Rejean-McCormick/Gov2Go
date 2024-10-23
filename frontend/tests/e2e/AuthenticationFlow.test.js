// /frontend/tests/e2e/AuthenticationFlow.test.js
describe('Authentication Flow', () => {
  const validCredentials = {
    username: 'testUser',
    password: 'ValidPassword123',
  };

  const invalidCredentials = {
    username: 'invalidUser',
    password: 'wrongPassword',
  };

  beforeEach(() => {
    // Set up the environment or visit the login page before each test
    cy.visit('/login');
  });

  it('Test valid login credentials', () => {
    // Input valid login details
    cy.get('input[name="username"]').type(validCredentials.username);
    cy.get('input[name="password"]').type(validCredentials.password);
    
    // Submit the form
    cy.get('button[type="submit"]').click();
    
    // Verify that the user is redirected to the dashboard after successful login
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome back, testUser');
  });

  it('Test invalid login attempts', () => {
    // Input invalid login details
    cy.get('input[name="username"]').type(invalidCredentials.username);
    cy.get('input[name="password"]').type(invalidCredentials.password);
    
    // Submit the form
    cy.get('button[type="submit"]').click();
    
    // Check that the error message is displayed
    cy.contains('Invalid username or password');
    
    // Ensure user is not redirected
    cy.url().should('include', '/login');
  });

  it('Test user registration flow', () => {
    // Navigate to the registration page
    cy.visit('/register');

    // Fill in the registration form
    cy.get('input[name="username"]').type('newUser');
    cy.get('input[name="email"]').type('newUser@example.com');
    cy.get('input[name="password"]').type('NewValidPassword123');
    cy.get('input[name="confirmPassword"]').type('NewValidPassword123');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Verify the user is redirected and authenticated
    cy.url().should('include', '/dashboard');
    cy.contains('Welcome, newUser');
  });
});
 
