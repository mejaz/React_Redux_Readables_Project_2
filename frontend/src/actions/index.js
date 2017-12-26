import * as ReadsAPI from '../utils/api'
// import { push } from 'react-router-redux'

// post constants
export const VOTE_POST = 'VOTE_POST'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'

// comment constants
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

// category constants
export const ADD_CATEGORY = 'ADD_CATEGORY'

// post upvote action creator
export function postVote({id, post}) {
	return {
		type: VOTE_POST,
		id,
		post,
	}
}

// comment upvote action creator
export function commentVote({id, comment, parentId=''}) {
	return {
		type: VOTE_COMMENT,
		id,
		comment,
		parentId
	}
}

// for upvoting and downvoting post
export function thunkPostVote({id, voteValue}) {
	return function(dispatch) {
		return ReadsAPI.votePost(id, voteValue)
			.then((post) => dispatch(postVote({id, post})))
	}
}

// for upvoting and downvoting comment
export function thunkCommentVote({id, voteValue, parentId=''}) {
	return function(dispatch) {
		return ReadsAPI.voteComment(id, voteValue)
			.then((comment) => dispatch(commentVote({id, comment, parentId})))
	}

}


// for adding a post
export function addPost({post}) {
	console.log("*******adding post*****")
	return {
		type: ADD_POST,
		post
	}
}

// for upvoting and downvoting comment
export function thunkAddPost({id, voteValue, parentId=''}) {
	return function(dispatch) {
		return ReadsAPI.voteComment(id, voteValue)
			.then((comment) => dispatch(commentVote({id, comment, parentId})))
	}

}


// delete post action creator
export function deletePost({id, post}) {
	return {
		type: DELETE_POST,
		id,
		post
	}
}

// delete comment action creator
export function deleteComment({id, comment, parentId}) {
	return {
		type: DELETE_COMMENT,
		id,
		comment,
		parentId
	}
}

// for deleting a post
export function thunkDeletePost({id}, history) {
	return function(dispatch) {
		return ReadsAPI.deletePost(id)
			.then((post) => { dispatch(deletePost({id, post})) })
	}
}

// for deleting a comment
export function thunkDeleteComment({id, parentId}) {
	return function(dispatch) {
		return ReadsAPI.deleteComment(id)
			.then((comment) => dispatch(deleteComment({id, comment, parentId})))
	}
}


// adding a comment action creator
export function addComment( comment ) {
	return {
		type: ADD_COMMENT,
		comment,
	}
}

// for adding a comment
export function thunkAddComment(comment) {
	return function(dispatch) {
		return ReadsAPI.addComment(comment)
			.then((comment) => dispatch(addComment(comment)))

	}
}

// adding categories to store action creator
export function addCategories({ categories }) {
	return {
		type: ADD_CATEGORY,
		categories
	}
}

// editing a post action creator
export function editPost( { id, post } ) {
	return {
		type: EDIT_POST,
		id,
		post,
	}
}

// for edit a post
export function thunkEditPost({ id, title, body }) {
	return function(dispatch) {
		return ReadsAPI.editPost({ id, title, body })
			.then((post) => dispatch(editPost({ id, post })))

	}
}

//editing a comment
export function editComment( { id, comment } ) {
	return {
		type: EDIT_COMMENT,
		id,
		parentId: comment.parentId,
		comment,
	}
}

// for edit a comment
export function thunkEditComment({ id, body, author }) {
	return function(dispatch) {
		return ReadsAPI.editComment({ id, body, author })
			.then((comment) => dispatch(editComment({ id, comment })))

	}
}




