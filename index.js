// implement your API here

const express = require("express");
const cors = require("cors");

const db = require("./data/db");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/users", createNewUser);

function createNewUser(req, res) {
  const user = {
    name: req.body.name
    // body: req.body.bio
  };

  db.insert(user)
    .then(data => {
      res.status(201).json({ succes: true, data });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        error
      });
    });
}

app.listen(process.env.PORT || 8000, () => {
  console.log("listening on " + (process.env.PORT || 8000));
});
