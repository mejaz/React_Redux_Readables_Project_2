import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import AllPosts from './AllPosts'
import DisplayPost from './DisplayPost'
import * as ReadsAPI from '../utils/api'
// import { addPost, addCategories, thunkPostVote } from '../actions'
import { connect } from 'react-redux'


class App extends Component {

  // state = {
  //   allCategories: [],
  //   posts: [],
  //   sortOptions: ["votes", "timestamp"],
  // }

  // componentDidMount() {
  //   ReadsAPI.getCategories().then((allCategories) => {
  //       this.props.dispatchAddCategories({categories: allCategories})
  //       this.setState({
  //         allCategories: this.props.categories.categories
  //       })
  //     })
  //   // adding posts to Store
  //   ReadsAPI.getAllPosts().then((allPosts) => {
  //       allPosts.map((post) => this.props.dispatchAddingPost({post}))
  //       this.setState({
  //         posts: allPosts
  //       })
  //     })
  //   // this.setState({categoryChosen: this.props.match.params.category})
  // }


  render() {

  	console.log("Final props", this.props)
    return (
      <div className="container">
      	<div className="header">
          <h1>Readables App</h1>
        </div>

        <Route exact path='/' render={(props) => (
        	<AllPosts  {...props}
          // posts={this.state.posts}
          // allCategories={this.state.allCategories}
          // sortOptions={this.state.sortOptions}
          />
	       )} />

        <Route exact path='/:category/:id' render={(props) => (
      		<DisplayPost {...props}
      		/>
      		)}
        />
        <Route exact path='/:category' render={(props) => (
          <AllPosts {...props}
      
          />
          )}
        />


      </div>
    )
  }
}


export default App


