import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { refreshCredits } from '../actions/actions'
import { connect } from 'react-redux'


const mapStateToProps = state => {
	return {
		credits: state.credits,
		selectedPerson: state.selectedPerson,
	}
}

const mapDispathToProps = (dispatch) => {
	return {
		refreshCredits: (credits) => dispatch(refreshCredits(credits))
	}
}

class CreditsCompact extends React.Component {

	constructor(props) {
		super(props)

		// this.state = {
		// 	credits: [],
		// }
	}

	componentDidMount() {
		// axios.get('http://localhost:1337/api/credits')
		// 	.then(res => {
		// 		this.setState({...this.state, credits: res.data})
		// 	})
		this.refreshCredits()
	}

	handleDeleteClick(id) {
		axios.delete(`http://localhost:1337/api/credits/${id}`)
		.then(res => {
			this.refreshCredits()
		})
	}

	renderPenalty(credit) {
		return (
			<div key={credit._id} className="row credit text-left">
				<div className="col-12"><div className="row">
					<div className="col-2"><b>PERSON:</b></div>
					<div className="col-3">{credit.person};</div>
					<div className="col-1 offset-1"><b>SUM:</b></div>
					<div className="col-1">{credit.sum};</div>
				</div></div>
				<div className="col-12"><div className="row">
					<div className="col-2"><b>DATE:</b></div>
					<div className="col-3">{credit.date};</div>
					<div className="col-1 offset-1"><b>PERCENT:</b></div>
					<div className="col-1">{credit.percent};</div>
					<div className="col-1 offset-1"><Link to={`/credits/${credit._id}`}><button className="btn button">e</button></Link></div>
					<div className="col-1"><button onClick={() => this.handleDeleteClick(credit._id)} className="btn button">x</button></div>
				</div></div>
				<div className="col-12"><div className="row">
					<div className="col-2"><b>CREDIT TYPE:</b></div>
					<div className="col-3">{credit.creditType};</div>
					<div className="col-1 offset-1"><b>TERM:</b></div>
					<div className="col-1">{credit.term};</div>
				</div></div>
				
			</div>
		)
	}

	deprecated_renderPenalty(credit) {
		return (
			<div key={credit._id} className="row credit text-center">
				<div className="col-2">{credit.person}</div>
				<div className="col-2">{credit.sum}</div>
				<div className="col-1">{credit.percent}</div>
				<div className="col-2">{credit.date}</div>
				<div className="col-1">{credit.term}</div>
				<div className="col-2">{credit.creditType}</div>
				<div className="offset-1 col-1">
					<Link to={`/credits/${credit._id}`}><button className="btn button">e</button></Link>
				</div>
				<div className="col-1"><button className="btn button">x</button></div>
			</div>
		)
	}

	renderCredits() {
		if(this.props.credits.length > 0) {
			return (
					<div>{this.props.credits.map(item => this.renderPenalty(item))}</div>
			)
		} else {
			return (<div>empty</div>)
		}
	}

	render() {
		return (
			<div className="row credits">
				<div className="col-12">
					<h2>CREDITS</h2>
					<div className="row">
						{/* <div className="col-2"><b>person</b></div>
						<div className="col-2"><b>sum</b></div>
						<div className="col-1"><b>percent</b></div>
						<div className="col-2"><b>date</b></div>
						<div className="col-1"><b>term</b></div>
						<div className="col-2"><b>credit type</b></div> */}
					</div>
					{this.renderCredits()}
				</div>
			</div>
		)
	}

	refreshCredits() {
		axios.get(`http://localhost:1337/api/credits`)
			.then(res => {
				const arr = res.data.filter(item => item.person === this.props.selectedPerson._id)
				this.props.refreshCredits(arr)
			})
	}
}


const _CreditsCompact = connect(mapStateToProps, mapDispathToProps)(CreditsCompact)
export default _CreditsCompact