const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    name: {type: String, required: true},
    img64: {type: String, required: true}
}, 
{
  timestamps: true,
});

const uploadImage = mongoose.model('image', ImageSchema);

module.exports = uploadImage;