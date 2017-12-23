import React, { Component } from 'react'
import 'uuid'
import * as ReadsAPI from '../utils/api.js'

class EditComment extends Component {

	constructor(props) {
		super(props)
		this.state = {
			id: props.comment.id,
			body: props.comment.body,
		}
	}

	handleChange = (e) => {
		this.setState({
			body: e.target.value
		})
	}


	commentSubmit = (e) => {
		e.preventDefault()

		if((this.state.body).length === 0) {
			alert("comment cannot be empty")
			return
		}


		const commObj = {
			id: this.state.id,
			body: this.state.body,
		}

		console.log()

		// adding comments to the store
		this.props.thunkEditComment(commObj)
		this.props.closeModal()

	}

	render() {
		return (
			<form className="modal-input" onSubmit={this.commentSubmit}>
				
				<textarea value={this.state.body} onChange={this.handleChange}></textarea><br />
				<input type="submit" value="Submit" />
				
			</form>
			)
	}
}

export default EditComment