import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from './axios';
import Row from './Row';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

/* 
Tests written for the following:
1. Render the row title.
2. Fetch movies and render posters.
3. Call setTrailerUrl when a movie poster is clicked.
4. Reset trailerUrl when a movie poster is clicked again.
*/

// Mock the axios module
jest.mock('./axios');

describe('Row component', () => {
  const movies = [
    { id: 1, name: 'Movie 1', poster_path: 'path1', backdrop_path: 'backdrop1' },
    { id: 2, name: 'Movie 2', poster_path: 'path2', backdrop_path: 'backdrop2' },
  ];

  const fetchUrl = 'some-url';

  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: { results: movies } });
    movieTrailer.mockResolvedValue('trailer-url');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the row title', () => {
    render(<Row title="Trending Now" fetchUrl={fetchUrl} isLargeRow={false} />);
    expect(screen.getByText('Trending Now')).toBeInTheDocument();
  });

  it('should fetch movies and render posters', async () => {
    render(<Row title="Trending Now" fetchUrl={fetchUrl} isLargeRow={false} />);
    expect(axios.get).toHaveBeenCalledWith(fetchUrl);
    expect(axios.get).toHaveBeenCalledTimes(1);

    const posterElements = await screen.findAllByRole('img');
    expect(posterElements.length).toBe(movies.length);
  });

  it('should call setTrailerUrl when a movie poster is clicked', async () => {
    render(<Row title="Trending Now" fetchUrl={fetchUrl} isLargeRow={false} />);
    const posterElement = await screen.findByAltText('Movie 1');
    fireEvent.click(posterElement);

    expect(movieTrailer).toHaveBeenCalledWith('Movie 1');
    expect(movieTrailer).toHaveBeenCalledTimes(1);

    const youtubeElement = await screen.findByTestId('youtube-component');
    expect(youtubeElement).toBeInTheDocument();
  });

  it('should reset trailerUrl when a movie poster is clicked again', async () => {
    render(<Row title="Trending Now" fetchUrl={fetchUrl} isLargeRow={false} />);
    const posterElement = await screen.findByAltText('Movie 1');
    fireEvent.click(posterElement);
    fireEvent.click(posterElement);

    const youtubeElement = await screen.queryByTestId('youtube-component');
    expect(youtubeElement).not.toBeInTheDocument();
  });
});
