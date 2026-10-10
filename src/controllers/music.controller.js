const musicModel =require("../models/music.model")
const albumModel =require("../models/album.model")
const {uploadFile}=require("../services/storage.service")
const jwt =require("jsonwebtoken")


async function createMusic(req,res){
    
     

     const {title}=req.body;
     const file=req.file;

    if (!file) {
        return res.status(400).json({
            message: "No file uploaded",
            body: req.body
        });
    }
     const result=await uploadFile(file.buffer.toString('base64'))

     const music =await musicModel.create({
        uri:result.url,
        title,
        artist:req.user.id,
     })

     res.status(201).json({
        message:"Music created successfully",
        music:{
            id:music._id,
            uri:music.uri,
            title:music.title,
            artist:music.artist,
        }
     })
}

async function createAlbum(req,res){
    

        const {title,musics}=req.body
        const album=await albumModel.create({
            title,
            artist:req.user.id,
            musics:musics,
        })

        res.status(201).json({
            message:"Album created successfully",
            album:{
                id:album.id,
                title:album.title,
            artist:album.artist,
            musics:album.musics,
            }
        })
    
}

async function getAllMusic(req,res){
    const musics =await musicModel.find().populate("artist","username email")

    res.status(200).json({
        message:"Music fetched successfully",
        musics:musics,
    })
}

async function getAllAlbums(req,res){
    const albums =await albumModel
    .find().select("title artists")
    .skip()
    .limit(2)
    .populate("artist","username email")
    res.status(200).json({
        message:"Albums fetched successfully",
        albums:albums,
    })

}
async function getAlbumbyId(req,res){
    const albumid=req.params.albumId
    const albums =await albumModel.findbyId(albumid).populate("artist","username email")
    res.status(200).json({
        message:"Album fetched successfully",
        album:album,
    })

}

module.exports ={createMusic,createAlbum,getAllMusic,getAllAlbums,getAlbumbyId}