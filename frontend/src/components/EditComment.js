import React, { Component } from 'react'
import 'uuid'
import * as ReadsAPI from '../utils/api.js'

class EditComment extends Component {

	constructor(props) {
		super(props)
		this.state = {
			id: props.comment.id,
			body: props.comment.body,
			author: props.comment.author,
		}
	}

	handleChange = (e) => {
		if(e.target.name === "comment") {
			this.setState({
				body: e.target.value
			})
		} else if(e.target.name === "author") {
			this.setState({
				author: e.target.value
			})
		}
	}


	commentSubmit = (e) => {
		e.preventDefault()

		const comment = this.state.body.trim()
		const author = this.state.author.trim()

		if(comment.length === 0 || author.length === 0) {
			alert("comment / author name cannot be empty")
			return
		}


		const commObj = {
			id: this.state.id,
			body: comment,
			author: author,

		}

		console.log()

		// adding comments to the store
		this.props.thunkEditComment(commObj)
		this.props.closeModal()

	}

	render() {
		return (
			<div className="edit-comment">
				<div className="modal-header"><h3>Edit Comment</h3></div>
				<form onSubmit={this.commentSubmit}>
					
					<label>Author:</label>
					<input className="comment-author" name="author" type="text" value={this.state.author} onChange={this.handleChange} /><br /><br />

					<label>Comment:</label>
					<textarea name="comment" value={this.state.body} onChange={this.handleChange}></textarea><br />
	
					<button type="submit" value="Submit">Submit</button>
					
				</form>
			</div>
			)
	}
}

export default EditComment