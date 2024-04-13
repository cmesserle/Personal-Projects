import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import History from './History';

/* 
Tests written for the following scenarious:
1. Rendering the component and checking if the "Watched" heading is present.
2. Verifying that the component fetches watched films on mount.
3. Updating the film rating and verifying the API request.
4. Updating the film review and verifying the API request. 
*/

// Mock the fetch API
global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve([])
  })
);

describe('History component', () => {
  test('renders the component', () => {
    render(<History />);
    const headingElement = screen.getByText(/Watched/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('fetches watched films on component mount', () => {
    render(<History />);
    expect(fetch).toHaveBeenCalledWith('http://localhost:4000/all-watched/1/');
  });

  test('updates film rating on change', async () => {
    const mockedFilm = {
      title: 'Mocked Film',
      rating: 3,
      movieId: 1
    };
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockedFilm)
      })
    );

    render(<History />);
    await screen.findByText(mockedFilm.title);

    const ratingInput = screen.getByLabelText('Rating');
    fireEvent.change(ratingInput, { target: { value: 4 } });

    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:4000/update-stats/1/${mockedFilm.movieId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
          rating: 4
        })
      }
    );
  });

  test('updates film review on change', async () => {
    const mockedFilm = {
      title: 'Mocked Film',
      review: 'Old Review',
      movieId: 1
    };
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockedFilm)
      })
    );

    render(<History />);
    await screen.findByText(mockedFilm.title);

    const reviewInput = screen.getByLabelText('Review');
    fireEvent.change(reviewInput, { target: { value: 'New Review' } });

    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:4000/update-stats/1/${mockedFilm.movieId}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
          review: 'New Review'
        })
      }
    );
  });
});
