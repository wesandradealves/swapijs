// Planets.component.jsx

import * as React from 'react';
import Loader from 'react-loader-spinner';
import { PlanetComponent as Planet } from './planet';
import { get } from 'axios';

const env = '',
      api = (!env) ? 'https://swapi-js-2.herokuapp.com' : 'http://localhost:9000';

export class PlanetsComponent extends React.Component {  
  render() {
    return (
      <div className="view--content-holder">
        <Planet api={api} />
      </div>
    );
  }
}
