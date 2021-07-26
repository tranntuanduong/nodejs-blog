const mongoose = require('mongoose');
var slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, default: '', maxLength: 255, require: true },
    description: { type: String, default: '', maxLength: 600 },
    videoId: { type: String, default: '', maxLength: 255 },
    image: { type: String, default: '', maxLength: 255 },
    slug: { type: String, slug: "name", unique: true },
}, { 
    timestamps: true, 

});

module.exports = mongoose.model('Course', Course);