import { Schema, Types, model } from "mongoose"

interface RefreshTokenSchemaType {
  idUtilisateur: Types.ObjectId
  refreshToken: string
}

const refreshTokenSchema = new Schema<RefreshTokenSchemaType>(
  {
    idUtilisateur: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const refreshTokenModel = model("Refreshtoken", refreshTokenSchema)
export default refreshTokenModel
