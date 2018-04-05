import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

  async componentDidMount() {
    fetch(process.env.REACT_APP_SERVICE_URL + 'stats')
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.setState({...data.stats});
      }).catch(err => console.error(err));
  }

  static propTypes = {
    averageStudents: PropTypes.string,
    max: PropTypes.number,
    min: PropTypes.number,
    numStudents: PropTypes.number,
    numTests: PropTypes.number
  }

  render() {
    const {
      averageStudents, max, min, numStudents, numTests
    } = this.props;
    return (
      <div className="home">
        <Helmet title="Próftöflur"/>
        <h2>Tölfræði</h2>
        <p>Fjöldi prófa {numTests}</p>
        <p>Fjöldi nemenda í öllum prófum {numStudents}</p>
        <p>Meðalfjöldi nemenda í prófi {averageStudents}</p>
        <p>Minnsti nemenda í prófi {min}</p>
        <p>Mesti nemenda í prófi {max}</p>
      </div>
    );
  }
}
