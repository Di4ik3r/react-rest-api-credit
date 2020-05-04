import React from 'react'
import axios from 'axios'

class Person extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			id: null,
			name: null,
			address: null,
			number: null,
			changeName: "",
			changeAddress: "",
			changeNumber: "",
		}
	}

	componentDidMount() {
		const { match: { params } } = this.props;
		const id = params.personId;
		
		axios.get(`http://localhost:1337/api/persons/${id}`)
			.then(res => {
				const person = res.data.person

				this.setState({
					id: person._id,
					name: person.person,
					address: person.address,
					number: person.number,
					changeName: person.name,
					changeAddress: person.address,
					changeNumber: person.number
				})
			})
		
		axios.get('http://localhost:1337/api/persons')
		.then(res => {
			this.setState({...this.state, persons: res.data})
		})
	}

	handleChangeClick(id) {
		this.setState({...this.state, changeName: id})
	}

	handleUpdateClick() {
		const name = this.state.changeName
		const address = this.state.changeAddress
		const number = this.state.changeNumber
		const obj = {name, address, number,}

		axios.put(`http://localhost:1337/api/persons/${this.state.id}`, {...obj})
		.then(res => { 
			// console.log(res.data)
			axios.get(`http://localhost:1337/api/persons/${this.state.id}`)
			.then(getRes => {
				const person = getRes.data.person

				this.setState({
					id: person._id,
					name: person.person,
					address: person.address,
					number: person.number,
					changePerson: person.person,
					changeAddress: person.sum,
				})
			})
		})
		.catch((e) => console.log(e))
	}


	render() {
		return (
			<div className="row penalty-single text-center">
				<div className="col-12">
					<h2 className="text-center">PERSONS</h2><h3>{this.state.id}</h3>
					<hr/>
					<div className="row">
						<div className="col-4">
							Name:<input onChange={(e) => {this.setState({...this.state, changeName: e.target.value})}} value={this.state.changeName} placeholder="name"/>
						</div>
						<div className="col-4">
							Address:<input onChange={(e) => {this.setState({...this.state, changeAddress: e.target.value})}} value={this.state.changeAddress} placeholder="address"/>
						</div>
						<div className="col-4">
							Number:<input onChange={(e) => {this.setState({...this.state, changeNumber: e.target.value})}} value={this.state.changeNumber} placeholder="number"/>
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

export default Person