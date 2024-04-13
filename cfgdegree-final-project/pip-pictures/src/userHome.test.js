import React from 'react';
import { render } from '@testing-library/react';
import UserHome from './userHome';

/*
1. Test: Renders Navbar component
    This test verifies that the Navbar component is rendered within the UserHome component.
2. Test: Renders Banner component
    This test verifies that the Banner component is rendered within the UserHome component.
3. Test: Renders "Trending Now" row
    This test verifies that the "Trending Now" row is rendered within the UserHome component.
4. Test: Renders "Top Rated" row
    This test verifies that the "Top    Rated" row is rendered within the UserHome component.
5. Test: Renders "Upcoming" row
    This test verifies that the "Upcoming" row is rendered within the UserHome component.
*/ 

describe('UserHome component', () => {
  test('renders Navbar component', () => {
    const { getByText } = render(<UserHome />);
    const navbarElement = getByText('Navbar');
    expect(navbarElement).toBeInTheDocument();
  });

  test('renders Banner component', () => {
    const { getByText } = render(<UserHome />);
    const bannerElement = getByText('Banner');
    expect(bannerElement).toBeInTheDocument();
  });

  test('renders "Trending Now" row', () => {
    const { getByText } = render(<UserHome />);
    const trendingRowElement = getByText('Trending Now');
    expect(trendingRowElement).toBeInTheDocument();
  });

  test('renders "Top Rated" row', () => {
    const { getByText } = render(<UserHome />);
    const topRatedRowElement = getByText('Top Rated');
    expect(topRatedRowElement).toBeInTheDocument();
  });

  test('renders "Upcoming" row', () => {
    const { getByText } = render(<UserHome />);
    const upcomingRowElement = getByText('Upcoming');
    expect(upcomingRowElement).toBeInTheDocument();
  });
});
