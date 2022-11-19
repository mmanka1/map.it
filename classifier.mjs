//Necessary to use "require" in the ES module scope
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import examples from "./trainingData.mjs";

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
            examples: examples.whenExamples
        });
        const responseWhere = await cohere.classify({
            model:'large',
            inputs: [req.body.phrase],
            examples: examples.whereExamples
        });
        const responseDuration = await cohere.classify({
            model:'large',
            inputs: [req.body.phrase],
            examples: examples.durationExamples
        });

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

export default router;