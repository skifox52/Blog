import { Types, Schema, model } from "mongoose"

export interface PostInterface {
  _id: Types.ObjectId
  title: string
  content: string
  userId: Types.ObjectId
}

const PostSchema = new Schema<PostInterface>({
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
})

const PostModel = model("Post", PostSchema)

export default PostModel
