const express = require("express");
const cors = require("cors");
const connection = require("./database");
const registerRouter = require("./routers/registerRouter");
const usersRouter = require("./routers/usersRouter");
const blogsRouter = require("./routers/blogsRouter");
const authMiddleware = require("./middlewares/authMiddleware");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", registerRouter);
app.use("/api", usersRouter);
app.use("/api", authMiddleware, blogsRouter);

app.get("/", (req, res) => {
	res.send({
		message: "home"
	});
});

async function connectThenListen() {
	try {
		await connection;
		console.log("app is connected to database");
		app.listen(process.env.PORT, () => {
			console.log("app is running at", `http://localhost:${process.env.PORT}`);
		});
	} catch (error) {
		console.log({ error: error.message });
	}
}
