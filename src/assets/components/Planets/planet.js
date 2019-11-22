// Planet.component.jsx

import * as React from 'react';
import Loader from 'react-loader-spinner';
import { ButtonComponent as Button } from '../Button/button';
import err_img from '../../imgs/err.png';
import { get } from 'axios';

export class PlanetComponent extends React.Component {  
  constructor(props, state) {
    super(props);

    if (!props.api) {
      throw new Error('Você deve especificar uma API pra reponse.');
    }     

    this.state = {
      error: null,
      api: props.api,
      spinner: 0,
      prev: 1,
      next: 1,
      rows: {},
      index: 0,
    }

    this.handleData = this.handleData.bind(this);    
  } 

  getData = async (page) => {
    const {error, api} = this.state;

    this.setState({
      spinner: 1
    });    

    fetch(api + '/planets/?sort=name', {
        headers: {
            Accept: 'application/json',
        },
        method: 'GET'            
    }).then(data => {
        return data.json().then(data => {
          if (data) {
            this.setState({
              spinner: data ? 0 : 1,
              next: data.length > 1 ? 0 : 1,
              rows: data
            });
          } else {
            return Promise.reject({data});
          }
        });
      })
      .catch(err => {
        this.setState({
          error: 1,
          spinner: 0
        });
      });
  }  

  componentDidMount(){
    this.getData();
  }

  handleData(item, pos){
    const {prev, rows, index} = this.state;

    this.setState({ 
      index: (pos === 'next') ? (rows.length > 1 && index < (rows.length - 1)) ? item+=1 : item : (index > 0) ? item-=1 : item,
      prev: (pos === 'next') ? (index >= 0) ? 0 : 1 : (index === 1) ? 1 : 0,
      next: (pos === 'next') ? (index === (rows.length - 2)) ? 1 : 0 : 0
    });     
  }  

  render() {
    const {error, error_msg, spinner, prev, next, rows, index} = this.state;

    if(spinner)
      return(<div>
          <Loader 
            type="Triangle"
            color="#00BFFF"
            height="100" 
            width="100"
          />
        </div>);
    return(!error ? <div><div className="view--planets-planet">
        {rows.length ? rows.filter(function (item, i) {
            return i === index;
          }).map((item, i) => (
          <div key={item._id}>
            <h2 className="itemHeader">{item.name}</h2>
            <p><strong>Climate</strong>: {item.climate}</p>
            <p><strong>Terrain</strong>: {item.terrain}</p>
            <p className="itemFooter"><strong>Featured in</strong> {item.films} {item.films > 1 ? 'films' : 'film'}</p>
          </div>
        )) : null}
      </div>
      <div className="view--planets-footer">
        <Button disabled={prev} onClick={e => this.handleData(index, 'prev')} label={'Previous'}  />
        <Button disabled={next} onClick={e => this.handleData(index, 'next')} label={'Next'}  />
      </div>
      </div> : <div className="error">
        <img src={err_img} alt="Error" />
        <h2 className="error--title">404</h2>
        <p>Houve uma falha.<br/>Por favor, tente mais tarde.</p>
      </div>
      );
  }
}
