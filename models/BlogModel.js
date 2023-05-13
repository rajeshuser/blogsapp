const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
	{
		username: String,
		title: String,
		content: String,
		category: String,
		date: Date,
		likes: Number,
		comments: [{ username: String, content: String }]
	},
	{
		versionKey: false
	}
);

const BlogModel = mongoose.model("blog", blogSchema);

module.exports = BlogModel;
