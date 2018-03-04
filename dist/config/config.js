"use strict";

module.exports = {
  "development": {
    "username": "root",
    "password": "",
    "database": "event",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.MY_USER,
    "password": process.env.MY_PASS,
    "database": process.env.MY_DBN,
    "host": process.env.MY_HOST,
    "dialect": "mysql",
    "dialectOptions": {
      "socketPath": "/cloudsql/" + "api-project-713618765244:us-central1:eventmanagedb"
    }
  }

};