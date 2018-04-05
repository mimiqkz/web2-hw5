import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Department.css';

/**
 * Þessi component ætti að vera einfaldur í birtingu en taka fall frá foreldri
 * sem keyrir þegar smellt er á fyrirsögn.
 */

export default class Exams extends Component {
  static propTypes = {
    title: PropTypes.string,
    tests: PropTypes.array,
    visible: PropTypes.bool,
    onHeaderClick: PropTypes.func,
  }

  static defaultProps = {
    visible: true,
    onHeaderClick: () => { },
  }

  render() {
    const { onHeaderClick, visible, tests, title } = this.props;
    const plus = visible ? '- ': '+ ';
    return (
      <section className="department">
        <h3 onClick={onHeaderClick} className="note__header">{plus}{title}</h3>
        {visible && ( 
          <table>
            <thead>
              <tr>
                <th>Auðkenni</th>
                <th>Námskeið</th>
                <th>Fjöldi</th>
                <th>Dagsetning</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((i) => (
                <tr key={i.course}>
                  <td>{i.course}</td>
                  <td>{i.name}</td>
                  <td>{i.students}</td>
                  <td>{i.date}</td>
                </tr>
              ))}
            </tbody>
          </table>    
          )}    
      </section>
    );
  }
}
