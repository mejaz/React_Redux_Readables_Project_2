import React, { Component } from 'react'
import 'uuid'
import * as ReadsAPI from '../utils/api.js'

class AddComment extends Component {

	constructor(props) {
		super(props)
		this.state = {
			comment: "",
		}
	}

	handleChange = (e) => {
		this.setState({
			comment: e.target.value
		})
	}


	commentSubmit = (e) => {
		e.preventDefault()

		if((this.state.comment).length === 0) {
			alert("comment cannot be empty")
			return
		}

		const uuidv4 = require('uuid/v4')

		const commObj = {
			id: uuidv4(),
			parentId: this.props.parentId,
			timestamp: Date.now(),
			body: this.state.comment,
			author: "Anon",
			voteScore: 0,
			deleted: false,
			parentDeleted: false
			
		}

		// adding comments to the store
		this.props.thunkAddComment(commObj)
		this.props.addCommentBox(false)

	}

	render() {
		return (
			<form className="add-comment" onSubmit={this.commentSubmit}>
				
				<textarea value={this.state.comment} onChange={this.handleChange} placeholder="Comment..."></textarea><br />
				<button onClick={() => this.props.addCommentBox(false)}>Cancel</button>
				<input type="submit" value="Submit" />
				
			</form>
			)
	}
}

export default AddComment