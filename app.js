//var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var cors = require('cors');
// var app = express();

// //Import Routes
// var productsRoute = require('./routes/products');
// var ordersRoute = require('./routes/orders');





// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');


// // Use Routes
// app.use(express.bodyParser());
// app.use('/api/orders', ordersRoute);
// app.use('/api/products', productsRoute);

// app.use(cors({
//   origin: "*",
//   methods: ['GET','POST','PATCH','DELETE','PUT'],
//   allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-with, Accept'
// }));



// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });



// module.exports = app;
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const cors = require('cors');



/* CORS */
app.use(cors({
    origin: '*',
    methods: ['GET', 'PUT', 'DELETE', 'PATCH', 'POST'],
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}));
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.bodyParser());

// Import Routes
//const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
//const authRouter = require('./routes/auth');
const orderRouter = require('./routes/orders');

// Define Routes
/**
 * @swagger
 * /api/products:
 *   get:
 *    description: Get All Products
 *
 */

//app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
//app.use('/api/auth', authRouter);
app.use('/api/orders', orderRouter);

module.exports = app;