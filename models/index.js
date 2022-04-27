// TODO: Set up association/relationships between models
import User from './User.js'
import Post from './Post.js'
import Comment from './Comment.js'

// A User hasMany posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  as: 'posts',
  onDelete: 'cascade'
})

// A User hasMany comments
// Don't know if I will use this
User.hasMany(Comment, {
  foreignKey: 'user_id',
  as: 'comments',
  onDelete: 'cascade'
})

// A Post belongsTo a user
Post.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
})

// A Post hasMany comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  as: 'comments',
  onDelete: 'cascade'
})

// A Comment belongs to a Post
Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  as: 'post'
})

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
})

export { Comment, Post, User }