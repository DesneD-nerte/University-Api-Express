import { Schema, model } from 'mongoose';

const MessagesSchema = new Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    isVisible: {type: Boolean, required: true}
});

const Chat = new Schema({
    users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    messages: [{type: MessagesSchema}],
}, {
    collection: 'messages'
});

export default model('Chat', Chat);