const express = require("express");
const bcrypt = require("bcrypt");
const jst = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
require("dotenv").config();

const loginRouter = express.Router();

loginRoute.post("/login", async (req, res) => {
	try {
		const user = req.body;
		const userDoc = await UserModel.findOne(user);
		if (userDoc) {
			const token = jwt.sign(user, process.env.SECRET);
			res.send({
				message: token
			});
		} else {
			res.send({
				error: "wrong credentials"
			});
		}
	} catch (error) {
		res.send({
			error: error.message
		});
	}
});

module.exports = loginRouter;
