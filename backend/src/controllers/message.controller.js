import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import message from "../models/Message.models.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async(req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        const filterdUsers = await User.find({ _id: {$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filterdUsers)
 
    } catch (error) {
        console.erro("error getting users" , error);
        res.status(500).json({error:"internal server error"})

        
    }
}

export const getmessages = async(req,res)=>{
    try {
        const {id:userToChatId} = req.params
        const myId = req.user._id;

        const messages = await message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
              ],
        })
        res.status(200).json(messages)
        } catch (error) {
            console.error("error in getting message", error);
            res.status(500).json({error:"internal server error"})
        
    }
}

export const sendMessage = async(req,res)=>{
    try {
        const {text,Image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;

        if(Image){
            const uploadResponse = await cloudinary.uploader.upload(Image);
            imageUrl  = uploadResponse.secure_url;
        }

        const newMessage = new message({
            senderId,
            receiverId,
            text,
            Image:imageUrl
        });

        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }

        res.status(201).json(newMessage)
    } catch (error) {

        console.error("error sending message", error)
        res.status(500).json({error: "internal server error"});
    }
}