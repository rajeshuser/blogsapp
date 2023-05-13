const express = require("express");
const bcrypt = require("bcrypt");
const jst = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const authMiddleware = require("../middlewares/authMiddleware");
require("dotenv").config();

const usersRouter = express.Router();

usersRouter.get("/users", async (req, res) => {
	const users = await UserModel.find({});
	res.send(users);
});

usersRouter.post("/users/:id/reset", authMiddleware, async (req, res) => {
	try {
		const { id } = req.params;
		const resetPassword = req.body;
		const userDoc = await UserModel.findOne({ _id: id });
		const areSame = await bcrypt.compare(resetPassword.currentPassword, userDoc.password);
		if (areSame) {
			userDoc.password = await bcrypt.hash(resetPassword.newPassword, 3);
			await userDoc.save();
			res.send({ message: "password is changed" });
		} else {
			res.send({ error: "current password is not correct" });
		}
	} catch (error) {
		res.send({
			error: error.message
		});
	}
});

module.exports = usersRouter;
