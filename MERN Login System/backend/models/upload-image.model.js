const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    // src: {type: Image(), required: true, unique: true},
    // name: String,
    // img: {
    //   data: Buffer,
    //   contentType: String
    // }
    file: File()
}, 
{
  timestamps: true,
});

const uploadImage = mongoose.model('image', ImageSchema);

module.exports = uploadImage;