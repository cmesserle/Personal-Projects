const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 4000;

const pool = mysql.createPool({
  host: 'localhost',
  port: '3306',
  user: 'root',
  database: 'pipdb',
  password: 'password'
});

app.get('/user_get/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  console.log(user_id);
  pool.query('SELECT * FROM user_info WHERE user_id = ?', [user_id], (err, results, fields) => {
    if (err) throw err;
    res.json(results);
  });
});

app.delete('/user_del/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  pool.query('DELETE FROM user_stats WHERE user_id = ?', [user_id], (err, results, fields) => {
      if (err) throw err;
      pool.query('DELETE FROM user_info WHERE user_id = ?', [user_id], (err, results, fields) => {
          if (err) throw err;
          res.json({ message: `User with id ${user_id} has been deleted` });
      });
  });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});