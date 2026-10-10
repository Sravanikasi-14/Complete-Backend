const mongoose =require('mongoose')

const albumSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    music:{
        type:mongoose.Schema.Types.ObjectId,
        refer:"music"
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        refer:"user",
        required:true,
    }
})
const albumModel =mongoose.model("album",albumSchema)

module.exports=albumModel