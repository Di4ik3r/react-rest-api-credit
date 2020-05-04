import React from 'react'
import { Link } from 'react-router-dom'
import "./Main.css"
import PersonsCompact from '../persons/PersonsCompact'
import PenaltiesCompact from '../penalties/PenaltiesCompact'
import CreditsCompact from '../credits/CreditsCompact'


class Main extends React.Component {

	constructor(props) {
		super(props)
	}

	renderJournal() {
		return(
			<div>
				{/* <div className="row menu">
					<div className="col-12">{Menu()}</div>
				</div> */}
				<div className="row main text-center">
					<div className="col-3 persons">
						<PersonsCompact />
					</div>
					<div className="col-9 penalties-credits">
						{/* tyt buv ya */}
						<div><PenaltiesCompact /></div>
						<div><CreditsCompact /></div>
					</div>
				</div>
			</div>
		)
	}

	render() {
		return (
			this.renderJournal()
		)
	}
}


export default Main