const express = require("express");
const bcrypt = require("bcrypt");
const jst = require("jsonwebtoken");
const BlogModel = require("../models/BlogModel");
require("dotenv").config();

const blogsRouter = express.Router();

blogsRouter.get("/blogs", async (req, res) => {
	try {
		const query = req.query;
		const blogs = await BlogModel.find(query);
		res.send(blogs);
	} catch (error) {
		res.send({
			error: error.message
		});
	}
});

blogsRouter.post("/blogs", async (req, res) => {
	try {
		const blog = req.body;
		const blogDoc = new BlogModel(blog);
		await blogDoc.save();
		res.send({
			message: "blog is created"
		});
	} catch (error) {
		res.send({
			error: error.message
		});
	}
});

blogsRouter.patch("/blogs/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const update = req.body;
		const blogDoc = await BlogModel.findOneAndUpdate({ _id: id }, update);
		res.send({
			message: "blog is updated"
		});
	} catch (error) {
		res.send({
			error: error.message,
			type: typeof BlogModel
		});
	}
});

blogsRouter.delete("/blogs/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const blogDoc = await BlogModel.findOneAndDelete({ _id: id });
		res.send({
			message: "blog is deleted"
		});
	} catch (error) {
		res.send({
			error: error.message
		});
	}
});

blogsRouter.patch("/blogs/:id/like", async (req, res) => {
	try {
		const { id } = req.params;
		const update = req.body;
		const blogDoc = await BlogModel.findOneAndUpdate({ _id: id }, update);
		res.send({
			message: "blog is updated"
		});
	} catch (error) {
		res.send({
			error: error.message,
			type: typeof BlogModel
		});
	}
});

blogsRouter.patch("/blogs/:id/comment", async (req, res) => {
	try {
		const { id } = req.params;
		const update = req.body;
		const blogDoc = await BlogModel.findOneAndUpdate({ _id: id }, update);
		res.send({
			message: "blog is updated"
		});
	} catch (error) {
		res.send({
			error: error.message,
			type: typeof BlogModel
		});
	}
});

module.exports = blogsRouter;
