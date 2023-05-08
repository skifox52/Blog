import { Schema, model, Types } from "mongoose"

export interface UserSchemaInterface {
  _id: Types.ObjectId
  username: string
  password: string
}

const userSchema = new Schema<UserSchemaInterface>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const UserModel = model("User", userSchema)
export default UserModel
