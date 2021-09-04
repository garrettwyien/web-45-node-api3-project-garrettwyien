const express = require('express');
const Posts = require('../posts/posts-model');
const Users = require('../users/users-model');
const { logger, validateUserId, validateUser, validatePost } = require('../middleware/middleware');
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', async (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(next);
});

router.get('/:id', logger, validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
});

router.post('/', logger, validateUser, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  Users.insert(req.body)
    .then(user=>{
      res.status(201).json(user);
    })
    .catch(err=>{
      next(err)
    })
});

router.put('/:id', logger, validateUserId, validateUser, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Users.update(req.params.id, req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err=>{
    next(err)
  })
});

router.delete('/:id', logger, validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  Users.remove(req.params.id)
  .then((req)=>{
    res.status(200).json(req.params)
  })
  .catch(err=>{
    next(err)
  })
});

router.get('/:id/posts', logger, validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  Users.getUserPosts(req.params.id)
  .then(posts=>{
    res.status(200).json(posts)
  })
  .catch(next)
});

router.post('/:id/posts', logger, validateUserId, validatePost, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const postText = { ...req.body }
  Posts.insert(postText)
  .then(post => {
    res.status(201).json(post);
  })
  .catch(next)
});

// do not forget to export the router
module.exports = router;