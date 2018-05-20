import React, { Component } from 'react';
import Helmet from 'react-helmet';

import './Home.css';

/* hér ætti að sækja forsíðu vefþjónustu til að sækja stats */

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      averageStudents: 0,
      max: 0,
      min: 0,
      numStudents: 0,
      numTests: 0
    };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_SERVICE_URL + 'stats')
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.setState({...data.stats});
      }).catch(err => console.error(err));
  }

  render() {
    const {
      averageStudents, max, min, numStudents, numTests
    } = this.state;
    return (
      <div className="home">
        <Helmet title="Próftöflur"/>
        <h2>Tölfræði</h2>
        <div className = "data"> 
          <p>Fjöldi prófa <span>{numTests}</span></p>
          <p>Fjöldi nemenda í öllum prófum <span>{numStudents}</span></p>
          <p>Meðalfjöldi nemenda í prófi <span>{averageStudents}</span></p>
          <p>Minnsti nemenda í prófi <span>{min}</span></p>
          <p>Mesti nemenda í prófi <span>{max}</span></p>
        </div>
      </div>
    );
  }
}
