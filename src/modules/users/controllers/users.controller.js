import { ObjectId } from "mongodb";
import { db } from "../../../../DB/connection.js";

import bcrypt from "bcryptjs";

const coll = db.collection("users");

export const register = async (req, res, next) => {
  const user = await coll.findOne({ email: req.body.email });

  if (!user) {
    req.body.password = bcrypt.hashSync(req.body.password, 8);

    await coll.insertOne(req.body);

    const displayUser = await coll.findOne({ email: req.body.email });

    return res.status(201).json({ user: displayUser });
  } else {
    return res.status(409).json({ message: "this user already exist" });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await coll.findOne({ email });

  if (user) {
    const match = bcrypt.compareSync(password, user.password);

    if (match) {
      return res.json({ message: "logged in successfully" });
    } else {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }
  } else {
    return res.status(400).json({ message: "Email or password is incorrect" });
  }
};

export const getUsers = async (req, res, next) => {
  const users = await coll.find().toArray();

  res.json({ users: users });
};

export const getUser = async (req, res, next) => {
  const _id = new ObjectId(req.body._id);

  const user = await coll.findOne({ _id });

  if (user) {
    res.json({ user: user });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const updateUsers = async (req, res, next) => {
  req.body.password = bcrypt.hashSync(req.body.password, 8);

  const { name, email, phone, password } = req.body;

  let displayUser = await coll.findOne({ email });

  if (displayUser) {
    const user = await coll.updateOne(
      { email },
      { $set: { name: name, phone: phone, password: password } }
    );

    displayUser = await coll.findOne({ email });
    res.json({ user: displayUser });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const deleteUsers = async (req, res, next) => {
  const { email } = req.body;

  let displayUser = await coll.findOne({ email });

  if (displayUser) {
    await coll.deleteOne({ email });

    res.json({ message: "User deleted " });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};
