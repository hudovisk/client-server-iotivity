import mongoose from 'mongoose';

if(mongoose.connection.readyState === 0) {
    mongoose.connect("mongodb://localhost/test");
}