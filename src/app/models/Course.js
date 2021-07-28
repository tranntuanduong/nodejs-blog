const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);



const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    _id: { type: Number},
    name: { type: String, default: '', maxLength: 255, require: true },
    description: { type: String, default: '', maxLength: 600 },
    videoId: { type: String, default: '', maxLength: 255 },
    image: { type: String, default: '', maxLength: 255 },
    slug: { type: String, slug: "name", unique: true },
}, { 
    _id: false,
    timestamps: true, 
});


mongoose.plugin(slug);

CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete, { 
    overrideMethods: 'all', 
    deletedAt : true ,
});

module.exports = mongoose.model('Course', CourseSchema);