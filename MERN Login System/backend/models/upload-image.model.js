const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UploadImageSchema = new Schema({
    image: {type: Image(), required: true, unique: true},
}, 
{
  timestamps: true,
});

const UploadImageSchema = mongoose.model('image', UserSchema);

module.exports = UploadImageSchema;