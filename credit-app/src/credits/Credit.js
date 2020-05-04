import React from 'react'
import axios from 'axios'

class Credit extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			persons: [],
			date: "null",

			person: null,
			sum: null,
			percent: null,
			term: null,

			changePerson: "null",
			changeSum: "null",
			changePercent: "null",
			changeTerm: "null",
		}
	}

	componentDidMount() {
		const { match: { params } } = this.props;
		const id = params.creditId;
		
		axios.get(`http://localhost:1337/api/credits/${id}`)
			.then(res => {
				const credit = res.data.credit

				this.setState({
					id: credit._id,
					date: credit.date,
					
					person: credit.person,
					sum: credit.sum,
					percent: credit.percent,
					term: credit.term,

					changePerson: credit.person,
					changeSum: credit.sum,
					changePercent: credit.percent,
					changeTerm: credit.term,
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
		const percent = this.state.changePercent
		const term = this.state.changeTerm
		const obj = {person, sum, percent, term}

		axios.put(`http://localhost:1337/api/credits/${this.state.id}`, {...obj})
		.then(res => { 
			// console.log(res.data)
			axios.get(`http://localhost:1337/api/credits/${this.state.id}`)
			.then(getRes => {
				const credit = getRes.data.credit

				this.setState({
					id: credit._id,
					date: credit.date,

					person: credit.person,
					sum: credit.sum,
					percent: credit.percent,
					term: credit.term,

					changePerson: credit.person,
					changeSum: credit.sum,
					changePercent: credit.percent,
					term: credit.term,
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
					<h2 className="text-center">CREDIT</h2><h3>{this.state.id}</h3>
					<hr/>
					<div className="row">
						<div className="col-2 offset-1">Person:{this.renderPersons()}</div>
						<div className="col-2">
							Sum: <input onChange={(e) => {this.setState({...this.state, changeSum: e.target.value})}} value={this.state.changeSum} type="number" />
						</div>
						<div className="col-1">
							Percent: <input onChange={(e) => {this.setState({...this.state, changePercent: e.target.value})}} value={this.state.changePercent} type="number" />
						</div>
						<div className="col-2">
							Term: <input onChange={(e) => {this.setState({...this.state, changeTerm: e.target.value})}} value={this.state.changeTerm} type="number" />
						</div>
						<div className="col-3">
							Date: <input value={this.state.date} className="disabled" readOnly />
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

export default Credit