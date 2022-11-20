//Necessary to use "require" in the ES module scope
import { createRequire } from "module";
const require = createRequire(import.meta.url);

//Get express
const express = require('express');
const router = express.Router();

//Google Firestore connection
const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
    keyFilename: process.env.FIREBASE_KEY_FILE_NAME,
    projectId: process.env.FIREBASE_PROJECT_ID
});

router.get('/rooms', async(req, res) => {
    try {
        const roomsSnapshot = await db.collection('rooms').get();
        const rooms = await roomsSnapshot.docs[0].data();
        res.json({"rooms": rooms});
    } catch (err) {
        console.error(err);
        return res.json({"error": true, "message": "Something went wrong"});
    }
});

router.get('/availabilities', async(req, res) => {
    try {
        const availabilitiesSnapshot = await db.collection('availabilities').get();
        const availabilities = await availabilitiesSnapshot.docs[0].data();
        res.json({"availabilities": availabilities});
    } catch (err) {
        console.error(err);
        return res.json({"error": true, "message": "Something went wrong"});
    }
});

router.post('/confirm', async(req, res) => {
    try {
        console.log(req.body.time);
        console.log(req.body.room);
        const availabilitiesRef = db.collection('availabilities').doc('tOckA6MJNizsG7zUi0ak');
        await availabilitiesRef.update({
            [req.body.time]: Firestore.FieldValue.arrayUnion(req.body.room)
        });
        return res.json({"error": false, "message": `Booked room ${req.body.room} for ${req.body.time}`});
    } catch (err) {
        console.error(err);
        return res.json({"error": true, "message": "Something went wrong"});
    }
});

export default router;
