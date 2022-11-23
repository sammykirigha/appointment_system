module.exports = {
    development: {
        database: process.env.DB_DB,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: process.env.POSTGRES_DIALECT
    }
    
  };






// {
//   "development": {
//     "username": "postgres",
//     "password": "postgres",
//     "database": "appnt_db",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   },
//   "test": {
//     "username": "postgres",
//     "password": "postgres",
//     "database": "doctris_test",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   },
//   "production": {
//     "username": "postgres",
//     "password": "postgres",
//     "database": "doctris_production",
//     "host": "127.0.0.1",
//     "dialect": "postgres"
//   }
// }
