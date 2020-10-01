const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

// server logic starts here
const app = express();

// init middleware
// old app.use(bodyParser.json())
// app.use(express.json({ extended: false })); // new init body parser
app.use(express.json({ limit: '1mb', extended: true, parameterLimit: 1000 }))

// connect database
connectDB();

// define routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));

// serve static assets for production
if (process.env.NODE_ENV === "production") {
	// set static folder
	app.use(express.static("client/build"));
	// app setup
	app.get("*", (req, res, next) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
} else {
	app.get("/", (req, res, next) => {
		res.send("API Running");
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started at ${PORT}`);
});
