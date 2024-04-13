import Navbar from './components/NavBar.js';
import React from 'react';
import './userHome.css';
import Row from './Row.js';
import requests from './requests.js';
import Banner from './userHomeBanner.js';
import SearchBar from './components/SearchBar.js';

function UserHome() {
    return(

        
        <div className="UserHome">
            <Navbar/>
          
          <Row 
          title="Trending Now" 
          fetchUrl={requests.fetchTrending} 
          isLargeRow
          />
          
          <Row title="Top Rated" 
          fetchUrl={requests.fetchTopRated} 
          isLargeRow
          />

          <Row title="Upcoming" 
          fetchUrl={requests.fetchUpComing} 
          isLargeRow
          />
    
        </div>
    );
}

export default UserHome;
