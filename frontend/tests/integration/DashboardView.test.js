import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from '../../src/containers/Dashboard/Dashboard';
import api from '../../src/services/api';

// Mock the API call
jest.mock('../../src/services/api', () => ({
  get: jest.fn(),
}));

describe('DashboardView Integration Tests', () => {
  const mockMetricsData = {
    data: {
      metrics: [
        { id: 1, name: 'Users', value: 200 },
        { id: 2, name: 'Sales', value: 1000 },
      ],
      charts: {
        sales: [10, 20, 30],
      },
    },
  };

  beforeEach(() => {
    api.get.mockResolvedValue(mockMetricsData);
  });

  it('should fetch and display key metrics', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Users/i)).toBeInTheDocument();
      expect(screen.getByText(/200/i)).toBeInTheDocument();
    });
  });

  it('should render charts with mock data', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      // Mock chart rendering logic validation
      expect(screen.getByText(/Sales/i)).toBeInTheDocument();
    });
  });

  it('should show loading state while fetching data', async () => {
    render(<Dashboard />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument());
  });
});
 
