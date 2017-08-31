//import dependencies
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//allow requests for assets on the same-origin and
//other origins which return appropriate CORs headers
const cors = require('cors');

//the server will listen to an appropriate port, or default to port 4002
const port = process.env.PORT || 4002;

//set up express app to create instances
const app = express();
const route = express.Router();

// enable cors
const corsOptions = {
  origin: '*', //made have to change after deployment, right now allowing all origins
  methods: ['GET', 'POST']
};

//setting mongodb URI depending on
//production or development environment
const mongouri = process.env.PROD_MONGODB
  || 'mongodb://localhost/wbnotification';

//Tell express which files to serve based on running environment
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(cors(corsOptions));
app.options('*', cors(corsOptions))

//set up mongoose and db connection
// mongoose.Promise = global.Promise;

//makes connection asynchronously.  Mongoose will queue up db
//operations and release them when the connection is complete
mongoose.connect(mongouri, function (err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + mongouri + '. ' + err);
  } else {
    console.log('Succeeded connected to: ' + mongouri);
  }
});

//use body-parser middleware to look for JSON data in request body
app.use(bodyParser.json());

//initialize routes
app.use('/api', require('./routes/api'));

//error handling middleware
app.use(function(err,req,res,next){
  console.log(err);
  res.status(422).send({error:err.message});
})


//starts server and listens for requests
app.listen(port, (err) => {
  if (err) throw err;
  console.log('now listening for requests on port: %s', port);
});
