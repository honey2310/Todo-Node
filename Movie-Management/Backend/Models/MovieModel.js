import mongoose from 'mongoose';

export const MovieSchema= new mongoose.Schema({
    title:{type:String,required:true},
    genre:{type:String,required:true},
    year:{type:Number,required:true},
    description:{type:String,required:true},
    poster:{type:String,required:true},
},{timestamps:true});

export const Movie = mongoose.model("movies",MovieSchema);