import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return (
    <div className="App">
      <header>
        <h1>GROUP 03 | CFG Degree</h1>
      </header>
      <body>
        <h2>About Us</h2>
        <div className="box">
              <img src={require('./images/Cassie.PNG')}/>
              <img src={require('./images/Emily.PNG')}/>
              <img src={require('./images/Giovanna.png')}/>
          </div>

        <div className="box">
          <a href="https://github.com/cmesserle" target="_blank">Cassie M</a>
          <a>Emily L</a>
          <a>Giovanna B</a>
        </div>

        <div className="box">
          <h4>About:</h4>
          <h4>About:</h4>
          <h4>About:</h4>
        </div>

        <div className="box">
          <p>My name's Cassie, and I'm an avid sewer and knitter.  These things bring me so much joy because there are endless possibilities and it's something you can learn along the way!</p>
          <p>Hi I'm Emily and my favourite hobbies are reading, hiking and drawing! I enjoy these because they give me the opportunity to relax, learn and be mindful.</p>
          <p>I'm originally from Brazil, but moved to lovely Belfast when I had just turned 18. In my downtime you'll find me either watching some Netflix enjoying a nice cup of coffee, planning my next trip or out for drinks with my friends! </p>
        </div>
        <div className="box">
              <img src={require('./images/Hassan.png')}/>
              <img src={require('./images/Kate.png')}/>
              <img src={require('./images/Lida.PNG')}/>
          </div>
          
        <div className="box">
          <a>Hassan H</a>
          <a>Kate I</a>
          <a>L</a>
        </div>

        <div className="box">
          <h4>About:</h4>
          <h4>About:</h4>
          <h4>About:</h4>
        </div>

        <div className="box">
          <p> Hey, I'm Hassan! I'm a big fan of Gaming, Football and Coding. I've always enjoyed learning new things and being creative. This opportunity at Code First Girls has allowed me to learn, continuously challenge myself and meet amazing like-minded people along the way. </p>
          <p> Absolutely love dancing, traveling, cooking and prosecco! Nowadays I dedicate all my time to my family and looking for my dream job. My favorite film is "Yes Man"! </p>
          <p> Hi! I love basking in the sun, going for long hikes and exploring art galleries. I feel most at home in the mountains somewhere beautiful, but city life has its perks too! Hoping to land my first role in tech this year, preferably somewhere much warmer than England!  </p>
        </div>
      </body>
      </div>
  );
}

export default App;