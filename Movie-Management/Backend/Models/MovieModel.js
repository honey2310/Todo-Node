import mongoose from 'mongoose';

export const MovieSchema= new mongoose.Schema({
    title:{type:String,required:true},
    genre:{type:String,required:true},
    year:{type:Number,required:true},
    poster:{type:String,required:true},
},{timestamps:true});

export const movie = mongoose.model("movies",MovieSchema);