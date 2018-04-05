import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Route, Switch } from 'react-router-dom'

import './App.css';

import Home from './components/home';
import School from './components/school';
import Navigation from './components/navigation';
import NotFound from './components/not-found';

class App extends Component {
  state = { data: null, loading: true, error: false }

  async componentDidMount() {
    fetch(process.env.REACT_APP_SERVICE_URL)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.setState({ data, loading: false });
      }).catch(err => {
        console.error(err);
        this.setState({ error: true });
      });
  }

  render() {
    
    if (this.state.loading) {
      return (<div>Sæki gögn...</div>);
    }

    if (this.state.error) {
      return (<div>Villa við að sækja gögn</div>);
    }

    return (
      <main className="app">
        <Helmet title={`Próftöflur`}></Helmet>
        <h1>Próftöflur</h1>
        <Navigation schools = {this.state.data.schools} />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/:department" component={School} />
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
    );
  }
}

export default App;
