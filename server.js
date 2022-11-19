//Necessary to use "require" in the ES module scope
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const express = require('express');
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser');
const port = 5000;

import Classify from './classifier.mjs';
import MapReader from './mapReader.mjs';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Added fields to cors to allow incoming requests to include session in header
app.use(cors());
app.options('*', cors());

//Add routers to middleware handling path
app.use('/classify', Classify)
app.use('/map', MapReader)

//Set up listener
app.listen(port, () => {
  console.log(`Node app listening at http://localhost:${port}`)
})