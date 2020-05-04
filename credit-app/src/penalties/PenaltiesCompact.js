import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { refreshPenalties } from '../actions/actions'

const mapStateToProps = state => {
	return {
		penalties: state.penalties,
		selectedPerson: state.selectedPerson
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		refreshPenalties: (penalties) => dispatch(refreshPenalties(penalties))
	}
}

class PenaltiesCompact extends React.Component {

	constructor(props) {
		super(props)

		// this.state = {
		// 	penalties: [],
		// }
	}

	componentDidMount() {
		// axios.get('http://localhost:1337/api/penalties')
		// 	.then(res => {
		// 		this.setState({...this.state, penalties: res.data})
		// 	})
		this.refreshPenalties()
	}

	handleDeleteClick(id) {
		axios.delete(`http://localhost:1337/api/penalties/${id}`)
		.then(deleteRes => {
			// axios.get(`http://localhost:1337/api/penalties`)
			// .then(res => {
			// 	console.log(res.data)
			// 	this.props.refreshPenalties(res.data)
			// })
			this.refreshPenalties()
		})

	}

	async refreshPenalties() {
		axios.get(`http://localhost:1337/api/penalties`)
			.then(res => {
				const arr = res.data.filter(item => item.person === this.props.selectedPerson._id)
				this.props.refreshPenalties(arr)
			})
	}

	renderPenalty(penalty) {
		return (
			<div key={penalty._id} className="row penalty text-center">
				<div className="col-4">{penalty._id}</div>
				<div className="col-4">{penalty.sum}</div>
				<div className="offset-1 col-1">
					<Link to={`/penalties/${penalty._id}`}><button className="btn button">e</button></Link>
				</div>
				<div onClick={() => this.handleDeleteClick(penalty._id)} className="col-1"><button className="btn button">x</button></div>
			</div>
		)
	}

	renderPenalties() {
		if(this.props.penalties.length > 0) {
			return (
					<div>{this.props.penalties.map(item => this.renderPenalty(item))}</div>
			)
		} else {
			return (<div>empty</div>)
		}
	}

	render() {
		return (
			<div className="row penalties">
				<div className="col-12">
					<h2>PENALTIES</h2>
					<div className="row">
						<div className="col-4"><b>id</b></div>
						<div className="col-4"><b>sum</b></div>
					</div>
					{this.renderPenalties()}
				</div>
			</div>
		)
	}
}


const _PenaltiesCompact = connect(mapStateToProps, mapDispatchToProps)(PenaltiesCompact)
export default _PenaltiesCompact
// export default PenaltiesCompact