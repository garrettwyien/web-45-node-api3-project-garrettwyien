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
      next({ message: "404 not found", status: 404});
    }
  } catch (err) {
    next(err);
  }
}

// Users.getById(req.params.id)
// .then(user=>{
//   if (user) {
//     res.status(200).json(user)
//   } else {
//     res.status(404).json({ message: "A user with the specified ID does not exist"})
//   }
// })
// .catch(err=>{
//   console.log(err)
//   res.status(500).json({ message: err.message})
// })

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = { logger, validateUserId, validateUser, validatePost }