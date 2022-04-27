// TODO: Set up association/relationships between models
import User from './User.js'
import Post from './Post.js'
// A User hasMany posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'cascade'
})
// A Post belongsTo a user
Post.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
})

// A Post hasMany comments
// A Comment belongs to a Post

export { Post, User }