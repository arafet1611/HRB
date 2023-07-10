
const express = require('express');
const router = express.Router();


const presenceController = require('./presenceController');


router.get('/presences', presenceController.getAllPresences);


router.get('/presences/:id', presenceController.getPresenceById);


router.post('/presences', presenceController.createPresence);


router.patch('/presences/:id', presenceController.updatePresence);


router.delete('/presences/:id', presenceController.deletePresence);


module.exports = router;
