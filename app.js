const express = require('express');
const morgan = require('morgan');

const routes = require('./routes');
const environment = require('./config');
const app = express();

app.use(morgan('dev'));
app.use(routes);

app.set('view engine', 'pug');

app.use((req, res, next) => {
    const err = new Error('The requested page couldn\'t be found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (environment === 'production' || environment === 'test') {

    } else {
        console.error()
    }
    next(err);
});

app.use((err, req, res, next) => {
    if (err.status === 404) {
        res.status(404);
        res.render('page-not-found', {title: 'Page Not Found'});
    } else {
        next(err);
    }
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        title: 'Server Error',
        message: environment === 'production' ? null : err.message,
        stack: environment === 'production' ? null : err.stack
    });
})

module.exports = app;
