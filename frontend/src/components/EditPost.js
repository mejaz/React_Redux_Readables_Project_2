import React, { Component } from 'react'
import { Form, Text, Select, TextArea } from 'react-form'
import 'uuid'
import * as ReadsAPI from '../utils/api'
import { capitalize } from '../utils/helper'


const TITLE = "title"
const SELECTED_CATEGORY = "sel_cat"
const BODY = "body"

class EditPost extends Component {

	constructor(props) {
		super(props)
		this.state = {
			allCategories: [],
			selectedCategory: "",
			title: props.post.title,
			body: props.post.body,
			id: props.post.id,
		}
	}

	// componentDidMount() {
	// 	ReadsAPI.getCategories().then((allCategories) => 
	// 			this.setState({
	// 				allCategories
	// 			}))
	// }

	handleChange = (e) => {

		switch(e.target.name) {
			case TITLE:
				return (
					this.setState({ title: e.target.value })
				)

			case BODY:
				return (
					this.setState({ body: e.target.value})
				)

		}
	}

	postSubmit = (e) => {
		e.preventDefault()

		if (((this.state.title).length === 0) || (((this.state.body).length) === 0 )) {
			alert("Title or Content cannot be blank!!")
			return
		}
		
		const postObj = {
			id: this.state.id,
			title: this.state.title,
			body: this.state.body,
			
		}

		console.log("postobj", postObj)
		// ReadsAPI.postaPost(postObj).then((post) => {
		// 	this.props.dispatchAddingPost({ post: post })
		// 	this.props.closeNewPostModal()
		// 	this.props.addNewPostToLocalState(post)
		// 	})

		this.props.thunkEditPost(postObj)
		this.props.closeModal()
	}

	render() {
		console.log("edit post props", this.props)
		const { title, body } = this.state
		// const { id, title, body } = post

		return (
			<div>

				<form className="modal-input" onSubmit={this.postSubmit}>
					<label htmlFor="title">Title</label>
					<input type="text" name="title" id="title" onChange={this.handleChange} value={this.state.title}/><br />
					<label htmlFor="body">Content</label>
					<textarea name="body" id="body" onChange={this.handleChange} value={this.state.body}/><br />
					<button type="submit">Submit</button>
				</form>

			</div>
		)
	}
}

export default EditPost