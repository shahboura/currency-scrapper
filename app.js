'use strict'

let express = require('express'),
	mongoose = require('mongoose'),
	config = require('./config'),
	bankScrapper = require('./bank-scrapper');

// let db = mongoose.connect('');
let app = express();
let port = process.env.PORT || 3000;

let currencyRouter = express.Router();
currencyRouter.route('/currencies')
	.get(function(req, res){
		let responseJson = {hello: "this is my api"};
		
		res.json(responseJson);
	});

app.use('/api', currencyRouter);

let banks = config.banks;

bankScrapper(banks).then(currencies => {
	console.log(currencies);
});

// run server
app.listen(port, function(){
	console.log('Running on PORT: ' + port);
});