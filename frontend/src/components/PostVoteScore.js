import React, { Component } from 'react'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up'
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down'


class PostVoteScore extends Component {


	render() {
		console.log("post voting props", this.props)
		const { id, votes, votingFunc } = this.props

		return (
			<div>
				<button onClick={() => votingFunc({ id, voteValue: "upVote" })}>
					<FaThumbsUp size={20} />
				</button>
					<span> { votes } </span>
				<button onClick={() => votingFunc({ id, voteValue: "downVote" })}>
					<FaThumbsDown size={20} />
				</button>
			</div>
		)
	}
}



export default PostVoteScore