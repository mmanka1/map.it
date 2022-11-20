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
    const roomsSnapshot = await db.collection('rooms').get();
    const rooms = await roomsSnapshot.docs[0].data();
    res.json({"rooms": rooms});
});

router.get('/availabilities', async(req, res) => {
    const availabilitiesSnapshot = await db.collection('availabilities').get();
    const availabilities = await availabilitiesSnapshot.docs[0].data();
    res.json({"availabilities": availabilities});
})

export default router;
