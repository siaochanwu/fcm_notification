var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
// var admin = require("firebase-admin");
// var serviceAccount = require('./fcm-app-5d920-firebase-adminsdk-qouiq-86532d8c1f.json')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var test = require('./firebase/firebase-admin')

var app = express();

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: process.env.URL
// });

// var firebase = admin.database()
// console.log(firebase)

//test fcm in web

// var registrationTokens = process.env.TOKEN

// function sendMessage() {

//     let message = {
//       notification: {
//         title: "This is a Notification",
//         body: "This is the body of the notification message."
//     },
//       token: registrationTokens,
//     }

//       //一個裝置
//       admin.messaging().send(message)
//         .then((response) => {
//           console.log('Successfully sent message:', response);
//         })
//         .catch((error) => {
//           console.log('Error sending message:', error);
//   })

// }

// sendMessage()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
