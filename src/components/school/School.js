import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet';
import './School.css';
import Department from '../department/Department';

/**
 * Í þessum component ætti að vera mest um að vera og séð um að:
 * - Sækja gögn fyrir svið og birta
 * - Opna/loka deildum
 */

export default class School extends Component {
  constructor(props) {
    super(props);
    this.state = {
      department: null,
      data: null,
      loading: true,
      error: false,
      visible: false,
    }
  }
  
  onHeaderClick = (schoolId) => {
    return (e) => {
      const visible = this.state.visible === schoolId ? null : schoolId;
      this.setState({ visible });
    }
  }

  componentWillReceiveProps(newProps) {
    const { match } = newProps;

    fetch(process.env.REACT_APP_SERVICE_URL + match.params.department)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.setState({ data, loading: false });
      })
      .catch(err => {
        console.error(err);
        this.setState({ error: true });
      });
  }

  componentDidMount() {
    const {match} = this.props;
    fetch(process.env.REACT_APP_SERVICE_URL + match.params.department)
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        this.setState({ data, loading: false });
      })
      .catch(err => {
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

    const headings = this.state.data.school.heading;

    return (
      <section className="school">
        <Helmet title={`${headings} - Próftöflur`}></Helmet>
        <h2>{headings}</h2>
        {
          this.state.data.school.departments.map((i) => (
            <li key={i.heading}>
              <Department
                title={i.heading}
                tests={i.tests}
                visible={this.state.visible === i.heading}
                onHeaderClick={(this.onHeaderClick(i.heading))}
              />
              <hr></hr>
            </li>        
          )
        )
      }
      <p><Link to='/'>Heim</Link></p>
      </section>
    );
  }
}
