import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';

test('renders error state if there is an error', () => {
  render(<UserProfile />);
  const errorElement = screen.getByText(/Error/i);
  expect(errorElement).toBeInTheDocument();
});

test('renders user profile after data is loaded', async () => {
  render(<UserProfile />);

  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    status: 200,
    json: jest.fn().mockResolvedValueOnce([
      {
        title: 'Test',
        user_rating: 4,
      },
      {
        title: 'Testy Test',
        user_rating: 3,
      },
    ]),
  });
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    status: 200,
    json: jest.fn().mockResolvedValueOnce({
      totalLength: 10,
      totalWatchedFilms: 5,
      totalReviews: 2,
    }),
  });
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    status: 200,
    json: jest.fn().mockResolvedValueOnce([
      {
        username: 'testuser',
        email: 'test@example.com',
        first_name: 'Test',
        last_name: 'User',
      },
    ]),
  });

  await screen.findByText('Watched Films');

  const filmsElement = screen.getByText(/Watched Films/i);
  expect(filmsElement).toBeInTheDocument();

  const statsElement = screen.getByText(/User stats/i);
  expect(statsElement).toBeInTheDocument();

  const accountElement = screen.getByText(/Account Details/i);
  expect(accountElement).toBeInTheDocument();
});
