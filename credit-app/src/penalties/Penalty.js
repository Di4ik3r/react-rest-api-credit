import React from 'react'
import axios from 'axios'

class Penalty extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			id: null,
			person: null,
			sum: null,
			persons: [],
			changePerson: "",
			changeSum: ""
		}
	}

	componentDidMount() {
		const { match: { params } } = this.props;
		const id = params.penaltyId;
		
		axios.get(`http://localhost:1337/api/penalties/${id}`)
			.then(res => {
				const penalty = res.data.penalty

				this.setState({
					id: penalty._id,
					person: penalty.person,
					sum: penalty.sum,
					changePerson: penalty.person,
					changeSum: penalty.sum,
				})
			})
		
		axios.get('http://localhost:1337/api/persons')
		.then(res => {
			this.setState({...this.state, persons: res.data})
		})
	}

	handleChangeClick(id) {
		this.setState({...this.state, changePerson: id})
	}

	handleUpdateClick() {
		const person = this.state.changePerson
		const sum = this.state.changeSum
		const penalty = {
			person,
			sum,
		}

		axios.put(`http://localhost:1337/api/penalties/${this.state.id}`, {...penalty})
		.then(res => { 
			// console.log(res.data)
			axios.get(`http://localhost:1337/api/penalties/${this.state.id}`)
			.then(getRes => {
				const penalty = getRes.data.penalty

				this.setState({
					id: penalty._id,
					person: penalty.person,
					sum: penalty.sum,
					changePerson: penalty.person,
					changeSum: penalty.sum,
				})
			})
		})
		.catch((e) => console.log(e))
	}

	renderPersons() {
		if(this.state.persons.length > 0) {
			return (
				<div>{this.state.persons.map(item => {
					return (
						<div key={item._id} className="row">
							<button onClick={() => this.handleChangeClick(item._id)} className={`btn btn-outline-${item._id == this.state.changePerson ? "primary" : "danger"}`}>{item.name}</button>
						</div>
					)
				})}</div>
			)
		}
	}

	render() {
		return (
			<div className="row penalty-single text-center">
				<div className="col-12">
					<h2 className="text-center">PENALTY</h2><h3>{this.state.id}</h3>
					<hr/>
					<div className="row">
						<div className="offset-2 col-3">Person:{this.renderPersons()}</div>
						<div className="col-6">
							Sum: <input onChange={(e) => {this.setState({...this.state, changeSum: e.target.value})}} value={this.state.changeSum} type="number" />
						</div>
					</div>
					<hr/>
					<div className="row">
						<div className="col-12">
							<button onClick={() => this.handleUpdateClick()} className="btn btn-danger">update</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Penalty