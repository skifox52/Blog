import { Schema, model } from "mongoose";
const refreshTokenSchema = new Schema({
    idUtilisateur: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const refreshTokenModel = model("Refreshtoken", refreshTokenSchema);
export default refreshTokenModel;
