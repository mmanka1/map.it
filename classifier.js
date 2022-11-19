
const Examples = require('./trainingData');

//Get express
const express = require('express');
const router = express.Router();

//Get config
require('dotenv').config();
const apiKey = process.env.COHERE_API_KEY;

//Get and initialize cohere api
const cohere = require('cohere-ai');
cohere.init(apiKey);

router.get('/', async(req, res) => {
    try {
        res.send("Testing...");
    } catch (err) {
        console.error(err);
    }
})

//Post query and return labels for each category (when, where, duration) with the highest confidences
router.post('/search', async(req, res) => {
    try {
        console.log(req.body.phrase);
        const responseWhen = await cohere.classify({
            inputs: [req.body.phrase],
            examples: Examples.whenExamples
        });
        const responseWhere = await cohere.classify({
            model:'large',
            inputs: [req.body.phrase],
            examples: Examples.whereExamples
        });
        const responseDuration = await cohere.classify({
            model:'large',
            inputs: [req.body.phrase],
            examples: Examples.durationExamples
        });

        console.log(responseWhen)

        return res.json(
            {
            "error": false, 
            "message": {
                "confidenceWhen": responseWhen.body.classifications[0].prediction,
                "confidenceWhere": responseWhere.body.classifications[0].prediction,
                "confidenceDuration": responseDuration.body.classifications[0].prediction
            }
        })
    } catch (err) {
      console.error(err)
      return res.json({"error": true, "messages": "Something went wrong"})
    }
})

module.exports = router