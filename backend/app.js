const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

// Trust the first proxy (for express-rate-limit and other middlewares)
app.set('trust proxy', 1); // Trust first proxy

//Global middlewares
app.use(
  cors({
    origin: 'https://mern-natours.onrender.com', // Replace with your deployed frontend URL
    credentials: true,
  })
);

///Security HTTP headers
app.use(helmet());

//development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//limit requests
const limiter = rateLimit({
  max: 300,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

//Body parser, reading data from the body
app.use(express.json({ limit: '10kb' }));

//Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

//Prevent parameter pulltion
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

//Serving static files
app.use(express.static(`${__dirname}/public`));

app.use(compression());

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});

//routes

app.get('/', (req, res) => {
  res.redirect('/api/v1/tours');
});

// Overview page route
// app.get('/', (req, res) => {
//   res.status(200).render('overview', {
//     title: 'All Tours',
//   });
// });

// // Dynamic route for individual tours
// app.get('/tours/:tourname', (req, res) => {
//   const tourName = req.params.tourname;

//   // Render the specific tour page
//   res.status(200).render('tour', {
//     title: `${tourName} Tour`,
//     // Here, you would typically pass in the tour data to render the correct details
//     tourName: tourName, // Pass tour name or other details if needed
//   });
// });

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
