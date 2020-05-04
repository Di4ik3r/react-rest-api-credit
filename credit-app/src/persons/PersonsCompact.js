import React from 'react'
import axios from 'axios'
import store from '../store'
import { changePerson, refreshPersons } from '../actions/actions'

import { connect } from 'react-redux'


const mapStateToProps = state => {
	return {
		persons: state.persons,
		selectedPerson: state.selectedPerson,
	}
}
function mapDispatchToProps(dispatch) {
	return {
		refreshPersons: persons => dispatch(refreshPersons(persons)),
		changePerson: (person) => dispatch(changePerson(person)),
	}
}

class PersonsCompact extends React.Component {

	constructor(props) {
		super(props)

		// this.state = {
		// 	persons: [],
		// 	selected: 0,
		// }
	}

	componentDidMount() {
		axios.get('http://localhost:1337/api/persons')
			.then(res => {
				// store.dispatch(refreshPersons(res.data))
				this.props.refreshPersons(res.data)
			})
	// 	axios.get('http://localhost:1337/api/persons')
	// 		.then(res => {
	// 			const persons = res.data.sort((a, b) => a._id - b._id)
	// 			this.setState({persons, selected: res.data[1]._id})
	// 		})
	}

	handleClick(id) {
		// this.setState({...this.state, selected: id})
		// store.dispatch(changePerson(id))
		axios.get(`http://localhost:1337/api/persons/${id}`)
			.then(personsRes => { 
				const selectedPerson = personsRes.data.person;
				axios.get(`http://localhost:1337/api/penalties`)
					.then(penaltiesRes => {
						const newPenalties = penaltiesRes.data.filter(item => item.person === id)

						axios.get(`http://localhost:1337/api/credits`)
							.then(creditsRes => {
								const newCredits = creditsRes.data.filter(item => item.person === id)
								
								this.props.changePerson({
									selectedPerson,
									penalties: newPenalties,
									credits: newCredits,
								})
							})
					})
				
			})
	}

	// handleNameChanged(text, id) {
	// 	// console.log(text, id)
	// 	let persons = [...this.state.persons]
	// 	const person = {...persons.find((item) => item._id == id)}
	// 	persons.splice(persons.find((item) => item._id == person._id), 1)
	// 	person.name = text
	// 	persons.push(person)
	// 	persons = persons.sort((a, b) => a._id - b.id)
	// 	this.setState({...this.state, persons})
	// }

	renderPerson(person) {
		return (
			<div onClick={() => this.handleClick(person._id)} key={person._id} className={`row person text-left ${this.props.selectedPerson._id === person._id ? "person-selected" : ""}`}>
				<div className="col-12">
					<div className="row person-name">
					<div className="col-4"><b>NAME:</b></div>
						<div className="col-8">
							{person.name}
						</div>
					</div>
					<div className="row person-address">
						<div className="col-4"><b>ADDRESS:</b></div>
						<div className="col-8">{person.address}</div>
					</div>
					<div className="row person-number">
						<div className="col-4"><b>NUMBER:</b></div>
						<div className="col-8">{person.number}</div>
					</div>
				</div>
			</div>
		)
	}

	renderPersons() {
		if(this.props.persons.length > 0) {
			return (
				<div>{this.props.persons.map(person => this.renderPerson(person))}</div>
			)
		}
		return (
			<div>empty</div>
		)
	}

	render() {
		return (
			<div className="persons row">
				<div className="col-12">
					<div className="row header"><div className="col-12"><h2>PERSONS</h2></div></div>
					{this.renderPersons()}
				</div>
			</div>
		)
	}
}


// export default PersonsCompact
const _PersonsCompact = connect(mapStateToProps, mapDispatchToProps)(PersonsCompact)
export default _PersonsCompact