const express = require('express');
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser');
const port = 5000;
const Search = require('./semanticSearch');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Added fields to cors to allow incoming requests to include session in header
app.use(cors());
app.options('*', cors());

//Add router to middleware handling path
app.use('/semantic', Search)

//Set up listener
app.listen(port, () => {
  console.log(`Node app listening at http://localhost:${port}`)
})