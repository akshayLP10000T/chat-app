import { Conversation } from '../models/conversation.js'
import { Message } from '../models/message.js';
import { io, getReceiverSocketId } from '../socket/socket.js';

export const sendMessage = async (req, res)=>{
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;

        if (!message || message.trim() === '') {
            return res.status(400).json({ error: 'Message content cannot be empty' });
        }

        let getConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });
        if (!getConversation) {
            getConversation = await Conversation.create({
                participants: [senderId, receiverId],
                messages: [],
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,
        });
        getConversation.messages.push(newMessage._id);
        await getConversation.save();

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        return res.status(201).json({ newMessage });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while sending the message' });
    }
}

export const getMessage = async (req, res)=>{
    try {
        const receiverId =req.params.id;
        const senderId = req.id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]}
        }).populate("messages");

        return res.status(200).json(conversation?.messages);

    } catch (error) {
        console.log(error);
    }
}