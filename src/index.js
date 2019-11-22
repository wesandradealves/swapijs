import React, { } from 'react';
import ParallaxMousemove from 'react-parallax-mousemove';
import { PlanetsComponent as Planets } from './assets/components/Planets/planets';
import ReactDOM from 'react-dom';
import './style.css';

class App extends React.Component {
  render() {
    return(
    		<ParallaxMousemove >
	      	<div className="view">
		      <div className="main-view">
		          <ParallaxMousemove.Layer config={{
		              xFactor: 0.05,
		              yFactor: 0.05,
		              springSettings: {
		                stiffness: 50,
		                damping: 30
		              }
		            }}>
				    <div className="main-view--header">	        
				      <div className="container">
				        <div className="logo"></div>
				      </div>
				    </div>  
				    </ParallaxMousemove.Layer>
			          <ParallaxMousemove.Layer config={{
			              xFactor: 0.15,
			              yFactor: 0.05,
			              springSettings: {
			                stiffness: 50,
			                damping: 30
			              }
			            }}>
			        <div className="main-view--content">
						<Planets />
			        </div>
			        </ParallaxMousemove.Layer>
		      </div>
	   		</div>
	   		</ParallaxMousemove>
      );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector("#wrap"));