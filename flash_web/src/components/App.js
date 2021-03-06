import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import history from '../history';
import Home from './cover/Home';
import Navbar from './Navbar';
import Footer from './Footer';
import Training from './train/Training';
import Inference from './infer/Inference';
import About from './About';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/App.css';

class App extends React.Component {
  render() {
    return (
      <div className="page-container">
        <div className="content-wrap">
          <ToastContainer
            position="top-center"
            autoClose={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            style={{ width: '40%' }}
          />
          <Router history={history}>
            <Navbar />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/training" exact component={Training} />
              <Route path="/inference" exact component={Inference} />
              <Route path="/about" exact component={About} />
            </Switch>
          </Router>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
