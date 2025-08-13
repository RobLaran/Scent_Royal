require("ejs");

const path = require("path");
const dotenv = require("dotenv");

// Load .env from the same directory where the exe runs
if (process.pkg) {
    dotenv.config({ path: path.join(process.cwd(), ".env") });
} else {
    dotenv.config({ path: path.join(__dirname, ".env") });
}

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const router = require("./routes");

// Set EJS as templating engine
app.set("view engine", "ejs");

// app.set('views', path.join(__dirname, 'views'));
const viewsPath = process.pkg
    ? path.join(process.cwd(), "views")
    : path.join(__dirname, "views");

app.set("views", viewsPath);

// Serve static files
// app.use(express.static(path.join(__dirname, 'public')));
const publicPath = process.pkg
    ? path.join(process.cwd(), "public")
    : path.join(__dirname, "public");

app.use(express.static(publicPath));

app.use(expressLayouts);
app.set("layout", "layout");

app.use(
    session({
        secret: "darting1223",
        resave: false,
        saveUninitialized: false,
    })
);

// Parse application/json
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

// Start server
app.listen(3000, () => {
    console.log("Loaded ENV:");
    console.log("Host:", process.env.DB_HOST);
    console.log("User:", process.env.DB_USER);
    console.log("Password:", process.env.DB_PASSWORD ? "(set)" : "(empty)");
    console.log("Database:", process.env.DB_NAME);
    console.log("Server running on http://localhost:3000");
});
