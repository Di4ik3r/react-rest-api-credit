import React from 'react';
import './App.css';
import { Route, BrowserRouter, Link } from 'react-router-dom'
import Penalties from '../penalties/Penalties'
import Penalty from '../penalties/Penalty'
import Persons from '../persons/Persons'
import Person from '../persons/Person'
import Credits from '../credits/Credits'
import Credit from '../credits/Credit'
import Main from '../main/Main'


const Menu = () => (
	<nav className="navbar navbar-expand-lg navbar-light bg-light">
		<Link to="/app" className="navbar-brand">Home</Link>
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>

		<div className="collapse navbar-collapse" id="navbarSupportedContent">
			<ul className="navbar-nav mr-auto">
				{/* <li className="nav-item active">
					<Link to="/app" className="nav-link">app <span className="sr-only">(current)</span></Link>
				</li> */}
				<li className="nav-item active">
					<Link to="/credits" className="nav-link">credits</Link>
				</li>
				<li className="nav-item active">
					<Link to="/persons" className="nav-link">persons</Link>
				</li>
				<li className="nav-item active">
					<Link to="/penalties" className="nav-link">penalties</Link>
				</li>
			</ul>
		</div>
	</nav>
)

class App extends React.Component {
	
	render() {
		return (
			<BrowserRouter>
				<Route component={ Menu } path="/" ></Route>
				<Route component={ Main } path="/app" ></Route>

				<Route exact component={ Penalties } path="/penalties" ></Route>
				<Route exact component={ Penalty } path="/penalties/:penaltyId" ></Route>

				<Route exact component={ Persons } path="/persons"/>
				<Route exact component={ Person } path="/persons/:personId"/>

				<Route exact component={ Credits } path="/credits"/>
				<Route exact component={ Credit } path="/credits/:creditId"/>
			</BrowserRouter>
		)
	}
}

export default App;
