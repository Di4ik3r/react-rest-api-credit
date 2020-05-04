import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Penalties extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			penalties: [],
			persons: [],
			addPerson: "",
			addSum: "",
		}

	}
	
	componentDidMount() {
		this.getPenalties()
		axios.get('http://localhost:1337/api/persons')
		.then(res => {
			this.setState({...this.state, persons: res.data, addPerson: res.data[0]._id})
		})
	}

	deprecated_renderPenalty(penalty) {
		return (
			<div key={penalty._id}>
			<Link to={`/penalties/${penalty._id}`}>
					id: {penalty._id};
					{/* person: {penalty.person};
					sum: {penalty.sum}; */}
				</Link>
			</div>
		)
	}

	handleAddClick() {
		const person = this.state.addPerson
		const sum = this.state.addSum
		const penalty = {
			person,
			sum,
		}

		axios.post('http://localhost:1337/api/penalties', {...penalty})
		.then(res => { 
			// console.log(res.data)
			this.getPenalties()
		})
		.catch((e) => console.log(e))
	}

	handleDeleteClick(id) {
		axios.delete(`http://localhost:1337/api/penalties/${id}`)
		.then(res => { 
			// console.log(res.data)
			this.getPenalties()
		})
	}

	handlePersonClick(id) {
		this.setState({...this.state, addPerson: id})
	}

	renderPenalty(penalty) {
		return (
			<div key={penalty._id} className="row penalty text-center">
				<div className="col-3">{penalty._id}</div>
				<div className="col-3"><Link to={`/persons/${penalty.person}`}>{penalty.person}</Link></div>
				<div className="col-2">{penalty.sum}</div>
				<div className="offset-1 col-1">
					<Link to={`/penalties/${penalty._id}`}><button className="btn button">e</button></Link>
				</div>
				<div onClick={() => this.handleDeleteClick(penalty._id)} className="col-1"><button className="btn button">x</button></div>
			</div>
		)
	}

	renderPenalties() {
		if(this.state.penalties.length > 0) {
			return (
					<div>{this.state.penalties.map(item => this.renderPenalty(item))}</div>
			)
		} else {
			return (<div>empty</div>)
		}
	}

	renderPersons() {
		if(this.state.persons.length > 0) {
			return (
				<div>{this.state.persons.map(item => {
					return (
						<div key={item._id} className="row">
							<button onClick={() => this.handlePersonClick(item._id)} className={`btn btn-outline-${item._id == this.state.addPerson ? "primary" : "danger"}`}>{item.name}</button>
						</div>
					)
				})}</div>
			)
		}
	}

	render() {
		return (
			<div className="row penalties text-center">
				<div className="col-12">
					<div className="row"><div className="col-12">
						<h2>PENALTIES</h2>
						<hr/>
						<div className="row">
							<div className="col-3"><b>id</b></div>
							<div className="col-3"><b>person</b></div>
							<div className="col-2"><b>sum</b></div>
						</div>
						{this.renderPenalties()}
					</div></div>
					<hr/>
					<div className="row text-center add">
						<div className="col-12">
							<h3>ADD</h3>
							<div className="row">
								<div className="col-2 offset-2">
									{this.renderPersons()}
									{/* <input onChange={(e) => {
										this.setState({...this.state, addPerson: e.target.value})
									}} value={this.state.addPerson} placeholder="name" /> */}
								</div>
								<div className="col-2 offset-1">
									<input type="number" onChange={(e) => {
										this.setState({...this.state, addSum: e.target.value})
									}} value={this.state.addSum} placeholder="sum" />
								</div>
								<div className="col-2 offset-1">
									<button onClick={() => this.handleAddClick()} className="btn btn-danger">add</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}

	// render() {
	// 	return (
	// 		<div>
	// 			{this.state.penalties.map(item => this.renderPenalty(item))}
	// 		</div>
	// 	)
	// }

	getPenalties() {
		axios.get('http://localhost:1337/api/penalties')
		.then(res => {
			// console.log(res.data)
			this.setState({penalties: res.data})
		})
	}
}

export default Penalties