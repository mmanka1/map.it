import fetch from 'node-fetch';

//Necessary to use "require" in the ES module scope
import { createRequire } from "module";
const require = createRequire(import.meta.url);

//Get express
const express = require('express');
const router = express.Router();

//Get config
require('dotenv').config();

// //Google storage
// const {Storage} = require('@google-cloud/storage');

// const storage = new Storage({
//     keyFilename: process.env.FIREBASE_KEY_FILE_NAME,
//     projectId: process.env.FIREBASE_PROJECT_ID
// });

router.get('/', async(req, res) => {
    try {
        // The ID of your GCS bucket
        const bucketName = 'gs://mapit-369119.appspot.com/';
        //The ID of your GCS file
        const fileName = 'ACEB.png';

        //Create body and format into JSON
        const body = JSON.stringify({
            requests: [
                {
                    features: [
                        { type: 'TEXT_DETECTION', maxResults: 5 }
                    ],
                    image: {
                        source: {
                            imageUri: `${bucketName}${fileName}`
                        }
                    }
                }
            ]
        });

        //Create POST request to Google Vision API using the defined body
        const response = await fetch(
            process.env.GOOGLE_VISION_API_ENDPOINT +
            process.env.GOOGLE_VISION_API_KEY,
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: body
            }
        );
        const OCRResult = await response.json();
        res.json({rooms: getRoomLocations(OCRResult.responses[0].textAnnotations.slice(1))});

    } catch (err) {
        console.error(err);
    }   
});

const getRoomLocations = (data) => {
    const roomVertices = [];
    data.forEach(element => {
        if (/^\d+$/.test(element.description)) {  //If contains only digits, then corresponds to room number
            roomVertices.push({
                "number": element.description,
                "vertices": element.boundingPoly.vertices
            });
        } 
    });
    return roomVertices;
}

export default router;