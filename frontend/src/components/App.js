import React, { Component } from 'react'
import { Route, Link, withRouter } from 'react-router-dom'
import AllPosts from './AllPosts'
import DisplayPost from './DisplayPost'
import * as ReadsAPI from '../utils/api'
import { connect } from 'react-redux'
import NotFound404 from './NotFound404'


class App extends Component {

  render() {

  	console.log("Final props", this.props)
    return (
      <div className="container">
      	<div className="header">
          <h1><Link to="/">Readables App</Link></h1>
        </div>

        <Route exact path='/' render={(props) => (
        	<AllPosts  {...props}
          />
	       )} />

        <Route exact path='/:category/:id' render={(props) => (
      		<DisplayPost {...props}
      		/>
      		)}
        />
        <Route exact path='/:category' render={(props) => (
          <AllPosts {...props}/>
          )}>
        </Route>

        <Route exact path='/notfound' render={() => (
            <NotFound404 />
          )} />

      </div>
    )
  }
}


export default App


