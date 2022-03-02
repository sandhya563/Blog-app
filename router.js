const router = require("express").Router();
const knex = require("./dbconnection");
const jwt = require("jsonwebtoken");

router.post("/registration", (req, res) => {
  console.log(req.body);
  if (
    req.body.username !== undefined &&
    req.body.email !== undefined &&
    req.body.password !== undefined
  ) {
    knex
      .select("*")
      .from("users")
      .where({ email: req.body.email })
      .then((data) => {
        console.log(data, "data1");
        console.log(data.length);
        if (data.length > 0) {
          knex("users")
            .insert({
              username: req.body.username,
              email: req.body.email,
              password: req.body.password,
            })
            .then((data) => {
              console.log(data, "data2");
              res.send({ massage: "data inserted sucssfully" });
            })
            .catch((err) => {
              console.log(err);
              res.send(err.massage);
            });
        } else {
          res.send({ massage: "data already exist" });
        }
      });
  } else {
    res.send({ Error: "Please Fill Information In Body" });
  }
});
router.post("/login", (req, res) => {
  //   console.log(req.body);
  if (req.body.email !== undefined) {
    knex
      .select("*")
      .from("users")
      .where({ email: req.body.email })
      .then((data) => {
        // console.log(data, "data1");
        console.log(data.length);
        if (data.length > 0) {
          var token = jwt.sign(
            {
              id: data[0].id,
              username: data[0].username,
              email: data[0].email,
              password: data[0].password,
            },
            "hello"
          );
          res.cookie("token", token);
          console.log(token);
          res.send({ Success: token });
        } else {
          res.send({ Error: "This User Not Exists Please Signup" });
        }
      });
  } else {
    res.send({ Error: "Please Fill Information In Body" });
  }
});
// for verification token
router.post("/create-post-data", (req, res) => {
  if (req.headers.cookie !== undefined && req.header.cookie !== "") {
    console.log({ token: req.headers.cookie });
    const token = req.headers.cookie.slice(6);
    const tokendata = jwt.verify(token, "hello");
  } else {
    res.send({ error: "plz login " });
  }
});

module.exports = router;
