import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Modal from 'react-modal'
import { thunkCommentVote, thunkEditComment } from '../actions'
import { connect } from 'react-redux'
import EditComment from './EditComment'
import CommentVoteScore from './CommentVoteScore'
import FaTrashO from 'react-icons/lib/fa/trash-o'
import FaEdit from 'react-icons/lib/fa/edit'

class DisplayComments extends Component {

	state = {
		editCommentModalFlag: false,
		editComment: null
	}

	editComment = (cmnt) => {
		this.setState({ 
			editCommentModalFlag: true,
			editComment: cmnt,
			 })
	}

	closeEditCommentModal = () => {
		this.setState({ 
			editCommentModalFlag: false,
			editComment: null,
			 })
	}

	render() {
		
		// const { id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted } = this.state
		console.log("disp comm", this.props)
		const { comments, parentId, votingUp, votingDown, thunkDeleteComment} = this.props

		return (
			<div className="all-comments">
				{ comments && Object.keys(comments).map((comnt_id) => (
					
					(!comments[comnt_id].deleted) && <div key={ comnt_id } className="comments-display">
						<textarea className="comments-box" value={ comments[comnt_id].body } readOnly>
							
						</textarea>
						<br />
						Posted By: { comments[comnt_id].author }

						<CommentVoteScore 
							votes={comments[comnt_id].voteScore}
							id={comnt_id}
							votingFunc={ this.props.thunkCommentVote }
							// voteDown={ this.props.thunkDownVote }
							parentId={comments[comnt_id].parentId}						
						/>
						<button onClick={() => this.editComment(comments[comnt_id])}>
							<FaEdit size={25} />
						</button>
						<button onClick={() => thunkDeleteComment({id:comnt_id, parentId: comments[comnt_id].parentId})}>
							<FaTrashO size={25} />
						</button>

						<br /><br />
					</div>
					

				))}

		    	{/* Edit Comment Modal */}
		    	<Modal 
		    		className="modal"
		    		overlayClassname="overlay"
		    		isOpen={ this.state.editCommentModalFlag }
		    		onRequestClose={ this.closeEditCommentModal }
		    		contentLabel="Edit a Comment"
		    		ariaHideApp={false}
		    	>
		    		<EditComment 
		    			thunkEditComment={ this.props.thunkEditComment }
		    			// closeNewPostModal={ this.closeNewPostModal }
		    			// addNewPostToLocalState= { this.addNewPostToLocalState }
		    			comment={this.state.editComment}
		    			closeModal={this.closeEditCommentModal}
		    			/>
		    	</Modal>

			</div>

		)
	}
}



function mapStateToProps({posts, comments}) {
	// const postKeys = Object.keys(posts)
	// console.log(posts)
	return {

	}

}

function mapDispatchToProps(dispatch) {
	return {
	    thunkCommentVote: (data) => dispatch(thunkCommentVote(data)),
	    thunkEditComment: (data) => dispatch(thunkEditComment(data))
	    // votingDown: (data) => dispatch(downvote(data))
	    // thunkDownVote: (data) => dispatch(thunkDownVote(data))
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DisplayComments));

// export default DisplayComments