const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");

const registerRouter = express.Router();

registerRouter.post("/register", async (req, res) => {
	try {
		const user = req.body;
		user.password = await bcrypt.hash(user.password, 3);
		const userDoc = new UserModel(user);
		await userDoc.save();
		res.send({
			message: "registration is succeesful"
		});
	} catch (error) {
		res.send({
			error: error.message
		});
	}
});

module.exports = registerRouter;
