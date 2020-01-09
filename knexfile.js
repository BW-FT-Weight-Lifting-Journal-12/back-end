module.exports = {
    development: {
      client: 'sqlite3',
      connection: { filename: './database/auth.db3' },
      useNullAsDefault: true,
      migrations: {
        directory: './database/migrations',
        tableName: 'dbmigrations',
      },
      seeds: { directory: './database/seeds' },
    },
  };

//   module.exports = {
//       testing: {
//           client: 'sqlite3',
//           connection: { filename: './database/test.db3' },
//           useNullAsDefault: true,
//           migrations: {
//               directory: './database/migrations',
//               tableName: 'dbmigrations',
//           },
//           seeds: { directory: './database/seeds' },
//       },
//   };