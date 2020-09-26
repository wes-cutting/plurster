const express = require('express');
const router = express.Router();
const RouteGenerator = require('./route-generator');
const { MongooseCRUD } = require('../../../data/mongoose');
const ArtistSchema = require('../../../data/models/artist-schema');
const CraftSchema = require('../../../data/models/craft-schema');

const ArtistCollection = new MongooseCRUD('Artist', ArtistSchema);
const CraftCollection = new MongooseCRUD('Craft', CraftSchema);

router.use('/artists', RouteGenerator(ArtistCollection))
router.use('/crafts', RouteGenerator(CraftCollection))

module.exports = router;
