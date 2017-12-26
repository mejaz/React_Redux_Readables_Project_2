import React, { Component } from 'react'
import 'uuid'
import * as ReadsAPI from '../utils/api.js'

class AddComment extends Component {

	constructor(props) {
		super(props)
		this.state = {
			comment: "",
			author: ""
		}
	}

	handleChange = (e) => {

		if(e.target.name === "comment-author") {
			this.setState({
				author: e.target.value
			})
		} else if(e.target.name === "comment-text") {
			this.setState({
				comment: e.target.value
			})
		}

	}


	commentSubmit = (e) => {
		e.preventDefault()

		const comment = this.state.comment.trim()
		const author = this.state.author.trim()

		if(comment.length === 0 || author.length === 0) {
			alert("comment / author cannot be empty")
			return
		}

		const uuidv4 = require('uuid/v4')

		const commObj = {
			id: uuidv4(),
			parentId: this.props.parentId,
			timestamp: Date.now(),
			body: comment,
			author: author,
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
			<div className="add-comment-box">
				<h3>Add Comment...</h3>
				<form className="add-comment" onSubmit={this.commentSubmit}>
					
					<textarea name="comment-text" value={this.state.comment} onChange={this.handleChange} placeholder="Write Comment here..."></textarea><br />
					<input name="comment-author" type="text" value={this.state.author} onChange={this.handleChange} placeholder="Author's name here...	"/><br /><br />
					<button onClick={() => this.props.addCommentBox(false)}>Cancel</button>
					<button type="submit" value="Submit">Submit</button>
					
				</form>
			</div>
			)
	}
}

export default AddComment