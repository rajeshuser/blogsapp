const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
require("dotenv").config();

async function authMiddleware(res, res, next) {
	try {
		const token = req.get("authorization");
		const user = jwt.verify(token, process.env.SECRET);
		const userDoc = await UserModel.findOne(user);
		if (userDoc) {
			next();
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
}

module.exports = authMiddleware;
