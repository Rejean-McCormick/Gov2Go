// File: /frontend/tests/integration/LoginView.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginView from '../../src/views/Login/LoginView'; // Adjust the import based on your directory structure
import * as authService from '../../src/services/authService'; // Mock the authService for API calls

jest.mock('../../src/services/authService');

describe('LoginView', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls
  });

  test('Test form validation for empty fields', async () => {
    render(
      <MemoryRouter>
        <LoginView />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/login/i)); // Simulate a click on the login button

    expect(await screen.findByText(/please fill out this field/i)).toBeInTheDocument(); // Check for error message
  });

  test('Test handling of invalid login credentials', async () => {
    authService.loginUser.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(
      <MemoryRouter>
        <LoginView />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'wronguser' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText(/login/i));

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument(); // Check for invalid credentials message
  });

  test('Test redirection on successful login', async () => {
    authService.loginUser.mockResolvedValueOnce({ token: 'dummy-token' });

    render(
      <MemoryRouter initialEntries={['/login']}>
        <LoginView />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/username/i), { target: { value: 'validuser' } });
    fireEvent.change(screen.getByPlaceholderText(/password/i), { target: { value: 'validpassword' } });
    fireEvent.click(screen.getByText(/login/i));

    expect(await screen.findByText(/welcome/i)).toBeInTheDocument(); // Check if the user is redirected successfully
  });
});
 
