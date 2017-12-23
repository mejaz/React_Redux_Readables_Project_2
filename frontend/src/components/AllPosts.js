import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import FaPlusSquareO from 'react-icons/lib/fa/plus-square-o'
import Modal from 'react-modal'
import * as ReadsAPI from '../utils/api'
import { capitalize, checkUndefined } from '../utils/helper'
import { connect } from 'react-redux'
import AddNewPost from './AddNewPost'
import { addPost, addCategories, thunkPostVote } from '../actions'
import PostVoteScore from './PostVoteScore'

class AllPosts extends Component {

	state = {
		allCategories: [],
		categoryChosen: "",
	    sortOptions: ["votes", "timestamp"],
		modalOpenFlag: false,
		votes: null,
		posts: [],
		path:""
	}

	componentDidMount() {
		ReadsAPI.getCategories().then((allCategories) => {
				this.props.dispatchAddCategories({categories: allCategories})
				this.setState({
					allCategories: this.props.categories.categories
				})
			})
		// adding posts to Store
		ReadsAPI.getAllPosts().then((allPosts) => {
				allPosts.map((post) => this.props.dispatchAddingPost({post}))
				this.setState({
					posts: allPosts
				})
			})

		this.checkCategoryUpdate(this.props)

	}

	componentWillReceiveProps(props) {
		this.checkCategoryUpdate(props)
	} 

	checkCategoryUpdate(props) {
		if(typeof(props.match.params.category) != "undefined") {
			
			this.setState({
				categoryChosen: props.match.params.category,
				// posts: newPosts
			})
		} else {
			this.setState({
				categoryChosen: "All Categories",
				// posts: this.props.posts
			})
		}

	}


	// adding a post to a local state
	addNewPostToLocalState = (post) => {
		const posts = this.state.posts
		posts.push(post)
		this.setState({
			allPosts: posts
		})

	}


	openNewPostModal = () => {
		this.setState({modalOpenFlag: true})
	}


	closeNewPostModal = () => {
		this.setState({modalOpenFlag: false})
	}


	render() {

  	const posts = this.state.categoryChosen === "All Categories"
  				? this.props.posts 
  				: this.props.posts.filter((post) => post.category === this.props.match.params.category)
  	const { allCategories, sortOptions, categoryChosen, modalOpenFlag } = this.state
  	console.log("all props", this.props)
  	
	// console.log("all posts", allPosts)

	// posts = posts.filter((post) => post.category === categoryChosen)
		
	return (

    <div className="app-body">
    	<div className="page-options-grid">
    		<ol className="page-options">
    			<li>
		    		Category: 
		    	</li>
		    	<li><Link to="/">All Categories</Link></li>

		    	{/*
		    		<select onChange={this.filterByCategory} value={categoryChosen}>
		    			<option value="All Categories" key="">All Categories</option>
		      		{ allCategories.map((cat) => (
		        		<option value={cat.name} key={cat.name}>
		        			<a href={`/${cat.path}`}>{capitalize(cat.name)}</a>
		        		</option>
		      			))
		      		}
		    		</select>
		    	*/}

		    	{allCategories.map((cat) => (
		    		<li><Link to={`/${cat.path}`}>{capitalize(cat.name)}</Link></li>
		    		))}

	    		
	    		<li>
		    		Sort By:
	    		</li>
	    		<li>
		    		<select>
		    			{sortOptions.map((opt) => (
		    				<option key={opt}>{capitalize(opt)}</option>      			
		    			))}
		    		</select>
	    		</li>
	    		<li>
			      	<div className="addPostButton" onClick={() => this.openNewPostModal()}>
			      		<FaPlusSquareO size={20} /> Add a Post
			      	</div>
		      	</li>
	      	</ol>
    	</div>

    	<div>
			<h2 className="category-name">{ capitalize(this.state.categoryChosen) }</h2>
			
			<ul className="all-posts">
				{posts.map((post) => (
					<li key={post.id}>
						<p>
							<Link to={`/${post.category}/${post.id}`}> {capitalize(post.title)}</Link><br />
							<span>Posted By: {post.author}</span><br />
							<span>Comments: {post.commentCount}</span><br />
							<PostVoteScore 
								votes={ post.voteScore }
								id={ post.id }
								votingFunc={ this.props.thunkPostVote }
							 />							
						</p>
					</li>
				))}

			</ul>
    	</div>

    	{/* New Post Modal */}
    	<Modal 
    		className="modal"
    		overlayClassname="overlay"
    		isOpen={ modalOpenFlag }
    		onRequestClose={ this.closeNewPostModal }
    		contentLabel="Add a Post"
    		ariaHideApp={false}
    	>
    		<AddNewPost 
    			dispatchAddingPost={ this.props.dispatchAddingPost }
    			closeNewPostModal={ this.closeNewPostModal }
    			addNewPostToLocalState= { this.addNewPostToLocalState }
    			/>
    	</Modal>
    </div>

		)
	}
}

function mapStateToProps({posts, comments, categories}) {
	return {
		posts: Object.keys(posts).map((key) => posts[key] ).filter((post) => post.deleted !== true),
		// posts,
		comments,
		categories
	}
}

function mapDispatchToProps(dispatch) {
	return {
	    dispatchAddingPost: (data) => dispatch(addPost(data)),
	    dispatchAddCategories: (data) => dispatch(addCategories(data)),
	    thunkPostVote: (data) => dispatch(thunkPostVote(data))

	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllPosts));
// export default AllPosts
