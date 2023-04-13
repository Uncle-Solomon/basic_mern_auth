import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createJWT } from "../utils/auth.js";

const signup = (req, res, next) => {
  let { name, email, password, password_confirmation } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        return res
          .status(422)
          .json({ errors: [{ user: "email already exists" }] });
      } else {
        const user = new User({
          name: name,
          eail: email,
          password: password,
        });
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then((response) => {
                res.status(200).json({
                  success: true,
                  result: response,
                });
              })
              .catch((err) => {
                res.status(500).json({ errors: [{ error: err }] });
              });
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "SOmething went wrong" }],
      });
    });
};

const login = (req, res) => {
  let { email, password } = req.body;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.status(404).json({ errors: [{ user: "not found" }] });
    } else
      [
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch) {
            return res
              .status(400)
              .json({ errors: [{ password: "incorrect" }] });
          }
        }),
      ];
  });
};
