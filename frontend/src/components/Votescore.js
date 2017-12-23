import React, { Component } from 'react'
// import {upvote, downvote} from '../actions'
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up'
import FaThumbsDown from 'react-icons/lib/fa/thumbs-down'


class Votescore extends Component {


	render() {
		console.log("voting props", this.props)
		const { id, votes, voteUp, voteDown, source, parentId } = this.props

		return (
			<div>
				<button onClick={() => voteUp({ id, source, parentId })}>
					<FaThumbsUp size={20} />
				</button>
					<span> { votes } </span>
				<button onClick={() => voteDown({ id, source, parentId })}>
					<FaThumbsDown size={20} />
				</button>
			</div>
		)
	}
}



export default Votescore