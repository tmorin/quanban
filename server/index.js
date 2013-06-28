var server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    express = require('express'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    U = require('underscore'),
    cons = require('consolidate'),
    swig = require('swig'),
    routes = require('./routes'),
    conf = require('./conf'),
    usersRepo = require('./model/usersRepo');

var app = express();

// NOTE: Swig requires some extra setup
// This helps it know where to look for includes and parent templates
swig.init({
    root: __dirname + '/views',
    allowErrors: true,
    cache: 'production' === app.get('env')
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('.html', cons.swig);
app.set('view engine', 'html');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret: conf.session.secret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use('/app', express.static(path.join(__dirname, '/../client')));
app.use('/components', express.static(path.join(__dirname, '/../components')));

// development only
if ('development' === app.get('env')) {
    app.use(express.logger('dev'));
    app.use(express.errorHandler());
}

// Passport
passport.serializeUser(function (user, done) {
    console.log('passport.serializeUser', user);
    done(null, user.email);
});
passport.deserializeUser(function (email, done) {
    console.log('passport.deserializeUser', email);
    usersRepo.findByEmail(email).then(function (user) {
        done(null, user);
    }).fail(done);
});

// Mongoose
mongoose.connect(conf.db.url);
mongoose.connection.on('error', function (err) {
    if (err) {
        throw err;
    }
});
mongoose.connection.on('open', function (err) {
    if (err) {
        throw err;
    }
    if ('development' === app.get('env')) {
        console.log('clear the users\'s collection');
        require('./model/users').User.remove();
    }
});
mongoose.connection.on('error', function (err) {
    throw err;
});

// INTERCEPTORS
function requireLogin(req, res, next) {
    console.log('requireLogin', req.session);
    if (req.session.passport.user) {
         // allow the next route to run
        next();
    } else {
        // require the user to log in
        res.redirect(403, '/login'); // or render a form, etc.
    }
}

app.all("/api/*", requireLogin, function(req, res, next) {
  next();
});

// ROUTES

app.get('/', routes.index);
app.get('/login', routes.login);
app.get('/logout', routes.logout);
app.get('/home', requireLogin, routes.home);

// Google provider
passport.use(require('./passport/google').strategy);
app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google/return', passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/login'
}));

// HTTP SERVER

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

// WEB SOCKET

io.sockets.on('connection', function (socket) {

    socket.on('my other event', function (data) {
        console.log(data);
    });

});