import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Text, Select, TextArea } from 'react-form'
import 'uuid'
import * as ReadsAPI from '../utils/api'
import { capitalize } from '../utils/helper'


const TITLE = "title"
const SELECTED_CATEGORY = "sel_cat"
const BODY = "body"

class AddNewPost extends Component {

	state = {
		allCategories: [],
		title: "",
		body: "",
		value: ''
	}

	componentDidMount() {
		ReadsAPI.getCategories().then((allCategories) => 
				this.setState({
					allCategories,
					value: allCategories[0].name
				}))
	}

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

			case SELECTED_CATEGORY:
				return (
					this.setState({ value: e.target.value})
				)
		}
	}

	postSubmit = (e) => {
		e.preventDefault()

		if (((this.state.title).length === 0) || (((this.state.body).length) === 0 )) {
			alert("Title or Content cannot be blank!!")
			return
		}

		const uuidv4 = require('uuid/v4')

		const postObj = {
			id: uuidv4(),
			timestamp: Date.now(),
			title: this.state.title,
			body: this.state.body,
			category: this.state.value.toLowerCase(),
			author: "Anon",
			voteScore: 0,
			deleted: false,
			commentCount: 0
			
		}
		console.log("postobj", postObj) 

		ReadsAPI.postaPost(postObj).then((post) => {
			this.props.dispatchAddingPost({ post: post })
			this.props.closeNewPostModal()
			this.props.addNewPostToLocalState(post)
			})
	}

	render() {
		console.log("new post props", this.props)
		const { categories } = this.state.allCategories

		return (
			<div>

				<form className="modal-input" onSubmit={this.postSubmit}>
					Category: <select name="sel_cat" onChange={this.handleChange} value={this.state.value}>
	
					{this.state.allCategories.map((category) => (
						<option value={category.name} key={category.name}>{ capitalize( category.name )}</option>
						))}

					</select><br /><br />

					<label htmlFor="title">Title:</label>
					<input type="text" name="title" id="title" onChange={this.handleChange}/><br /><br />
					<label className="contentLabel" htmlFor="body">Content:</label>
					<textarea name="body" id="body" rows='10' cols='80' onChange={this.handleChange}/> <br /><br />
					<button type="submit">Submit</button>
				</form>

			</div>
		)
	}
}


export default AddNewPost