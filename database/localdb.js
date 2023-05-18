import * as SQLite from "expo-sqlite";
import Todo from "../moduels/Todo";

const db = SQLite.openDatabase("todo.db"); // creat database

export const initDB = () => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      // initiate the database transactions
      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS todos(
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT  NULL,
        completed  BOOLEAN NOT NULL
       )`,
        [],
        (tx, res) => resolve(res),
        (tx, err) => reject(err)
      );
    });
  });
};

export const findAll = () => {
  return new Promise((resolve, reject) => {
    db.transaction((transaction) => {
      transaction.executeSql(
        `SELECT * FROM  todos`,[],
        (tx, res) => resolve(res.rows._array
          .map(todo=> new Todo(todo.id, todo.title, todo.isCompleted===1))),
        (tx, err) => reject(err)
      );
    });
  });
};

export const insert = (todo) => {
    return new Promise((resolve, reject) => {
      db.transaction((transaction) => {
        transaction.executeSql(
           `INSERT INTO todos (title, completed)
          VALUES (?,?) ` 
          /* `INSERT IF NOT EXISTS(SELECT title FROM TODO where titile is null or tile=1) begine INSERT INTO todos (title, completed)
          VALUES (?,?) ` */,[todo.title,todo.isCompleted],
          (tx, res) => resolve(res),
          (tx, err) => reject(err)
        );
      });
    });
  };
  export const delet = (id) => {
    return new Promise((resolve, reject) => {
      db.transaction((transaction) => {
        transaction.executeSql(
          `DELETE FROM todos WHERE id=?
        `,[id],
          (tx, res) => resolve(res),
          (tx, err) => reject(err)
        );
      });
    });
  };
  export const upDate = (id,title) => {
    return new Promise((resolve, reject) => {
      db.transaction((transaction) => {
        transaction.executeSql(
          `UPDATE todos SET title = ? WHERE id=?  
        `,[title,id],
          (tx, res) => resolve(res),
          (tx, err) => reject(err)
        );
      });
    });
  };
  