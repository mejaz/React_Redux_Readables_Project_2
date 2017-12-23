import { combineReducers } from 'redux'
import { 
	VOTE_POST, 
	ADD_POST, 
	DELETE_POST, 
	EDIT_POST,
	VOTE_COMMENT, 
	ADD_COMMENT, 
	DELETE_COMMENT,
	EDIT_COMMENT,
	ADD_CATEGORY
} from '../actions'




const posts = (state={}, action) => {

	const { id, post, source, comment } = action

	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				[post.id]: post
			}

		case VOTE_POST:
			return {
				...state,
				[id]: post
			}

		case DELETE_POST:
			return {
				...state,
				[id]: post
			}

		case EDIT_POST:
			return {
				...state,
				[id]: post
			}


		default:
			return state
	}

}



const comments = (state={}, action) => {

	const { comment, id, parentId, source } = action

	switch (action.type) {
		case ADD_COMMENT:
			
			return {
				...state,
				[comment.parentId]: {
					...state[comment.parentId],
					[comment.id]: comment
				} 
			}

		case DELETE_COMMENT:
			return {
				...state,
				[parentId]: {
					...state[parentId],
					[id]: comment
					
				}
			}

		case EDIT_COMMENT:
			return {
				...state,
				[parentId]: {
					...state[parentId],
					[id]: comment
					
				}
			}			

		case VOTE_COMMENT:
			return {
				...state,
				[parentId]: {
					...state[parentId],
					[id]: comment
					
				}
			}

		default:
			return state
	}

}

const categories = (state={}, action) => {
	const { categories } = action

	switch (action.type) {
		case ADD_CATEGORY:
			return { categories	}

		default:
			return state
	}
}

export default combineReducers({
	categories,
	posts,
	comments
})




