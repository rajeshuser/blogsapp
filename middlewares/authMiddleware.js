const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
require("dotenv").config();

async function authMiddleware(req, res, next) {
	try {
		const token = req.get("authorization");
		const { userId } = jwt.verify(token, process.env.SECRET);
		const userDoc = await UserModel.findOne({ _id: userId });
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
