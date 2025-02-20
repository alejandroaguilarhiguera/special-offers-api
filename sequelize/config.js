// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv')

dotenv.config()

const prod = process.env.NODE_ENV === 'production'

module.exports = {
  username: process.env.PGSQL_USER || process.env.PGUSER || 'root',
  password: process.env.PGSQL_PASSWORD || process.env.PGPASSWORD || 'root',
  database: process.env.PGSQL_DATABASE || process.env.PGDATABASE || 'database',
  port: Number(process.env.PGSQL_PORT || process.env.PGPORT) || 3306,
  host: process.env.PGSQL_HOST || process.env.PGHOST || 'localhost',
  dialect: 'postgres',
  seederStorage: 'sequelize',
  logging: !prod && process.env.NODE_ENV !== 'test',
  dialectOptions: {
    searchPath: 'public',
    prependSearchPath: true,
  },
  quoteIdentifiers: false,
}
