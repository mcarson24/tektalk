import bcrypt from 'bcrypt'
import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/db.js'

export default class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: async user => {
      user.password = await bcrypt.hash(user.password, 10)
      console.log(user)

      return user
    }
  },  
  sequelize,
  underscored: true
})