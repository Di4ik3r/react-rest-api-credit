import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

class Credits extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			credits: [],
			persons: [],
			addPerson: "",
			addSum: "",
			addPercent: "",
			addDate: "",
			addTerm: "",
		}

	}
	
	componentDidMount() {
		this.getCredits()
		axios.get('http://localhost:1337/api/persons')
		.then(res => {
			this.setState({...this.state, persons: res.data, addPerson: res.data[0]._id})
		})
	}

	handleAddClick() {
		const person = this.state.addPerson
		const sum = this.state.addSum
		const percent = this.state.addPercent
		const date = this.state.addDate
		const term = this.state.addTerm

		const obj = { person, sum, percent, date, term }

		axios.post('http://localhost:1337/api/credits', {...obj})
		.then(res => { 
			this.getCredits()
		})
		.catch((e) => console.log(e))
	}

	handleDeleteClick(id) {
		axios.delete(`http://localhost:1337/api/credits/${id}`)
		.then(res => { 
			this.getCredits()
		})
	}

	handlePersonClick(id) {
		this.setState({...this.state, addPerson: id})
	}

	renderPerson(credit) {
		return (
			<div className="row penalty" key={credit._id}>
				<div className="col-3">
					{credit._id};
				</div>
				<div className="col-2">
					<Link to={`/persons/${credit.person}`}>{credit.person}</Link>;
				</div>
				<div className="col-1">
					{credit.sum};
				</div>
				<div className="col-1">
					{credit.percent}%
				</div>
				<div className="col-2">
					{credit.date};
				</div>
				<div className="col-1">
					{credit.term} days;
				</div>
				<div className="col-1">
					<Link to={`/credits/${credit._id}`}>
						<button className="btn button">e</button>
					</Link>
				</div>
				<div className="col-1">
					<button onClick={() => this.handleDeleteClick(credit._id)} className="btn button">x</button>
				</div>
			</div>
		)
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
			<div className="row credits text-center">
				<div className="col-12">
					<h2>CREDITS</h2>
					<hr/>
					<div className="row">
						<div className="col-3"><b>id</b></div>
						<div className="col-2"><b>person</b></div>
						<div className="col-1"><b>sum</b></div>
						<div className="col-1"><b>percent</b></div>
						<div className="col-2"><b>date</b></div>
						<div className="col-1"><b>term</b></div>
					</div>
					{this.state.credits.map(item => this.renderPerson(item))}
					<hr/>
					<div className="row text-center add">
						<div className="col-12">
							<h3>ADD</h3>
							<div className="row">
								<div className="col-3 offset-1">
									{this.renderPersons()}
									{/* <input onChange={(e) => this.setState({...this.state, addPerson: e.target.value})} value={this.state.addPerson} placeholder="person" /> */}
								</div>
								<div className="col-2">
									<input onChange={(e) => this.setState({...this.state, addSum: e.target.value})} value={this.state.addSum} type="number" placeholder="sum" />
								</div>
								<div className="col-2">
									<input onChange={(e) => this.setState({...this.state, addPercent: e.target.value})} value={this.state.addPercent} type="number" placeholder="percent" />
								</div>
								<div className="col-2">
									<input onChange={(e) => this.setState({...this.state, addTerm: e.target.value})} value={this.state.addTerm} type="number" placeholder="term" />
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

	getCredits() {
		axios.get('http://localhost:1337/api/credits')
		.then(res => {
			this.setState({credits: res.data})
		})
	}
}

export default Credits