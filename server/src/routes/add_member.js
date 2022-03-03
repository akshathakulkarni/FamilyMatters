const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

module.exports = (db) => {

  //Add a new member under a specific account
  router.post('/', (req, res) => {
    console.log(req.body);
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    let is_primary = false;
    const account_id = req.query.accountId;
    const hashedPassword = bcrypt.hashSync(password, 10)
    const values = [firstName, lastName, email, hashedPassword, is_primary, account_id];
    db.query(`INSERT INTO users (first_name, last_name, email, password, is_primary, account_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`, values)
      .then((data) => {
        console.log(data.rows[0]);
        const newUser = {
          firstName: data.rows[0].first_name,
          user_id : data.rows[0].id,
          account_id : data.rows[0].account_id
        };
        res.json( newUser );
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
}