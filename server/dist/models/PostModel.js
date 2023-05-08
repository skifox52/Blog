import { Schema, model } from "mongoose";
const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});
const PostModel = model("Post", PostSchema);
export default PostModel;
