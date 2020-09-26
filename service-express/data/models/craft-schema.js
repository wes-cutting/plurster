const { Schema } = require('mongoose');

const CraftSchema = new Schema({
    name: String,
    desc: Schema.Types.Mixed,
    meta: Schema.Types.Mixed,
    artists: Schema.Types.ObjectId
});

module.exports = CraftSchema;