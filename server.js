var express    = require("express");
var cookieParser = require("cookie-parser");
var bodyParser   = require("body-parser");
var validator    = require("express-validator");
var ejs          = require("ejs");
var engine        = require("ejs-mate");
var mongoose      = require("mongoose");
var session       = require("express-session");
var MongoStore    = require("connect-mongo")(session);
var passport      = require("passport");
var flash         = require("connect-flash");

var app        = express();


//========== CONNECT DATABASE ========================
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/business');

require('./config/passport');


//==========MIDDLE WARE ========================

app.use(express.static('public'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(validator());

// app.use(session({
//   sercret: 'Thisismytestkey',
//   resave: false,
//   saveUninitialized: false,
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false,
  store: new  MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


//==========MIDDLE WARE ========================


// ====== ROUTES ===========
require('./routes/user')(app, passport);











//============= RUN SERVER ========================
app.listen(process.env.PORT, process.env.IP, function(){
  // var addr = app.address();
  // console.log("Chat server listening at", addr.address + ":" + addr.port);
  console.log('Server has started');
});

// app.listen(process.env.$PORT, process.env.$IP, function(){
//     console.log('Server has started');
// });