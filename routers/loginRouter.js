const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
require("dotenv").config();

const loginRouter = express.Router();

loginRouter.post("/login", async (req, res) => {
	try {
		const user = req.body;
		const userDoc = await UserModel.findOne({ email: user.email });
		if (!userDoc) {
			return res.send({ error: "user not found" });
		}
		const areSame = await bcrypt.compare(user.password, userDoc.password);
		if (areSame) {
			const token = jwt.sign({ userId: userDoc._id }, process.env.SECRET);
			return res.send({ token });
		}
		res.send({ error: "wrong password" });
	} catch (error) {
		res.send({
			error: error.message
		});
	}
});

module.exports = loginRouter;
