import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToWatch from './ToWatch';

/* 
The following tests should:
1. Render the "To Watch" header.
2. Render movie information.
3. Open and close the dialog when "Pick for me!" button is clicked.
4. Update the progress when the slider value changes.
*/

describe('ToWatch component', () => {
  const mockToWatch = [
    { movieId: 1, title: 'Movie 1', thumbnail: 'path1', description: 'Description 1', rating: 4.5, length: 120, progress: 50 },
    { movieId: 2, title: 'Movie 2', thumbnail: 'path2', description: 'Description 2', rating: 3.8, length: 95, progress: 75 },
  ];

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockToWatch),
      })
    );
  });

  it('should render the "To Watch" header', () => {
    render(<ToWatch />);
    expect(screen.getByText('To Watch')).toBeInTheDocument();
  });

  it('should render movie information', async () => {
    render(<ToWatch />);
    const movieElements = await screen.findAllByRole('img');
    expect(movieElements.length).toBe(mockToWatch.length);
  });

  it('should open and close the dialog when "Pick for me!" button is clicked', async () => {
    render(<ToWatch />);
    const pickForMeButton = screen.getByText('Pick for me!');
    fireEvent.click(pickForMeButton);

    const dialogTitle = await screen.findByText(mockToWatch[0].title);
    expect(dialogTitle).toBeInTheDocument();

    const closeButton = screen.getByText('Close');
    fireEvent.click(closeButton);

    const closedDialogTitle = screen.queryByText(mockToWatch[0].title);
    expect(closedDialogTitle).not.toBeInTheDocument();
  });

  it('should update the progress when slider value changes', async () => {
    render(<ToWatch />);
    const slider = await screen.findByRole('slider', { name: 'Progress:' });
    fireEvent.change(slider, { target: { value: 80 } });

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:4000/update-stats/1/1',
      expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify({ progress: 80 }),
      })
    );
  });
});
