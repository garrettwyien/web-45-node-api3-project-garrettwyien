const Posts = require('../posts/posts-model');
const Users = require('../users/users-model');

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}}`
  );
  next();
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  try {
    const { id } = req.params
    const possibleUser = await Users.getById(id)
    if (possibleUser) {
      req.user = possibleUser
      next();
    } else {
      next({ message: "user not found", status: 404});
    }
  } catch (err) {
    next(err);
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if  (
    !req.body.name ||
    typeof req.body.name !== 'string'
  ) {
    next({ message: "missing required name field", status: 400 })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if  (
    !req.body.text ||
    typeof req.body.text !== 'string'
  ) {
    next({ message: "missing required text field", status: 400 })
  } else {
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost }