const api = "http://127.0.0.1:3001"

// Generating token
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Authorization': "94875648"
}

export const getCategories = () => 
	fetch(`${api}/categories`, { headers })
		.then(res => res.json())
		.then(categories => categories.categories)

export const getAllPosts = () => 
	fetch(`${api}/posts`, { headers})
		.then(res => res.json())

export const getPostDetail = (id) =>
	fetch(`${api}/posts/${id}`)
		.then(post => post.json())

export const getPostByCategory = (category) =>
	fetch(`${api}/${category}/posts`, { headers })
		.then(post => post.json())

export const getPostById = (id) =>
	fetch(`${api}/posts/${id}`, { headers })
		.then(post => post.json())

export const getCommentsOfPost = (id) =>
	fetch(`${api}/posts/${id}/comments`, { headers })
		.then(comments => comments.json())

export const postComment = (commObj) => 
	fetch(`${api}/comments`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(commObj)})
		.then(comment => comment.json())

export const postaPost = (postObj) => 
	fetch(`${api}/posts`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(postObj)})
		.then(post => post.json())

// voteOption is either upVote or downVote
export const votePost = (id, voteOption) => 
	fetch(`${api}/posts/${id}`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({"option": voteOption})})
		.then(post => post.json())

// voteOption is either upVote or downVote
export const voteComment = (id, voteOption) => 
	fetch(`${api}/comments/${id}`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({"option": voteOption})})
		.then(comment => comment.json())

// adding comments
export const addComment = (comm) => 
	fetch(`${api}/comments`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(comm)})
		.then(comment => comment.json())


// deleting comment
export const deleteComment = (id) => 
	fetch(`${api}/comments/${id}`, {
		method: 'DELETE',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
	})
	.then(comment => comment.json())


// deleting post
export const deletePost = (id) => 
	fetch(`${api}/posts/${id}`, {
		method: 'DELETE',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
	})
	.then(post => post.json())

// editing post
export const editPost = ({ id, title, body }) => 
	fetch(`${api}/posts/${id}`, {
		method: 'PUT',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({title, body})})
		.then(post => post.json())

// editing comment
export const editComment = ({ id, body }) => 
	fetch(`${api}/comments/${id}`, {
		method: 'PUT',
		headers: {
			...headers,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ body })})
		.then(comment => comment.json())
