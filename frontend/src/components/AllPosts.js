import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import FaPlay from 'react-icons/lib/fa/play'
import Modal from 'react-modal'
import * as ReadsAPI from '../utils/api'
import { capitalize, checkUndefined } from '../utils/helper'
import { connect } from 'react-redux'
import AddNewPost from './AddNewPost'
import { addPost, addCategories, thunkPostVote, thunkDeletePost, thunkEditPost } from '../actions'
import PostVoteScore from './PostVoteScore'
import sortBy from 'sort-by'
import Moment from 'react-moment'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import FaEdit from 'react-icons/lib/fa/edit'
import EditPost from './EditPost'
import FaListUI from 'react-icons/lib/fa/list-ul'

class AllPosts extends Component {

	state = {
		allCategories: [],
		categoryChosen: "",
	    sortOptions: ["voteScore", "timestamp"],
	    sortbySelected: "voteScore",
		modalOpenFlag: false,
		votes: null,
		posts: [],
		path:"",
		editModalOpenFlag: false,
		editingPost: ""
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
			})
		} else {
			this.setState({
				categoryChosen: "All Categories",
			})
		}

	}

	sortBySelection = (e) => {
		this.setState({ sortbySelected: e.target.value })
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

	deletingAPost = ({id}) => {
		this.props.thunkDeletePost({id})
		this.props.history.push('/')
	}

	editPost = (post) => {
		this.setState({ 
			editModalOpenFlag: true,
			editingPost: post,
			 })
	}

	closeEditPostModal = () => {
		this.setState({ editModalOpenFlag: false })
	}

	render() {

  	const posts = this.state.categoryChosen === "All Categories"
  				? this.props.posts 
  				: this.props.posts.filter((post) => post.category === this.props.match.params.category)
  	
  	if(this.state.sortbySelected !== '') {
		posts.sort(sortBy(this.state.sortbySelected))
		console.log( "sorted selection ", this.state.sortbySelected)
	}

  	const { allCategories, sortOptions, categoryChosen, modalOpenFlag } = this.state
  	console.log("all props", this.props)
	console.log("posts", posts)

		
	return (

    <div className="app-body">
    	<div className="all-post-list">
				<h2 className="category-name">{ capitalize(this.state.categoryChosen) }</h2>
				
				<ul className="all-posts">
					{posts.map((post) => (
						<li key={post.id}>
							<p>
								<div className="all-post-hq">
									<div className="all-post-info">
										<Link to={`/${post.category}/${post.id}`}> {capitalize(post.title)}</Link><br />
										<span>Comments: {post.commentCount}</span><br /><br />
										<Moment>{ post.timestamp }</Moment><br />
										<span>Posted By: {post.author}</span><br />
										<PostVoteScore 
											votes={ post.voteScore }
											id={ post.id }
											votingFunc={ this.props.thunkPostVote }
										 />
									</div>
									<div className="all-posts-controls">
										<button onClick={() => this.editPost(post)} >
											<FaEdit size={25}/>
										</button>
										<button onClick={() => this.deletingAPost({id:post.id})}>
											<FaTrashO size={25}/>
										</button>
									</div>
								</div>
							</p>
						</li>
					))}

				</ul>
    	</div>

    	<div className="all-post-options">
    		<ol className="categories">
    			<li>
		    		Category: 
		    	</li>
		    	<li><Link to="/">All Categories</Link></li>

		    	{allCategories.map((cat) => (
		    		<li><Link to={`/${cat.path}`}>{capitalize(cat.name)}</Link></li>
		    		))}

	    	</ol>
	    	<ol>	
	    		<li className="posts-vote-by">
		    		Sort By:
		    		<select value={this.state.sortbySelected} onChange={(e) => this.sortBySelection(e)}>
		    			{sortOptions.map((opt) => (
		    				<option value={opt} key={opt}>{capitalize(opt)}</option>      			
		    			))}
		    		</select>
	    		</li>
	      </ol>
	      <div className="addPostButton" onClick={() => this.openNewPostModal()}>
	      	Add Post <FaPlay />
      	</div>
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

    	{/* Edit Post Modal */}
    	<Modal 
    		className="modal"
    		overlayClassname="overlay"
    		isOpen={ this.state.editModalOpenFlag }
    		onRequestClose={ this.closeEditPostModal }
    		contentLabel="Edit a Post"
    		ariaHideApp={false}
    	>
    		<EditPost 
    			thunkEditPost={ this.props.thunkEditPost }
    			post={this.state.editingPost}
    			closeModal={this.closeEditPostModal}
    			/>
    	</Modal>    	
    </div>

		)
	}
}

function mapStateToProps({posts, comments, categories}) {
	return {
		posts: Object.keys(posts).map((key) => posts[key] ).filter((post) => post.deleted !== true),
		comments,
		categories
	}
}

function mapDispatchToProps(dispatch) {
	return {
	    dispatchAddingPost: (data) => dispatch(addPost(data)),
	    dispatchAddCategories: (data) => dispatch(addCategories(data)),
	    thunkPostVote: (data) => dispatch(thunkPostVote(data)),
	    thunkDeletePost: (data) => dispatch(thunkDeletePost(data)),
	    thunkEditPost: (data) => dispatch(thunkEditPost(data)),

	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllPosts));

