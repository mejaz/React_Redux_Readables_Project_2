import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import FaPlusSquareO from 'react-icons/lib/fa/plus-square-o'
import * as ReadsAPI from '../utils/api'
import { capitalize, checkUndefined } from '../utils/helper'
import Modal from 'react-modal'
import PostVoteScore from './PostVoteScore'
import DisplayComments from './DisplayComments'
import AddComment from './AddComment'
import { thunkPostVote, addPost, thunkAddComment, thunkDeletePost, 
			thunkDeleteComment, addComment, thunkDeleteContent, thunkEditPost } from '../actions'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import FaEdit from 'react-icons/lib/fa/edit'
import EditPost from './EditPost'
import Moment from 'react-moment'


class DisplayPost extends Component {

	state = {
		postid : null,
		comments: {},
		addCommentFlag: null,
		editModalOpenFlag: false,
	}

	componentDidMount = () => {
		const id = this.props.match.params.id
		ReadsAPI.getPostById(id).then((post) => {
			
			this.props.addingPost({post})
			this.setState({ postid: post.id })
		})

		ReadsAPI.getCommentsOfPost(id).then((comments) => {
			comments.map((cmt) => {
				console.log("cmt", cmt)
				this.props.getComments(cmt)
			})
		})


	}

	addCommentBox = (flag) => {
		this.setState({ addCommentFlag: flag})
	}


	deletingAPost = ({id}) => {
		this.props.thunkDeletePost({id})
		this.props.history.push('/')
	}

	editPost = () => {
		this.setState({ editModalOpenFlag: true })
	}

	closeEditPostModal = () => {
		this.setState({ editModalOpenFlag: false })
	}

	render() {

		const { postid, editModalOpenFlag } = this.state
		const { posts, votingUp, votingDown, deletingContent, addingComment } = this.props
		const { id, title, category, body, author, commentCount, timestamp, voteScore } = checkUndefined(posts[postid])
		console.log("disp post", this.props)
		console.log(title)

		return (
			<div className="post-desc">
				<div className="post-header">
					<div className="post-title">
						<h2>{ capitalize(title) }</h2>
					</div>
					<div className="post-category">
						<h3>Category: { capitalize(category) }</h3>
					</div>
				</div>
				<p className="post-body">
					{ body }
				</p>

				<div className="post-info-controls">
					<div className="post-info">
						<b>Posted By</b>: { capitalize(author) }<br />
						<b>Comments count</b>: { commentCount } <br />
						<b>Date</b>: <Moment>{ timestamp }</Moment> <br />
					</div>
					<div className="post-controls">

						<button onClick={() => this.addCommentBox(true)} >
							<FaPlusSquareO size={15} />Comment
						</button><br />

						<PostVoteScore 
							votes={ voteScore }
							id={id}
							votingFunc={ this.props.thunkPostVote }
						 />	
						
						<button onClick={() => this.editPost()}>
							<FaEdit size={25}/>
						</button>
							
						<button onClick={() => this.deletingAPost({id})}>
							<FaTrashO size={25}/>
						</button>
					</div>
				</div>			


				<br />
				<br />
				<br />
				<br />
				<hr />
				<div>
					{ this.state.addCommentFlag 
						? <AddComment 
							parentId={ id } 
							thunkAddComment={ this.props.thunkAddComment }
							addCommentBox={this.addCommentBox}
							/> 
						: null }				
					<DisplayComments 
					comments={ this.props.comments[id] } 
					thunkDeleteComment={ this.props.thunkDeleteComment }
					/>
				</div>

		    	{/* Edit Post Modal */}
		    	<Modal 
		    		className="modal"
		    		overlayClassname="overlay"
		    		isOpen={ editModalOpenFlag }
		    		onRequestClose={ this.closeEditPostModal }
		    		contentLabel="Edit a Post"
		    		ariaHideApp={false}
		    	>
		    		<EditPost 
		    			thunkEditPost={ this.props.thunkEditPost }
		    			post={posts[postid]}
		    			closeModal={this.closeEditPostModal}
		    			/>
		    	</Modal>

			</div>

		)
	}
}

function mapStateToProps({posts, comments}) {
	return {
	    comments,
	    posts
	}

}

function mapDispatchToProps(dispatch) {
	return {
		addingPost: (data) => dispatch(addPost(data)),
		thunkAddComment: (data) => dispatch(thunkAddComment(data)),
		thunkEditPost: (data) => dispatch(thunkEditPost(data)),
		thunkDeletePost: (data) => dispatch(thunkDeletePost(data)),
		thunkDeleteComment: (data) => dispatch(thunkDeleteComment(data)),
		getComments: (data) => dispatch(addComment(data)),
	    thunkPostVote: (data) => dispatch(thunkPostVote(data)),
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisplayPost));


