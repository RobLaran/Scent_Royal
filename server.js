require('ejs');
const path = require('path');
const dotenv = require('dotenv');

// Load .env from the same directory where the exe runs
if (process.pkg) {
  dotenv.config({ path: path.join(process.cwd(), '.env') });
} else {
  dotenv.config({ path: path.join(__dirname, '.env') });
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const fetchFilters = require('./middleware/filters');
const productRoutes = require('./routes/productRoutes');
const blogRoutes = require('./routes/blogRoutes');


// Set EJS as templating engine
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
const viewsPath = process.pkg
  ? path.join(process.cwd(), 'views')
  : path.join(__dirname, 'views');

app.set('views', viewsPath);

// Serve static files
// app.use(express.static(path.join(__dirname, 'public')));
const publicPath = process.pkg
  ? path.join(process.cwd(), 'public')
  : path.join(__dirname, 'public');

app.use(express.static(publicPath));

app.use(expressLayouts);
app.set('layout', 'layout');

// Routes

// Apply globally
app.use(fetchFilters);

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.use('/', productRoutes);

app.use('/', blogRoutes);

app.get('/about', (req, res) => {
  res.render('pages/About', { title: 'About' });
});

app.get('/contact', (req, res) => {
  res.render('pages/Contact', { title: 'Contact' });
});

app.get('/wishlist', (req, res) => {
  res.render('pages/Wishlist', { title: 'Wishlist' });
});

app.get('/cart', (req, res) => {
  res.render('pages/Cart', { title: 'Shopping Cart' });
});

app.get('/login', (req, res) => {
  res.render('pages/Login', { title: 'Login' });
});

app.get('/register', (req, res) => {
  res.render('pages/Register', { title: 'Register' });
});


// Start server
app.listen(3000, () => { 
  console.log("Loaded ENV:");
  console.log("Host:", process.env.DB_HOST);
  console.log("User:", process.env.DB_USER);
  console.log("Password:", process.env.DB_PASSWORD ? "(set)" : "(empty)");
  console.log("Database:", process.env.DB_NAME);
  console.log('Server running on http://localhost:3000');
  
});
