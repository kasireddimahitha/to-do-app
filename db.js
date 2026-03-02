const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE todos (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT, done INTEGER)");
});

module.exports = db;