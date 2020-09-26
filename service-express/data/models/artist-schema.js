const { Schema, model } = require('mongoose');

const ArtistModelSchema = new Schema({
    birthName: String, 
    stageNames: [String],
    dob: Date,
    desc: Schema.Types.Mixed,
    images: [String],
    websites: [String],
    meta: Schema.Types.Mixed,
    genres: Schema.Types.ObjectId,
    crafts: Schema.Types.ObjectId,
    events: Schema.Types.ObjectId,
    followers: Schema.Types.ObjectId
});

module.exports = ArtistModelSchema;