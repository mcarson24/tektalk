import sequelize from '../config/db.js'
import { DataTypes, Model } from 'sequelize'

export default class Comment extends Model {}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  post_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'posts',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'comment'
})