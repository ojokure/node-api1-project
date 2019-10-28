// implement your API here

const express = require("express");
const cors = require("cors");

const db = require("./data/db");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/users", createNewUser);
app.get("/api/users", getAllUsers);
app.get("/api/users/:id", getUserById);
app.get("/api/users/:id", deleteUser);

function createNewUser(req, res) {
  const user = {
    name: req.body.name,
    bio: req.body.bio
  };

  db.insert(user)
    .then(data => {
      if (!user.name || !user.bio) {
        res.status(400).json({
          success: false,
          errorMessage: "Please provide name and bio for the user."
        });
      } else {
        user.id = data.id;
        res.status(201).json({ succes: true, user });
      }
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        error: "There was an error while saving the user to the database"
      });
    });
}

function getAllUsers(req, res) {
  db.find()
    .then(users => {
      res.status(200).json({
        success: true,
        users
      });
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        error: "The user information could not be retrieved."
      });
    });
}

function getUserById(req, res) {
  const { id } = req.params;
  db.findById(id)

    .then(user => {
      if (!user) {
        res.status(404).json({
          success: false,
          message: "The user with the specified ID does not exist."
        });
      } else {
        res.status(201).json({ success: true, user });
      }
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        error: "The user information could not be retrieved."
      });
    });
}

function deleteUser(req, res) {
  const id = req.params;
  db.remove(id)

    .then(user => {
      if (user === 0) {
        res.status(404).json({
          success: false,
          message: "The user with the specified ID does not exist."
        });
      } else {
        res.status(201).json({
          success: true,
          user
        });
      }
    })
    .catch(error =>
      res.status(500).json({
        success: false,
        error: "The user could not be removed"
      })
    );
}

app.listen(process.env.PORT || 8000, () => {
  console.log("listening on " + (process.env.PORT || 8000));
});
