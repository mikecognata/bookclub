const path = require('path');
const express   = require('express');
const dotenv    = require('dotenv');
const morgan    = require('morgan');
const exphbs    = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');


// Load config
dotenv.config({ path: './config/config.env' });

// Passport config
require('./config/passport')(passport);

// Connecting Database
connectDB();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
};

// Handlebars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs');

// Sessions
app.use(session({
    secret: 'hokage',
    resave: false,
    saveUninitialized: false,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));

const PORT = process.env.PORT || 4400;

app.listen(
    PORT, 
    console.log(`The matrix is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);