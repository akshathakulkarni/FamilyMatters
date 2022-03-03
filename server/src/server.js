// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 4000;

const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

//Db setup
const { Pool } = require("pg");
const dbParams = require("./lib/db");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Separated Routes for each Resource
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const newMemberRoutes = require("./routes/add_member");
const mealsRoutes = require("./routes/meals");
const recipeRoutes = require("./routes/recipes");
const contactRoutes = require("./routes/contacts");
const listRoutes = require("./routes/lists");
const eventsRoutes = require("./routes/events");
const familyRoutes = require("./routes/family");

//Resource routes
app.use("/", usersRoutes(db));
app.use("/api/auth", authRoutes(db));
app.use("/api/add_member", newMemberRoutes(db));
app.use("/api/meals", mealsRoutes(db));
app.use("/api/recipes", recipeRoutes(db));
app.use("/api/contacts", contactRoutes(db));
app.use("/api/lists", listRoutes(db));
app.use("/api/events", eventsRoutes(db));
app.use("/api/family", familyRoutes(db));

// Home page
app.get("/", (req, res) => {
  //Gives a list of all users in JSON format
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

