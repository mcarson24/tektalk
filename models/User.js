import bcrypt from 'bcrypt'
import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/db.js'

export default class User extends Model {
  async isValid(password) {
    return await bcrypt.compare(password, this.password)
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8]
    }
  }
}, {
  hooks: {
    beforeCreate: async user => {
      user.password = await bcrypt.hash(user.password, 10)

      return user
    }
  },  
  sequelize,
  underscored: true
})