var mongoose = require('mongoose');

var AttrSchema =  mongoose.Schema({
    name: String,
    type: String,
    value: String
});

var ResourceSchema =  mongoose.Schema({
    owner: {type: mongoose.Schema.ObjectId, ref: 'User'},
    identifier: {type: String, index: {unique: true}},
    uri: String,
    host: String,
    attrs: [AttrSchema] 
});

// counter OverwriteModelError: Cannot overwrite `User` model once compiled.
export let Resource = (mongoose.models.Resource) ? mongoose.models.Resource : mongoose.model('Resource', ResourceSchema);