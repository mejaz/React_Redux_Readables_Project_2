import React, { Component } from 'react'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up'
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down'


class CommentVoteScore extends Component {


	render() {
		console.log("comment voting props", this.props)
		const { id, votes, votingFunc, parentId } = this.props

		return (
			<div>
				<button onClick={() => votingFunc({ id, voteValue: "upVote", parentId })}>
					<FaThumbsUp size={20} />
				</button>
					<span> { votes } </span>
				<button onClick={() => votingFunc({ id, voteValue: "downVote", parentId })}>
					<FaThumbsDown size={20} />
				</button>
			</div>
		)
	}
}



export default CommentVoteScore