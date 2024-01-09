var     express                 = require("express"),
        bodyParser              = require("body-parser"),
        request                 = require('request'),
        mongoose                = require("mongoose"),
        methodOverride          = require("method-override"),
        passport                = require("passport"),
        localStrategy           = require("passport-local"),
        passportLocalMongoose   = require("passport-local-mongoose"),
        expressSanitizer        = require("express-sanitizer"),
        path                    = require('path'),
        app                     = express(),
        expressValidator        = require("express-validator"),
        
        User                    = require("./models/user"),        
        flash                   = require("connect-flash");


require('dotenv').config({path: 'variables.env'});

app.use(require("express-session")({
    secret: "zp7777",
    resave: false,
    saveUninitialized: false
    
}));



app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.locals.moment = require('moment');

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser=req.user;
    // res.locals.error=req.flash("error");
    // res.locals.success=req.flash("success"); 
    // res.locals.errorList=req.flash("errorList");

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
                  "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  

    next();
});



var indexRoutes = require("./routes/index");
app.use(indexRoutes);

//*******************************************************************
app.get("*", function (req, res) {
    res.send("<h1>Mensaje por defecto desde Node</h1>");
});

var Port = process.env.PORT || "9999";
var Ip = process.env.HOST || '0.0.0.0';


app.listen(Port, Ip, function () {
    console.log("Servidor ha Iniciado...");
    console.log("Port..." + Port);
    console.log("IP..." + Ip);
});





