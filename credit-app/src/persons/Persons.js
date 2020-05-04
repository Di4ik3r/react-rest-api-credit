import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Persons extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			persons: [],
			addName: "",
			addAddress: "",
			addNumber: "",
		}

	}
	
	componentDidMount() {
		this.getPersons()
	}

	handleAddClick() {
		const name = this.state.addName
		const address = this.state.addAddress
		const number = this.state.addNumber

		const person = { name, address, number }
		console.log(person)

		axios.post('http://localhost:1337/api/persons', {...person})
		.then(res => { 
			this.getPersons()
		})
		.catch((e) => console.log(e))
	}

	handleDeleteClick(id) {
		axios.delete(`http://localhost:1337/api/persons/${id}`)
		.then(res => { 
			this.getPersons()
		})
	}

	renderPerson(person) {
		return (
			<div className="row penalty" key={person._id}>
				<div className="col-3">
					{person._id};
				</div>
				<div className="col-2">
					{person.name};
				</div>
				<div className="col-2">
					{person.address};
				</div>
				<div className="col-2">
					{person.number};
				</div>
				<div className="col-1">
					<Link to={`/persons/${person._id}`}>
						<button className="btn button">e</button>
					</Link>
				</div>
				<div className="col-1">
					<button onClick={() => this.handleDeleteClick(person._id)} className="btn button">x</button>
				</div>
			</div>
		)
	}

	render() {
		return (
			<div className="row persons text-center">
				<div className="col-12">
					<h2>PERSONS</h2>
					<hr/>
					<div className="row">
						<div className="col-3"><b>id</b></div>
						<div className="col-2"><b>name</b></div>
						<div className="col-2"><b>address</b></div>
						<div className="col-2"><b>number</b></div>
					</div>
					{this.state.persons.map(item => this.renderPerson(item))}
					<hr/>
					<div className="row text-center add">
						<div className="col-12">
							<h3>ADD</h3>
							<div className="row">
								<div className="col-3 offset-2">
									<input onChange={(e) => this.setState({...this.state, addName: e.target.value})} value={this.state.addName} placeholder="name" />
								</div>
								<div className="col-2">
									<input onChange={(e) => this.setState({...this.state, addAddress: e.target.value})} value={this.state.addAddress} placeholder="address" />
								</div>
								<div className="col-3">
									<input onChange={(e) => this.setState({...this.state, addNumber: e.target.value})} value={this.state.addNumber} placeholder="number" />
								</div>
							</div>
							<div className="row buttons">
								<div className="col-2 offset-5">
									<button onClick={() => this.handleAddClick()} className="btn btn-danger">add</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	getPersons() {
		axios.get('http://localhost:1337/api/persons')
		.then(res => {
			this.setState({persons: res.data})
		})
	}
}

export default Persons