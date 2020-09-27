const express = require('express');
const router = express.Router();
const RouteGenerator = require('./route-generator');
const { MongooseCRUD } = require('../../../data/mongoose');
const ArtistSchema = require('../../../data/schemas/artist-schema');
const CraftSchema = require('../../../data/schemas/craft-schema');

const ArtistCollection = new MongooseCRUD('Artist', ArtistSchema);
const CraftCollection = new MongooseCRUD('Craft', CraftSchema);

router.use('/artists', RouteGenerator(ArtistCollection))
router.use('/crafts', RouteGenerator(CraftCollection))

module.exports = router;
