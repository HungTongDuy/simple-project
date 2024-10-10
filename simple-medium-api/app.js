const path = require('path');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const {
    DATABASE_LOCAL,
    DATABASE_SERVER,
    CLOUD_NAME,
    API_KEY,
    API_SECRET
} = require('./config');

const port = process.env.PORT || 8000;

mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'LightBlog',
    cookie: {
        maxAge: 60000
    },
    resave: false,
    saveUninitialized: false
}));

// **************
//  passport
// **************
// app.use(session({
//     secret: "secret",
//     saveUninitialized: true,
//     resave: true
// }));

app.use(passport.initialize());
app.use(passport.session());

// **************
//  end passport
// **************

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
})

if (!isProduction) {
    app.use(errorHandler());
}

//mongoose.connect(DATABASE_LOCAL, { useNewUrlParser: true });
//mongoose.connect(DATABASE_LOCAL);
let URL_DB = DATABASE_LOCAL;
if(isProduction) {
    URL_DB = DATABASE_SERVER;
}
mongoose.connect(URL_DB, {
    //useMongoClient: true,
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

mongoose.set('debug', true);

// Add models
require('./models/Article');
require('./models/User');
require('./models/Counter');
// Add routes
app.use(require('./routes'));

// app.use((req, res, next) => {
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// if (!isProduction) {
//     app.use((err, req, res) => {
//         res.status(err.status || 500);

//         res.json({
//             errors: {
//                 message: err.message,
//                 error: err,
//             },
//         });
//     });
// }

// app.use((err, req, res) => {
//     res.status(err.status || 500);

//     res.json({
//         errors: {
//             message: err.message,
//             error: {},
//         },
//     });
// });

// **************
//  passport
// **************

const User = mongoose.model('User');
const passwordHash = require('password-hash');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id).then((user) => {
        done(null, user);
    }).catch((err) => {
        console.log(err);
    })
});

passport.use('local.signin', new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    },
    (req, email, password, done) => {
        // console.log('===================');
        // console.log('email---:', email);
        // console.log('pass---:', password);
        User.find({
                email: email
            }).then((user) => {
                console.log('userInfo------', user);
                if(!user[0]) {
                    return done(null, false, { message: 'Incorrect email.' });
                }
                if (!passwordHash.verify(password, user[0].password)) {
                    // console.log('Incorrect email and password', user.password);
                    return done(null, false, { message: 'Incorrect password.' });
                } else {
                    // console.log('Correct email and password!!!');
                    return done(null, user[0]);
                }
            }).catch((err) => {
                console.log('Error: ', err);
            })
    }
))


const server = app.listen(port, () => console.log('Server started on http://localhost:' + port));