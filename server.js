var express = require('express'); // connect express
var logger = require('morgan'); // connect logging module morgan
var mongoose = require('mongoose'); //connect moongose
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var coockieParser = require('cookie-parser');
var app = express();

mongoose.connect('mongodb://127.0.0.1:27017/devirdb', {
    useNewUrlParser: true
});


app.use(logger('dev'));
app.use(bodyParser.json({
    limit: '100mb'
}));
app.use(bodyParser.urlencoded({
    limit: '100mb',
    extended: true
}));
app.use(coockieParser());

app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: 1
})); //path to static file

app.use(session({
    secret: 'D9?yI|qN7lwT',
    resave: true,
    saveUninitialized: true,
    key: 'crudsessionid',
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })


}));


app.use(require('./server/routes'));


app.listen(process.env.PORT || 3000, function () {
    console.log('Server is a listening on port ', process.env.PORT || 3000)
});