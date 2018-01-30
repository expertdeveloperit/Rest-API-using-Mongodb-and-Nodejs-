import express from 'express'; // import express module
import mongoose from 'mongoose'; // import mongoose module
import bodyParser from 'body-parser'; // import body-parser module
import passport from 'passport'; // import express passport
import config from './config/';
import cors from 'cors';
import path from 'path';
import logger from 'morgan';

// import routes module from routes folder 
import userRoutes from './routes/userRoutes';
import articleRoutes from './routes/articleRoutes';
import categoryRoutes from './routes/categoryRoutes';
import userProfileRoutes from './routes/userProfileRoutes';
import accountSettingRoutes from './routes/accountSettingsRoutes';
import bankAccountRoutes from './routes/bankAccountRoutes';
import creditCardRoutes from './routes/creditCardRoutes';
import channelRoutes from './routes/channelRoutes';
import editChannelRoutes from './routes/editChannelRoutes';
import bookmarkRoutes  from './routes/bookmarkListRoutes';

// Create a new Express Instance
const app = express();

//setting url of MongoDb 
let uri = '';
if (process.env.NODE_ENV === 'production') {
    uri = process.env.MONGOLAB_URI;
    console.log('===PRODUCTION===');
} else {
    uri = config.database.local;
    console.log('===DEVELOPMENT===');
}

// Configuration and connecting to Databse MongoDb
mongoose.connect(uri, {
    useMongoClient: true
}, (err) => {
    if (err) {
        console.log('Connection Error: ', err);
    } else {
        console.log('Successfully Connected');
    }
});

mongoose.Promise = global.Promise;

// Cors middleware to handle request cross-origin 
app.use(cors());

// serving static files to the client    
app.use('/public', express.static(path.join(__dirname + '/public')));
//body-parser middleware to handle form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//morgan middle-ware to logs the requests.   
app.use(logger('dev'));

//configuration for passport
require('./config/passport')(passport);
app.use(require('express-session')({
    secret: 'Riosrso_api_secret',
    cookie: {
        'maxAge': 1209600000
    },
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); //persistent login session

// Welcome Route for api 
app.get('/api', function(req, res, next) {
    res.status(200).json({
        status: true,
        message: "Welcome to REST API, Ready to Handle Requests..!!"
    });
});

// Api Routes For application 
app.use('/api', userRoutes);
app.use('/api', articleRoutes);
app.use('/api', categoryRoutes);
app.use('/api', userProfileRoutes);
app.use('/api', accountSettingRoutes);
app.use('/api', bankAccountRoutes);
app.use('/api', creditCardRoutes);
app.use('/api', channelRoutes);
app.use('/api', editChannelRoutes);
app.use('/api',bookmarkRoutes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("No Matching Route Please Check Again...!!");
    err.status = 404;
    next(err);
});
// error handler 
// define as the last app.use callback
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        Error: {
            message: err.message
        }
    });
});


module.exports = app;
