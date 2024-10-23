import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound'; // A component for handling 404 routes if needed

function App() {
  useEffect(() => {
    // Example side effect: Initialize global states or fetch data when the app mounts
    console.log('App component mounted');
  }, []); // Empty dependency array ensures this runs only once on component mount

  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          {/* Additional routes can be added here */}
          <Route component={NotFound} /> {/* Fallback route for undefined paths */}
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
 
