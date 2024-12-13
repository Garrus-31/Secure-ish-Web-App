const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./users.db', (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Database connected!');

    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )`);
  
    db.all(`PRAGMA table_info(users)`, (err, columns) => {
      if (err) {
        return console.error('Error retrieving table info:', err.message);
      }

      const columnExists = columns.some(column => column.name === 'isAdmin');
      
      if (!columnExists) {
        db.run('ALTER TABLE users ADD COLUMN isAdmin BOOLEAN DEFAULT FALSE', (err) => {
          if (err) {
            return console.error('Error updating table:', err.message);
          }
          console.log('isAdmin column added successfully');
        });
      } else {
        console.log('isAdmin column already exists, no changes made.');
      }
    });
  }
});

module.exports = db;

