const express = require('express');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

app.use(compression());
app.use(helmet());
app.use(
	helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: [
				"'unsafe-inline'",
				"'self'",
				'https://unpkg.com/',
				'http://localhost:3000/f8181f8a-24be-4d94-a0f7-aa9024a20373',
				'blob:'
			],
			styleSrc: ['https://fonts.googleapis.com', "'self'", "'unsafe-inline'"],
			fontSrc: ['https://fonts.gstatic.com/', "'self'"],
			connectSrc: ['https://unpkg.com']
		}
	})
);

const routes = require('./routes/routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public/'));
app.use(routes);

app.set('view engine', 'ejs');

module.exports = app;
