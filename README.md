# React_Redux_Readables_Project_2
Udacity React Project 2

Readables : A Reading App -- version 1.0 12/23/2017


Introduction:
-------------
Readables is a reading app where a user can post contents on different categories already mentioned in the app.
Readers can read the content and provide feedbacks via Upvote or Downvote buttons. They can even post comments, 
which can further be upvoted / downvoted.
The frontend of the application is written in React, using Redux Store.


Configuration:
--------------
The Readables App works with -

1. react : 16.2.0
2. react-dom : 12.2.0
3. react-router-dom : 4.2.2
4. font-awesome : 4.7.0
5. moment : 2.20.1
6. react-icons : 2.2.7
7. react-modal : 3.1.8
8. react-moment : 0.6.8
9. react-redux : 5.0.6
10. react-router : 4.2.0
11. redux : 3.7.2
12. redux-thunk : 2.2.0
13. sort-by : 1.2.0
14. uuid : 3.1.0


Steps to launch the Readables App:
--------------------------------
1. Launch cmd(in Windows) or Terminal (in MacOS).
2. Navigate to the folder containing all the files of this repository for the folder frontend.
3. Run the command - `npm install`
4. Run the command - `npm start`
5. The Readables application will start at local host port 3000 - http://127.0.0.1:3000
6. Navigate to api-server folder from this repository.
7. Run the command - `node server.js` to run the server at port 3001 - http://127.0.0.1:3001


API Endpoints used in the Readables App:
--------------------------------------
Endpoint : http://127.0.0.1:3001
    The following endpoints are available:

    GET /categories
      USAGE:
        Get all of the categories available for the app. List is found in categories.js.

    GET /:category/posts
      USAGE:
        Get all of the posts for a particular category

    GET /posts
      USAGE:
        Get all of the posts. Useful for the main page when no category is selected.

    POST /posts
      USAGE:
        Add a new post

      PARAMS:
        id - UUID should be fine, but any unique id will work
        timestamp - timestamp in whatever format you like, you can use Date.now() if you like
        title - String
        body - String
        author - String
        category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.

    GET /posts/:id
      USAGE:
        Get the details of a single post

    POST /posts/:id
      USAGE:
        Used for voting on a post
      PARAMS:
        option - String: Either "upVote" or "downVote"

    PUT /posts/:id
      USAGE:
        Edit the details of an existing post
      PARAMS:
        title - String
        body - String

    DELETE /posts/:id
      USAGE:
        Sets the deleted flag for a post to 'true'.
        Sets the parentDeleted flag for all child comments to 'true'.

    GET /posts/:id/comments
      USAGE:
        Get all the comments for a single post

    POST /comments
      USAGE:
        Add a comment to a post

      PARAMS:
        id: Any unique ID. As with posts, UUID is probably the best here.
        timestamp: timestamp. Get this however you want.
        body: String
        author: String
        parentId: Should match a post id in the database.

    GET /comments/:id
      USAGE:
        Get the details for a single comment

    POST /comments/:id
      USAGE:
        Used for voting on a comment.

    PUT /comments/:id
      USAGE:
        Edit the details of an existing comment

      PARAMS:
        timestamp: timestamp. Get this however you want.
        body: String

    DELETE /comments/:id
      USAGE:
        Sets a comment's deleted flag to 'true'


Contact me:
-----------
mohdejazsiddiqui@gmail.com
