require("dotenv").config();

module.exports = {
  development: {
    username: "dusan",
    password: "asd123",
    database: "baza-1",
    host: "localhost",
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: null,
    database: "_test",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false,
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: false,
  },
};
