import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './Navigation.css';

/* hér ætti að sækja gögn frá vefþjónustu fyrir valmynd */
export default class Navigation extends Component {

  static propTypes = {
    name: PropTypes.string,
    link: PropTypes.string,
    slug: PropTypes.string,
  }

  render() {
    const p = this.props.schools;
    return (
      <section className="navigation">
        <nav>
            {p.map((i) => (
              <p key={i.name} ><NavLink to={i.slug}>{i.name}</NavLink></p>
            ))}
        </nav>
      </section>
    );
  }
}
