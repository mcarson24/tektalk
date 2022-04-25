import sequelize from '../config/db.js'
import { DataTypes, Model, Sequelize } from 'sequelize'

export default class Post extends Model {}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize
})