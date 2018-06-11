var express = require('express');

// create app
var app = express();

app.use(express.static('src')); 

app.listen(3000, function() {
	console.log("Express server is up on port 3000 ... ");
})






