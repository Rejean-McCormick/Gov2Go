// /frontend/tests/e2e/UserSettingsFlow.test.js
describe('User Settings Flow', () => {
  beforeEach(() => {
    // Log in as a valid user before accessing the settings page
    cy.visit('/login');
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('should change the theme from light to dark mode', () => {
    // Navigate to the settings page
    cy.visit('/settings');

    // Change the theme to dark mode
    cy.get('button#toggleTheme').click();

    // Verify the theme change is reflected in the UI
    cy.get('body').should('have.class', 'dark-theme');

    // Save the changes
    cy.get('button#saveSettings').click();

    // Reload the page and ensure the setting persists
    cy.reload();
    cy.get('body').should('have.class', 'dark-theme');
  });

  it('should toggle notification preferences', () => {
    // Navigate to the settings page
    cy.visit('/settings');

    // Toggle the notifications setting
    cy.get('input#notifications').click();

    // Save the settings
    cy.get('button#saveSettings').click();

    // Reload and verify the notification preference persists
    cy.reload();
    cy.get('input#notifications').should('be.checked');
  });

  it('should save and load user settings correctly', () => {
    // Navigate to settings page
    cy.visit('/settings');

    // Make changes to the settings
    cy.get('input[name="email"]').clear().type('newemail@example.com');
    cy.get('input#notifications').click();
    
    // Save the settings
    cy.get('button#saveSettings').click();

    // Reload the page and confirm the settings have been saved
    cy.reload();
    cy.get('input[name="email"]').should('have.value', 'newemail@example.com');
    cy.get('input#notifications').should('be.checked');
  });
});
 
