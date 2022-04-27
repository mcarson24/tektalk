import Sequelize from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

let db

if (process.env.JAWSDB_URL) {
  db = new Sequelize(process.env.JAWSDB_URL)
} else {
  db = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, 
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  )
}
export default db


